/**
 * Ckrit CV Maker - Optional Server for Draft Persistence
 * 
 * PRIVACY NOTICE:
 * - This server is OPTIONAL and disabled by default
 * - The Ckrit CV Maker works 100% client-side without any server
 * - Enabling this server is purely for users who want cloud backup of drafts
 * - Data on this server is encrypted with user passwords (Web Crypto AES-GCM)
 * - Never store unencrypted sensitive CV data on servers
 * - Users retain full control: clear drafts anytime, or switch to localStorage-only
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:4321'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));

// In-memory storage (replace with database in production)
const draftStore = new Map(); // userId -> { drafts: [{ id, name, encryptedData, createdAt, updatedAt }] }
const userStore = new Map();  // email -> { hashedPassword, salt, userId }

// Utility: Hash password with salt (for demo only - use bcrypt in production)
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
}

// Utility: Generate random ID
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

// ============ AUTH ROUTES (Optional - users can stay fully client-side) ============

/**
 * POST /api/auth/register
 * Optional registration for cloud backup
 * 
 * Body: { email, password, confirmPassword }
 * Response: { userId, token, message }
 */
app.post('/api/auth/register', (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Validation
  if (!email || !password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Invalid input or password mismatch' });
  }
  if (userStore.has(email)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Create user
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = hashPassword(password, salt);
  const userId = generateId();

  userStore.set(email, { hashedPassword, salt, userId });
  draftStore.set(userId, { drafts: [] });

  // Mock JWT (in production, use proper JWT library)
  const token = Buffer.from(JSON.stringify({ userId, email })).toString('base64');

  res.json({
    userId,
    token,
    message: 'Registration successful. Your drafts are now backed up to the cloud (encrypted).'
  });
});

/**
 * POST /api/auth/login
 * Optional login for cloud backup
 * 
 * Body: { email, password }
 * Response: { userId, token }
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = userStore.get(email);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const hashedInput = hashPassword(password, user.salt);
  if (hashedInput !== user.hashedPassword) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const token = Buffer.from(JSON.stringify({ userId: user.userId, email })).toString('base64');
  res.json({ userId: user.userId, token, message: 'Login successful' });
});

// ============ DRAFT PERSISTENCE ROUTES ============

/**
 * Middleware: Verify token
 */
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

/**
 * POST /api/cv/save
 * Save or update an encrypted CV draft
 * 
 * Body: { draftName, encryptedData (base64), token (optional) }
 * Response: { draftId, message }
 * 
 * If token provided: saves to cloud
 * If no token: returns draftId for client-side localStorage backup reference
 */
app.post('/api/cv/save', (req, res) => {
  const { draftName, encryptedData, token } = req.body;

  // Validation
  if (!draftName || !encryptedData) {
    return res.status(400).json({ error: 'draftName and encryptedData required' });
  }

  // If token provided, save to cloud
  if (token) {
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      const userId = decoded.userId;

      if (!draftStore.has(userId)) {
        draftStore.set(userId, { drafts: [] });
      }

      const drafts = draftStore.get(userId).drafts;
      let draft = drafts.find(d => d.name === draftName);

      if (!draft) {
        draft = {
          id: generateId(),
          name: draftName,
          encryptedData: encryptedData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        drafts.push(draft);
      } else {
        // Update existing
        draft.encryptedData = encryptedData;
        draft.updatedAt = new Date().toISOString();
      }

      return res.json({
        draftId: draft.id,
        message: 'Draft saved to cloud (encrypted)'
      });
    } catch (err) {
      return res.status(400).json({ error: 'Invalid token' });
    }
  } else {
    // No token: just return a reference ID
    const draftId = generateId();
    res.json({
      draftId: draftId,
      message: 'Draft ID generated (store locally with localStorage)'
    });
  }
});

/**
 * GET /api/cv/drafts
 * List all drafts for authenticated user (cloud backup only)
 * 
 * Header: Authorization: Bearer <token>
 * Response: { drafts: [{ id, name, createdAt, updatedAt }] }
 */
app.get('/api/cv/drafts', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const userDrafts = draftStore.get(userId)?.drafts || [];

  // Return draft metadata WITHOUT encrypted data
  const summary = userDrafts.map(d => ({
    id: d.id,
    name: d.name,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    size: d.encryptedData.length
  }));

  res.json({ drafts: summary });
});

/**
 * GET /api/cv/:draftId
 * Retrieve specific encrypted draft
 * 
 * Header: Authorization: Bearer <token>
 * Response: { encryptedData (base64) }
 */
app.get('/api/cv/:draftId', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const { draftId } = req.params;

  const userDrafts = draftStore.get(userId)?.drafts || [];
  const draft = userDrafts.find(d => d.id === draftId);

  if (!draft) {
    return res.status(404).json({ error: 'Draft not found' });
  }

  res.json({ encryptedData: draft.encryptedData });
});

/**
 * DELETE /api/cv/:draftId
 * Delete a draft (user's request to clear data)
 * 
 * Header: Authorization: Bearer <token>
 * Response: { message }
 */
app.delete('/api/cv/:draftId', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const { draftId } = req.params;

  const userDrafts = draftStore.get(userId)?.drafts || [];
  const index = userDrafts.findIndex(d => d.id === draftId);

  if (index === -1) {
    return res.status(404).json({ error: 'Draft not found' });
  }

  userDrafts.splice(index, 1);
  res.json({ message: 'Draft deleted' });
});

/**
 * DELETE /api/auth/account
 * Account deletion (remove all user data)
 * 
 * Header: Authorization: Bearer <token>
 * Response: { message }
 */
app.delete('/api/auth/account', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const email = req.user.email;

  // Remove user and drafts
  userStore.delete(email);
  draftStore.delete(userId);

  res.json({ message: 'Account deleted. All data has been removed.' });
});

// ============ HEALTH CHECK ============

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Ckrit CV Maker server is running',
    features: ['Optional cloud backup', 'Encrypted drafts', 'Account management']
  });
});

// ============ ERROR HANDLING ============

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============ START SERVER ============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Ckrit CV Maker Server running on port ${PORT}`);
  console.log(`📍 API Health: http://localhost:${PORT}/api/health`);
  console.log(`\nℹ️  Privacy: This server stores ENCRYPTED drafts only.`);
  console.log(`   Users can opt-in to cloud backup or use client-side localStorage.\n`);
});

module.exports = app;

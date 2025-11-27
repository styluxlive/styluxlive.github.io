# 🎯 Ckrit CV Builder - Quick Start Guide

Welcome to the Ckrit CV Builder! Create professional, customizable CV landing pages in minutes.

## Getting Started

### 1. **Access the App**
Navigate to `/ckrit-cv-maker/` in the site

### 2. **Choose Your Template**
You'll see the Intro Screen with:
- **Name** input field
- **Headline** field (e.g., "Senior Software Engineer")
- **Email** field
- **Live Data Display** showing what you've entered

Enter your basic info and click **Continue** to access the full editor.

### 3. **Fill Out Your Information**

#### Essential Fields
- Name
- Headline
- Email
- Website URL
- ORCID (optional)
- Summary/Bio

#### Professional Details
- **Skills**: Add skills as tags (press Enter to add)
- **Education**: School, degree, dates
- **Experience**: Job title, company, dates, description
- **Projects**: Project name, link, description
- **Publications**: Title, venue, year
- **Awards**: Award name, organization, year
- **Social Links**: LinkedIn, GitHub, X/Twitter

#### Customization
- **Template**: Select from Simple, Modern, Classic, or Minimal
- **Color**: Pick your primary color
- **Sections**: Toggle sections on/off to show/hide in generated CV

### 4. **Live Preview**
Click **Live Preview** button to see your CV in real-time as you fill in information. The preview updates instantly with your selected template and color.

### 5. **Download or Share**

#### Download Options
- **Download Markdown** - `.md` format for importing elsewhere
- **Download JSON** - Raw data for backups or re-import
- **Download vCard** - Contact card for phones/emails
- **Download HTML** - Standalone landing page with your selected template

#### Share Options
- **Share CV** - Uses Web Share API to share directly
- **Clipboard** - Copy HTML to paste into documents

### 6. **Save Your Work**

#### Standard Draft
- **Save Draft** - Saves locally to your browser
- **Load Draft** - Restores saved draft
- **Clear Draft** - Deletes saved draft

#### Encrypted Draft (Password Protected)
- Enter a **passphrase** in the password field
- **Save Draft (Encrypted)** - Encrypts with your passphrase
- **Load Draft (Encrypted)** - Prompts for passphrase, decrypts if correct

**Note**: Drafts are stored only in your browser. Clearing browser data will delete them.

## Template Options

### 📄 Simple (Default)
Best for: Quick sharing, clean look  
Features: Horizontal header, color accent line, skill badges

### 🎯 Modern
Best for: Professional portfolios, visual appeal  
Features: Two-column layout, colored sidebar, modern styling

### 📋 Classic
Best for: Formal applications, printing  
Features: Traditional resume format, print-optimized, professional

### ✨ Minimal
Best for: Designers, creatives, elegant simplicity  
Features: Subtle styling, focus on content, sophisticated typography

## Color Customization

Each template supports a custom primary color:
1. Click the **Color Picker** in Options
2. Choose your preferred color (hex or color picker)
3. See the preview update instantly
4. The template automatically adjusts contrast for readability

## Section Toggles

Show or hide sections in your generated CV:
- Education
- Experience
- Projects
- Publications
- Awards & Certifications
- Skills

Unchecked sections won't appear in downloads or previews.

## Tips & Tricks

### Maximize Your CV
- Use clear, concise descriptions
- Add 5-10 relevant skills
- Include measurable achievements in experience
- Add your portfolio link in website field
- Link to publications and projects

### Template Selection
- Use **Modern** for tech/creative roles
- Use **Classic** for formal/academic roles
- Use **Simple** for flexibility and speed
- Use **Minimal** for premium/design positions

### Sharing
- Download **HTML** for complete control
- Use **JSON** for data portability
- Share **vCard** for contact info distribution
- Use **Markdown** for blog or documentation

### Data Security
- Drafts are stored **locally** (your device only)
- Use **Encrypted Draft** with passphrases for sensitive data
- Exported files are **standalone** (no server required)
- No data is ever sent to servers

## Keyboard Shortcuts

| Action | Keys |
|--------|------|
| Add Skill | Enter in skill input |
| Finish Skill | Tab or Click add |
| Add Education Entry | Click "Add" button |
| Preview CV | Click "Live Preview" button |
| Back to Intro | Click "Back to Intro" button |

## Troubleshooting

### "Please enter your full name to continue"
- The name field is required to proceed
- Go back to Intro screen and enter your name

### Preview not updating
- Click **Live Preview** button again
- Check browser console for errors
- Try refreshing the page

### Can't load encrypted draft
- Double-check your passphrase (case-sensitive)
- Make sure you're using the same device/browser
- Try decrypting with different passphrases if unsure

### Download not working
- Check browser permissions for downloads
- Try a different template first
- Verify your data is complete

## Advanced Usage

### Programmatic Access
The CV Builder is powered by JavaScript. You can:
1. Access `generateLandingHTML(data)` to generate HTML
2. Use `generateMarkdown(data)` for Markdown export
3. Call `generateVCard(data)` for contact cards
4. Encrypt data with `encryptJsonWithPassword(data, pass)`

### Custom Data Import
You can create a JSON file with CV data and import it:
1. Save your CV as `cv.json`
2. Use the browser's file upload (if available)
3. Or manually copy/paste JSON into localStorage

### Extending Templates
Each template uses standard CSS. You can:
1. Export HTML
2. Edit the `<style>` section
3. Customize colors, fonts, spacing
4. Re-use the modified template

## Privacy & Security

- ✅ **No data collection** - All processing happens in your browser
- ✅ **No servers** - No backend required
- ✅ **Encrypted optionally** - Password-protect drafts with AES-GCM
- ✅ **Portable** - Export standalone HTML files
- ✅ **XSS protected** - All user input is escaped
- ✅ **Print-safe** - Generate documents without tracking

## Support

### Common Issues
- Refresh browser if something seems broken
- Clear browser cache if styles look wrong
- Try a different browser if errors persist

### Feature Requests
- Template suggestions welcome
- Color scheme ideas appreciated
- Integration requests considered

## About Ckrit CV Builder

- **Developer**: Jabulani Mdluli
- **Framework**: Hugo (0.152.2)
- **Frontend**: Vanilla JavaScript + Web APIs
- **Security**: Web Crypto API (AES-GCM + PBKDF2)
- **Storage**: Browser localStorage
- **Deployment**: GitHub Pages + Netlify
- **License**: Check repository for details

---

**Ready to build your CV?** Go to `/ckrit-cv-maker/` and get started! 🚀

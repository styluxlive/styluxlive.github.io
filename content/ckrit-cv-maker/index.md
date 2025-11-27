---
title: "Ckrit CV Maker"
date: 2025-11-27T00:00:00Z
draft: false
summary: "Create and download a CV from the browser."
---

<div id="ckrit-cv-app">
  <!-- Intro Screen / Wizard -->
  <div id="intro-screen" style="display:block">
    <div style="max-width:600px;margin:0 auto;padding:24px;text-align:center">
      <h1>Ckrit CV Builder</h1>
      <p style="color:#666">Build a professional CV, landing page, and more. Developer: <strong>Jabulani Mdluli</strong></p>
      <p><strong>Privacy:</strong> All data is handled locally in the browser. No data sent to any server by default.</p>
      <hr/>
      <p style="margin-top:24px">Let's start by collecting your core information:</p>
      <div style="text-align:left;background:#f9f9f9;padding:20px;border-radius:8px;margin-top:16px">
        <label>Full Name *<br/><input type="text" id="intro-name" placeholder="John Doe" style="width:100%;padding:8px;margin-top:6px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"/></label><br/>
        <label style="margin-top:12px;display:block">Headline / Current Role<br/><input type="text" id="intro-headline" placeholder="Senior Software Engineer" style="width:100%;padding:8px;margin-top:6px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"/></label><br/>
        <label style="margin-top:12px;display:block">Email<br/><input type="email" id="intro-email" placeholder="john@example.com" style="width:100%;padding:8px;margin-top:6px;box-sizing:border-box;border:1px solid #ccc;border-radius:4px"/></label><br/>
        <button type="button" id="intro-continue" style="margin-top:20px;padding:10px 20px;background:#2b6cb0;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:1rem">Continue →</button>
      </div>
    </div>

    <h2 style="text-align:center;margin-top:32px">Your Data (Live Preview)</h2>
    <div id="intro-data-display" style="background:#f0f0f0;padding:20px;border-radius:8px;max-width:600px;margin:16px auto;font-family:monospace;font-size:0.9rem;white-space:pre-wrap;word-break:break-all;min-height:100px">
      <span style="color:#999">Data will appear here as you type...</span>
    </div>
  </div>

  <!-- Editor Screen -->
  <div id="editor-screen" style="display:none">
    <p><button type="button" id="back-to-intro" style="padding:8px 16px;background:#ccc;border:none;border-radius:4px;cursor:pointer">← Back to Intro</button></p>
    <form id="cv-form">
    <label>Full name<br/><input type="text" name="name" required></label><br/>
    <label>Headline / Current role<br/><input type="text" name="headline"></label><br/>
    <label>Email<br/><input type="email" name="email"></label><br/>
    <label>Website<br/><input type="url" name="website"></label><br/>
    <label>ORCID / Identifier<br/><input type="text" name="orcid"></label><br/>
    <label>Summary / Bio<br/><textarea name="summary" rows="4"></textarea></label><br/>

    <h3>Skills</h3>
    <input id="skill-input" placeholder="Add skill and press Enter" />
    <div id="skills-list" style="margin-top:8px"></div>

    <h3>Education</h3>
    <div id="education-list"></div>
    <button type="button" id="add-education">Add education</button>

    <h3>Experience</h3>
    <div id="experience-list"></div>
    <button type="button" id="add-experience">Add experience</button>

    <h3>Projects</h3>
    <div id="project-list"></div>
    <button type="button" id="add-project">Add project</button>

    <h3>Awards & Certifications</h3>
    <div id="award-list"></div>
    <button type="button" id="add-award">Add award / cert</button>

    <h3>Publications</h3>
    <div id="publication-list"></div>
    <button type="button" id="add-publication">Add publication</button>

    <h3>Social / Links</h3>
    <label>LinkedIn<br/><input type="url" name="linkedin"></label>
    <label>GitHub<br/><input type="url" name="github"></label>
    <label>Twitter / X<br/><input type="url" name="twitter"></label>

    <h3>Options / Templates</h3>
    <label>Template
      <select id="template-select">
        <option value="simple">Simple</option>
        <option value="modern">Modern (Tailwind)</option>
        <option value="classic">Classic (Sidebar)</option>
        <option value="minimal">Minimal (Clean)</option>
      </select>
    </label>
    <label>Primary color <input type="color" id="primary-color" value="#2b6cb0"></label>
    <label>Include sections (uncheck to hide)</label>
    <div>
      <label><input type="checkbox" id="show-education" checked> Education</label>
      <label><input type="checkbox" id="show-experience" checked> Experience</label>
      <label><input type="checkbox" id="show-projects" checked> Projects</label>
      <label><input type="checkbox" id="show-publications" checked> Publications</label>
      <label><input type="checkbox" id="show-awards" checked> Awards</label>
      <label><input type="checkbox" id="show-skills" checked> Skills</label>
    </div>

    <hr/>
    <label>Encryption passphrase (optional)<br/><input type="password" id="draft-passphrase" placeholder="Enter a passphrase to encrypt drafts"/></label>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" id="preview-btn">Live Preview</button>
      <button type="button" id="download-md">Download Markdown</button>
      <button type="button" id="download-json">Download JSON</button>
      <button type="button" id="download-vcard">Download vCard</button>
      <button type="button" id="download-html">Generate Landing Page (index.html)</button>
      <button type="button" id="share-cv">Share CV</button>
      <button type="button" id="save-draft">Save Draft</button>
      <button type="button" id="load-draft">Load Draft</button>
      <button type="button" id="save-draft-encrypted">Save Encrypted Draft</button>
      <button type="button" id="load-draft-encrypted">Load Encrypted Draft</button>
      <button type="button" id="clear-draft">Clear Draft</button>
    </div>
  </form>

  <h2>Preview</h2>
  <iframe id="preview-frame" style="width:100%;height:700px;border:1px solid #ddd"></iframe>
  </div>
</div>

<script src="/js/ckrit-cv-maker.js"></script>

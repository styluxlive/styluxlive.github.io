---
title: "Ckrit CV Maker"
date: 2025-11-27T00:00:00Z
draft: false
summary: "Create and download a CV from the browser."
---

<div id="ckrit-cv-app">
  <p>This client-side CV maker captures user information and creates downloadable exports (Markdown, JSON, printable PDF via browser print), and a standalone landing page `index.html` you can host. Developer: <strong>Jabulani Mdluli</strong></p>
  <p><strong>Privacy:</strong> All data is handled locally in the browser and is not sent to any server by default (unless you opt in to add a server).</p>

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
        <option value="modern">Modern</option>
        <option value="classic">Classic</option>
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
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" id="preview-btn">Live Preview</button>
      <button type="button" id="download-md">Download Markdown</button>
      <button type="button" id="download-json">Download JSON</button>
      <button type="button" id="download-html">Generate Landing Page (index.html)</button>
      <button type="button" id="save-draft">Save Draft</button>
      <button type="button" id="load-draft">Load Draft</button>
      <button type="button" id="clear-draft">Clear Draft</button>
    </div>
  </form>

  <h2>Preview</h2>
  <iframe id="preview-frame" style="width:100%;height:700px;border:1px solid #ddd"></iframe>
</div>

<script src="/js/ckrit-cv-maker.js"></script>

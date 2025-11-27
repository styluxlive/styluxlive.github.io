---
title: "Ckrit CV Maker"
date: 2025-11-27T00:00:00Z
draft: false
summary: "Create and download a CV from the browser."
---

<div id="ckrit-cv-app">
  <p>This simple client-side CV maker captures user information and creates downloadable exports (Markdown, JSON, printable PDF via browser print). Developer: <strong>Jabulani Mdluli</strong></p>
  <p><strong>Privacy:</strong> All data is handled locally in the browser and is not sent to any server by default.</p>

  <form id="cv-form">
    <label>Full name<br/><input type="text" name="name" required></label><br/>
    <label>Email<br/><input type="email" name="email"></label><br/>
    <label>Summary<br/><textarea name="summary" rows="4"></textarea></label><br/>

    <h3>Education</h3>
    <div id="education-list"></div>
    <button type="button" id="add-education">Add education</button>

    <h3>Experience</h3>
    <div id="experience-list"></div>
    <button type="button" id="add-experience">Add experience</button>

    <h3>Publications</h3>
    <div id="publication-list"></div>
    <button type="button" id="add-publication">Add publication</button>

    <hr/>
    <button type="button" id="download-md">Download Markdown</button>
    <button type="button" id="download-json">Download JSON</button>
    <button type="button" id="print-cv">Printable / PDF</button>
  </form>
</div>

<script src="/js/ckrit-cv-maker.js"></script>

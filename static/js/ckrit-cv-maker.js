// Ckrit CV Maker - client-side form handling and export
(function () {
  function el(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
  }

  function addEducation(item) {
    const list = document.getElementById('education-list');
    const idx = list.children.length;
    const node = el(`
      <div class="edu-item" data-idx="${idx}">
        <label>Degree / Title<br/><input name="edu_title_${idx}"/></label>
        <label>Institution<br/><input name="edu_org_${idx}"/></label>
        <label>Dates<br/><input name="edu_dates_${idx}"/></label>
        <button type="button" class="remove-item">Remove</button>
      </div>
    `);
    node.querySelector('.remove-item').addEventListener('click', function () { node.remove(); });
    if (item) {
      node.querySelector(`[name=edu_title_${idx}]`).value = item.title || '';
      node.querySelector(`[name=edu_org_${idx}]`).value = item.org || '';
      node.querySelector(`[name=edu_dates_${idx}]`).value = item.dates || '';
    }
    list.appendChild(node);
  }

  function addExperience(item) {
    const list = document.getElementById('experience-list');
    const idx = list.children.length;
    const node = el(`
      <div class="exp-item" data-idx="${idx}">
        <label>Role / Title<br/><input name="exp_title_${idx}"/></label>
        <label>Organization<br/><input name="exp_org_${idx}"/></label>
        <label>Dates<br/><input name="exp_dates_${idx}"/></label>
        <label>Description<br/><textarea name="exp_desc_${idx}"></textarea></label>
        <button type="button" class="remove-item">Remove</button>
      </div>
    `);
    node.querySelector('.remove-item').addEventListener('click', function () { node.remove(); });
    if (item) {
      node.querySelector(`[name=exp_title_${idx}]`).value = item.title || '';
      node.querySelector(`[name=exp_org_${idx}]`).value = item.org || '';
      node.querySelector(`[name=exp_dates_${idx}]`).value = item.dates || '';
      node.querySelector(`[name=exp_desc_${idx}]`).value = item.desc || '';
    }
    list.appendChild(node);
  }

  function addPublication(item) {
    const list = document.getElementById('publication-list');
    const idx = list.children.length;
    const node = el(`
      <div class="pub-item" data-idx="${idx}">
        <label>Title<br/><input name="pub_title_${idx}"/></label>
        <label>Citation / Venue<br/><input name="pub_venue_${idx}"/></label>
        <label>Year<br/><input name="pub_year_${idx}"/></label>
        <button type="button" class="remove-item">Remove</button>
      </div>
    `);
    node.querySelector('.remove-item').addEventListener('click', function () { node.remove(); });
    if (item) {
      node.querySelector(`[name=pub_title_${idx}]`).value = item.title || '';
      node.querySelector(`[name=pub_venue_${idx}]`).value = item.venue || '';
      node.querySelector(`[name=pub_year_${idx}]`).value = item.year || '';
    }
    list.appendChild(node);
  }

  function gatherData() {
    const form = document.getElementById('cv-form');
    const data = {
      name: form.querySelector('[name=name]').value || '',
      email: form.querySelector('[name=email]').value || '',
      summary: form.querySelector('[name=summary]').value || '',
      education: [],
      experience: [],
      publications: []
    };

    document.querySelectorAll('#education-list .edu-item').forEach((node, i) => {
      data.education.push({
        title: node.querySelector(`[name=edu_title_${i}]`).value || '',
        org: node.querySelector(`[name=edu_org_${i}]`).value || '',
        dates: node.querySelector(`[name=edu_dates_${i}]`).value || ''
      });
    });

    document.querySelectorAll('#experience-list .exp-item').forEach((node, i) => {
      data.experience.push({
        title: node.querySelector(`[name=exp_title_${i}]`).value || '',
        org: node.querySelector(`[name=exp_org_${i}]`).value || '',
        dates: node.querySelector(`[name=exp_dates_${i}]`).value || '',
        desc: node.querySelector(`[name=exp_desc_${i}]`).value || ''
      });
    });

    document.querySelectorAll('#publication-list .pub-item').forEach((node, i) => {
      data.publications.push({
        title: node.querySelector(`[name=pub_title_${i}]`).value || '',
        venue: node.querySelector(`[name=pub_venue_${i}]`).value || '',
        year: node.querySelector(`[name=pub_year_${i}]`).value || ''
      });
    });

    return data;
  }

  function generateMarkdown(d) {
    let md = `# ${d.name}\n\n`;
    if (d.email) md += `**Email:** ${d.email}\n\n`;
    if (d.summary) md += `## Summary\n${d.summary}\n\n`;

    if (d.education.length) {
      md += `## Education\n`;
      d.education.forEach(e => {
        md += `- **${e.title || ''}**, ${e.org || ''} ${e.dates ? `(${e.dates})` : ''}\n`;
      });
      md += `\n`;
    }

    if (d.experience.length) {
      md += `## Experience\n`;
      d.experience.forEach(e => {
        md += `- **${e.title || ''}**, ${e.org || ''} ${e.dates ? `(${e.dates})` : ''}\n`;
        if (e.desc) md += `  - ${e.desc}\n`;
      });
      md += `\n`;
    }

    if (d.publications.length) {
      md += `## Publications\n`;
      d.publications.forEach(p => {
        md += `- ${p.title || ''}${p.venue ? ` — ${p.venue}` : ''}${p.year ? ` (${p.year})` : ''}\n`;
      });
      md += `\n`;
    }

    md += `\n---\nGenerated with Ckrit CV Maker by Jabulani Mdluli`;
    return md;
  }

  function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function openPrintable(d) {
    const win = window.open('', '_blank');
    const html = `
      <html>
      <head>
        <title>${escapeHtml(d.name)} - CV</title>
        <meta charset="utf-8" />
        <style>
          body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 24px; }
          h1 { margin-bottom: 6px }
          h2 { margin-top: 18px }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(d.name)}</h1>
        <div>${d.email ? `<div><strong>Email:</strong> ${escapeHtml(d.email)}</div>` : ''}</div>
        ${d.summary ? `<h2>Summary</h2><div>${escapeHtml(d.summary).replace(/\n/g,'<br/>')}</div>` : ''}
        ${d.education.length ? `<h2>Education</h2><ul>${d.education.map(e=>`<li><strong>${escapeHtml(e.title)}</strong>, ${escapeHtml(e.org)} ${e.dates?`(${escapeHtml(e.dates)})`:''}</li>`).join('')}</ul>` : ''}
        ${d.experience.length ? `<h2>Experience</h2>${d.experience.map(e=>`<div><strong>${escapeHtml(e.title)}</strong>, ${escapeHtml(e.org)} ${e.dates?`(${escapeHtml(e.dates)})`:''}<div>${escapeHtml(e.desc).replace(/\n/g,'<br/>')}</div></div>`).join('')}` : ''}
        ${d.publications.length ? `<h2>Publications</h2><ul>${d.publications.map(p=>`<li>${escapeHtml(p.title)}${p.venue?` — ${escapeHtml(p.venue)}`:''}${p.year?` (${escapeHtml(p.year)})`:''}</li>`).join('')}</ul>` : ''}
        <hr/>
        <div style="font-size:0.9em;color:#666">Generated with Ckrit CV Maker by Jabulani Mdluli</div>
      </body>
      </html>
    `;
    win.document.open();
    win.document.write(html);
    win.document.close();
    // Give the browser a moment to render then trigger print
    setTimeout(()=>{ try { win.print(); } catch(e){/* ignore */} }, 400);
  }

  function escapeHtml(s){
    if(!s) return '';
    return s.replace(/[&<>"]+/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
  }

  // init
  document.addEventListener('DOMContentLoaded', function () {
    // seed with one entry each
    addEducation();
    addExperience();
    addPublication();

    document.getElementById('add-education').addEventListener('click', function(){ addEducation(); });
    document.getElementById('add-experience').addEventListener('click', function(){ addExperience(); });
    document.getElementById('add-publication').addEventListener('click', function(){ addPublication(); });

    document.getElementById('download-md').addEventListener('click', function(){
      const data = gatherData();
      const md = generateMarkdown(data);
      download(`${(data.name||'cv').replace(/\s+/g,'_')}.md`, md, 'text/markdown');
    });

    document.getElementById('download-json').addEventListener('click', function(){
      const data = gatherData();
      download(`${(data.name||'cv').replace(/\s+/g,'_')}.json`, JSON.stringify(data, null, 2), 'application/json');
    });

    document.getElementById('print-cv').addEventListener('click', function(){
      const data = gatherData();
      openPrintable(data);
    });
  });
})();

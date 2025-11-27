// Ckrit CV Maker - client-side form handling and export
 (function () {
  const STORAGE_KEY = 'ckrit_cv_draft_v1';
  function el(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
  }

  function addItem(listId, html, values) {
    const list = document.getElementById(listId);
    const idx = list.children.length;
    const node = el(html.replace(/\$IDX/g, idx));
    const remove = node.querySelector('.remove-item');
    if (remove) remove.addEventListener('click', () => node.remove());
    if (values) {
      Object.keys(values).forEach(k => {
        const input = node.querySelector(`[name=${k.replace(/\s/g,'_')}_$${'IDX'}]`.replace('_$IDX', `_${idx}`));
        if (input) input.value = values[k];
      });
    }
    list.appendChild(node);
  }

  function addEducation(item) {
    addItem('education-list', `\
      <div class="edu-item" data-idx="$IDX">\
        <label>Degree / Title<br/><input name="edu_title_$IDX"/></label>\
        <label>Institution<br/><input name="edu_org_$IDX"/></label>\
        <label>Dates<br/><input name="edu_dates_$IDX"/></label>\
        <button type="button" class="remove-item">Remove</button>\
      </div>\
    `, item);
  }

  function addExperience(item) {
    addItem('experience-list', `\
      <div class="exp-item" data-idx="$IDX">\
        <label>Role / Title<br/><input name="exp_title_$IDX"/></label>\
        <label>Organization<br/><input name="exp_org_$IDX"/></label>\
        <label>Dates<br/><input name="exp_dates_$IDX"/></label>\
        <label>Description<br/><textarea name="exp_desc_$IDX"></textarea></label>\
        <button type="button" class="remove-item">Remove</button>\
      </div>\
    `, item);
  }

  function addPublication(item) {
    addItem('publication-list', `\
      <div class="pub-item" data-idx="$IDX">\
        <label>Title<br/><input name="pub_title_$IDX"/></label>\
        <label>Citation / Venue<br/><input name="pub_venue_$IDX"/></label>\
        <label>Year<br/><input name="pub_year_$IDX"/></label>\
        <button type="button" class="remove-item">Remove</button>\
      </div>\
    `, item);
  }

  function addProject(item) {
    addItem('project-list', `\
      <div class="proj-item" data-idx="$IDX">\
        <label>Title<br/><input name="proj_title_$IDX"/></label>\
        <label>Description<br/><textarea name="proj_desc_$IDX"></textarea></label>\
        <label>Link<br/><input name="proj_link_$IDX"/></label>\
        <button type="button" class="remove-item">Remove</button>\
      </div>\
    `, item);
  }

  function addAward(item) {
    addItem('award-list', `\
      <div class="award-item" data-idx="$IDX">\
        <label>Title<br/><input name="award_title_$IDX"/></label>\
        <label>Issuer / Org<br/><input name="award_org_$IDX"/></label>\
        <label>Year<br/><input name="award_year_$IDX"/></label>\
        <button type="button" class="remove-item">Remove</button>\
      </div>\
    `, item);
  }

  // skills: simple tag input
  function addSkillTag(val) {
    if (!val) return;
    const wrap = document.getElementById('skills-list');
    const chip = document.createElement('span');
    chip.textContent = val;
    chip.style.padding = '4px 8px';
    chip.style.margin = '4px';
    chip.style.display = 'inline-block';
    chip.style.background = '#eee';
    chip.style.borderRadius = '16px';
    chip.style.cursor = 'pointer';
    chip.title = 'Click to remove';
    chip.addEventListener('click', () => chip.remove());
    wrap.appendChild(chip);
  }

  function gatherData() {
    const form = document.getElementById('cv-form');
    const data = {
      name: form.querySelector('[name=name]').value || '',
      headline: form.querySelector('[name=headline]').value || '',
      email: form.querySelector('[name=email]').value || '',
      website: form.querySelector('[name=website]').value || '',
      orcid: form.querySelector('[name=orcid]').value || '',
      summary: form.querySelector('[name=summary]').value || '',
      skills: [],
      education: [],
      experience: [],
      projects: [],
      awards: [],
      publications: [],
      social: {
        linkedin: form.querySelector('[name=linkedin]').value || '',
        github: form.querySelector('[name=github]').value || '',
        twitter: form.querySelector('[name=twitter]').value || ''
      },
      options: {
        template: document.getElementById('template-select').value,
        color: document.getElementById('primary-color').value,
        show: {
          education: document.getElementById('show-education').checked,
          experience: document.getElementById('show-experience').checked,
          projects: document.getElementById('show-projects').checked,
          publications: document.getElementById('show-publications').checked,
          awards: document.getElementById('show-awards').checked,
          skills: document.getElementById('show-skills').checked
        }
      }
    };

    document.querySelectorAll('#skills-list span').forEach(s => data.skills.push(s.textContent));

    document.querySelectorAll('#education-list .edu-item').forEach((node) => {
      const i = node.dataset.idx;
      data.education.push({
        title: node.querySelector(`[name=edu_title_${i}]`).value || '',
        org: node.querySelector(`[name=edu_org_${i}]`).value || '',
        dates: node.querySelector(`[name=edu_dates_${i}]`).value || ''
      });
    });

    document.querySelectorAll('#experience-list .exp-item').forEach((node) => {
      const i = node.dataset.idx;
      data.experience.push({
        title: node.querySelector(`[name=exp_title_${i}]`).value || '',
        org: node.querySelector(`[name=exp_org_${i}]`).value || '',
        dates: node.querySelector(`[name=exp_dates_${i}]`).value || '',
        desc: node.querySelector(`[name=exp_desc_${i}]`).value || ''
      });
    });

    document.querySelectorAll('#project-list .proj-item').forEach((node) => {
      const i = node.dataset.idx;
      data.projects.push({
        title: node.querySelector(`[name=proj_title_${i}]`).value || '',
        desc: node.querySelector(`[name=proj_desc_${i}]`).value || '',
        link: node.querySelector(`[name=proj_link_${i}]`).value || ''
      });
    });

    document.querySelectorAll('#award-list .award-item').forEach((node) => {
      const i = node.dataset.idx;
      data.awards.push({
        title: node.querySelector(`[name=award_title_${i}]`).value || '',
        org: node.querySelector(`[name=award_org_${i}]`).value || '',
        year: node.querySelector(`[name=award_year_${i}]`).value || ''
      });
    });

    document.querySelectorAll('#publication-list .pub-item').forEach((node) => {
      const i = node.dataset.idx;
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
    if (d.headline) md += `**${d.headline}**\n\n`;
    if (d.email) md += `**Email:** ${d.email}\n\n`;
    if (d.website) md += `**Website:** ${d.website}\n\n`;
    if (d.summary) md += `## Summary\n${d.summary}\n\n`;

    if (d.skills && d.skills.length) {
      md += `## Skills\n${d.skills.map(s=>`- ${s}`).join('\n')}\n\n`;
    }

    if (d.education.length && d.options.show.education) {
      md += `## Education\n`;
      d.education.forEach(e => {
        md += `- **${e.title || ''}**, ${e.org || ''} ${e.dates ? `(${e.dates})` : ''}\n`;
      });
      md += `\n`;
    }

    if (d.experience.length && d.options.show.experience) {
      md += `## Experience\n`;
      d.experience.forEach(e => {
        md += `- **${e.title || ''}**, ${e.org || ''} ${e.dates ? `(${e.dates})` : ''}\n`;
        if (e.desc) md += `  - ${e.desc}\n`;
      });
      md += `\n`;
    }

    if (d.projects.length && d.options.show.projects) {
      md += `## Projects\n`;
      d.projects.forEach(p => {
        md += `- **${p.title || ''}** ${p.link?`(${p.link})`:''}\n`;
        if (p.desc) md += `  - ${p.desc}\n`;
      });
      md += `\n`;
    }

    if (d.publications.length && d.options.show.publications) {
      md += `## Publications\n`;
      d.publications.forEach(p => {
        md += `- ${p.title || ''}${p.venue ? ` — ${p.venue}` : ''}${p.year ? ` (${p.year})` : ''}\n`;
      });
      md += `\n`;
    }

    if (d.awards.length && d.options.show.awards) {
      md += `## Awards & Certifications\n`;
      d.awards.forEach(a => {
        md += `- ${a.title || ''}${a.org?`, ${a.org}`:''}${a.year?` (${a.year})`:''}\n`;
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

  function generateLandingHTML(d) {
    const color = d.options.color || '#2b6cb0';
    const template = d.options.template || 'simple';
    const font = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
    const css = `
      body{font-family:${font};margin:0;padding:24px;background:#fff;color:#111}
      .wrap{max-width:900px;margin:0 auto}
      header{display:flex;align-items:center;gap:16px}
      h1{margin:0;color:${color}}
      .headline{color:#444}
      .meta{margin-top:6px;color:#666}
      section{margin-top:22px}
      .skills span{display:inline-block;background:#f3f4f6;padding:6px 10px;margin:4px;border-radius:14px}
      a{color:${color}}
    `;

    const socialHtml = [];
    if (d.social.linkedin) socialHtml.push(`<a href="${escapeHtml(d.social.linkedin)}">LinkedIn</a>`);
    if (d.social.github) socialHtml.push(`<a href="${escapeHtml(d.social.github)}">GitHub</a>`);
    if (d.social.twitter) socialHtml.push(`<a href="${escapeHtml(d.social.twitter)}">X</a>`);

    const educationHtml = (d.options.show.education && d.education.length) ? `\n      <section><h2>Education</h2><ul>${d.education.map(e=>`<li><strong>${escapeHtml(e.title)}</strong>, ${escapeHtml(e.org)} ${e.dates?`(${escapeHtml(e.dates)})`:''}</li>`).join('')}</ul></section>` : '';

    const experienceHtml = (d.options.show.experience && d.experience.length) ? `\n      <section><h2>Experience</h2>${d.experience.map(e=>`<div><strong>${escapeHtml(e.title)}</strong>, ${escapeHtml(e.org)} ${e.dates?`(${escapeHtml(e.dates)})`:''}<div>${escapeHtml(e.desc).replace(/\n/g,'<br/>')}</div></div>`).join('')}</section>` : '';

    const projectsHtml = (d.options.show.projects && d.projects.length) ? `\n      <section><h2>Projects</h2>${d.projects.map(p=>`<div><strong>${escapeHtml(p.title)}</strong>${p.link?` — <a href="${escapeHtml(p.link)}">${escapeHtml(p.link)}</a>`:''}<div>${escapeHtml(p.desc).replace(/\n/g,'<br/>')}</div></div>`).join('')}</section>` : '';

    const publicationsHtml = (d.options.show.publications && d.publications.length) ? `\n      <section><h2>Publications</h2><ul>${d.publications.map(p=>`<li>${escapeHtml(p.title)}${p.venue?` — ${escapeHtml(p.venue)}`:''}${p.year?` (${escapeHtml(p.year)})`:''}</li>`).join('')}</ul></section>` : '';

    const awardsHtml = (d.options.show.awards && d.awards.length) ? `\n      <section><h2>Awards & Certifications</h2><ul>${d.awards.map(a=>`<li>${escapeHtml(a.title)}${a.org?`, ${escapeHtml(a.org)}`:''}${a.year?` (${escapeHtml(a.year)})`:''}</li>`).join('')}</ul></section>` : '';

    const skillsHtml = (d.options.show.skills && d.skills.length) ? `\n      <section class="skills"><h2>Skills</h2><div>${d.skills.map(s=>`<span>${escapeHtml(s)}</span>`).join('')}</div></section>` : '';

    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(d.name)}</title><style>${css}</style></head><body><div class="wrap"><header><div><h1>${escapeHtml(d.name)}</h1><div class="headline">${escapeHtml(d.headline||'')}</div><div class="meta">${d.email?`<span>Email: <a href=\"mailto:${escapeHtml(d.email)}\">${escapeHtml(d.email)}</a></span>`:''}${d.website?` • <a href=\"${escapeHtml(d.website)}\">Website</a>`:''}${d.orcid?` • ${escapeHtml(d.orcid)}`:''}${socialHtml.length?` • ${socialHtml.join(' • ')}`:''}</div></div></header>${d.summary?`<section><h2>About</h2><div>${escapeHtml(d.summary).replace(/\n/g,'<br/>')}</div></section>`:''}${skillsHtml}${educationHtml}${experienceHtml}${projectsHtml}${publicationsHtml}${awardsHtml}<footer style="margin-top:28px;color:#888;font-size:0.9em">Generated with Ckrit CV Maker</footer></div></body></html>`;
    return html;
  }

  function escapeHtml(s){
    if(!s) return '';
    return String(s).replace(/[&<>\\"]/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
  }

  function preview(data) {
    const frame = document.getElementById('preview-frame');
    const html = generateLandingHTML(data);
    frame.srcdoc = html;
  }

  function saveDraft(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert('Draft saved locally');
  }

  function loadDraft() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { alert('No draft found'); return null; }
    try { return JSON.parse(raw); } catch(e){ alert('Failed to load draft'); return null; }
  }

  function populateFormFromData(d) {
    const form = document.getElementById('cv-form');
    if (!d) return;
    form.querySelector('[name=name]').value = d.name || '';
    form.querySelector('[name=headline]').value = d.headline || '';
    form.querySelector('[name=email]').value = d.email || '';
    form.querySelector('[name=website]').value = d.website || '';
    form.querySelector('[name=orcid]').value = d.orcid || '';
    form.querySelector('[name=summary]').value = d.summary || '';
    document.getElementById('template-select').value = d.options?.template || 'simple';
    document.getElementById('primary-color').value = d.options?.color || '#2b6cb0';
    if (d.skills) { document.getElementById('skills-list').innerHTML = ''; d.skills.forEach(addSkillTag); }
    // clear lists then repopulate
    ['education-list','experience-list','project-list','award-list','publication-list'].forEach(id => document.getElementById(id).innerHTML='');
    (d.education||[]).forEach(addEducation);
    (d.experience||[]).forEach(addExperience);
    (d.projects||[]).forEach(addProject);
    (d.awards||[]).forEach(addAward);
    (d.publications||[]).forEach(addPublication);
    form.querySelector('[name=linkedin]').value = d.social?.linkedin || '';
    form.querySelector('[name=github]').value = d.social?.github || '';
    form.querySelector('[name=twitter]').value = d.social?.twitter || '';
  }

  // init
  document.addEventListener('DOMContentLoaded', function () {
    // seed
    addEducation();
    addExperience();
    addProject();
    addPublication();
    addAward();

    document.getElementById('add-education').addEventListener('click', () => addEducation());
    document.getElementById('add-experience').addEventListener('click', () => addExperience());
    document.getElementById('add-publication').addEventListener('click', () => addPublication());
    document.getElementById('add-project').addEventListener('click', () => addProject());
    document.getElementById('add-award').addEventListener('click', () => addAward());

    document.getElementById('skill-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); const v = this.value.trim(); if (v) addSkillTag(v); this.value=''; }
    });

    document.getElementById('preview-btn').addEventListener('click', function (){ const data = gatherData(); preview(data); });

    document.getElementById('download-md').addEventListener('click', function(){ const data = gatherData(); const md = generateMarkdown(data); download(`${(data.name||'cv').replace(/\s+/g,'_')}.md`, md, 'text/markdown'); });
    document.getElementById('download-json').addEventListener('click', function(){ const data = gatherData(); download(`${(data.name||'cv').replace(/\s+/g,'_')}.json`, JSON.stringify(data, null, 2), 'application/json'); });

    document.getElementById('download-html').addEventListener('click', function(){ const data = gatherData(); const html = generateLandingHTML(data); download(`${(data.name||'cv').replace(/\s+/g,'_')}_index.html`, html, 'text/html'); });

    document.getElementById('save-draft').addEventListener('click', function(){ const data = gatherData(); saveDraft(data); });
    document.getElementById('load-draft').addEventListener('click', function(){ const d = loadDraft(); if (d) populateFormFromData(d); });
    document.getElementById('clear-draft').addEventListener('click', function(){ localStorage.removeItem(STORAGE_KEY); alert('Draft cleared'); });

    // attempt auto-load draft silently
    const draft = loadDraft(); if (draft) { if (confirm('Load saved draft?')) populateFormFromData(draft); }
  });
})();

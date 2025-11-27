// Ckrit CV Maker — compacted and DB-ready
(function(win){
const STORAGE_KEY='ckrit_cv_draft_v1';
const API_NAMESPACE='CkritCV';
function _el(h){const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
function _addItem(listId,html,vals){const list=document.getElementById(listId);if(!list)return;const idx=list.children.length;const node=_el(html.replace(/\$IDX/g,idx));const r=node.querySelector('.remove-item');if(r)r.addEventListener('click',()=>node.remove());if(vals)Object.keys(vals).forEach(k=>{const sel=`[name=${k.replace(/\s/g,'_')}_$${'IDX'}]`.replace('_$IDX',`_${idx}`);const input=node.querySelector(sel);if(input)input.value=vals[k];});list.appendChild(node)}
function addEducation(it){_addItem('education-list',`<div class="edu-item" data-idx="$IDX"><label>Degree / Title<br/><input name="edu_title_$IDX"/></label><label>Institution<br/><input name="edu_org_$IDX"/></label><label>Dates<br/><input name="edu_dates_$IDX"/></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addExperience(it){_addItem('experience-list',`<div class="exp-item" data-idx="$IDX"><label>Role / Title<br/><input name="exp_title_$IDX"/></label><label>Organization<br/><input name="exp_org_$IDX"/></label><label>Dates<br/><input name="exp_dates_$IDX"/></label><label>Description<br/><textarea name="exp_desc_$IDX"></textarea></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addPublication(it){_addItem('publication-list',`<div class="pub-item" data-idx="$IDX"><label>Title<br/><input name="pub_title_$IDX"/></label><label>Citation / Venue<br/><input name="pub_venue_$IDX"/></label><label>Year<br/><input name="pub_year_$IDX"/></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addProject(it){_addItem('project-list',`<div class="proj-item" data-idx="$IDX"><label>Title<br/><input name="proj_title_$IDX"/></label><label>Description<br/><textarea name="proj_desc_$IDX"></textarea></label><label>Link<br/><input name="proj_link_$IDX"/></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addAward(it){_addItem('award-list',`<div class="award-item" data-idx="$IDX"><label>Title<br/><input name="award_title_$IDX"/></label><label>Issuer / Org<br/><input name="award_org_$IDX"/></label><label>Year<br/><input name="award_year_$IDX"/></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addCertification(it){_addItem('certification-list',`<div class="cert-item" data-idx="$IDX"><label>Certification<br/><input name="cert_title_$IDX"/></label><label>Issuer<br/><input name="cert_org_$IDX"/></label><label>Year<br/><input name="cert_year_$IDX"/></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addLanguage(it){_addItem('language-list',`<div class="lang-item" data-idx="$IDX"><label>Language<br/><input name="lang_name_$IDX"/></label><label>Proficiency<br/><input name="lang_prof_$IDX"/></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addReference(it){_addItem('reference-list',`<div class="ref-item" data-idx="$IDX"><label>Name<br/><input name="ref_name_$IDX"/></label><label>Relation<br/><input name="ref_rel_$IDX"/></label><label>Contact<br/><input name="ref_contact_$IDX"/></label><button type="button" class="remove-item">Remove</button></div>`,it)}
function addSkillTag(v){if(!v) return;const w=document.getElementById('skills-list');if(!w) return;const s=document.createElement('span');s.textContent=v;s.className='skill-chip';s.addEventListener('click',()=>s.remove());w.appendChild(s)}
function gatherData(){const f=document.getElementById('cv-form');if(!f) return {};const d={name:f.querySelector('[name=name]')?.value||'',headline:f.querySelector('[name=headline]')?.value||'',email:f.querySelector('[name=email]')?.value||'',phone:f.querySelector('[name=phone]')?.value||'',location:f.querySelector('[name=location]')?.value||'',website:f.querySelector('[name=website]')?.value||'',orcid:f.querySelector('[name=orcid]')?.value||'',summary:f.querySelector('[name=summary]')?.value||'',skills:[],education:[],experience:[],projects:[],awards:[],publications:[],certifications:[],languages:[],references:[],social:{linkedin:f.querySelector('[name=linkedin]')?.value||'',github:f.querySelector('[name=github]')?.value||'',twitter:f.querySelector('[name=twitter]')?.value||''},options:{template:document.getElementById('template-select')?document.getElementById('template-select').value:'simple',color:document.getElementById('primary-color')?document.getElementById('primary-color').value:'#2b6cb0',show:{education:!!document.getElementById('show-education'),experience:!!document.getElementById('show-experience'),projects:!!document.getElementById('show-projects'),publications:!!document.getElementById('show-publications'),awards:!!document.getElementById('show-awards'),skills:!!document.getElementById('show-skills')}}};document.querySelectorAll('#skills-list span, #skills-list .skill-chip').forEach(s=>d.skills.push(s.textContent));document.querySelectorAll('#education-list .edu-item').forEach(n=>{const i=n.dataset.idx;d.education.push({title:n.querySelector(`[name=edu_title_${i}]`)?.value||'',org:n.querySelector(`[name=edu_org_${i}]`)?.value||'',dates:n.querySelector(`[name=edu_dates_${i}]`)?.value||''})});document.querySelectorAll('#experience-list .exp-item').forEach(n=>{const i=n.dataset.idx;d.experience.push({title:n.querySelector(`[name=exp_title_${i}]`)?.value||'',org:n.querySelector(`[name=exp_org_${i}]`)?.value||'',dates:n.querySelector(`[name=exp_dates_${i}]`)?.value||'',desc:n.querySelector(`[name=exp_desc_${i}]`)?.value||''})});document.querySelectorAll('#project-list .proj-item').forEach(n=>{const i=n.dataset.idx;d.projects.push({title:n.querySelector(`[name=proj_title_${i}]`)?.value||'',desc:n.querySelector(`[name=proj_desc_${i}]`)?.value||'',link:n.querySelector(`[name=proj_link_${i}]`)?.value||''})});document.querySelectorAll('#award-list .award-item').forEach(n=>{const i=n.dataset.idx;d.awards.push({title:n.querySelector(`[name=award_title_${i}]`)?.value||'',org:n.querySelector(`[name=award_org_${i}]`)?.value||'',year:n.querySelector(`[name=award_year_${i}]`)?.value||''})});document.querySelectorAll('#publication-list .pub-item').forEach(n=>{const i=n.dataset.idx;d.publications.push({title:n.querySelector(`[name=pub_title_${i}]`)?.value||'',venue:n.querySelector(`[name=pub_venue_${i}]`)?.value||'',year:n.querySelector(`[name=pub_year_${i}]`)?.value||''})});document.querySelectorAll('#certification-list .cert-item').forEach(n=>{const i=n.dataset.idx;d.certifications.push({title:n.querySelector(`[name=cert_title_${i}]`)?.value||'',org:n.querySelector(`[name=cert_org_${i}]`)?.value||'',year:n.querySelector(`[name=cert_year_${i}]`)?.value||''})});document.querySelectorAll('#language-list .lang-item').forEach(n=>{const i=n.dataset.idx;d.languages.push({language:n.querySelector(`[name=lang_name_${i}]`)?.value||'',proficiency:n.querySelector(`[name=lang_prof_${i}]`)?.value||''})});document.querySelectorAll('#reference-list .ref-item').forEach(n=>{const i=n.dataset.idx;d.references.push({name:n.querySelector(`[name=ref_name_${i}]`)?.value||'',relation:n.querySelector(`[name=ref_rel_${i}]`)?.value||'',contact:n.querySelector(`[name=ref_contact_${i}]`)?.value||''})});return d}
function generateMarkdown(d){let md=`# ${d.name}\n\n`;if(d.headline)md+=`**${d.headline}**\n\n`;if(d.email)md+=`**Email:** ${d.email}\n\n`;if(d.phone)md+=`**Phone:** ${d.phone}\n\n`;if(d.website)md+=`**Website:** ${d.website}\n\n`;if(d.summary)md+=`## Summary\n${d.summary}\n\n`;if(d.skills&&d.skills.length)md+=`## Skills\n${d.skills.map(s=>`- ${s}`).join('\n')}\n\n`;if(d.education.length&&d.options.show.education){md+=`## Education\n`;d.education.forEach(e=>{md+=`- **${e.title||''}**, ${e.org||''} ${e.dates?`(${e.dates})`:''}\n`});md+=`\n`}if(d.experience.length&&d.options.show.experience){md+=`## Experience\n`;d.experience.forEach(e=>{md+=`- **${e.title||''}**, ${e.org||''} ${e.dates?`(${e.dates})`:''}\n`;if(e.desc)md+=`  - ${e.desc}\n`});md+=`\n`}if(d.projects.length&&d.options.show.projects){md+=`## Projects\n`;d.projects.forEach(p=>{md+=`- **${p.title||''}** ${p.link?`(${p.link})`:''}\n`;if(p.desc)md+=`  - ${p.desc}\n`});md+=`\n`}if(d.publications.length&&d.options.show.publications){md+=`## Publications\n`;d.publications.forEach(p=>{md+=`- ${p.title||''}${p.venue?` — ${p.venue}`:''}${p.year?` (${p.year})`:''}\n`});md+=`\n`}if(d.awards.length&&d.options.show.awards){md+=`## Awards & Certifications\n`;d.awards.forEach(a=>{md+=`- ${a.title||''}${a.org?`, ${a.org}`:''}${a.year?` (${a.year})`:''}\n`});md+=`\n`}if(d.certifications&&d.certifications.length){md+=`## Certifications\n`;d.certifications.forEach(c=>{md+=`- ${c.title||''}${c.org?`, ${c.org}`:''}${c.year?` (${c.year})`:''}\n`});md+=`\n`}if(d.languages&&d.languages.length){md+=`## Languages\n`;d.languages.forEach(l=>{md+=`- ${l.language||''}${l.proficiency?` — ${l.proficiency}`:''}\n`});md+=`\n`}md+=`\n---\nGenerated with Ckrit CV Builder by Jabulani Mdluli`;return md}
function download(fn,content,m){const b=new Blob([content],{type:m});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=fn;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u)}
function escapeHtml(s){if(!s) return '';return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function generateLandingHTML(d){const csp="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self'";const color=d.options.color||'#2b6cb0';const template=d.options.template||'simple';const font='system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';let css,structure;try{const contrast=(template==='modern'||template==='classic'||template==='minimal')?lightenColor(color,20):color;css=(template==='modern'&&typeof generateModernCSS==='function')?generateModernCSS(color,font,contrast):(template==='classic'&&typeof generateClassicCSS==='function')?generateClassicCSS(color,font,contrast):(template==='minimal'&&typeof generateMinimalCSS==='function')?generateMinimalCSS(color,font,contrast):generateSimpleCSS(color,font);structure=(template==='modern')?buildModernStructure(d,color):(template==='classic')?buildClassicStructure(d,color):(template==='minimal')?buildMinimalStructure(d,color):buildSimpleStructure(d,color)}catch(e){css=generateSimpleCSS(color,font);structure=buildSimpleStructure(d,color)}return`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${csp}"><title>${escapeHtml(d.name)}</title><style>${css}</style></head><body>${structure}</body></html>`}
function buildSimpleStructure(d){const social=[];if(d.social?.linkedin)social.push(`<a href="${escapeHtml(d.social.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);if(d.social?.github)social.push(`<a href="${escapeHtml(d.social.github)}" target="_blank" rel="noopener">GitHub</a>`);if(d.social?.twitter)social.push(`<a href="${escapeHtml(d.social.twitter)}" target="_blank" rel="noopener">X</a>`);const edu=(d.options.show.education&&d.education.length)?`<section><h2>Education</h2><ul>${d.education.map(e=>`<li><strong>${escapeHtml(e.title)}</strong>, ${escapeHtml(e.org)} ${e.dates?`(${escapeHtml(e.dates)})`:''}</li>`).join('')}</ul></section>`:'';const exp=(d.options.show.experience&&d.experience.length)?`<section><h2>Experience</h2>${d.experience.map(e=>`<div><strong>${escapeHtml(e.title)}</strong>, ${escapeHtml(e.org)} ${e.dates?`(${escapeHtml(e.dates)})`:''}<p>${escapeHtml(e.desc).replace(/\n/g,'<br/>')}</p></div>`).join('')}</section>`:'';const proj=(d.options.show.projects&&d.projects.length)?`<section><h2>Projects</h2>${d.projects.map(p=>`<div><strong>${escapeHtml(p.title)}</strong>${p.link?` — <a href="${escapeHtml(p.link)}" target="_blank">${escapeHtml(p.link)}</a>`:''}<p>${escapeHtml(p.desc).replace(/\n/g,'<br/>')}</p></div>`).join('')}</section>`:'';const pubs=(d.options.show.publications&&d.publications.length)?`<section><h2>Publications</h2><ul>${d.publications.map(p=>`<li>${escapeHtml(p.title)}${p.venue?` — ${escapeHtml(p.venue)}`:''}${p.year?` (${escapeHtml(p.year)})`:''}</li>`).join('')}</ul></section>`:'';const awards=(d.options.show.awards&&d.awards.length)?`<section><h2>Awards & Certifications</h2><ul>${d.awards.map(a=>`<li>${escapeHtml(a.title)}${a.org?`, ${escapeHtml(a.org)}`:''}${a.year?` (${escapeHtml(a.year)})`:''}</li>`).join('')}</ul></section>`:'';const skills=(d.options.show.skills&&d.skills.length)?`<section><h2>Skills</h2><div class="skills">${d.skills.map(s=>`<span>${escapeHtml(s)}</span>`).join('')}</div></section>`:'';return`<div class="wrap"><header><div><h1>${escapeHtml(d.name)}</h1><div class="headline">${escapeHtml(d.headline||'')}</div><div class="meta">${d.email?`<a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>`:''} ${d.website?`<a href="${escapeHtml(d.website)}" target="_blank">Website</a>`:''} ${social.join(' ')} ${d.orcid?`${escapeHtml(d.orcid)}`:''}</div></div></header>${d.summary?`<section><p>${escapeHtml(d.summary).replace(/\n/g,'<br/>')}</p></section>`:''}${skills}${edu}${exp}${proj}${pubs}${awards}<footer>Generated with Ckrit CV Builder</footer></div>`}
function buildModernStructure(d,color){return buildSimpleStructure(d)}
function buildClassicStructure(d,color){return buildSimpleStructure(d)}
function buildMinimalStructure(d,color){return buildSimpleStructure(d)}
function generateVCard(d){const l=[];l.push('BEGIN:VCARD');l.push('VERSION:3.0');l.push(`FN:${d.name||''}`);if(d.headline)l.push(`TITLE:${d.headline}`);if(d.email)l.push(`EMAIL;TYPE=INTERNET:${d.email}`);if(d.website)l.push(`URL:${d.website}`);if(d.summary)l.push(`NOTE:${d.summary.replace(/\n/g,'\\n')}`);l.push('END:VCARD');return l.join('\r\n')}
async function getKeyFromPassword(p,salt){const e=new TextEncoder();const passKey=await crypto.subtle.importKey('raw',e.encode(p),{name:'PBKDF2'},false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:250000,hash:'SHA-256'},passKey,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
function concatBuffers(...bs){let l=bs.reduce((a,b)=>a+b.byteLength,0);const t=new Uint8Array(l);let o=0;bs.forEach(b=>{t.set(new Uint8Array(b),o);o+=b.byteLength});return t.buffer}
function toBase64(b){return btoa(String.fromCharCode(...new Uint8Array(b)))}
function fromBase64(s){const bin=atob(s);const n=bin.length;const u=new Uint8Array(n);for(let i=0;i<n;i++)u[i]=bin.charCodeAt(i);return u.buffer}
async function encryptJsonWithPassword(obj,pass){const salt=crypto.getRandomValues(new Uint8Array(16));const iv=crypto.getRandomValues(new Uint8Array(12));const key=await getKeyFromPassword(pass,salt);const enc=new TextEncoder();const data=enc.encode(JSON.stringify(obj));const ct=await crypto.subtle.encrypt({name:'AES-GCM',iv:iv},key,data);return toBase64(concatBuffers(salt.buffer,iv.buffer,ct))}
async function decryptJsonWithPassword(b64,pass){try{const combined=fromBase64(b64);const v=new Uint8Array(combined);const salt=v.slice(0,16).buffer;const iv=v.slice(16,28).buffer;const ct=v.slice(28).buffer;const key=await getKeyFromPassword(pass,salt);const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:iv},key,ct);return JSON.parse(new TextDecoder().decode(pt))}catch(e){throw new Error('Decryption failed')}}
function saveDraft(d){localStorage.setItem(STORAGE_KEY,JSON.stringify(d));alert('Draft saved locally')}
function loadDraft(){const r=localStorage.getItem(STORAGE_KEY);if(!r){return null}try{return JSON.parse(r)}catch(e){return null}}
function populateFormFromData(d){const f=document.getElementById('cv-form');if(!f||!d) return;f.querySelector('[name=name]')&&(f.querySelector('[name=name]').value=d.name||'');f.querySelector('[name=headline]')&&(f.querySelector('[name=headline]').value=d.headline||'');f.querySelector('[name=email]')&&(f.querySelector('[name=email]').value=d.email||'');f.querySelector('[name=phone]')&&(f.querySelector('[name=phone]').value=d.phone||'');f.querySelector('[name=location]')&&(f.querySelector('[name=location]').value=d.location||'');f.querySelector('[name=website]')&&(f.querySelector('[name=website]').value=d.website||'');f.querySelector('[name=orcid]')&&(f.querySelector('[name=orcid]').value=d.orcid||'');f.querySelector('[name=summary]')&&(f.querySelector('[name=summary]').value=d.summary||'');document.getElementById('template-select')&&(document.getElementById('template-select').value=d.options?.template||'simple');document.getElementById('primary-color')&&(document.getElementById('primary-color').value=d.options?.color||'#2b6cb0');if(d.skills){document.getElementById('skills-list')&&(document.getElementById('skills-list').innerHTML='');d.skills.forEach(addSkillTag)}['education-list','experience-list','project-list','award-list','publication-list','certification-list','language-list','reference-list'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=''});(d.education||[]).forEach(addEducation);(d.experience||[]).forEach(addExperience);(d.projects||[]).forEach(addProject);(d.awards||[]).forEach(addAward);(d.publications||[]).forEach(addPublication);(d.certifications||[]).forEach(addCertification);(d.languages||[]).forEach(addLanguage);(d.references||[]).forEach(addReference);const s=d.social||{};f.querySelector('[name=linkedin]')&&(f.querySelector('[name=linkedin]').value=s.linkedin||'');f.querySelector('[name=github]')&&(f.querySelector('[name=github]').value=s.github||'');f.querySelector('[name=twitter]')&&(f.querySelector('[name=twitter]').value=s.twitter||'')}
// Remote adapter interface and registry
const Adapters={};
function registerAdapter(name,adapter){Adapters[name]=adapter}
async function saveToRemote(adapterName,data,opts){const a=Adapters[adapterName];if(!a)throw new Error('Adapter not found');if(typeof a.save!=='function')throw new Error('Adapter.save missing');return a.save(data,opts)}
async function loadFromRemote(adapterName,id,opts){const a=Adapters[adapterName];if(!a)throw new Error('Adapter not found');if(typeof a.load!=='function')throw new Error('Adapter.load missing');return a.load(id,opts)}
// Register a simple REST adapter skeleton
registerAdapter('rest',{save:async(d,opts={url:'/api/save-cv'})=>{const res=await fetch(opts.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!res.ok)throw new Error('Save failed');return res.json()}});
// Firestore adapter skeleton (requires Firebase SDK initialization in the page)
registerAdapter('firestore',{
  save:async(d,opts={collection:'cv'})=>{
    if(!window.firebase||!window.firebase.firestore) throw new Error('Firebase not initialized. Include Firebase SDK and initialize app.');
    const db = firebase.firestore();
    const col = db.collection(opts.collection);
    const docRef = await col.add(Object.assign({createdAt: firebase.firestore.FieldValue.serverTimestamp()}, d));
    return {id: docRef.id};
  },
  load:async(id,opts={collection:'cv'})=>{
    if(!window.firebase||!window.firebase.firestore) throw new Error('Firebase not initialized.');
    const db = firebase.firestore();
    const doc = await db.collection(opts.collection).doc(id).get();
    if(!doc.exists) throw new Error('Document not found');
    return doc.data();
  }
});
// Expose API to window for integration and testing
win[API_NAMESPACE]=win[API_NAMESPACE]||{};Object.assign(win[API_NAMESPACE],{gatherData,populateFormFromData,saveDraft,loadDraft,encryptJsonWithPassword,decryptJsonWithPassword,saveToRemote,loadFromRemote,registerAdapter,addEducation,addExperience,addProject,addPublication,addAward,addCertification,addLanguage,addReference,addSkillTag,generateLandingHTML,generateMarkdown,generateVCard});
// Init UI wiring
document.addEventListener('DOMContentLoaded',()=>{
try{addEducation();addExperience();addProject();addPublication();addAward();addCertification();addLanguage();addReference();document.getElementById('add-education')?.addEventListener('click',()=>addEducation());document.getElementById('add-experience')?.addEventListener('click',()=>addExperience());document.getElementById('add-publication')?.addEventListener('click',()=>addPublication());document.getElementById('add-project')?.addEventListener('click',()=>addProject());document.getElementById('add-award')?.addEventListener('click',()=>addAward());document.getElementById('add-certification')?.addEventListener('click',()=>addCertification());document.getElementById('add-language')?.addEventListener('click',()=>addLanguage());document.getElementById('add-reference')?.addEventListener('click',()=>addReference());const skillInput=document.getElementById('skill-input');skillInput&&skillInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();const v=this.value.trim();if(v)addSkillTag(v);this.value=''}});document.getElementById('preview-btn')?.addEventListener('click',()=>{const data=gatherData();document.getElementById('preview-frame')&&(document.getElementById('preview-frame').srcdoc=generateLandingHTML(data))});document.getElementById('download-md')?.addEventListener('click',()=>{const d=gatherData();download(`${(d.name||'cv').replace(/\s+/g,'_')}.md`,generateMarkdown(d),'text/markdown')});document.getElementById('download-json')?.addEventListener('click',()=>{const d=gatherData();download(`${(d.name||'cv').replace(/\s+/g,'_')}.json`,JSON.stringify(d,null,2),'application/json')});document.getElementById('download-vcard')?.addEventListener('click',()=>{const d=gatherData();download(`${(d.name||'cv').replace(/\s+/g,'_')}.vcf`,generateVCard(d),'text/vcard')});document.getElementById('download-html')?.addEventListener('click',()=>{const d=gatherData();download(`${(d.name||'cv').replace(/\s+/g,'_')}_index.html`,generateLandingHTML(d),'text/html')});document.getElementById('share-cv')?.addEventListener('click',async()=>{const d=gatherData();const html=generateLandingHTML(d);const v=generateVCard(d);try{if(navigator.canShare&&navigator.canShare({files:[new File([html],'index.html',{type:'text/html'})]})){await navigator.share({files:[new File([html],'index.html',{type:'text/html'})],title:d.name||'CV',text:d.headline||''});return}if(navigator.share){await navigator.share({title:d.name||'CV',text:v});return}if(navigator.clipboard){await navigator.clipboard.writeText(html);alert('Landing HTML copied to clipboard');return}alert('Share not available')}catch(e){console.error(e);alert('Sharing failed')}});document.getElementById('save-draft')?.addEventListener('click',()=>saveDraft(gatherData()));document.getElementById('load-draft')?.addEventListener('click',()=>{const dd=loadDraft();if(dd)populateFormFromData(dd)});document.getElementById('clear-draft')?.addEventListener('click',()=>{localStorage.removeItem(STORAGE_KEY);alert('Draft cleared')});document.getElementById('save-draft-encrypted')?.addEventListener('click',async()=>{const pass=document.getElementById('draft-passphrase')?.value; if(!pass){alert('Enter passphrase');return}const d=gatherData();try{const b64=await encryptJsonWithPassword(d,pass);localStorage.setItem(STORAGE_KEY+'_enc',b64);alert('Encrypted draft saved')}catch(e){console.error(e);alert('Failed to encrypt')}});document.getElementById('load-draft-encrypted')?.addEventListener('click',async()=>{const b64=localStorage.getItem(STORAGE_KEY+'_enc');if(!b64){alert('No encrypted draft');return}const pass=document.getElementById('draft-passphrase')?.value;if(!pass){alert('Enter passphrase');return}try{const dd=await decryptJsonWithPassword(b64,pass);populateFormFromData(dd);alert('Encrypted draft loaded')}catch(e){console.error(e);alert('Failed to decrypt')}});const draft=loadDraft();if(draft&&confirm('Load saved draft?'))populateFormFromData(draft);const introName=document.getElementById('intro-name'),introHeadline=document.getElementById('intro-headline'),introEmail=document.getElementById('intro-email'),introDataDisplay=document.getElementById('intro-data-display');function upd(){let s='Collected data:\n\n';if(introName?.value) s+=`Name: ${introName.value}\n`; if(introHeadline?.value) s+=`Headline: ${introHeadline.value}\n`; if(introEmail?.value) s+=`Email: ${introEmail.value}\n`; if(!introName?.value&&!introHeadline?.value&&!introEmail?.value) s='Data will appear here as you type...';introDataDisplay&&(introDataDisplay.textContent=s)}introName?.addEventListener('input',upd);introHeadline?.addEventListener('input',upd);introEmail?.addEventListener('input',upd);document.getElementById('intro-continue')?.addEventListener('click',()=>{if(!introName?.value.trim()){alert('Enter full name');return}const f=document.getElementById('cv-form');f.querySelector('[name=name]')&&(f.querySelector('[name=name]').value=introName.value);f.querySelector('[name=headline]')&&(f.querySelector('[name=headline]').value=introHeadline.value);f.querySelector('[name=email]')&&(f.querySelector('[name=email]').value=introEmail.value);document.getElementById('intro-screen')&&(document.getElementById('intro-screen').style.display='none');document.getElementById('editor-screen')&&(document.getElementById('editor-screen').style.display='block');window.scrollTo(0,0)});document.getElementById('back-to-intro')?.addEventListener('click',()=>{document.getElementById('editor-screen')&&(document.getElementById('editor-screen').style.display='none');document.getElementById('intro-screen')&&(document.getElementById('intro-screen').style.display='block');window.scrollTo(0,0)})}catch(e){console.error('Init failed',e)}})
function lightenColor(color,percent){const num=parseInt(color.replace('#',''),16);const amt=Math.round(2.55*percent);const R=Math.min(255,(num>>16)+amt);const G=Math.min(255,((num>>8)&0x00FF)+amt);const B=Math.min(255,(num&0x0000FF)+amt);return '#'+(0x1000000+R*0x10000+G*0x100+B).toString(16).slice(1)}
function generateSimpleCSS(color, font) {
  return `
    body{font-family:${font};margin:0;padding:24px;background:#fff;color:#111;line-height:1.6}
    .wrap{max-width:900px;margin:0 auto;padding:12px}
    header{display:flex;align-items:center;gap:16px;flex-wrap:wrap;border-bottom:2px solid ${color};padding-bottom:16px}
    header > div{flex:1}
    h1{margin:0;color:${color};font-size:1.8rem;font-weight:700}
    h2{color:${color};margin-top:20px;margin-bottom:12px}
    .headline{color:#555;font-size:1.1rem;margin-top:6px}
    .meta{margin-top:8px;color:#666;font-size:0.95rem}
    section{margin-top:24px}
    ul,ol{margin:8px 0;padding-left:24px}
    li{margin:6px 0}
    .skills span{display:inline-block;background:${color}15;color:${color};padding:6px 12px;margin:4px;border-radius:20px;font-size:0.9rem}
    a{color:${color};text-decoration:none}
    a:hover{text-decoration:underline}
    footer{margin-top:32px;padding-top:16px;border-top:1px solid #ddd;color:#888;font-size:0.9rem}
    @media (max-width:600px){
      body{padding:16px}
      .wrap{padding:8px}
      header{align-items:flex-start}
      h1{font-size:1.4rem}
      .headline{font-size:1rem}
    }
  `;
}

function generateModernCSS(color, font, contrastColor) {
  return `
    body{font-family:${font};margin:0;padding:0;background:#f5f5f5;color:#222;line-height:1.7}
    .wrap{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:280px 1fr;gap:0}
    aside{background:${color};color:#fff;padding:32px 24px;min-height:100vh;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
    aside h2{font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;margin-top:28px;margin-bottom:14px;opacity:0.95;font-weight:600}
    aside a{color:#fff;text-decoration:none}
    aside a:hover{opacity:0.8}
    main{background:#fff;padding:48px;overflow:auto}
    header{margin-bottom:36px}
    h1{margin:0;color:${color};font-size:2.4rem;font-weight:700}
    h2{color:${color};font-size:1.5rem;border-bottom:3px solid ${color};padding-bottom:12px;margin-top:32px;margin-bottom:16px}
    .entry{margin:14px 0;padding-bottom:12px}
    .entry-header{display:flex;justify-content:space-between;margin-bottom:4px}
    .entry-title{font-weight:600;color:#111}
    .entry-date{font-style:italic;color:#888}
    .entry-org{color:#555;font-size:0.95rem;margin:4px 0}
    .entry-desc{color:#666;margin:8px 0;font-size:0.95rem}
    .skills span{display:inline-block;background:${color}20;color:${color};padding:8px 14px;margin:5px;border-radius:6px;font-size:0.9rem}
    a{color:${color}}
    footer{margin-top:48px;padding-top:24px;border-top:1px solid #e0e0e0;color:#999;font-size:0.85rem}
    @media (max-width:900px){
      .wrap{grid-template-columns:1fr}
      aside{min-height:auto;padding:28px;grid-column:1}
      main{padding:32px;grid-column:1}
      .entry-header{flex-direction:column}
      .entry-date{margin-top:4px}
    }
  `;
}

function generateClassicCSS(color, font, contrastColor) {
  return `
    body{font-family:${font};margin:0;padding:20px;background:#fff;color:#000;line-height:1.5;font-size:11pt}
    .wrap{max-width:850px;margin:0 auto}
    h1{text-align:center;font-size:20pt;margin:0 0 2pt 0;font-weight:bold}
    h2{font-size:11pt;text-transform:uppercase;border-top:1.5pt solid #000;border-bottom:0.5pt solid #000;padding:6px 0;margin-top:16pt;margin-bottom:6pt}
    .subheader{text-align:center;margin-bottom:18px;border-bottom:2pt solid #000;padding-bottom:10px}
    .headline{font-weight:bold;margin-bottom:4pt}
    .meta{margin-top:4pt;font-size:10pt}
    .entry{margin:8pt 0;page-break-inside:avoid}
    .entry-header{display:flex;justify-content:space-between;margin-bottom:2pt}
    .entry-title{font-weight:bold}
    .entry-date{font-style:italic}
    .entry-org{margin:2pt 0;font-weight:normal}
    .entry-desc{margin:4pt 0;font-size:10pt}
    .skills span{display:inline-block;border:1pt solid #000;padding:4px 8px;margin:2px;font-size:10pt}
    a{color:#0000EE;text-decoration:underline}
    ul,ol{margin:6pt 0;padding-left:20pt}
    li{margin:4pt 0}
    footer{margin-top:32pt;padding-top:12pt;border-top:1pt solid #000;color:#333;font-size:9pt;text-align:center}
    @media print{
      body{padding:0;margin:0}
      .wrap{max-width:100%}
      h2{page-break-before:avoid}
      .entry{page-break-inside:avoid}
    }
    @media (max-width:600px){
      body{padding:12px;font-size:10pt}
      h1{font-size:18pt}
      .entry-header{flex-direction:column}
      .entry-date{margin-top:2pt}
    }
  `;
}

function generateMinimalCSS(color, font, contrastColor) {
  return `
    body{font-family:${font};margin:0;padding:32px;background:#fafafa;color:#1a1a1a;line-height:1.8}
    .wrap{max-width:750px;margin:0 auto}
    h1{margin:0 0 4px 0;color:#000;font-size:1.9rem;font-weight:300;letter-spacing:-0.5px}
    h2{color:#000;font-size:1.1rem;font-weight:500;margin-top:28px;margin-bottom:14px;padding-bottom:0}
    .headline{color:#666;font-size:1rem;margin-top:2px;font-weight:400}
    .meta{margin-top:8px;color:#888;font-size:0.95rem}
    .meta a{color:${color}}
    section{margin-top:22px}
    ul,ol{margin:8px 0;padding-left:20px}
    li{margin:5px 0;color:#333}
    .entry{margin:12px 0;padding-bottom:8px}
    .entry-title{font-weight:500;color:#000}
    .entry-org{color:#666;font-size:0.95rem;margin-top:2px}
    .entry-date{color:#999;font-size:0.9rem}
    .entry-desc{color:#555;margin-top:6px;font-size:0.95rem}
    .skills span{display:inline-block;background:transparent;border:1px solid #ddd;color:#555;padding:5px 10px;margin:3px;border-radius:2px;font-size:0.9rem}
    a{color:${color};text-decoration:underline}
    a:hover{opacity:0.7}
    footer{margin-top:36px;padding-top:16px;border-top:1px solid #e8e8e8;color:#aaa;font-size:0.85rem}
    @media (max-width:600px){
      body{padding:16px}
      h1{font-size:1.5rem}
      h2{font-size:1rem}
    }
  `;
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return "#" + (0x1000000 + R*0x10000 + G*0x100 + B).toString(16).slice(1);
}

// close IIFE and expose helper
})(window);

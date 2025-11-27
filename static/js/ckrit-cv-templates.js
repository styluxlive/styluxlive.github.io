// Ckrit CV Maker - Template Engine
// Provides multiple Tailwind-inspired templates for CV landing pages

function lightenColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function generateSimpleCSS(color, font) {
  return `
    body{font-family:${font};margin:0;padding:24px;background:#fff;color:#111}
    .wrap{max-width:900px;margin:0 auto;padding:12px}
    header{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
    header > div{flex:1}
    h1{margin:0;color:${color};font-size:1.6rem}
    .headline{color:#444;margin-top:6px}
    .meta{margin-top:6px;color:#666;font-size:0.95rem}
    section{margin-top:18px}
    .skills span{display:inline-block;background:#f3f4f6;padding:6px 10px;margin:4px;border-radius:14px}
    a{color:${color}}
    @media (min-width:900px){h1{font-size:2rem}}
    @media (max-width:600px){body{padding:12px}.wrap{padding:6px}header{align-items:flex-start}.meta{font-size:0.9rem}}
  `;
}

function generateModernCSS(color, font, contrastColor) {
  return `
    body{font-family:${font};margin:0;padding:0;background:#f9fafb;color:#1f2937}
    .wrap{max-width:1000px;margin:0 auto}
    header{background:linear-gradient(135deg, ${color} 0%, ${lightenColor(color, 20)} 100%);color:#fff;padding:40px 24px;box-shadow:0 4px 12px rgba(0,0,0,0.15)}
    h1{margin:0;font-size:2.5rem;font-weight:700}
    .headline{font-size:1.1rem;opacity:0.95;margin-top:8px}
    .meta{margin-top:12px;font-size:0.95rem;opacity:0.9}
    .meta a{color:#fff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.5)}
    main{padding:40px 24px}
    section{margin-bottom:32px}
    h2{color:${color};font-size:1.3rem;border-bottom:2px solid ${contrastColor};padding-bottom:8px;margin:24px 0 16px 0}
    ul{list-style:none;padding:0}
    li{padding:8px 0;border-left:3px solid ${color};padding-left:12px;margin:8px 0}
    .skills span{display:inline-block;background:${contrastColor};color:${color};padding:8px 12px;margin:6px;border-radius:20px;font-size:0.9rem;font-weight:500}
    a{color:${color};text-decoration:none;border-bottom:1px solid ${color}}
    a:hover{text-decoration:underline}
    footer{background:#f3f4f6;padding:20px 24px;text-align:center;color:#666;font-size:0.85rem;margin-top:40px}
    @media (max-width:600px){header{padding:24px 16px}h1{font-size:1.8rem}.headline{font-size:1rem}main{padding:20px 16px}section{margin-bottom:20px}h2{font-size:1.1rem}}
  `;
}

function generateClassicCSS(color, font, contrastColor) {
  return `
    body{font-family:${font};margin:0;padding:0;background:#fafafa;color:#222}
    .wrap{max-width:1200px;margin:0 auto;display:flex}
    header{background:${color};color:#fff;padding:32px 24px;flex:0 0 280px;min-height:100vh}
    header h1{margin:0;font-size:1.8rem;font-weight:700}
    .headline{font-size:0.95rem;margin-top:8px;opacity:0.95}
    .meta{margin-top:16px;font-size:0.85rem;line-height:1.6;opacity:0.9}
    .meta a{color:#fff;text-decoration:underline}
    .meta span{display:block;margin-bottom:8px}
    main{flex:1;padding:40px 32px;background:#fff;min-height:100vh}
    section{margin-bottom:28px}
    h2{color:${color};font-size:1.2rem;font-weight:700;border-bottom:2px solid ${color};padding-bottom:8px;margin:20px 0 12px 0}
    ul{list-style:none;padding:0;margin:0}
    li{padding:8px 0;margin:8px 0}
    .skills span{display:inline-block;background:#e8eef7;color:${color};padding:6px 10px;margin:4px;border-radius:4px;font-size:0.85rem}
    a{color:${color};text-decoration:none}
    a:hover{text-decoration:underline}
    footer{background:#f5f5f5;padding:24px 32px;border-top:1px solid #ddd;color:#666;font-size:0.8rem;text-align:center}
    @media (max-width:768px){.wrap{flex-direction:column}header{flex:none;min-height:auto;padding:24px 20px}header h1{font-size:1.5rem}main{padding:24px 20px;min-height:auto}footer{padding:16px 20px}}
  `;
}

function generateMinimalCSS(color, font, contrastColor) {
  return `
    body{font-family:${font};margin:0;padding:0;background:#fff;color:#333}
    .wrap{max-width:850px;margin:0 auto;padding:48px 24px}
    header{text-align:center;margin-bottom:48px}
    h1{margin:0;font-size:2.2rem;font-weight:300;letter-spacing:-1px;color:#000}
    .headline{font-size:1rem;color:#666;margin-top:8px;font-weight:400}
    .meta{margin-top:16px;color:#888;font-size:0.9rem;line-height:1.8}
    .meta a{color:#888;text-decoration:none;border-bottom:1px solid #ccc}
    .meta a:hover{color:${color};border-bottom-color:${color}}
    main{margin-bottom:48px}
    section{margin-bottom:32px}
    h2{color:#000;font-size:1.1rem;font-weight:600;letter-spacing:0.5px;margin:32px 0 16px 0;text-transform:uppercase}
    ul{list-style:none;padding:0;margin:0}
    li{padding:6px 0;margin:4px 0;color:#555}
    .skills span{display:inline-block;background:#f5f5f5;color:#555;padding:6px 10px;margin:4px 8px 4px 0;border-radius:2px;font-size:0.85rem;border:1px solid #e0e0e0}
    footer{text-align:center;padding-top:32px;border-top:1px solid #eee;color:#aaa;font-size:0.8rem}
    @media (max-width:600px){.wrap{padding:24px 16px}h1{font-size:1.6rem}h2{font-size:0.95rem}main{margin-bottom:24px}}
  `;
}

# Ckrit CV Builder - Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CKRIT CV BUILDER (Browser-Based)                      │
│                                                                           │
│  Developer: Jabulani Mdluli | Framework: Hugo 0.152.2 | Package: pnpm   │
└─────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────────┐
                              │  /ckrit-cv-maker/   │
                              │ (Hugo Page Route)   │
                              └──────────┬──────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
        ┌────────▼────────┐                           ┌──────────▼──────────┐
        │  Intro Screen   │                           │  Editor Screen      │
        │  (Initial UX)   │                           │  (Full Form)        │
        │                 │                           │                     │
        │ - Name input    │                           │ - 20+ fields       │
        │ - Headline      │                           │ - Dynamic lists    │
        │ - Email         │◄──── Continue Button ────►│ - Template select  │
        │ - Live display  │                           │ - Color picker     │
        │                 │                           │ - Section toggles  │
        │ Back to Intro ◄─┴───────────────────────────┘ - Options         │
        └────────┬────────┘                           └──────────┬──────────┘
                 │                                               │
                 └───────────────┬───────────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Data Collection      │
                    │  gatherData() Function │
                    │                        │
                    │  20+ Fields:          │
                    │  ✓ Personal info      │
                    │  ✓ Skills (tags)      │
                    │  ✓ Experience (list)  │
                    │  ✓ Education (list)   │
                    │  ✓ Projects (list)    │
                    │  ✓ Publications       │
                    │  ✓ Awards             │
                    │  ✓ Social links       │
                    │  ✓ Options            │
                    └────────────┬───────────┘
                                 │
        ┌────────────────────────┼────────────────────────────┐
        │                        │                            │
        │                        │                            │
 ┌──────▼──────┐      ┌──────────▼─────────┐      ┌───────────▼────────┐
 │   Preview   │      │   Exports (MD/     │      │  Persistence &     │
 │  iframe()   │      │   JSON/vCard)      │      │  Sharing           │
 │             │      │                    │      │                    │
 │ • Real-time │      │ • Markdown format  │      │ localStorage:      │
 │   updates   │      │ • JSON format      │      │ ✓ saveDraft()     │
 │ • Template  │      │ • vCard format     │      │ ✓ loadDraft()     │
 │   applied   │      │ • Direct download  │      │                    │
 │ • Color     │      │   via download()   │      │ Encryption:        │
 │   rendered  │      │                    │      │ ✓ AES-GCM 256-bit │
 │             │      │                    │      │ ✓ PBKDF2 key deriv │
 └──────┬──────┘      └────────┬───────────┘      │ ✓ Passphrase-based │
        │                      │                  │                    │
        │                      │                  │ Sharing:           │
        │                      │                  │ ✓ Web Share API    │
        │                      │                  │ ✓ Clipboard API    │
        │                      │                  │                    │
        │                      │                  └────────┬───────────┘
        │                      │                           │
        └──────────────┬───────┴───────────────────────────┘
                       │
      ┌────────────────▼────────────────┐
      │   generateLandingHTML()         │
      │   (Template Engine)             │
      │                                 │
      │  Selects template based on:     │
      │  data.options.template          │
      │                                 │
      └────┬─────────────────────────┬──┘
           │                         │
    ┌──────▼────────────┐   ┌───────▼──────────────┐
    │ Template Routing  │   │ CSS Generators      │
    │                  │   │                     │
    │ if simple:        │   │ ✓ generateSimpleCSS()
    │  buildSimple..()  │   │ ✓ generateModernCSS()
    │                  │   │ ✓ generateClassicCSS()
    │ if modern:        │   │ ✓ generateMinimalCSS()
    │  buildModern..()  │   │                     │
    │                  │   │ +                   │
    │ if classic:       │   │ lightenColor()      │
    │  buildClassic..() │   │ (auto-adjust)       │
    │                  │   │                     │
    │ if minimal:       │   │                     │
    │  buildMinimal..() │   │                     │
    │                  │   │                     │
    └────────┬─────────┘   └───────┬─────────────┘
             │                     │
             │    Combine CSS      │
             └────────┬────────────┘
                      │
         ┌────────────▼────────────┐
         │  HTML Structure         │
         │  (Data Formatted)       │
         │                         │
         │ ✓ Header               │
         │ ✓ Formatted content    │
         │ ✓ Styled sections      │
         │ ✓ Responsive layout    │
         │ ✓ CSP headers          │
         │                         │
         └────────────┬────────────┘
                      │
         ┌────────────▼────────────┐
         │  Final HTML Output      │
         │  (Self-contained)       │
         │                         │
         │ • Single HTML file     │
         │ • Inline CSS           │
         │ • XSS-safe            │
         │ • CSP-compliant        │
         │ • Mobile-responsive    │
         │ • Print-friendly       │
         │                         │
         └────────────┬────────────┘
                      │
         ┌────────────▼────────────┐
         │   Download/Share       │
         │                         │
         │ ✓ Save as HTML         │
         │ ✓ Email                │
         │ ✓ Share via Web API    │
         │ ✓ Copy to clipboard    │
         └─────────────────────────┘
```

## Template Engine Detail

```
INPUT: User CV Data
├─ Name: "Jane Smith"
├─ Headline: "Senior Engineer"
├─ Skills: ["JavaScript", "React", ...]
├─ Experience: [{title, org, dates, desc}, ...]
├─ Options: {template: "modern", color: "#2b6cb0", show: {...}}
└─ ... (20+ other fields)

    ↓
    ├─ SELECT TEMPLATE
    │
    ├─ GENERATE CSS (Style)
    │  └─ Based on template type + color
    │
    ├─ BUILD HTML (Structure)
    │  ├─ Format sections
    │  ├─ Apply template layout
    │  ├─ Include selected fields
    │  └─ Escape user input
    │
    └─ COMBINE & OUTPUT

OUTPUT: Complete HTML Page
├─ <!DOCTYPE html>
├─ <head>
│  ├─ Meta tags (CSP, viewport, charset)
│  ├─ <title>
│  └─ <style> (inline CSS)
├─ <body>
│  └─ Template-specific HTML structure
└─ </body></html>
```

## Data Flow Diagram

```
┌──────────────────┐
│  User Input      │
│  (Form Fields)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│  gatherData()        │
│  Collect all fields  │
└────────┬─────────────┘
         │
         ▼
    ┌────────────────────┐
    │  Data Object       │
    │  (JavaScript)      │
    └────────┬───────────┘
             │
    ┌────────┴────────────────────────────┐
    │                                      │
    ▼                                      ▼
┌─────────────┐              ┌──────────────────┐
│  Preview    │              │  Export/Save     │
│  preview()  │              │                  │
└──────┬──────┘              │ ✓ Markdown       │
       │                     │ ✓ JSON           │
       ▼                     │ ✓ vCard          │
   Display in               │ ✓ HTML (with     │
   iframe with             │   template)      │
   selected                │ ✓ localStorage    │
   template                │ ✓ Encrypted      │
                           │   storage        │
                           └──────┬───────────┘
                                  │
                                  ▼
                           Output/Share/Save
```

## Security Architecture

```
┌─────────────────────────────────────────────────────┐
│            SECURITY LAYERS                          │
└─────────────────────────────────────────────────────┘

1. INPUT VALIDATION & ESCAPING
   ┌─────────────────────────────────┐
   │ escapeHtml(userInput)           │
   │ Replace: & < > "               │
   │ Prevent: XSS, injection attacks │
   └──────────────┬──────────────────┘
                  │
2. CONTENT SECURITY POLICY (CSP)
   ┌─────────────────────────────────┐
   │ Meta tags in <head>             │
   │ Restricts:                      │
   │ • default-src 'self'            │
   │ • style-src 'unsafe-inline'     │
   │ • img-src 'self' data:          │
   │ • No external scripts           │
   └──────────────┬──────────────────┘
                  │
3. DATA ENCRYPTION (Optional)
   ┌──────────────────────────────────┐
   │ Web Crypto API                   │
   │ • PBKDF2 key derivation (250k)  │
   │ • AES-GCM 256-bit encryption    │
   │ • Random salt per encryption    │
   │ • No plaintext storage          │
   │ • Passphrase-protected          │
   └──────────────┬───────────────────┘
                  │
4. CLIENT-SIDE ONLY
   ┌──────────────────────────────────┐
   │ ✓ No backend servers            │
   │ ✓ No data transmission          │
   │ ✓ No analytics/tracking         │
   │ ✓ User controls export          │
   │ ✓ Browser storage only          │
   └──────────────────────────────────┘
```

## Storage & Persistence

```
┌─────────────────────────────────────────────┐
│      BROWSER STORAGE ARCHITECTURE           │
└─────────────────────────────────────────────┘

localStorage
├─ Key: 'ckrit_cv_draft_v1'
├─ Value: JSON.stringify(cvData)
├─ Size: ~50-100 KB typical
├─ Persistence: Until cleared
└─ Access: Same origin only

localStorage (Encrypted)
├─ Key: 'ckrit_cv_draft_v1_enc'
├─ Value: Base64(encrypted data)
│  ├─ Algorithm: AES-GCM
│  ├─ Key size: 256-bit
│  ├─ Salt: 16 random bytes
│  ├─ IV: 12 random bytes
│  └─ Auth tag: Included
├─ Size: ~60-120 KB encrypted
├─ Persistence: Until cleared
└─ Access: Requires passphrase to decrypt

Session Data
├─ In-memory form state
├─ Preview cache
├─ Temp files (downloads)
└─ Cleared on: Page reload, browser close
```

## Export Formats Comparison

```
┌─────────────────────────────────────────────────────────┐
│              EXPORT FORMAT COMPARISON                   │
├────────┬────────────────┬────────────┬──────────────────┤
│ Format │ Size           │ Use Case   │ Features         │
├────────┼────────────────┼────────────┼──────────────────┤
│ MD     │ 2-5 KB         │ Blogging   │ Plain text,      │
│        │                │ Docs       │ Markdown syntax  │
├────────┼────────────────┼────────────┼──────────────────┤
│ JSON   │ 2-5 KB         │ Backup     │ Structured data, │
│        │                │ Import     │ Re-use, merge    │
├────────┼────────────────┼────────────┼──────────────────┤
│ vCard  │ 1-2 KB         │ Contact    │ Mobile phones,   │
│        │                │ Distribution│ Email clients   │
├────────┼────────────────┼────────────┼──────────────────┤
│ HTML   │ 5-10 KB        │ Sharing    │ Complete CV,     │
│        │ (+ template)   │ Landing    │ Template applied │
│        │                │ page       │ Ready to share   │
└────────┴────────────────┴────────────┴──────────────────┘
```

## Template Styles Comparison

```
┌──────────────────────────────────────────────────────────┐
│            TEMPLATE VISUAL COMPARISON                    │
├──────────┬──────────────┬────────────┬──────────────────┤
│ Template │ Layout       │ Best For   │ Key Features     │
├──────────┼──────────────┼────────────┼──────────────────┤
│ Simple   │ Single col   │ Quick      │ Clean, minimal,  │
│          │ Horizontal   │ Sharing    │ Color accent     │
│          │ header       │ Clean      │                  │
├──────────┼──────────────┼────────────┼──────────────────┤
│ Modern   │ 2-column     │ Visual     │ Sidebar, color,  │
│          │ Sidebar      │ Appeal     │ Professional     │
│          │ Layout       │ Tech       │ Modern styling   │
├──────────┼──────────────┼────────────┼──────────────────┤
│ Classic  │ Single col   │ Formal     │ Borders, print,  │
│          │ Traditional  │ Academic   │ Traditional      │
│          │ Resume style │ Print      │ styling          │
├──────────┼──────────────┼────────────┼──────────────────┤
│ Minimal  │ Single col   │ Design     │ Light font,      │
│          │ Subtle style │ Creative   │ Elegant,         │
│          │ Elegance     │ Premium    │ understated      │
└──────────┴──────────────┴────────────┴──────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────┐
│        TECHNOLOGY STACK                 │
├─────────────────────────────────────────┤
│                                         │
│  Framework: Hugo 0.152.2               │
│  ├─ Static site generator              │
│  ├─ Lightning-fast builds              │
│  └─ Multi-language support             │
│                                         │
│  Package Manager: pnpm                 │
│  ├─ Node tooling                       │
│  ├─ Tailwind CSS v4                    │
│  └─ Build utilities                    │
│                                         │
│  Frontend: Vanilla JavaScript          │
│  ├─ No framework dependencies          │
│  ├─ Web APIs (Crypto, Share, Storage) │
│  └─ Lightweight (~28KB unminified)     │
│                                         │
│  Security: Web Crypto API              │
│  ├─ PBKDF2 for key derivation          │
│  ├─ AES-GCM for encryption             │
│  └─ No external crypto libraries       │
│                                         │
│  Styling: CSS Grid & Flexbox           │
│  ├─ Responsive design                  │
│  ├─ Mobile-first                       │
│  └─ Print media queries                │
│                                         │
│  Deployment: GitHub Pages & Netlify    │
│  ├─ Automated CI/CD                    │
│  ├─ Zero downtime                      │
│  └─ Global CDN                         │
│                                         │
│  Storage: Browser localStorage         │
│  ├─ Client-side persistence            │
│  ├─ No backend required                │
│  └─ Optional encryption                │
│                                         │
└─────────────────────────────────────────┘
```

---

**Architecture Designed by**: Jabulani Mdluli  
**Created for**: Ckrit CV Builder  
**Last Updated**: 2024

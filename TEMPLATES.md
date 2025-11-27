# Ckrit CV Builder - Template System Documentation

## Overview

The Ckrit CV Builder now includes a powerful **template system** that allows users to generate professional CV landing pages in four distinct styles, each optimized for different preferences and use cases.

## Available Templates

### 1. **Simple** (Default)
- **Design**: Clean, horizontal header with color accent line
- **Layout**: Single-column, full-width
- **Best for**: Quick sharing, online portfolios, minimalist preferences
- **Features**:
  - Prominent header with name and headline
  - Color-accented section dividers
  - Skill badges with color background
  - Responsive mobile layout
- **Color**: Customizable primary color

### 2. **Modern**
- **Design**: Two-column layout with colored sidebar
- **Layout**: Contact & skills in left sidebar, main content on right
- **Best for**: Professional portfolios, tech roles, visual appeal
- **Features**:
  - Eye-catching colored sidebar (matches primary color)
  - Contact information and quick skills access
  - Grid-based content structure
  - Shadow effects and depth
  - Professional visual hierarchy
- **Responsive**: Stacks to single column on mobile

### 3. **Classic**
- **Design**: Traditional resume format
- **Layout**: Single-column, print-optimized
- **Best for**: Formal applications, academic positions, printable CVs
- **Features**:
  - Traditional resume styling with borders
  - Clean typography optimized for printing
  - Inline dates and metadata
  - Page-break handling
  - High contrast for readability
- **Print-Friendly**: Designed specifically for print media

### 4. **Minimal**
- **Design**: Elegant, understated aesthetic
- **Layout**: Single-column with subtle styling
- **Best for**: Designers, creatives, discerning professionals
- **Features**:
  - Light font weights and letter-spacing
  - Subtle borders and delimiters
  - Reduced visual noise
  - Sophisticated typography
  - Focus on content

## How to Use Templates

### In the Web App

1. Navigate to the **CV Builder** at `/ckrit-cv-maker/`
2. Fill in your information in the **Intro Screen** or **Editor Screen**
3. In the **Options / Templates** section, select your preferred template:
   ```html
   <select id="template-select">
     <option value="simple">Simple</option>
     <option value="modern">Modern</option>
     <option value="classic">Classic</option>
     <option value="minimal">Minimal</option>
   </select>
   ```
4. Customize the color picker if desired
5. Click **Live Preview** to see your CV with the selected template
6. Download or share using the **Download** or **Share CV** buttons

### Programmatically

```javascript
// Sample data object
const cvData = {
  name: 'John Doe',
  headline: 'Software Engineer',
  email: 'john@example.com',
  website: 'https://johndoe.com',
  skills: ['JavaScript', 'React', 'Node.js'],
  // ... other fields
  options: {
    template: 'modern', // 'simple', 'modern', 'classic', 'minimal'
    color: '#2b6cb0',
    show: {
      education: true,
      experience: true,
      projects: true,
      publications: true,
      awards: true,
      skills: true
    }
  }
};

// Generate HTML with template
const html = generateLandingHTML(cvData);

// Render in iframe
const frame = document.getElementById('preview-frame');
frame.srcdoc = html;

// Download
const blob = new Blob([html], { type: 'text/html' });
// ... save blob
```

## Technical Architecture

### Template System Files

Located in `/static/js/ckrit-cv-maker.js`:

#### CSS Generator Functions
- `generateSimpleCSS(color, font)` - Returns CSS for Simple template
- `generateModernCSS(color, font, contrastColor)` - Returns CSS for Modern template
- `generateClassicCSS(color, font, contrastColor)` - Returns CSS for Classic template
- `generateMinimalCSS(color, font, contrastColor)` - Returns CSS for Minimal template

#### HTML Structure Builders
- `buildSimpleStructure(data, color)` - Generates Simple template HTML
- `buildModernStructure(data, color)` - Generates Modern template HTML
- `buildClassicStructure(data, color)` - Generates Classic template HTML
- `buildMinimalStructure(data, color)` - Generates Minimal template HTML

#### Main Generator
- `generateLandingHTML(data)` - Orchestrates CSS selection and HTML building

### Helper Functions
- `lightenColor(color, percent)` - Adjusts hex colors for contrast
- `escapeHtml(string)` - XSS prevention for user data

## Customization

### Color Schemes

Each template respects the user-selected color from the color picker:

```javascript
options: {
  color: '#2b6cb0'  // Hex color code
}
```

The system automatically adjusts contrast colors where needed using `lightenColor()`.

### Section Visibility

Control which sections appear in the generated CV:

```javascript
options: {
  show: {
    education: true,
    experience: true,
    projects: true,
    publications: true,
    awards: true,
    skills: true
  }
}
```

### Font Selection

Templates use system font stack for optimal rendering:

```javascript
const font = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
```

## Design Specifications

### Responsive Breakpoints

All templates include responsive design:
- **Desktop**: 900px+ width
- **Tablet**: 600px - 899px width
- **Mobile**: Below 600px width

### Color Palette

- **Primary**: User-selected color (default: #2b6cb0)
- **Accent**: Lighter shade auto-calculated for contrast
- **Text**: #111 (dark gray)
- **Secondary**: #555-#666 (medium gray)
- **Light**: #f5f5f5 - #fafafa (backgrounds)
- **Borders**: #ddd - #e8e8e8

### Typography

- **Font Family**: System fonts (platform-native rendering)
- **Sizes**:
  - H1 (Name): 1.8rem - 2.4rem
  - H2 (Section): 1.1rem - 1.5rem
  - Body: 0.95rem - 1rem
  - Small: 0.85rem - 0.9rem

## Security & Performance

### Content Security Policy (CSP)
Generated landing pages include CSP headers:
```
default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self'
```

### XSS Prevention
- All user input escaped via `escapeHtml()`
- Inline styles only (no external scripts)
- Safe HTML generation

### Performance
- Inline CSS (no external requests)
- No external dependencies
- Fast rendering in iframes
- Optimized for printing

## Browser Compatibility

Templates work in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Export Formats

### HTML Export
Download a standalone HTML landing page with selected template:
```javascript
const html = generateLandingHTML(data);
download(`cv_index.html`, html, 'text/html');
```

### JSON Export
Export raw data (compatible with all templates):
```javascript
download(`cv.json`, JSON.stringify(data, null, 2), 'application/json');
```

### Markdown Export
Text-based format (template-independent):
```javascript
const md = generateMarkdown(data);
download(`cv.md`, md, 'text/markdown');
```

### vCard Export
Contact card format (for phones/emails):
```javascript
const vcard = generateVCard(data);
download(`cv.vcf`, vcard, 'text/vcard');
```

## Preview System

### Live Preview in Web App
Real-time preview updates as you type:
```javascript
document.getElementById('preview-btn').addEventListener('click', function(){
  const data = gatherData();
  preview(data);  // Renders in iframe with selected template
});
```

### Template Preview Page
View all templates side-by-side: `/template-preview.html`

## Future Enhancements

Potential improvements to the template system:
1. Additional templates (Portfolio, Academic, Startup)
2. Custom CSS editor
3. Template variations (colors, fonts)
4. Export to PDF with template styling
5. Template marketplace/community sharing
6. Multi-language support

## Support & Issues

For issues with templates:
1. Check browser console for errors
2. Verify data is complete and valid
3. Test with sample data in `/template-preview.html`
4. Clear browser cache and reload

---

**Created by**: Jabulani Mdluli  
**App**: Ckrit CV Builder  
**Last Updated**: 2024

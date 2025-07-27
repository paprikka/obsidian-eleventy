# Untested Site Developer Documentation

## Overview

Untested is a static site built with [Eleventy (11ty)](https://www.11ty.dev/) that imports content from an Obsidian vault.

### Core Philosophy

- **WYSIWYG + Safety**: Content creation happens in Obsidian with live preview in 11ty, but 11ty never writes back to the vault
- **Conservative Updates**: Dependencies are updated carefully to maintain stability  
- **HTTP/2 Optimized**: Multiple small CSS files rather than bundled assets
- **Modern CSS**: Leverages native CSS features without complex build tooling

### Key Technologies

- **Eleventy 3.x** - Static site generator
- **Obsidian** - Content authoring tool
- **Vercel** - Hosting platform
- **pnpm** - Package manager
- **Vitest** - Testing framework

## Table of Contents

1. [Project Structure](#project-structure)
2. [Content Workflow](#content-workflow)
3. [Build Process](#build-process)
4. [Markdown Processing](#markdown-processing)
5. [Template System](#template-system)
6. [CSS Architecture](#css-architecture)
7. [Plugin System](#plugin-system)
8. [Development Guidelines](#development-guidelines)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)
12. [Common Tasks](#common-tasks)

## Project Structure

```
untested-11ty/
├── vault/                  # Obsidian vault (source content, symlinked & gitignored)
├── src/                    # 11ty source files
│   ├── notes/             # Processed markdown from vault
│   ├── assets/            # CSS and static assets
│   ├── _data/             # Site-wide data files
│   ├── _includes/         # Nunjucks templates
│   └── *.njk              # Page templates
├── build/                  # Build scripts and plugins
│   ├── importer/          # Vault → src/notes processing
│   └── plugins/           # Custom markdown and 11ty plugins
├── _site/                 # Generated static site
├── .cache/                # Image cache (committed for performance)
└── .eleventy.js           # 11ty configuration
```

### Important Directories

- **`vault/`**: Contains all Obsidian notes, including private ones. Never write to this directory from build scripts.
- **`src/notes/`**: Auto-generated from vault. Contains only notes tagged with `publish: true`.
- **`build/`**: Custom build logic for processing Obsidian content and markdown transformations.
- **`.cache/`**: Committed image cache for build performance.

## Content Workflow

### 1. Writing Content

1. Write articles in Obsidian within the `vault/` directory
2. Add frontmatter with `publish: true` to make a note public
3. Include images directly in Obsidian (they'll be copied automatically)
4. Use Obsidian's wiki-link syntax freely

### 2. Frontmatter Options

```yaml
---
publish: true           # Required for publishing
title: "Article Title"  # Optional, defaults to filename
date: 2024-01-01       # Optional, defaults to file modification date
cover: image.png       # Optional cover image
---
```

### 3. Development Workflow

```bash
# Start development with live reload
pnpm dev:watch  # or run separately:
pnpm vault:watch  # Watch Obsidian vault for changes
pnpm dev         # Start 11ty dev server

# Deploy to production
pnpm push        # Build and deploy to Vercel

# Debug mode
pnpm dev:debug
pnpm vault:debug
```

## Build Process

### Vault Import Process

The build process (`vault:build` / `vault:watch`) handles the critical task of transforming Obsidian content for 11ty:

1. **Resource Indexing** (`build/importer/resource-index.js`)
   - Creates a map of all files in the vault
   - Handles Obsidian's flexible linking (filename-only links)
   - Resolves ambiguous links based on proximity

2. **File Processing** (`build/importer/process-file.js`)
   - Filters notes by `publish: true` frontmatter
   - Transforms Obsidian wiki-links to standard markdown
   - Handles embeds and image references
   - Blocks YouTube/Twitter URLs for privacy
   - Adds dates if missing

3. **Asset Copying**
   - Copies referenced images to `src/notes/`
   - Encodes filenames with spaces for compatibility
   - Maintains folder structure from vault

### Link Resolution

Obsidian allows simplified linking:
- `[[Note Title]]` - Links by filename alone
- `![[image.png]]` - Embeds by filename alone

The importer resolves these to proper relative paths that 11ty can process.

### Safety Mechanisms

- **Vault is symlinked and gitignored**: No accidental commits of private content
- **One-way sync**: Importer only reads from vault, never writes
- **Separate directories**: Clear distinction between source and processed content

## Markdown Processing

### Markdown Pipeline

The processing pipeline consists of:

1. **markdown-it** - Core markdown parser with syntax highlighting
2. **Third-party plugins**:
   - **markdown-it-attrs** - Add attributes to elements `{.class #id}`
   - **markdown-it-github-alerts** - GitHub-style alert boxes
3. **Custom plugins** (detailed below)

### Custom Plugins

1. **md-adjust-links.js**
   - Transforms relative links (`../`) to work with site's URL structure
   - Ensures all internal links use the slugified permalink format

2. **md-embed.js**
   - YouTube URLs → Embedded iframes
   - Twitter URLs → Screenshot embeds (via external API)
   - Falls back to standard image rendering

3. **md-tags.js**
   - Converts `#hashtags` to `<span class="tag">hashtag</span>`
   - Skips tags in code blocks and links
   - Used for visual styling only (no filtering/navigation)

4. **md-task-list.js**
   - `- [ ]` → Styled TODO item
   - `- [x]` → Styled DONE item
   - `- [/]` → Styled WIP (work in progress) item
   - Adds semantic CSS classes for custom styling

### Post-Processing

The `ObsidianImportPlugin` (`build/plugins/obsidian.js`) handles:
- Header anchor generation
- External link handling (`target="_blank"`)
- Broken link detection and styling
- Video embed wrapping

### Obsidian Features Support

| Feature | Support | Implementation |
|---------|---------|----------------|
| Wiki-links `[[note]]` | ✅ | Converted to markdown links |
| Embeds `![[note]]` | ✅ | Converted to iframes/images |
| Tags `#tag` | ✅ | Styled but not filterable |
| Aliases `[[note\|text]]` | ✅ | Preserved in conversion |
| Block references `^id` | ✅ | Converted to span elements |

## Template System

### Layout Hierarchy

```
root.njk                     # Base HTML structure
├── note.njk                 # Article layout
├── intro.njk               # Homepage layout  
└── 404.njk                 # Error page
```

### Template Features

**root.njk** (`src/_includes/root.njk`):
- Minimal HTML shell
- Dynamic `pageClass` for CSS scoping
- Build timestamp tracking

**note.njk** (`src/_includes/note.njk`):  
- Article structure with header/content/backlinks
- Broken link interaction handling
- Lazy-loaded CSS components

### Data Layer

**Global Data** (`src/_data/site.js`):
```js
{
  rootUrl: "https://untested.sonnet.io",
  name: "Untested",
  description: "Projects, experiments and toys by Rafał Pastuszak",
  defaultCover: "/assets/cover-default.png"
}
```

**Note Data** (`src/notes/notes.11tydata.js`):
- Default layout: `note.njk`
- Permalink pattern: `/{{ page.filePathStem | slugifyPermalink }}/`
- Title fallback to filename

### Broken Links Feature

The site intentionally supports "broken links" - links to unpublished notes:

```javascript
// In note.njk - handles broken link clicks
if (targetElement.matches(".link--broken")) {
  // Prompts user to request the unpublished article
}
```

This creates engagement and helps prioritize future content.

## CSS Architecture

### Organization

```
src/assets/
├── _variables.css          # Design tokens (colors, spacing, typography)
├── _reset.css             # Modern CSS reset
├── _global.css            # Base element styles
├── main.css               # Import orchestrator
├── components/            # Component-specific styles
│   ├── _card.css
│   ├── _footer.css
│   ├── _subscribe.css
│   └── ...
├── pages/                 # Page-specific styles
│   ├── _intro.css
│   ├── _note.css  
│   └── _404.css
└── vendor/                # Third-party CSS
```

### Import Strategy

**HTTP/2 Optimized**: Uses native CSS `@import` in `main.css`:
```css
@import "./_variables.css";
@import "./_reset.css";
@import "./_global.css";
@import "./components/_card.css";
@import "./pages/_note.css";
```

**Benefits**:
- No build-time concatenation needed
- HTTP/2 multiplexing handles multiple requests efficiently
- Easy to locate and edit specific component styles
- Browser-native import cascading

### Naming Conventions

**Component Classes**:
```css
.card                       # Component root
.card__header              # Component element
.card--featured            # Component modifier
```

**Page Classes**:
```css
.page-note                 # Page-specific styles
.page-intro__hero          # Page element
```

**Utility Classes**:
```css
.copy                      # Typography content styles
.embed--video              # Embed type modifiers
```

### Modern CSS Features

**Design Tokens** (Utopia-based fluid scales):
```css
--s-0: clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem);
--color-accent: #ff6b35;
--spacing-hero: 8rem;
```

**Advanced Features**:
- CSS Nesting (`& selector`)
- Scroll-driven animations (`animation-timeline: scroll()`)
- Container queries
- CSS custom properties for theming
- Logical properties (`margin-block`, `padding-inline`)

## Plugin System

### Extension Points  

**Adding New Markdown Features**:
1. Create plugin in `build/plugins/md-{feature}.js`
2. Register in `.eleventy.js` markdown configuration
3. Add corresponding CSS in `src/assets/components/`

**Adding New Transforms**:
1. Add to `ObsidianImportPlugin` in `build/plugins/obsidian.js`
2. Use Cheerio for HTML manipulation

## Development Guidelines

### Code Conventions

1. **File Organization**
   - Keep build logic in `build/` directory
   - Templates go in `src/_includes/`
   - Global assets in `src/assets/`

2. **JavaScript Style**
   - Use ES modules (`import`/`export`)
   - Prefer `async`/`await` over callbacks
   - Use descriptive variable names
   - Early returns and negative conditionals

3. **CSS Style**
   - Use semantic class names
   - Component-scoped CSS custom properties (`--_variable`)
   - Modern CSS features preferred over polyfills
   - BEM-style modifiers where appropriate

4. **Error Handling**
   - Log operations with clear prefixes: `[ importer ]`, `[ plugin ]`
   - Continue processing on non-critical errors
   - Never throw errors that break the build

5. **Performance**
   - Cache images forever (immutable assets)
   - Process files in parallel when possible
   - Skip unchanged files during watch mode

### Important Constraints

1. **Never write to vault/** - The Obsidian vault is read-only
2. **Respect privacy** - Only publish notes with `publish: true`
3. **Preserve content** - Don't modify existing article content/URLs
4. **Handle spaces** - Many assets have spaces in filenames

## Testing

Run tests with:
```bash
pnpm test
```

### Test Coverage

- **Link resolution** - Ensuring Obsidian links resolve correctly
- **Resource indexing** - File discovery and mapping
- **Markdown transformations** - Plugin output verification
- **Slugification** - URL generation consistency

### Writing Tests

When adding features:
1. Create mock markdown files in test fixtures
2. Test both happy path and edge cases
3. Verify no existing content is modified
4. Ensure privacy rules are maintained

Example test structure:
```javascript
// build/plugins/example.test.js
import { describe, it, expect } from 'vitest'
import { processMarkdown } from './example.js'

describe('Example Plugin', () => {
  it('should transform X to Y', () => {
    const input = '[[example]]'
    const output = processMarkdown(input)
    expect(output).toBe('[example](../example/)')
  })
})
```

## Deployment

### Manual Deployment

```bash
pnpm push  # Builds and deploys to Vercel
```

This command:
1. Runs `vault:build` to process latest content
2. Runs `build` (eleventy) to generate static site
3. Deploys to Vercel production

### Vercel Configuration

The `vercel.json` handles:
- Redirects for backward compatibility
- Clean URLs (no `.html` extensions)
- Custom 404 page

### Performance Optimization

#### Image Strategy
- Automatic WebP/AVIF generation with fallbacks
- Lazy loading by default
- Cache duration: 30,000 days (permanent until manual update)
- Cached images committed to repository for faster builds

#### CSS Strategy
- No bundling - leverages HTTP/2 multiplexing
- Component-scoped for easy cache invalidation
- Modern CSS reduces file sizes

#### Build Optimization
- Incremental content processing
- Asset caching across builds
- Pre-built HTML for fast serving

## Troubleshooting

### Common Issues

**Links not resolving**:
- Check `build/importer/resource-index.js` output
- Verify file names match Obsidian references

**Images not displaying**:
- Ensure images are referenced in markdown
- Check asset copying in `runner.js`
- Verify URL encoding for spaces in filenames

**CSS not loading**:
- Verify import order in `main.css`
- Check for syntax errors in individual component files

**Build failures**:
- Clear `.cache/` directory
- Re-run `vault:build`
- Check for malformed markdown

### Debug Tools

```bash
# Debug build process
pnpm vault:debug

# Debug 11ty
pnpm dev:debug

# Verbose output
DEBUG=Eleventy* pnpm build
```

## Common Tasks

### Adding a New Article

1. Create markdown file in Obsidian vault
2. Add `publish: true` to frontmatter
3. Run `pnpm dev:watch` to preview
4. Run `pnpm push` when ready to publish

### Modifying Site Structure

1. Update templates in `src/_includes/`
2. Modify styles in `src/assets/`
3. Test thoroughly - ensure existing URLs work

### Adding a Markdown Feature

1. Create plugin in `build/plugins/md-feature.js`
2. Register in `.eleventy.js` configuration
3. Add tests in `build/plugins/md-feature.test.js`
4. Document the feature

### Debugging Build Issues

1. Check console output for `[ importer ]` messages
2. Verify frontmatter has `publish: true`
3. Ensure no path conflicts between notes
4. Check for special characters in filenames

## Future Improvements

Based on the codebase analysis, potential improvements include:

1. **Duplicate filename handling** - Currently untested when two notes have same name
2. **Tag navigation** - Tags are styled but not searchable
3. **Search functionality** - No built-in search across notes
4. **Automated testing** - More comprehensive test coverage

---

*This documentation reflects the current state of the codebase. Update it when making significant architectural changes.*
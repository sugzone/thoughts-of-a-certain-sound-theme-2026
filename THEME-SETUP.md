# Thoughts of a Certain Sound — Theme Setup Guide

Theme version: 1.6.1  
Requires: Ghost 5.0.0 or higher

---

## Installation

1. Run `yarn` then `yarn dev` to build assets locally, or `yarn zip` to produce a distributable `.zip`.
2. In Ghost Admin, go to **Settings → Design → Change theme → Upload theme** and upload the zip.
3. Activate the theme.

---

## Ghost Admin: Required Configuration

### Brand (Settings → Branding)
| Setting | Notes |
|---|---|
| Site title | Appears in the navigation logo and footer |
| Site description | Used as fallback text in header and footer signup sections |
| Accent color | Used if **Header & Footer Color** custom setting is set to "Accent color" |
| Publication icon | Displayed in the sidebar (if sidebar is enabled) |
| Cover image | Used as background image on the homepage header when **Background Image** is enabled |

### Navigation (Settings → Navigation)
- **Primary navigation** renders in the top nav bar.
- **Secondary navigation** is defined but not currently rendered in the active footer (it is present in the commented-out full footer block in `partials/components/footer.hbs` for future restoration).

### Members & Portal (Settings → Members)
- When members are enabled, a **Subscribe** button appears in the footer and a **Sign in / Subscribe** pair appears in the navigation actions area.
- The subscribe button uses Ghost Portal (`data-portal="signup"`). No additional configuration is required beyond enabling members in Ghost Admin.
- When a member is signed in the Subscribe button is hidden; an **Account** button appears instead.

---

## Custom Design Settings (Settings → Design → Site-wide)

### Navigation Layout
Controls the position of the logo in the navigation bar.

| Option | Behaviour |
|---|---|
| Logo in the middle *(default)* | Logo centred, nav links on the left, actions on the right |
| Logo on the left | Logo left-aligned |
| Stacked | Logo above nav links |

### Site Background Color
Sets the `--background-color` CSS variable. The theme automatically detects whether the chosen color is light or dark and applies `has-dark-text` or `has-light-text` to `<html>` accordingly.

### Header & Footer Color
| Option | Behaviour |
|---|---|
| Background color *(default)* | Header and footer use the site background color |
| Accent color | Header and footer use the Ghost accent color |

### Title Font
| Option | CSS class applied to `<body>` |
|---|---|
| Modern sans-serif *(default)* | `has-sans-title` |
| Elegant serif | `has-serif-title` |
| Consistent mono | `has-mono-title` |

### Body Font
| Option | CSS class applied to `<body>` |
|---|---|
| Modern sans-serif *(default)* | `has-sans-body` |
| Elegant serif | `has-serif-body` |

---

## Custom Design Settings — Homepage Group

### Header Style
Controls what renders at the top of the home page.

| Option | Renders |
|---|---|
| Landing *(default, recommended)* | The most recent post as a large featured block (`latest-post` component) |
| Highlight | A featured post card layout with sidebar |
| Magazine | A multi-post magazine-style grid |
| Search | A search bar with optional header text |
| Off | No header section |

**Header Text** — custom text shown in the Landing and Search header styles. Falls back to the site description if left empty.

**Background Image** — when enabled, uses the publication cover image as a background in the Landing and Search header styles.

### Post Feed Style
Controls the layout of the post list on the main index page (`index.hbs`).

| Option | Layout |
|---|---|
| List *(default)* | Vertical list of post cards |
| Grid | Grid of post cards |

**Show Images in Feed** — toggles feature images in the List feed style.

### Show Author / Show Publish Date
Toggle whether author name and publish date appear on post cards throughout the site.

### Show Publication Info Sidebar
When enabled, a sidebar appears on the index and author pages with the site title, description, and subscribe button.

---

## Custom Design Settings — Post Group

### Show Post Metadata
Toggles the author image, author name, date, and Share button block that appears below the post title.

### Enable Drop Caps on Posts
When enabled, the first letter of each post body is styled as a drop cap.

### Show Related Articles
When enabled, a "Recent" section of four posts appears below each post, in addition to the tag-filtered "Related" section.

---

## Home Page Structure

The home page (`home.hbs`) renders in the following order:

1. **Latest** section — the single most recent post, displayed as a large article block.
2. **Featured** section — three posts fetched with `featured:true` filter, displayed as a card group.
3. **Categories** section — three side-by-side recent post lists filtered by tag:

| Column | Tag filter | Links to |
|---|---|---|
| interview | `tag:interview` | `/tag/interview` |
| essay | `tag:essay` | `/tag/essay` |
| records | `tag:records` | `/tag/records` |

Each category heading is a link to its tag archive page. To add or change a category column, edit the partial includes in `home.hbs` and pass the correct `filter`, `heading`, and `order` parameters to the `components/recent-post-list` partial.

---

## Page Templates

| File | Used for |
|---|---|
| `default.hbs` | Wraps all pages; contains `<html>`, navigation, footer, and the squigline SVG |
| `home.hbs` | Home page |
| `index.hbs` | Main posts list (paginated) |
| `post.hbs` | Individual posts |
| `page.hbs` | Static pages |
| `tag.hbs` | All tag archive pages (4-column grid, paginated) |
| `author.hbs` | Author archive pages |
| `archive.hbs` | Full post archive (paginated feed) |

---

## Key Partials

| Partial | Purpose |
|---|---|
| `components/navigation.hbs` | Top navigation bar |
| `components/footer.hbs` | Site footer with title, About link, Jazz Strategies credit, and optional Subscribe button |
| `components/latest-post.hbs` | Hero block for the most recent post |
| `components/post-card-group.hbs` | Three-column card grid (used for Featured section) |
| `components/recent-post-list.hbs` | Vertical list of up to 3 posts filtered by tag (used in Categories section). Accepts `filter`, `heading`, `order`, and `headerLink` parameters |
| `components/related-posts.hbs` | Tag-filtered Related posts section shown below each post |
| `components/post-feed-paginated.hbs` | Paginated post feed used on the archive and tag pages |
| `components/styled-section-header.hbs` | Decorative section divider with serif heading. Accepts a `text` parameter |
| `svg/squigline.hbs` | The decorative vertical line that runs down the left side of every page |
| `feature-image.hbs` | Feature image block used inside posts |
| `pagination.hbs` | Prev/next page navigation |

---

## Layout System

All pages use a consistent two-level layout wrapper:

```html
<section class="gh-outer">        <!-- horizontal padding -->
    <div class="gh-inner gh-canvas">  <!-- max-width centering + grid columns -->
        <!-- content -->
    </div>
</section>
```

- `gh-outer` provides horizontal padding via `padding: 0 max(4vmin, 20px)`.
- `gh-inner` centers content with `max-width: var(--container-width)` and `margin: 0 auto`.
- `gh-canvas` adds a CSS grid with `main` (~720px), `wide`, and `full` column tracks. Ghost Koenig card width classes (`kg-width-wide`, `kg-width-full`) rely on being direct children of a `gh-canvas` grid.

Post feed sections (`gh-related-posts-feed`, etc.) use `gh-outer` + `gh-inner` **without** `gh-canvas` so that the flex grid inside can fill the full inner width rather than being constrained to the 720px main column.

---

## Development

```bash
yarn          # install dependencies
yarn dev      # watch and rebuild assets (CSS + JS)
yarn zip      # build and package theme as a zip for upload
yarn test     # run gscan theme validation
```

Built assets are output to `assets/built/`. Do not edit `assets/built/screen.css` or `assets/built/source.js` directly — edit the source files in `assets/css/` and `assets/js/` instead.

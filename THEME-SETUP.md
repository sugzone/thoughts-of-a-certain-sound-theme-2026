# Thoughts of a Certain Sound — Implementation Checklist

---

## 1. Build and upload the theme

1. Run `yarn zip` in the project directory to produce a zip file.
2. In Ghost Admin, go to **Settings → Design → Change theme → Upload theme** and upload the zip.
3. Click **Activate**.

---

## 2. Upload routes

1. In Ghost Admin, go to **Settings → Labs**.
2. Under **Routes**, upload the `routes.yaml` file from the project root.

---

## 3. Configure branding

Go to **Settings → Branding** and set:

- **Site title** — appears in the navigation and footer.
- **Site description** — used as fallback text in various places.
- **Accent color** — only matters if you set Header & Footer Color to "Accent color" in step 5.
- **Publication icon** — appears in the sidebar if the sidebar is enabled.

---

## 4. Configure navigation

Go to **Settings → Navigation** and add the primary nav links you want to appear in the top nav bar.

---

## 5. Configure design settings

Go to **Settings → Design** and set the following:

**Site-wide:**
- **Navigation Layout** → `Stacked`
- **Site Background Color** → set to the desired background color
- **Header & Footer Color** → `Background color` (or `Accent color` if preferred)
- **Title Font** → `Elegant serif`
- **Body Font** → `Modern sans-serif`

**Homepage:**
- **Header Style** → `Landing`
- **Post Feed Style** → `List`
- **Show Author** → off
- **Show Publish Date** → off
- **Show Publication Info Sidebar** → off

**Post:**
- **Show Post Metadata** → on
- **Enable Drop Caps on Posts** → off
- **Show Related Articles** → on

---

## 6. Create required content

The home page Categories section pulls from three specific tags. Posts must exist with these exact tag slugs for those sections to appear:

- `interview`
- `essay`
- `records`

---

## 7. Verify the site

Check the following pages are rendering correctly:

- [ ] Home page — Latest, Featured, and Categories sections all appear
- [ ] A post page — title, metadata, body, related posts section
- [ ] A tag page (e.g. `/tag/essay`) — grid of posts
- [ ] `/archive/` — paginated post feed
- [ ] Navigation and footer — links and layout correct on desktop and mobile

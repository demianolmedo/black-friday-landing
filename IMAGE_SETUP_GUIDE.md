# Image Setup Guide - Black Friday Landing Page

## Critical: Cachetada Animation Images

### Required Image Structure

The Cachetada section uses a scroll-based animation that requires 20 sequential images (frames 100-119).

**Expected Directory Structure:**
```
black-friday-landing/
└── public/
    └── assets/
        └── Fondos e imagenes/
            ├── Logo.png
            ├── 100.png
            ├── 101.png
            ├── 102.png
            ├── ...
            ├── 118.png
            └── 119.png
```

### Setup Instructions

1. **Create the directory structure:**
   ```bash
   mkdir -p "public/assets/Fondos e imagenes"
   ```

2. **Copy your animation frames:**
   - Place images 100.png through 119.png in the directory
   - Also place Logo.png in the same directory

3. **Image Requirements:**
   - Format: PNG (with transparency preferred)
   - Naming: Must be exactly `100.png`, `101.png`, ... `119.png`
   - Size: Recommended 800x800px or similar square aspect ratio
   - Total frames: 20 images

### How It Works

- The scroll animation maps scroll progress to frame numbers
- As user scrolls through the Cachetada section, frames change from 100 to 119
- Images are loaded from: `/assets/Fondos e imagenes/{frame}.png`
- Vite serves files from the `public/` folder at the root path

### Troubleshooting

**If images don't show:**
1. Check browser console for 404 errors
2. Verify exact file names (case-sensitive)
3. Ensure folder name includes the space: "Fondos e imagenes"
4. Check that files are in `public/` not `src/`

**Path in code:**
- Navbar: `/assets/Fondos e imagenes/Logo.png`
- CachetadaSection: `/assets/Fondos e imagenes/${currentFrame}.png`

### Fallback Behavior

If images fail to load:
- CachetadaSection shows "CACHETADA" text with frame counter
- Navbar shows "BLACK FRIDAY" text instead of logo
- Console logs which frames are missing

## Alternative: Testing Without Images

If images are not yet available, the page will still function:
- Hero section: No broken placeholders (person image removed)
- Cachetada: Shows fallback text
- Navigation: Shows text logo
- All other sections work normally

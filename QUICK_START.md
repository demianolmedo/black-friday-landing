# Quick Start Guide - Scroll Pinning Effect

## TL;DR

The HeroSection now features a scroll-pinning animation where the section locks in place while you scroll through 30 frames (100-129). Once complete, it unlocks and you can continue scrolling normally.

---

## Test It Right Now

### 1. Start Development Server
```bash
cd C:\RENTSMART\black\black-friday-landing
npm run dev
```

### 2. Open Browser
Navigate to: `http://localhost:3000`

### 3. Try It Out
1. Wait for images to load
2. Scroll down slowly
3. Watch the hero section "stick" at the top
4. Continue scrolling to advance through the animation
5. After ~30 scroll movements, it will "unstick"
6. Scroll back up to play animation in reverse

---

## What's Been Changed

### Main File
**Path**: `C:\RENTSMART\black\black-friday-landing\src\components\HeroSection.jsx`

**New Features**:
- Scroll pinning logic
- Touch gesture support
- Progress indicator (right side of screen)
- Bidirectional animation

---

## Configuration (Common Adjustments)

### Speed Control
**File**: `HeroSection.jsx`
**Line**: ~74

```javascript
const scrollPerFrame = 30;  // Current setting
```

**Options**:
- `20` = Faster animation
- `30` = Default (balanced)
- `40` = Slower animation

### Progress Indicator
**File**: `HeroSection.jsx`
**Line**: ~252

```javascript
// To hide it:
{false && isPinned && (
  <div className="fixed right-8...">
)}
```

---

## How It Works (Simple Version)

```
1. User scrolls down
2. Hero section reaches top of screen
3. Section LOCKS in place (position: fixed)
4. Scrolling now advances the image frames
5. Frames go 100 → 101 → 102 → ... → 129
6. When frame 129 is reached
7. Section UNLOCKS (position: relative)
8. Normal scrolling resumes
```

---

## Troubleshooting

### "Animation doesn't trigger"
- Make sure images have finished loading
- Check browser console for errors
- Verify you're scrolling enough to reach the top

### "Animation is too fast/slow"
- Adjust `scrollPerFrame` constant (see Configuration above)
- Line 74 in HeroSection.jsx

### "Progress indicator not showing"
- It only appears when the section is pinned
- Check that `isPinned` state is true
- Look at right side of screen (may be off-screen on small viewports)

### "Can't scroll past hero section"
- Complete the full animation (reach frame 129)
- Check browser console for JavaScript errors
- Try refreshing the page

---

## File Structure

```
black-friday-landing/
├── src/
│   └── components/
│       ├── HeroSection.jsx           ← Main implementation
│       └── HeroSection.test.jsx      ← Test suite
├── QUICK_START.md                    ← You are here
├── IMPLEMENTATION_SUMMARY.md         ← Overview of all changes
├── SCROLL_PINNING_DOCS.md           ← Detailed technical docs
├── SCROLL_STATE_MACHINE.md          ← State flow diagram
└── ANIMATION_TUNING_GUIDE.md        ← Speed/sensitivity adjustments
```

---

## Key Code Locations

### State Variables (Line ~4-15)
```javascript
const [isPinned, setIsPinned] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);
const scrollAccumulatorRef = useRef(0);
const animationCompleteRef = useRef(false);
```

### Wheel Handler (Line ~79-143)
```javascript
const handleWheel = (e) => {
  // Desktop scroll logic
  // Controls frame transitions
  // Manages pin/unpin states
}
```

### Touch Handlers (Line ~145-214)
```javascript
const handleTouchStart = (e) => { ... }
const handleTouchMove = (e) => { ... }
```

### Progress Indicator (Line ~252-264)
```javascript
{isPinned && (
  <div className="fixed right-8 top-1/2...">
    // Visual progress bar
  </div>
)}
```

---

## Quick Fixes

### Make Animation 2x Faster
```javascript
// Line 74
const scrollPerFrame = 15;  // Changed from 30
```

### Make Animation 2x Slower
```javascript
// Line 74
const scrollPerFrame = 60;  // Changed from 30
```

### Disable Progress Indicator
```javascript
// Line 252
{false && isPinned && (  // Added "false &&"
```

### Different Speed for Mobile
```javascript
// Line 74-75
const scrollPerFrame = isMobile ? 20 : 40;
// Mobile: 20px/frame (faster)
// Desktop: 40px/frame (slower)
```

---

## Browser Console Commands

### Check Current State
```javascript
// Paste in browser console while on the page
console.log({
  frame: document.querySelector('#hero-section img')?.src?.match(/\/(\d+)\.png/)?.[1],
  isPinned: document.querySelector('#hero-section').classList.contains('fixed')
});
```

### Force Complete Animation
```javascript
// Skip to end (for testing)
window.scrollTo(0, 1000);
```

### Monitor Frame Changes
```javascript
setInterval(() => {
  const frame = document.querySelector('#hero-section img')?.src?.match(/\/(\d+)\.png/)?.[1];
  console.log('Current frame:', frame);
}, 100);
```

---

## Mobile Testing

### Chrome DevTools
1. Press F12 to open DevTools
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select iPhone or Android device
4. Refresh page
5. Click and drag on screen to simulate touch scroll

### Real Device
1. Get your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Start dev server: `npm run dev`
3. On mobile, navigate to: `http://YOUR_IP:3000`
4. Test touch scrolling

---

## Need More Info?

| Question | See File |
|----------|----------|
| How to adjust speed? | `ANIMATION_TUNING_GUIDE.md` |
| How does it work internally? | `SCROLL_STATE_MACHINE.md` |
| What was implemented? | `IMPLEMENTATION_SUMMARY.md` |
| Complete documentation? | `SCROLL_PINNING_DOCS.md` |
| How to test? | `HeroSection.test.jsx` |

---

## Common Questions

### Q: Does this work on all browsers?
**A**: Yes, works on Chrome, Firefox, Safari, Edge (modern versions)

### Q: Does it work on mobile?
**A**: Yes, uses touch events for mobile devices

### Q: Can I disable it?
**A**: Yes, comment out the entire `useEffect` that contains `handleWheel` (line ~68-225)

### Q: Will it affect other sections?
**A**: No, pinning only affects HeroSection. Other sections scroll normally.

### Q: Does it impact performance?
**A**: Minimal impact. Uses optimized event handlers and React best practices.

### Q: Can I track analytics?
**A**: Yes, add analytics calls in the pin/unpin logic. See `IMPLEMENTATION_SUMMARY.md` for examples.

---

## Visual Indicators

### When Working Correctly
- Progress indicator appears on right side when pinned
- Image sequence smoothly transitions (no flickering)
- No layout shifts when pinning/unpinning
- Smooth 60fps performance

### When Something's Wrong
- Images flicker or jump
- Page scrolls jerkily
- Can't scroll past hero section
- Progress bar doesn't appear
- Console shows errors

---

## Emergency Rollback

If you need to quickly disable the feature:

### Option 1: Comment Out Effect
```javascript
// Line 68
// useEffect(() => {
//   ... (entire scroll-pinning effect)
// }, [imagesLoaded, isPinned, scrollProgress]);
```

### Option 2: Always Unpin
```javascript
// Line 8
const [isPinned, setIsPinned] = useState(false);  // Keep it false
```

### Option 3: Skip Pinning Logic
```javascript
// Line 88
if (false && isAtTop && !animationCompleteRef.current) {  // Add "false &&"
```

---

## Success Checklist

After implementing, verify:

- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Images preload (loading screen shows)
- [ ] Scrolling down triggers pinning
- [ ] Frames advance smoothly
- [ ] Progress indicator appears
- [ ] Section unpins after completion
- [ ] Can scroll to next sections
- [ ] Scrolling back up re-pins section
- [ ] Frames reverse correctly
- [ ] Works on desktop
- [ ] Works on mobile
- [ ] No console errors
- [ ] Performance is smooth (60fps)

---

## Getting Help

1. Check console for errors
2. Review `SCROLL_PINNING_DOCS.md` for detailed explanations
3. Use browser DevTools to inspect state
4. Test in incognito mode (rules out extensions)
5. Clear cache and reload

---

## That's It!

You now have a working scroll-pinning animation. Test it, adjust the speed to your liking, and enjoy the smooth scrolling experience!

For detailed technical information, see the other documentation files.

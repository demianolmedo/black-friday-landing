# Scroll-Pinning Effect Documentation

## Overview
The HeroSection component now features an advanced scroll-pinning effect that locks the section in place while the user scrolls through a 30-frame animation sequence (frames 100-129).

## File Location
`C:\RENTSMART\black\black-friday-landing\src\components\HeroSection.jsx`

## How It Works

### Phase 1: Pin & Animate (Scroll Down)
1. When the hero section reaches the top of the viewport, it **pins** (becomes fixed position)
2. The section stays locked in place while user continues scrolling
3. Each scroll motion advances the frame animation (100 → 129)
4. The user needs to scroll approximately 900px worth to complete all 30 frames
5. A progress indicator appears on the right side showing scroll completion percentage

### Phase 2: Unpin & Continue
6. Once frame 129 is reached (100% progress), the section **unpins**
7. Normal scrolling resumes and user can continue to DescuentosSection and other content
8. The section returns to normal `position: relative`

### Phase 3: Reverse (Scroll Up)
9. When scrolling back up from lower sections
10. As user approaches the hero section, it **pins again**
11. Scroll up now plays frames in reverse (129 → 100)
12. Progress indicator shows decreasing percentage
13. Once frame 100 is reached (0% progress), section unpins for upward scroll

## Technical Implementation

### State Management
```javascript
const [isPinned, setIsPinned] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);
const scrollAccumulatorRef = useRef(0);
const animationCompleteRef = useRef(false);
```

- `isPinned`: Boolean tracking if section is currently locked
- `scrollProgress`: Float 0-1 representing animation completion
- `scrollAccumulatorRef`: Accumulates scroll delta while pinned
- `animationCompleteRef`: Tracks if user has completed forward animation

### Key Configuration
```javascript
const startFrame = 100;
const endFrame = 129;
const totalFrames = 30;
const scrollPerFrame = 30; // Pixels needed per frame
const totalScrollNeeded = 900; // Total scroll distance
```

**Adjustable Parameters:**
- `scrollPerFrame`: Change to make animation faster (lower) or slower (higher)
- Sensitivity multipliers in touch handlers (currently 1.5x)

### Event Handlers

#### Wheel Events (Desktop)
- Listens to `wheel` events with `passive: false` to enable `preventDefault()`
- Accumulates `e.deltaY` to track scroll progress
- Updates frame based on accumulated scroll
- Prevents default page scroll when pinned

#### Touch Events (Mobile)
- `touchstart`: Records initial touch position
- `touchmove`: Calculates touch delta and updates frame
- Uses 1.5x sensitivity multiplier for smoother mobile experience
- Prevents default touch scrolling when pinned

### CSS Classes & Styling

#### Pinned State
```javascript
className={`w-full min-h-screen overflow-hidden transition-all duration-300 ${
  isPinned
    ? 'fixed top-0 left-0 right-0 z-50'
    : 'relative'
}`}
```

#### Layout Spacer
When pinned, a spacer div is rendered to prevent layout shift:
```javascript
{isPinned && <div style={{ height: '100vh' }} />}
```

#### Progress Indicator
Visual feedback showing scroll completion:
```javascript
{isPinned && (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
    <div className="w-1 h-32 bg-white/20 rounded-full">
      <div style={{ height: `${scrollProgress * 100}%` }} />
    </div>
    <p>Scroll {Math.round(scrollProgress * 100)}%</p>
  </div>
)}
```

## Performance Optimizations

1. **RequestAnimationFrame**: Throttles scroll calculations
2. **Passive Listeners**: Used where preventDefault() isn't needed
3. **Ref-based Tracking**: Avoids unnecessary re-renders
4. **Conditional Mounting**: Progress indicator only renders when pinned
5. **Image Preloading**: All frames loaded before animation starts

## Browser Compatibility

- **Desktop**: Works with all modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: Touch events supported on iOS and Android
- **Fallback**: If JavaScript fails, images still load and section is scrollable

## Accessibility Considerations

- Animation only activates after images are loaded
- Section remains keyboard accessible
- No motion for users who prefer reduced motion (can be enhanced)
- Semantic HTML structure maintained

## Customization Guide

### Make Animation Faster
```javascript
const scrollPerFrame = 20; // Reduced from 30
```

### Make Animation Slower
```javascript
const scrollPerFrame = 50; // Increased from 30
```

### Adjust Mobile Sensitivity
```javascript
scrollAccumulatorRef.current += touchDelta * 2.0; // Increased from 1.5
```

### Change Progress Indicator Position
```javascript
<div className="fixed left-8 top-1/2"> // Changed from right-8
```

### Disable Progress Indicator
```javascript
{false && isPinned && ( // Add condition to hide
  <div className="fixed right-8...">
```

## Troubleshooting

### Animation feels too fast/slow
Adjust `scrollPerFrame` constant (line 74)

### Animation doesn't trigger on mobile
Check that touch events aren't being blocked by other components

### Section jumps when pinning
Ensure spacer div is rendering correctly when `isPinned` is true

### Frames don't update smoothly
Verify all images are preloaded before animation starts

### Can't scroll past hero section
Check `animationCompleteRef.current` logic in completion conditions

## Testing Checklist

- [ ] Scroll down through all 30 frames
- [ ] Section unpins at frame 129
- [ ] Can continue scrolling to next sections
- [ ] Scroll back up through reverse animation
- [ ] Section unpins at frame 100
- [ ] Progress indicator shows correct percentage
- [ ] Works on desktop with mouse wheel
- [ ] Works on desktop with trackpad
- [ ] Works on mobile with touch gestures
- [ ] No layout shift when pinning/unpinning
- [ ] Image sequence loads properly
- [ ] No performance issues during animation

## Future Enhancements

1. Add `prefers-reduced-motion` media query support
2. Implement keyboard controls (arrow keys)
3. Add animation completion callback
4. Create custom easing functions for frame transitions
5. Add haptic feedback for mobile devices
6. Implement skip button for accessibility
7. Add analytics tracking for scroll completion rate

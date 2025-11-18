# Scroll-Pinning State Machine

## Visual Flow Diagram

```
                                    PAGE LOAD
                                        |
                                        v
                    ┌─────────────────────────────────────┐
                    │         STATE: UNPINNED             │
                    │   Frame: 100                        │
                    │   Position: relative                │
                    │   animationComplete: false          │
                    └─────────────────────────────────────┘
                                        |
                                        | User scrolls down
                                        | Section reaches top
                                        v
                    ┌─────────────────────────────────────┐
                    │         STATE: PINNED               │
                    │   Frame: 100 → 129                  │
                    │   Position: fixed top-0             │
                    │   Progress: 0% → 100%               │
                    │   Body scroll: prevented            │
                    │   Progress indicator: visible       │
                    └─────────────────────────────────────┘
                                        |
                                        | scrollProgress >= 1
                                        | (Frame 129 reached)
                                        v
                    ┌─────────────────────────────────────┐
                    │   STATE: UNPINNED (COMPLETED)       │
                    │   Frame: 129 (frozen)               │
                    │   Position: relative                │
                    │   animationComplete: true           │
                    │   User can scroll to next sections  │
                    └─────────────────────────────────────┘
                                        |
                                        | User scrolls down more
                                        | (to DescuentosSection)
                                        v
                            [ Normal page scroll ]
                                        |
                                        | User scrolls back up
                                        | Approaches hero section
                                        v
                    ┌─────────────────────────────────────┐
                    │      STATE: RE-PINNED               │
                    │   Frame: 129 → 100 (REVERSE)        │
                    │   Position: fixed top-0             │
                    │   Progress: 100% → 0%               │
                    │   Body scroll: prevented            │
                    │   Progress indicator: visible       │
                    └─────────────────────────────────────┘
                                        |
                                        | scrollProgress <= 0
                                        | (Frame 100 reached)
                                        v
                    ┌─────────────────────────────────────┐
                    │      STATE: UNPINNED (RESET)        │
                    │   Frame: 100                        │
                    │   Position: relative                │
                    │   animationComplete: false          │
                    │   [CYCLE CAN REPEAT]                │
                    └─────────────────────────────────────┘
```

## State Transitions Table

| Current State | Trigger | Next State | Actions |
|--------------|---------|------------|---------|
| UNPINNED | Section reaches viewport top + scroll down | PINNED | `setIsPinned(true)`, reset accumulator |
| PINNED | Scroll down + progress < 100% | PINNED | Increment frame, update progress |
| PINNED | Scroll down + progress >= 100% | UNPINNED (COMPLETED) | `setIsPinned(false)`, `animationComplete = true` |
| UNPINNED (COMPLETED) | Scroll up + re-enter hero | RE-PINNED | `setIsPinned(true)`, set progress to 100% |
| RE-PINNED | Scroll up + progress > 0% | RE-PINNED | Decrement frame, update progress |
| RE-PINNED | Scroll up + progress <= 0% | UNPINNED (RESET) | `setIsPinned(false)`, `animationComplete = false` |

## State Variables

### React State
```javascript
isPinned: boolean          // Is section currently fixed?
scrollProgress: number     // 0.0 to 1.0
currentFrame: number       // 100 to 129
```

### Refs (Persistent)
```javascript
scrollAccumulatorRef: number        // Total scroll accumulated (0 to 900px)
animationCompleteRef: boolean       // Has user completed forward animation?
lastScrollYRef: number              // Previous scroll position
pinnedPositionRef: number           // Y position where pinning started
```

## Event Flow

### Wheel Event (Desktop)
```
1. User scrolls with mouse wheel
2. handleWheel() fires
3. Check section position (isAtTop)
4. If at top && !animationComplete:
   - Pin section
   - Prevent default scroll
   - Accumulate deltaY
   - Map to frame number
   - Update UI
5. If progress >= 1:
   - Unpin section
   - Mark animation complete
   - Allow normal scroll
```

### Touch Event (Mobile)
```
1. User touches screen
2. touchstart: Record initial Y position
3. User drags finger
4. touchmove fires repeatedly:
   - Calculate touch delta
   - Check section position
   - If pinned:
     * Prevent default scroll
     * Accumulate delta
     * Update frame
     * Update progress
5. If progress >= 1 or <= 0:
   - Unpin section
   - Update animation state
```

## Critical Conditions

### Pin Activation (Forward)
```javascript
const isAtTop = rect.top <= 0 && rect.bottom > 0;
const shouldPin = isAtTop && !animationCompleteRef.current;
```

### Pin Deactivation (Forward Complete)
```javascript
const shouldUnpin = scrollProgress >= 1 && isPinned;
// Also set: animationCompleteRef.current = true
```

### Pin Re-activation (Reverse)
```javascript
const shouldRePin = animationCompleteRef.current &&
                    scrollDelta < 0 &&
                    window.scrollY <= window.innerHeight + 100;
```

### Pin Deactivation (Reverse Complete)
```javascript
const shouldUnpinReverse = scrollProgress <= 0 && isPinned;
// Also set: animationCompleteRef.current = false
```

## CSS Transitions

### Pinned
```css
position: fixed
top: 0
left: 0
right: 0
z-index: 50
height: 100vh
```

### Unpinned
```css
position: relative
height: auto
min-height: 100vh
```

### Spacer (when pinned)
```html
<div style="height: 100vh"></div>
```
Purpose: Prevents layout shift when section becomes fixed

## Frame Calculation

```javascript
// Forward (scroll down)
frame = Math.round(100 + (scrollProgress * 29))
// scrollProgress: 0.0  → frame: 100
// scrollProgress: 0.5  → frame: 114-115
// scrollProgress: 1.0  → frame: 129

// Reverse (scroll up)
// Same formula, but scrollProgress decreases
// scrollProgress: 1.0  → frame: 129
// scrollProgress: 0.5  → frame: 114-115
// scrollProgress: 0.0  → frame: 100
```

## Progress Calculation

```javascript
const totalScrollNeeded = 900; // 30 frames * 30px per frame
const progress = scrollAccumulatorRef.current / totalScrollNeeded;
// Clamped: Math.max(0, Math.min(1, progress))
```

## Performance Considerations

### Throttling
- Uses `requestAnimationFrame` in scroll handlers (disabled but can be re-enabled)
- Passive event listeners where possible
- Direct DOM manipulation avoided (React state updates)

### Memory
- Refs used for high-frequency updates (no re-renders)
- State used for visual updates only
- Event listeners cleaned up on unmount

### Repaints
- Fixed positioning reduces repaints
- Transform properties (progress indicator) use GPU
- Image sequence preloaded to avoid reflows

## Debugging Tips

### Check Current State
```javascript
console.log({
  isPinned,
  scrollProgress,
  currentFrame,
  animationComplete: animationCompleteRef.current,
  accumulator: scrollAccumulatorRef.current
});
```

### Monitor Events
```javascript
window.addEventListener('wheel', (e) => {
  console.log('Wheel delta:', e.deltaY);
});

window.addEventListener('touchmove', (e) => {
  console.log('Touch Y:', e.touches[0].clientY);
});
```

### Verify Boundaries
- Frame should never be < 100 or > 129
- scrollProgress should never be < 0 or > 1
- accumulator should be 0-900

## Common Issues & Solutions

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| Section won't pin | isAtTop condition not met | Check rect.top calculation |
| Animation too fast | scrollPerFrame too low | Increase from 30 to 40-50 |
| Animation too slow | scrollPerFrame too high | Decrease from 30 to 20 |
| Frames skip | Delta multiplier too high | Reduce sensitivity multiplier |
| Can't scroll past | Unpin condition not firing | Check progress >= 1 logic |
| Layout shifts | Spacer not rendering | Verify isPinned state |
| Mobile not working | Touch events blocked | Check passive/preventDefault |
| Frames don't update | Images not loaded | Verify imagesLoaded state |

## Testing Commands

### Simulate Forward Scroll
```javascript
// In browser console
for (let i = 0; i < 30; i++) {
  window.dispatchEvent(new WheelEvent('wheel', { deltaY: 30 }));
}
```

### Simulate Reverse Scroll
```javascript
for (let i = 0; i < 30; i++) {
  window.dispatchEvent(new WheelEvent('wheel', { deltaY: -30 }));
}
```

### Force Pin State
```javascript
// Access component via React DevTools
// Manually set isPinned = true
```

### Monitor Frame Changes
```javascript
const observer = new MutationObserver(() => {
  const img = document.querySelector('#hero-section img');
  console.log('Current frame:', img.src.match(/\/(\d+)\.png/)[1]);
});

observer.observe(document.querySelector('#hero-section'), {
  subtree: true,
  attributes: true,
  attributeFilter: ['src']
});
```

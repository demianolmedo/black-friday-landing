# Animation Tuning Guide

## Quick Settings Reference

### File Location
`C:\RENTSMART\black\black-friday-landing\src\components\HeroSection.jsx`

## Main Configuration (Line 71-75)

```javascript
const startFrame = 100;              // First frame in sequence
const endFrame = 129;                // Last frame in sequence
const totalFrames = 30;              // Number of frames
const scrollPerFrame = 30;           // ⚙️ ADJUST THIS for speed
const totalScrollNeeded = 900;       // Auto-calculated
```

---

## Animation Speed Presets

### Very Fast (Aggressive)
```javascript
const scrollPerFrame = 15;  // 450px total scroll
```
- **Effect**: Animation completes in ~15 scroll wheel ticks
- **Use case**: High-energy, punchy reveal
- **Mobile**: May feel too fast on touch

### Fast
```javascript
const scrollPerFrame = 20;  // 600px total scroll
```
- **Effect**: Quick but controlled animation
- **Use case**: Modern, snappy feel
- **Mobile**: Good balance

### Medium (Current Default)
```javascript
const scrollPerFrame = 30;  // 900px total scroll
```
- **Effect**: Deliberate, noticeable animation
- **Use case**: Ensures users see the full effect
- **Mobile**: Comfortable pace

### Slow
```javascript
const scrollPerFrame = 40;  // 1200px total scroll
```
- **Effect**: Cinematic, dramatic reveal
- **Use case**: Storytelling, emphasis
- **Mobile**: May feel sluggish

### Very Slow (Cinematic)
```javascript
const scrollPerFrame = 60;  // 1800px total scroll
```
- **Effect**: Ultra-slow, immersive experience
- **Use case**: Hero videos, product launches
- **Mobile**: Requires patience

---

## Sensitivity Multipliers

### Desktop (Wheel Events) - Line 98

```javascript
scrollAccumulatorRef.current += delta * 1.0;  // Default
```

**Adjust the multiplier:**
- `0.5`: Half speed (smoother, more controlled)
- `1.0`: Normal speed (default)
- `1.5`: 1.5x faster (more responsive)
- `2.0`: Double speed (very fast)

### Mobile (Touch Events) - Line 174

```javascript
scrollAccumulatorRef.current += touchDelta * 1.5;  // Default
```

**Adjust the multiplier:**
- `1.0`: Slower, more drag needed
- `1.5`: Balanced (default)
- `2.0`: Faster, less drag needed
- `3.0`: Very responsive

---

## Real-World Scenarios

### Scenario 1: "Users are scrolling past too quickly"
**Problem**: Animation completes before users notice it
**Solution**:
```javascript
const scrollPerFrame = 50;  // Increase from 30
```

### Scenario 2: "Animation feels too slow on mobile"
**Problem**: Touch users get impatient
**Solution**:
```javascript
scrollAccumulatorRef.current += touchDelta * 2.5;  // Increase from 1.5
```

### Scenario 3: "Desktop users complain it's too fast"
**Problem**: Mouse wheel users finish animation instantly
**Solution**:
```javascript
scrollAccumulatorRef.current += delta * 0.5;  // Decrease from 1.0
```

### Scenario 4: "Want different speeds for desktop vs mobile"
**Problem**: One size doesn't fit all devices
**Solution**:
```javascript
// Line 74-75
const scrollPerFrame = isMobile ? 20 : 35;  // Faster mobile, slower desktop
```

---

## Progress Indicator Settings

### Position (Line 253)

```javascript
// Right side (default)
className="fixed right-8 top-1/2 -translate-y-1/2"

// Left side
className="fixed left-8 top-1/2 -translate-y-1/2"

// Bottom center
className="fixed bottom-8 left-1/2 -translate-x-1/2"
```

### Size (Line 254)

```javascript
// Default
className="w-1 h-32"

// Thicker
className="w-2 h-32"

// Taller
className="w-1 h-48"

// Subtle
className="w-0.5 h-24"
```

### Visibility

```javascript
// Always show (even when not pinned)
{true && (
  <div className="fixed right-8...">
)}

// Never show (disable completely)
{false && isPinned && (
  <div className="fixed right-8...">
)}

// Show only when pinned (default)
{isPinned && (
  <div className="fixed right-8...">
)}
```

---

## Frame Interpolation Options

### Current: Rounded (Discrete Frames)
```javascript
const frame = Math.round(startFrame + progress * (endFrame - startFrame));
```
- **Effect**: Jumps between frames (100, 101, 102...)
- **Visual**: Crisp, clear frame changes

### Option: Floored (Slower Progression)
```javascript
const frame = Math.floor(startFrame + progress * (endFrame - startFrame));
```
- **Effect**: Holds each frame longer
- **Visual**: More time per frame

### Option: Ceiled (Faster Progression)
```javascript
const frame = Math.ceil(startFrame + progress * (endFrame - startFrame));
```
- **Effect**: Advances to next frame sooner
- **Visual**: Slightly ahead of scroll

---

## Advanced: Easing Functions

### Linear (Current Default)
```javascript
const progress = scrollAccumulatorRef.current / totalScrollNeeded;
```
- **Curve**: Straight line
- **Feel**: Constant speed

### Ease-Out (Slow Finish)
```javascript
const rawProgress = scrollAccumulatorRef.current / totalScrollNeeded;
const progress = 1 - Math.pow(1 - rawProgress, 3); // Cubic ease-out
```
- **Curve**: Fast start, slow end
- **Feel**: Deliberate finish

### Ease-In (Slow Start)
```javascript
const rawProgress = scrollAccumulatorRef.current / totalScrollNeeded;
const progress = Math.pow(rawProgress, 3); // Cubic ease-in
```
- **Curve**: Slow start, fast end
- **Feel**: Building momentum

### Ease-In-Out (Smooth Both Ends)
```javascript
const rawProgress = scrollAccumulatorRef.current / totalScrollNeeded;
const progress = rawProgress < 0.5
  ? 4 * Math.pow(rawProgress, 3)
  : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
```
- **Curve**: Slow start and end
- **Feel**: Natural, organic

---

## Testing Methodology

### 1. Set Initial Value
```javascript
const scrollPerFrame = 30;
```

### 2. Test Scroll Count
- Open page in browser
- Count how many wheel scrolls needed to complete animation
- **Target**: 20-40 scrolls is typical

### 3. Test Touch Drag Distance
- Open on mobile device
- Measure approximate finger drag distance
- **Target**: 1-2 full screen heights

### 4. Gather Feedback
- Ask 3-5 users to test
- Note: "too fast", "too slow", or "just right"
- Adjust by ±5 increments

### 5. A/B Test (Optional)
```javascript
// Randomize for 50% of users
const scrollPerFrame = Math.random() > 0.5 ? 25 : 35;
console.log('Variant:', scrollPerFrame);
```

---

## Performance Impact

### Lower scrollPerFrame (Faster Animation)
- ✅ Faster completion
- ✅ Less scroll needed
- ⚠️ More frame updates per second
- ⚠️ Can feel rushed

### Higher scrollPerFrame (Slower Animation)
- ✅ More time to appreciate frames
- ✅ Smoother perceived motion
- ⚠️ Users may get impatient
- ⚠️ Longer scroll distance

---

## Recommended Settings by Use Case

### E-commerce Product Launch
```javascript
const scrollPerFrame = 40;           // Slow, deliberate
const wheelMultiplier = 0.8;         // Controlled
const touchMultiplier = 1.5;         // Standard
```

### Portfolio/Agency Site
```javascript
const scrollPerFrame = 25;           // Fast, modern
const wheelMultiplier = 1.2;         // Snappy
const touchMultiplier = 2.0;         // Responsive
```

### Storytelling/Editorial
```javascript
const scrollPerFrame = 50;           // Very slow
const wheelMultiplier = 0.6;         // Cinematic
const touchMultiplier = 1.2;         // Controlled
```

### Black Friday Sale (Current)
```javascript
const scrollPerFrame = 30;           // Balanced
const wheelMultiplier = 1.0;         // Standard
const touchMultiplier = 1.5;         // Slightly fast
```

---

## Debugging Helpers

### Log Animation Speed
```javascript
// Add inside handleWheel
console.log('Frame:', frame, 'Progress:', Math.round(scrollProgress * 100) + '%');
```

### Visualize Scroll Distance
```javascript
// Add to component
useEffect(() => {
  console.log('Total scroll needed:', totalScrollNeeded, 'px');
  console.log('Frames:', totalFrames);
  console.log('Pixels per frame:', scrollPerFrame);
}, []);
```

### Test Auto-Complete
```javascript
// Add a button for testing
<button onClick={() => {
  scrollAccumulatorRef.current = totalScrollNeeded;
  setScrollProgress(1);
  setCurrentFrame(129);
}}>
  Skip to End
</button>
```

---

## Accessibility Considerations

### Prefer Reduced Motion
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollPerFrame = prefersReducedMotion ? 10 : 30; // Much faster if motion-reduced
```

### Skip Button
```javascript
<button
  onClick={() => {
    setIsPinned(false);
    animationCompleteRef.current = true;
    setCurrentFrame(129);
  }}
  className="fixed top-4 right-4 z-50"
>
  Skip Animation
</button>
```

---

## Change Log Template

When you adjust settings, document them:

```markdown
## Animation Tuning Changes

### 2025-11-18
- Changed scrollPerFrame from 30 to 35
- Reason: Users reported animation too fast
- Result: 16% increase in scroll distance
- Feedback: Positive, felt more controlled

### 2025-11-17
- Increased touchMultiplier from 1.5 to 2.0
- Reason: Mobile users struggling to complete animation
- Result: 33% faster touch response
- Feedback: Much better on mobile
```

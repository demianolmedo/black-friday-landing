# Visual Reference Card

## Scroll-Pinning Animation Effect

---

## Visual Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAGE LOADS                              │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │                    HERO SECTION                             │ │
│  │                                                             │ │
│  │              50% off                                        │ │
│  │         cachetadas de                                       │ │
│  │            DESCUENTOS%                                      │ │
│  │                                                             │ │
│  │          [Frame 100 Image]                                  │ │
│  │                                                             │ │
│  │         position: relative                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         DESCUENTOS SECTION (Below)                          │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

                    ↓ USER SCROLLS DOWN ↓

┌─────────────────────────────────────────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                 HERO SECTION (PINNED)                     ┃  │
│  ┃                                                           ┃  │
│  ┃              50% off                                      ┃  │
│  ┃         cachetadas de                                     ┃  │
│  ┃            DESCUENTOS%                                    ┃  │
│  ┃                                                           ┃  │
│  ┃          [Frame 101 Image]                                ┃  │
│  ┃                                                           ┃  │
│  ┃         position: fixed                     ║ Progress ║  ┃  │
│  ┃         top: 0                              ║   3%     ║  ┃  │
│  ┃         z-index: 50                         ║▓▓░░░░░░░║  ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                                                 │
│                                                                 │
│  [User continues scrolling but page doesn't move]              │
│  [Only the frame number updates]                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                    ↓ KEEP SCROLLING ↓

┌─────────────────────────────────────────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                 HERO SECTION (PINNED)                     ┃  │
│  ┃                                                           ┃  │
│  ┃              50% off                                      ┃  │
│  ┃         cachetadas de                                     ┃  │
│  ┃            DESCUENTOS%                                    ┃  │
│  ┃                                                           ┃  │
│  ┃          [Frame 115 Image]  ← Halfway                     ┃  │
│  ┃                                                           ┃  │
│  ┃         position: fixed                     ║ Progress ║  ┃  │
│  ┃         top: 0                              ║   50%    ║  ┃  │
│  ┃         z-index: 50                         ║▓▓▓▓▓░░░░║  ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────────────────────────────────────────┘

                    ↓ ALMOST THERE ↓

┌─────────────────────────────────────────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                 HERO SECTION (PINNED)                     ┃  │
│  ┃                                                           ┃  │
│  ┃              50% off                                      ┃  │
│  ┃         cachetadas de                                     ┃  │
│  ┃            DESCUENTOS%                                    ┃  │
│  ┃                                                           ┃  │
│  ┃          [Frame 129 Image]  ← Final Frame                 ┃  │
│  ┃                                                           ┃  │
│  ┃         position: fixed                     ║ Progress ║  ┃  │
│  ┃         top: 0                              ║  100%    ║  ┃  │
│  ┃         z-index: 50                         ║▓▓▓▓▓▓▓▓▓║  ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────────────────────────────────────────┘

                    ↓ ANIMATION COMPLETE ↓
                    ↓ SECTION UNPINS ↓

┌─────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                 HERO SECTION (UNPINNED)                     │ │
│  │                                                             │ │
│  │              50% off                                        │ │
│  │         cachetadas de                                       │ │
│  │            DESCUENTOS%                                      │ │
│  │                                                             │ │
│  │          [Frame 129 Image - Frozen]                         │ │
│  │                                                             │ │
│  │         position: relative        [Progress indicator OFF] │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         DESCUENTOS SECTION                                  │ │
│  │         (Now user can scroll here)                          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         OTHER SECTIONS...                                   │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## State Diagram

```
    START
      │
      ├─→ [UNPINNED]
      │     │
      │     │ Scroll Down
      │     │ Section reaches top
      │     ↓
      ├─→ [PINNED - Forward]
      │     │ Frame: 100 → 129
      │     │ Progress: 0% → 100%
      │     │ Position: fixed
      │     │ Scroll: Prevented
      │     │ Indicator: Visible
      │     ↓
      │   progress >= 1
      │     ↓
      ├─→ [UNPINNED - Complete]
      │     │ Frame: 129 (frozen)
      │     │ Position: relative
      │     │ Normal scroll resumes
      │     ↓
      │   User scrolls more
      │     ↓
      │   User scrolls back up
      │     ↓
      ├─→ [PINNED - Reverse]
      │     │ Frame: 129 → 100
      │     │ Progress: 100% → 0%
      │     │ Position: fixed
      │     │ Scroll: Prevented
      │     │ Indicator: Visible
      │     ↓
      │   progress <= 0
      │     ↓
      └─→ [UNPINNED - Reset]
          Frame: 100
          Position: relative
          ↓
        [CYCLE REPEATS]
```

---

## Component Structure

```
<HeroSection>                              ← Main container
  │
  ├─ [Spacer Div]                          ← When pinned (prevents layout shift)
  │   style={{ height: '100vh' }}
  │   Rendered: only if isPinned === true
  │
  └─ <section>                             ← Hero section
      │  id="hero-section"
      │  ref={sectionRef}
      │  className={isPinned ? 'fixed' : 'relative'}
      │
      ├─ Background gradient                ← Visual styling
      │
      ├─ Decorative orbs                    ← Visual styling
      │
      ├─ [Progress Indicator]               ← Scroll progress
      │   │  Rendered: only if isPinned === true
      │   │  Position: fixed right-8 top-1/2
      │   │
      │   ├─ Vertical bar                   ← Height container
      │   │   className="w-1 h-32"
      │   │
      │   └─ Progress fill                  ← Animated height
      │       style={{ height: `${scrollProgress * 100}%` }}
      │
      ├─ [Loading Overlay]                  ← Image preloading
      │   Rendered: only if !imagesLoaded
      │
      └─ Content container
          │
          ├─ "50% off" heading              ← Text content
          │
          ├─ "cachetadas de" subtitle       ← Text content
          │
          ├─ "DESCUENTOS%" title            ← Text content
          │
          └─ <img>                          ← Animated image
              src={`.../${currentFrame}.png`}
              Frame: 100-129 (dynamic)
```

---

## Event Flow Diagram

```
USER ACTION                  BROWSER EVENT              COMPONENT RESPONSE
─────────────────────────────────────────────────────────────────────────

Mouse Wheel Scroll      →   wheel event          →     handleWheel()
                                                        ├─ Check isAtTop
                                                        ├─ setIsPinned(true)
                                                        ├─ e.preventDefault()
                                                        ├─ Accumulate delta
                                                        ├─ Calculate progress
                                                        ├─ Update frame
                                                        └─ Update UI

Touch Start             →   touchstart           →     handleTouchStart()
                                                        └─ Record initial Y

Touch Move (drag)       →   touchmove            →     handleTouchMove()
                                                        ├─ Check isAtTop
                                                        ├─ setIsPinned(true)
                                                        ├─ e.preventDefault()
                                                        ├─ Calculate delta
                                                        ├─ Accumulate delta
                                                        ├─ Calculate progress
                                                        ├─ Update frame
                                                        └─ Update UI

Progress reaches 100%   →   (internal check)     →     Unpin logic
                                                        ├─ animationComplete = true
                                                        ├─ setIsPinned(false)
                                                        └─ Allow normal scroll

Scroll back up          →   wheel/touch (up)     →     Re-pin logic
                                                        ├─ setIsPinned(true)
                                                        ├─ scrollAccumulator = max
                                                        └─ Reverse animation

Progress reaches 0%     →   (internal check)     →     Unpin logic
                                                        ├─ animationComplete = false
                                                        ├─ setIsPinned(false)
                                                        └─ Allow normal scroll
```

---

## CSS State Transitions

```
UNPINNED STATE:
┌────────────────────────────┐
│ .relative                  │
│ .min-h-screen              │
│ .overflow-hidden           │
│                            │
│ height: auto               │
│ position: relative         │
│ z-index: (default)         │
└────────────────────────────┘

        ↓ Pin triggered

PINNED STATE:
┌────────────────────────────┐
│ .fixed                     │
│ .top-0                     │
│ .left-0                    │
│ .right-0                   │
│ .z-50                      │
│ .min-h-screen              │
│ .overflow-hidden           │
│                            │
│ height: 100vh              │
│ position: fixed            │
│ z-index: 50                │
└────────────────────────────┘

    ↓ Animation complete

UNPINNED STATE:
[Returns to initial state]
```

---

## Progress Indicator Visual

```
RIGHT SIDE OF SCREEN:

                            │
                            │
         ┌──────────────────┼────────┐
         │                  │        │
         │                  ╔════╗   │
         │                  ║▓▓▓▓║ ← Filled portion
         │                  ║▓▓▓▓║   (scrollProgress * 100%)
         │      SCREEN      ║░░░░║
         │                  ║░░░░║ ← Empty portion
         │      CENTER      ║░░░░║
         │                  ║░░░░║
         │                  ╚════╝
         │                    │
         │                "Scroll 45%"
         │
         └──────────────────┼────────┘
                            │
                            │

Elements:
- Vertical bar: h-32 (128px tall)
- Width: w-1 (4px wide)
- Background: white/20 (semi-transparent)
- Fill: gradient green (verde-neon)
- Text: Current percentage
```

---

## Scroll Distance Visualization

```
TOTAL SCROLL NEEDED: 900px
(30 frames × 30px per frame)

┌─────────────────────────────────────────────────────────────┐
│ Frame 100 ─────────────────────────────────────────────────►│
├─────────────────────────────────────────────────────────────┤
│ 0px                                                    900px │
│ │                                                          │ │
│ │◄────────────────────── 900px ─────────────────────────►│ │
│ │                                                          │ │
│ │     Each tick = 30px scroll                              │ │
│ │     │                                                     │ │
│ │     ▼                                                     │ │
│ ├──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┤ │
│ 100 101 102 103 104 105 106 107 108 109 110 111 112 ... 129│
│                                                             │
│ Progress:  0%  3%  7% 10% 14% 17% 21% 24% ... 97% 100%     │
└─────────────────────────────────────────────────────────────┘

Example:
- Scroll 0px    → Frame 100, Progress 0%
- Scroll 150px  → Frame 105, Progress 17%
- Scroll 450px  → Frame 115, Progress 50%
- Scroll 750px  → Frame 125, Progress 83%
- Scroll 900px  → Frame 129, Progress 100%
```

---

## Mobile vs Desktop

```
DESKTOP (Wheel Events)
─────────────────────────────────────────
Input:     Mouse wheel / Trackpad
Event:     wheel
Delta:     e.deltaY (typically 10-100)
Multiplier: 1.0x (standard)
Feel:      Direct, responsive
Accumulation: delta × 1.0

Typical scroll to complete:
~20-30 wheel movements


MOBILE (Touch Events)
─────────────────────────────────────────
Input:     Finger drag
Event:     touchstart, touchmove
Delta:     touchStartY - currentY
Multiplier: 1.5x (faster)
Feel:      Smooth, natural
Accumulation: delta × 1.5

Typical scroll to complete:
~1.5 screen heights of dragging
```

---

## Frame Sequence Preview

```
Frame 100  ░░░░░░░░░░  Start position
Frame 105  ▓░░░░░░░░░  17% complete
Frame 110  ▓▓▓░░░░░░░  33% complete
Frame 115  ▓▓▓▓▓░░░░░  50% complete (halfway!)
Frame 120  ▓▓▓▓▓▓▓░░░  67% complete
Frame 125  ▓▓▓▓▓▓▓▓▓░  83% complete
Frame 129  ▓▓▓▓▓▓▓▓▓▓  100% complete (UNPIN)
```

---

## Performance Metrics

```
TARGET METRICS:
┌─────────────────────────────────────┐
│ Frame Rate:          60 FPS         │
│ Frame Duration:      16.67ms        │
│ Scroll Jank:         < 5%           │
│ CPU Usage:           < 30%          │
│ Memory:              Stable         │
│ Load Time:           < 3s           │
└─────────────────────────────────────┘

OPTIMIZATIONS:
✓ Passive listeners (touchstart)
✓ Non-passive only when needed
✓ Ref-based state (no excess renders)
✓ Conditional mounting
✓ Image preloading
✓ Transform-based animations
```

---

## Debugging Visual Aids

### Check Current State
```javascript
// Browser console
const img = document.querySelector('#hero-section img');
const currentFrame = img.src.match(/\/(\d+)\.png/)[1];
const isPinned = document.querySelector('#hero-section').classList.contains('fixed');

console.table({
  Frame: currentFrame,
  IsPinned: isPinned,
  ExpectedRange: '100-129'
});
```

### Monitor Real-time
```javascript
// Live frame counter
setInterval(() => {
  const frame = document.querySelector('#hero-section img')?.src?.match(/\/(\d+)\.png/)?.[1];
  document.title = `Frame ${frame}`;
}, 50);
```

---

## Quick Reference Table

| Metric | Value | Location |
|--------|-------|----------|
| Total Frames | 30 | startFrame to endFrame |
| Frame Range | 100-129 | Config constants |
| Scroll Distance | 900px | scrollPerFrame × totalFrames |
| Pixels per Frame | 30px | scrollPerFrame constant |
| Desktop Multiplier | 1.0x | handleWheel function |
| Mobile Multiplier | 1.5x | handleTouchMove function |
| Progress Bar Height | 128px | h-32 class (8 × 16px) |
| Progress Bar Width | 4px | w-1 class (0.25rem) |
| Z-index (pinned) | 50 | className when fixed |

---

This visual reference provides a quick overview of the scroll-pinning animation system.
For detailed implementation, see `SCROLL_PINNING_DOCS.md`.

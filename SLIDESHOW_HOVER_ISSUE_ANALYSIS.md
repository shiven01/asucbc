# Slideshow Hover Issue Analysis & Solution Options

## Problem Description

The team page slideshow experiences an inconsistent hover behavior where:
1. **When hovering over a person's face/image**: The slideshow animation pauses
2. **When moving the cursor down to the description dropdown**: The slideshow animation resumes
3. **Expected behavior**: The slideshow should remain paused for the entire hover area

## Root Cause Analysis

### Current Implementation (Lines 84-89, 97-104)
```typescript
const hoverHandlers = isTouch
  ? {}
  : {
      onMouseEnter: () => hasDescription && setOpenDropdown(memberId),
      onMouseLeave: () => setOpenDropdown(null),
    };

return (
  <div
    // ... container setup
    {...hoverHandlers}  // Applied to the main container div
  >
    {/* Face/image area */}
    {/* Name */}
    {/* Button area */}
    {/* Description dropdown (conditionally rendered) */}
  </div>
);
```

### Animation Control Logic (Lines 192, 221-223)
```typescript
<div className={`flex ${openDropdown ? 'paused' : ''}`}>
```

```css
.paused {
  animation-play-state: paused !important;
}
```

### The Issue
The problem stems from **mouse event handling boundaries**:

1. **Main container** (`renderTeamMember` div) has `onMouseEnter`/`onMouseLeave` handlers
2. **Description dropdown** is absolutely positioned outside this container's bounds
3. When the mouse moves from the container to the dropdown, it triggers `onMouseLeave` → `setOpenDropdown(null)` → animation resumes
4. This creates a "gap" in hover detection between the container and the dropdown

## Detailed Problem Flow

1. User hovers over team member face/image → `onMouseEnter` fires → `setOpenDropdown(memberId)` → animation pauses ✅
2. User moves mouse toward description → Mouse exits main container → `onMouseLeave` fires → `setOpenDropdown(null)` → animation resumes ❌
3. User reaches dropdown area → No hover handlers on dropdown → Animation stays running ❌
4. Only when mouse re-enters the main container does it pause again

## Potential Solutions

### Solution 1: Extended Hover Area with CSS
**Approach**: Create a pseudo-element or invisible area that bridges the gap between the container and dropdown.

**Implementation**:
- Add a CSS pseudo-element (`::before` or `::after`) to extend the hover area
- Position it to fill the gap between container and dropdown
- Use CSS-only hover detection or event delegation

**Pros**: Minimal JavaScript changes, clean CSS solution
**Cons**: Complex positioning, may need adjustments for different screen sizes

### Solution 2: Unified Hover Container
**Approach**: Wrap both the team member card and the dropdown in a single hover-detection container.

**Implementation**:
- Create a wrapper div around both the team member card and dropdown
- Move hover handlers to this wrapper
- Adjust absolute positioning of dropdown relative to wrapper

**Pros**: Clean event handling, reliable hover detection
**Cons**: Requires restructuring of the component layout

### Solution 3: Mouse Position Tracking
**Approach**: Use more sophisticated mouse tracking to maintain dropdown state when mouse is in the "bridge" area.

**Implementation**:
- Track mouse position relative to both container and dropdown
- Use `onMouseLeave` with debouncing and position checking
- Only close dropdown if mouse has truly left both areas

**Pros**: Maintains current structure
**Cons**: Complex logic, potential performance implications

### Solution 4: CSS-Only Animation Control with Data Attributes
**Approach**: Use CSS hover states combined with data attributes instead of JavaScript state.

**Implementation**:
- Use CSS `:hover` pseudo-class on a wrapper
- Control animation via CSS custom properties
- Remove JavaScript hover handlers entirely

**Pros**: Pure CSS solution, better performance
**Cons**: May need refactoring of dropdown visibility logic

### Solution 5: Expanded Container with Negative Margins/Positioning
**Approach**: Extend the main container's hover area to include the dropdown space.

**Implementation**:
- Add invisible padding/margin to the container that extends into dropdown area
- Position the dropdown relative to this expanded area
- Keep existing hover handlers

**Pros**: Minimal code changes
**Cons**: May affect layout and positioning calculations

### Solution 6: Event Delegation with Document-Level Tracking
**Approach**: Use document-level mouse tracking to determine when to show/hide dropdown.

**Implementation**:
- Add document-level `mousemove` listener
- Calculate if mouse is within bounds of container OR dropdown
- Update dropdown state based on position calculations

**Pros**: Precise control over hover area
**Cons**: More complex implementation, performance considerations

## Recommended Solution

**Solution 2: Unified Hover Container** appears to be the most robust approach because:

1. **Clean Architecture**: Single hover detection area eliminates boundary issues
2. **Maintainable**: Clear separation of concerns
3. **Reliable**: No gaps in hover detection
4. **Future-proof**: Easy to extend if layout changes

### Implementation Strategy:
1. Create a wrapper div that encompasses both the team member card and dropdown area
2. Move hover event handlers to this wrapper
3. Adjust dropdown positioning to be relative to the wrapper
4. Ensure the wrapper has appropriate dimensions to cover the intended hover area

This solution would eliminate the mouse event boundary issue while maintaining the current animation pause/resume functionality.

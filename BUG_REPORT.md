# Bug Report: Hamburger Menu State Not Resetting on Resize

## Bug Description

**File:** `portfolio/js/main.js`

**Issue:** The state of the responsive hamburger menu does not reset when the browser window is resized.

**Steps to Reproduce:**
1.  Open the application in a mobile-sized viewport (less than 768px wide).
2.  Click the hamburger icon to open the navigation menu. The menu will appear, and the icon will change to an 'X'.
3.  Resize the browser window to a desktop-sized viewport (wider than 768px). The navigation menu will disappear as expected (due to CSS media queries), but the underlying JavaScript state is not reset.
4.  Resize the browser window back to a mobile-sized viewport.

**Expected Behavior:** The navigation menu should be closed, and the hamburger icon should be in its default state.

**Actual Behavior:** The navigation menu reappears in its open state because the `active` classes were never removed from the hamburger and nav-menu elements.

## Impact

This bug creates a confusing and inconsistent user experience. Users who resize their browser may find the menu unexpectedly open when returning to a mobile view, which is not standard or intuitive behavior for a responsive navigation menu.

## Proposed Fix

The solution is to add a `resize` event listener to the `window` object. This listener will check the `window.innerWidth`. If the width is greater than the mobile breakpoint (768px), it will programmatically remove the `active` class from both the hamburger icon and the navigation menu element. This ensures that the menu's state is always reset when the user transitions to a desktop layout, preventing the bug from reoccurring.

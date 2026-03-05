# Universal Progress Bar Implementation

## Overview

A universal progress bar component has been created to show verification progress across the OnePass Mobile Web App. The progress bar displays 4 verification steps and is conditionally shown based on business type and plan.

## Progress Bar Component Location

**File:** `src/Components/ProgressBar.jsx`

## Display Conditions

The progress bar is **only displayed** when:

- **Business Type:** Corporate OR Hospitality
- **Business Plan:** SMB OR Enterprise

## Verification Steps

1. **Verify Email** (Step 1)
   - Pages: `/email`, `/email-verification`
   - Color: Yellow (Active) / Green (Completed) / Gray (Pending)

2. **Consent** (Step 2)
   - Pages: `/consent`
   - Color: Yellow (Active) / Green (Completed) / Gray (Pending)

3. **Verify ID** (Step 3)
   - Pages: `/id-verification`
   - Color: Yellow (Active) / Green (Completed) / Gray (Pending)

4. **OTP Code / Face Match** (Step 4)
   - Pages: `/verification-code`, `/verification`, `/face-match`
   - Color: Yellow (Active) / Green (Completed) / Gray (Pending)

## Color Logic

### For Each Step:

- **Gray (Inactive):** Steps that haven't been reached yet
- **Yellow (Active):** The current step the user is on
- **Green (Completed):** Steps already completed

### Progress Connector Line:

- Shows the overall progress from Step 1 to Step 4
- Green indicates completed portions
- Gray indicates pending portions

## Pages Updated with Progress Bar

### 1. EmailCapture.jsx (`/email`)

- Import added: `import ProgressBar from "../Components/ProgressBar";`
- Component added after `<MobileHeader />`
- **Step Status:** Verify Email = Yellow, Others = Gray

### 2. EmailVerification.jsx (`/email-verification`)

- Import added: `import ProgressBar from "../Components/ProgressBar";`
- Component added after `<MobileHeader />`
- **Step Status:** Verify Email = Yellow, Others = Gray

### 3. Consent.jsx (`/consent`)

- Import added: `import ProgressBar from "../Components/ProgressBar";`
- Component added after `<MobileHeader />`
- **Step Status:** Verify Email = Green, Consent = Yellow, Others = Gray

### 4. IdVerification.jsx (`/id-verification`)

- Import added: `import ProgressBar from "../Components/ProgressBar";`
- Component added after `<MobileHeader />`
- **Step Status:** Verify Email = Green, Consent = Green, Verify ID = Yellow, OTP = Gray

### 5. VerificationCodePage.jsx (`/verification-code`)

- Import added: `import ProgressBar from "../Components/ProgressBar";`
- Component added after `<MobileHeader />`
- **Step Status:** All Previous = Green, OTP Code / Face Match = Yellow

### 6. FaceMatch.jsx (`/face-match`)

- Import added: `import ProgressBar from "../Components/ProgressBar";`
- Component added after `<MobileHeader />`
- **Step Status:** All Steps = Green (Final Step)

## Component Features

### Step Indicators

- **Numbered circles (1-4)** for pending/active steps
- **Check mark (✓)** for completed steps
- **Step labels** below each circle
- **Responsive styling** with visual feedback

### Progress Connector

- **Segmented line** showing overall progress
- **Updates dynamically** based on current page/step
- **Visual feedback** of completion percentage

### Data Source

The component reads business type and plan from:

```javascript
sessionStorage.getItem("businessType");
sessionStorage.getItem("businessPlan");
```

## Usage in Pages

### Basic Implementation (In any page):

```jsx
import ProgressBar from "../Components/ProgressBar";

// In JSX:
<div className="w-full h-dvh bg-white px-4 py-5 flex flex-col overflow-y-auto">
  <MobileHeader />
  <ProgressBar />
  {/* Rest of page content */}
</div>;
```

## Styling

The component uses:

- **Tailwind CSS** for styling
- **Responsive design** that works on mobile and web
- **Color scheme:**
  - Yellow-400: Active step
  - Green-500: Completed steps
  - Gray-300: Pending steps
  - Gray-500: Inactive text

## Key Points

✅ **Automatic page detection** - No manual step configuration needed
✅ **Conditional rendering** - Only shows for eligible business types
✅ **Dynamic colors** - Updates based on current page/route
✅ **Responsive** - Works on all screen sizes
✅ **Easy to maintain** - Centralized step definitions
✅ **Localstorage aware** - Uses sessionStorage for business data

## Testing

To verify the progress bar works correctly:

1. **Set business type & plan** in sessionStorage:

   ```javascript
   sessionStorage.setItem("businessType", "Corporate");
   sessionStorage.setItem("businessPlan", "SMB");
   ```

2. **Navigate through pages:**
   - `/email` → See Step 1 yellow
   - `/email-verification` → See Step 1 yellow
   - `/consent` → See Step 1 green, Step 2 yellow
   - `/id-verification` → See Steps 1-2 green, Step 3 yellow
   - `/verification-code` → See Steps 1-3 green, Step 4 yellow
   - `/face-match` → See all steps green

3. **Test with non-eligible plans:**
   - Set plan to "Starter"
   - Progress bar should not display

## Future Enhancements

- Add animations for step transitions
- Add tooltips with step descriptions
- Add ability to click steps to navigate (optional)
- Support for additional or custom steps

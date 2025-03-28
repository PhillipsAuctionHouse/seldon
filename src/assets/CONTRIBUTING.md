# Overview

To convert svgs into usable react components, add the svgs to `src/assets` and run the script `npm run icons:format`. This will run through the svg files (in `src/assets`) and generate a corresponding tsx file (in `src/assets/formatted`) for any new svgs that were added. You may need to go into each new tsx file and make a few small edits to ensure everything works properly.

## Steps to Prepare .jsx files

Let's say we have an svg that we want to add: new_icon.svg

- Copy the svg file into `src/assets/new_icon.svg`
- Run the script `npm run icons:format` which will generate `src/assets/formatted/NewIcon.tsx`
- Open `NewIcon.tsx` and make any needed adjustments to support recoloring
  - By default, svgs that use the color `#000`(black) will have that value replaced with `{color}` that comes from the passed in props, making the component recolorable. Any elements that need to support being recolored will need their `stroke` of `fill` attribute updated to have a value of `{color}` if it's not already set (i.e. a color other than `#000` was being used)
  - If your component should NOT be recolorable (For example, company logos like Phillips and Spotify, unless otherwise specified), remove the `color` variable being destructured from `props` (otherwise it will throw a TS error). If `{color}` is being used in the component already, replace it with `#000`.
- Your new component should get automatically picked up and displayed in the Storybook Icon/Icon Grid story. Confirm that it shows up and is resizable and/or recolorable as expected.
- To use the new svg component, import the `Icon` component from `src/components` and pass the name of your icon as the `icon` prop (i.e. `<Icon icon="NewIcon" />`). Additional props for width, height and color can also be passed to the Icon component.

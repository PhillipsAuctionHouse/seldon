# Overview

To convert svgs into usable react components, add the svgs to `src/assets` and run the script `npm run icons:format`. This will run through the svg files (in `src/assets`) and generate a corresponding jsx file (in `src/assets/formatted`) for any new svgs that were added. You will need to go into each new jsx file and make a few small edits to ensure everything works properly.

## Steps to Prepare .jsx files

Let's say we have an svg that we want to add: new_icon.svg

- Copy the file to `src/assets/new_icon.svg`
- Run the script `npm run icons:format` which will generate `src/assets/formatted/NewIcon.jsx`
- Open `NewIcon.jsx` and

  - Make sure any clipPath ids used in the svg are unique. (This helps avoid issues that can occur when multiple svgs are used on the same page that share the same clipPath ids.) For example you can prepend the name of the component to the id. You will also need to update the corresponding element that references the id that you just changed. See the table below for an example:

  - | Before Changing (Generic id: "a") | After Changing (Unique id: "NewIcon_a")   |
    | --------------------------------- | ----------------------------------------- |
    | `<clipPath id="a">...</clipPath>` | `<clipPath id="NewIcon_a">...</clipPath>` |
    | `<g clipPath="url(#a)">...</g>`   | `<g clipPath="url(#NewIcon_a)">...</g>`   |

  - If the icon needs to be recolorable, you will need to make a few more modifications to the jsx component. For svgs that don't need to be recolored (company logos for example), you can skip this step. Otherwise, open the jsx file, find any `fill` or `stroke` properties and set them to `fill={props.color}` or `stroke={props.color}`.

- Your new component should get automatically picked up and displayed in the Storybook Icon/Icon Grid story. Confirm that it shows up and is resizable and/or recolorable as expected.

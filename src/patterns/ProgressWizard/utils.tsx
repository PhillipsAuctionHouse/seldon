// import { TransformEffect, ZodEffects, ZodType } from 'zod';
import { /* BaseStepSchema, */ FormStep /* StepSchema */ } from './types';

/**
 *  Function type for hiding or unhiding fields in the DOM by name.
 * @param allFields - All field names in the current step or form.
 * @param hiddenFields - Field names to hide for the current step.
 *
 * Steps can optionally have the `hiddenFields` property populated, which will trigger this function.
 * This allows for more flexibility with form structure and data handling.
 *
 * The function is a little ridiculous. It takes a list of all fields and a list of hidden fields,
 * and makes sure the hidden ones are hidden and the rest aren't. It also stores the previous type and tabindex
 * in a data attribute so it can restore them if the input is un-hidden later.
 */
type HandleHiddenFields = ({ hiddenFields, id }: FormStep) => void;
export const handleHiddenFields: HandleHiddenFields = ({ hiddenFields, id }) => {
  // this is probably overkill
  const addStepId = (str: string) => `${id}.${str}`;
  document.querySelectorAll('input, textarea, select');
  const allFields = Array.from(document.querySelectorAll('input, textarea, select')).filter(
    (el) => el.getAttribute('name')?.startsWith(id) || el.id?.startsWith(id),
  );
  hiddenFields = (hiddenFields ?? []).map(addStepId);
  allFields.forEach((el) => {
    const elName = el.getAttribute('name') ?? '';
    if ((hiddenFields ?? []).includes(elName)) {
      const parentDiv = el.closest('div');

      el.setAttribute('data-prev', `${el.getAttribute('type')}|${el.getAttribute('tabindex')}`);
      el.setAttribute('type', 'hidden');
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('tabindex', '-1');
      if (parentDiv) {
        const inputs = parentDiv.querySelectorAll('input, textarea, select');
        if (inputs.length === 1 && inputs[0] === el) {
          parentDiv.style.visibility = 'hidden';
          parentDiv.style.position = 'absolute';
          parentDiv.setAttribute('aria-hidden', 'true');
          parentDiv.style.pointerEvents = 'none';
        }
      }
    } else {
      const [prevType, prevTabIndex] = (el.getAttribute('data-prev') ?? '').split('|');
      el.removeAttribute('aria-hidden');
      if (prevType && prevType !== 'null') el.setAttribute('type', prevType);
      else if (el.tagName.toLowerCase() !== 'input') el.removeAttribute('type');
      if (prevTabIndex && prevTabIndex !== 'null') el.setAttribute('tabindex', prevTabIndex);
      else el.setAttribute('tabindex', '0');
      el.removeAttribute('data-prev');
    }
  });
};

// type EffectsArray = Array<
//   | { type: 'refinement'; fn: ZodType['refine'] | ZodType['superRefine'] }
//   | { type: 'transform'; fn: TransformEffect<unknown>['transform'] } // i do not understand why this is the type? ZodType['transform'] has two params but the functions coming off the ZodEffects wrappers only have one
// >;

/**
 * Helper to unwrap ZodEffects and collect effects. Only used by internal `mergeZodEffects` function
 * @param schema - The Zod schema to unwrap, very flexibly typed.
 * @returns The base schema and an array of the effects that were removed (refinements and transforms)
 *
 * @todo this should be deleted once i've confirmed the schema system
 */

// export const unwrapEffects = (schema: StepSchema): { base: BaseStepSchema; effects: EffectsArray } => {
//   const effects: EffectsArray = [];
//   let base = schema;
//   // work through ZodEffects layers to extract each effect
//   while (base instanceof ZodEffects) {
//     const effect = base._def.effect;
//     if (effect.type === 'refinement') {
//       effects.push({ type: 'refinement', fn: effect.refinement });
//     } else if (effect.type === 'transform') {
//       effects.push({ type: 'transform', fn: effect.transform });
//     }
//     base = base._def.schema;
//   }
//   // return the innermost base schema and all collected effects
//   return { base, effects };
// };

/**
 * Internal function for merging an array of Zod schemas, preserving all effects.
 * @param namespacedSchemas - The Zod schemas to merge, under their namespaces (e.g., { formData: {...}, step1: {...}, step2: {...} }).
 * @returns A single merged Zod schema with all effects applied.
 *
 * @remarks there has to be an easier way to do this??
 * @todo this should be deleted once i've confirmed the schema system
 */

// export const mergeZodEffects = (namespacedSchemas: NamespacedSchemas): StepSchema => {
//   // [{formData: {sdfsdfsdf}, step1: {asdfasdf}, step2: {asdfasdf}}]
//   let mergedShape: NamespacedSchemas = {};
//   let allEffects: EffectsArray = [];

//   // unwrap effects from each schema and merge their fundamental shapes
//   Object.entries(namespacedSchemas).forEach(([id, schema]) => {
//     const { base, effects } = unwrapEffects(schema);
//     if (base instanceof ZodObject) {
//       mergedShape = { ...mergedShape, [id]: base.shape };
//     }
//     allEffects = [...allEffects, ...effects];
//   });

//   // reapply all collected effects to the merged schema, using refine or superRefine as appropriate
//   allEffects.forEach((effect) => {
//     if (effect.type === 'refinement') {
//       if (effect.fn.length === 1) {
//         mergedShape = mergedShape.refine(effect.fn);
//       } else {
//         mergedShape = mergedShape.superRefine(effect.fn);
//       }
//     } else if (effect.type === 'transform') {
//       mergedShape = mergedShape.transform(effect.fn);
//     }
//   });
//   return mergedShape as StepSchema; // we have to be ZodType<any, any, any> because we don't know the exact shape at compile time, but we do know it's a StepSchema by the end
// };

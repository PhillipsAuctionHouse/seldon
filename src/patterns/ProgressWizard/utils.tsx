import { z } from 'zod';

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
type HandleHiddenFields = (allFields: string[], hiddenFields: string[]) => void;
export const handleHiddenFields: HandleHiddenFields = (allFields, hiddenFields) => {
  // this is probably overkill
  allFields.forEach((inputName) => {
    Array.from(document.getElementsByName(inputName))
      .filter((el) => ['input', 'textarea', 'select'].includes(el.tagName.toLowerCase()))
      .forEach((el) => {
        if (hiddenFields.includes(inputName)) {
          el.setAttribute('data-prev', `${el.getAttribute('type')}|${el.getAttribute('tabindex')}`);
          el.setAttribute('type', 'hidden');
          el.setAttribute('aria-hidden', 'true');
          el.setAttribute('tabindex', '-1');
        } else {
          const [prevType, prevTabIndex] = (el.getAttribute('data-prev') ?? '').split('|');
          el.removeAttribute('aria-hidden');
          if (prevType) el.setAttribute('type', prevType);
          if (prevTabIndex) el.setAttribute('tabindex', prevTabIndex);
          el.removeAttribute('data-prev');
        }
      });
  });
};

/**
 * Helper to unwrap ZodEffects and collect effects. Only used by internal `mergeZodEffects` function
 * @param schema - The Zod schema to unwrap, very flexibly typed.
 * @returns The base schema and an array of the effects that were removed (refinements and transforms)
 */

type EffectsArray = Array<
  | { type: 'refinement'; fn: z.ZodType['refine'] | z.ZodType['superRefine'] }
  | { type: 'transform'; fn: z.TransformEffect<unknown>['transform'] } // i do not understand why this is the type? z.ZodType['transform'] has two params but the functions coming off the ZodEffects wrappers only have one
>;

const unwrapEffects = (schema: z.ZodTypeAny) => {
  const effects: EffectsArray = [];
  let base: z.ZodTypeAny = schema;
  // work through ZodEffects layers to extract each effect
  while (base instanceof z.ZodEffects) {
    const effect = base._def.effect;
    if (effect.type === 'refinement') {
      effects.push({ type: 'refinement', fn: effect.refinement });
    } else if (effect.type === 'transform') {
      effects.push({ type: 'transform', fn: effect.transform });
    }
    base = base._def.schema;
  }
  // return the innermost base schema and all collected effects
  return { base, effects };
};

/**
 * Internal function for merging an array of Zod schemas, preserving all effects.
 * @param schemas - The Zod schemas to merge, very flexibly typed.
 * @returns A single merged Zod schema with all effects applied.
 *
 * @remarks there has to be an easier way to do this??
 */

export const mergeZodEffects = (schemas: z.ZodTypeAny[]) => {
  let mergedShape: Record<string, z.ZodTypeAny> = {};
  let allEffects: EffectsArray = [];

  // unwrap effects from each schema and merge their fundamental shapes
  schemas.forEach((schema) => {
    const { base, effects } = unwrapEffects(schema);
    if (base instanceof z.ZodObject) {
      mergedShape = { ...mergedShape, ...base.shape };
    }
    allEffects = [...allEffects, ...effects];
  });

  let mergedSchema: z.ZodTypeAny = z.object(mergedShape);
  // reapply all collected effects to the merged schema, using refine or superRefine as appropriate
  allEffects.forEach((effect) => {
    if (effect.type === 'refinement') {
      if (effect.fn.length === 1) {
        mergedSchema = mergedSchema.refine(effect.fn);
      } else {
        mergedSchema = mergedSchema.superRefine(effect.fn);
      }
    } else if (effect.type === 'transform') {
      mergedSchema = mergedSchema.transform(effect.fn);
    }
  });

  return mergedSchema;
};

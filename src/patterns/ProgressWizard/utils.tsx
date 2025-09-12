type HandleHiddenFields = (allFields: string[], hiddenFields: string[]) => void;
export const handleHiddenFields: HandleHiddenFields = (allFields, hiddenFields) => {
  // this is probably overkill, but maybe someone someday will want to manage form steps by hiding and unhiding fields
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

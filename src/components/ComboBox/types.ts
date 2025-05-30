export interface ComboBoxOption {
  /**
   * The label or display text
   */
  label?: string;
  /**
   * The option value (used for selection)
   */
  value: string;
  /**
   * Display value shown in input when selected (defaults to label)
   */
  displayValue?: string;
  /**
   * Additional terms for filtering
   */
  filterTerms?: string[];
}

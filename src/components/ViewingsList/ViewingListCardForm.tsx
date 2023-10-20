// import classnames from 'classnames';

// import { px } from '../../utils';

// export interface ViewingsListCardFormProps {
//   /**
//   * Title of card
//   */
//   cardTitle?: string;
//   /**
//    * Location of viewing
//    */
//   location?: string;
//   /**
//    * How large should the button be?
//    */
//   previewOn?: boolean;
//   /**
//    * How large should the button be?
//    */
//   previewLabel?: string;
//   /**
//    * How large should the button be?
//    */
//   previewDates?: string;
//   /**
//    * How large should the button be?
//    */
//   previewHour1?: string;
//   /**
//    * How large should the button be?
//    */
//   previewHour2?: string;

//   /**
//    * Button contents
//    */
//   children: React.ReactNode
//   /**
//   * Unique id for component
//   */
//   id?: string ;
//   /**
//    * Optional click handler
//    */
//   onClick?: () => void;
// }

// /**
//  * Primary UI component for user interaction
//  */

// const ViewingsListCardForm = ({
//   primary = true,
//   size = 'md',
//   backgroundColor,
//   children,
//   id,
//   ...props
// }: ViewingsListCardFormProps) => {
//   return (
//     <button
//       data-testid={id ? `button-${id}` : `button`}
//       id={id}
//       type="button"
//       className={classnames(`${px}-button`,`${px}-button--${size}`, {[`${px}-button--secondary`]: !primary})}
//       style={{ backgroundColor }}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export default ViewingsListCardForm;

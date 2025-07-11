import * as Dialog from '@radix-ui/react-dialog';
import classnames from 'classnames';
import React from 'react';
import { getCommonProps, noOp } from '../../utils';

// You'll need to change the HTMLDivElement to match the top-level element of your component
export interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the bottom sheet is open or not
   */
  isOpen?: boolean;
  /**
   * Callback when the bottom sheet is closed
   */
  onClose?: () => void;
  /**
   * The content of the bottom sheet
   */
  children?: React.ReactNode;
}
/**
 * ## Overview
 *
 * A component for displaying a bottom sheet.
 *
 */
const BottomSheet = ({ className, isOpen = false, onClose = noOp, children, ...props }: BottomSheetProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'BottomSheet');

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={onClose}
          className={classnames(`${baseClassName}__overlay`)}
          data-testid="bottom-sheet-overlay"
        />
        <Dialog.Content className={classnames(baseClassName, className)} id={props.id} {...commonProps}>
          <Dialog.Title />
          <Dialog.Description />
          <Dialog.Close asChild></Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BottomSheet;

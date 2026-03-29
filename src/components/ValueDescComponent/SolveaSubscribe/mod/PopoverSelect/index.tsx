import { Popover, PopoverProps } from 'antd';
import cx from 'classnames';
import { PropsWithChildren, useState } from 'react';
import styles from './index.module.scss';

interface Item {
  label: string;
  value: string;
  data?: any;
}

interface Props extends PopoverProps {
  options?: Item[];
  onClick: (_value: string, _item: Item) => void;
}

export default function PopoverSelect(props: PropsWithChildren<Props>) {
  const { children, options, onClick, placement, ...rest } = props;

  const [open, setOpen] = useState(false);

  return (
    <Popover
      trigger="click"
      overlayClassName={styles.popoverClass}
      arrow={false}
      showArrow={false}
      open={open}
      onOpenChange={(open) => setOpen(open)}
      content={
        <div className={styles.list}>
          {(options ?? []).map((v, index) => {
            return (
              <div
                key={index}
                className={cx(styles.dropItem, {})}
                onClick={async () => {
                  setOpen(false);
                  onClick?.(v?.value, v);
                }}
              >
                <div className={styles.dropItemLabel}>{v?.label}</div>
              </div>
            );
          })}
        </div>
      }
      placement={placement ?? 'bottomRight'}
      {...rest}
    >
      {children}
    </Popover>
  );
}

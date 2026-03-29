import i18n from '@/i18n';
import cx from 'classnames';
import { PayDateType } from '../../interface';
import styles from './index.module.scss';

interface Props {
  // eslint-disable-next-line no-unused-vars
  value?: PayDateType;
  onChange?: (_value: PayDateType) => void;
}

export default function CycleSwitch(props: Props) {
  const { value, onChange } = props;

  const list: any = [
    {
      label: i18n('price.cycle_month'),
      value: 'monthly',
    },
    {
      label: i18n('price.cycle_year'),
      value: 'annually',
      subLabel: `(${i18n('price.cycle_year_off')})`,
    },
  ];

  return (
    <div className={styles.box}>
      {list?.map((v) => {
        return (
          <div
            key={v.value}
            className={cx(styles.item, v.value === value && styles.selected)}
            onClick={() => onChange?.(v.value)}
          >
            {v.label}
            {v?.subLabel && <strong>{v?.subLabel}</strong>}
          </div>
        );
      })}
    </div>
  );
}

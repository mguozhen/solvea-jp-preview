import cx from 'classnames';
import styles from './index.module.scss';

interface Props {
    text: string;
    className?: string;
}

export default function LabelMod(props: Props) {
    const { text, className } = props;
    return (
        <div className={cx(styles.label, className)}>{text}</div>
    )
}
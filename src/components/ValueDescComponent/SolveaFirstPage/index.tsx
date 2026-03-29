import cx from 'classnames';
import { Button } from 'pages/mod/Button';
import styles from './index.module.scss';

interface Props {
  tag: string;
  title: string;
  h1: boolean;
  description: string;
  button: {
    text: string;
    href: string;
  };
}
export default function SolveaFirstPage(props: Props) {
  const { tag, title, h1, description, button } = props;

  return (
    <div className={styles.container}>
      <div className={styles.tag}>{tag}</div>
      {h1 ? (
        <h1 className={cx(styles.newhero_slogan_container, styles.newhero_slogan)}>{title}</h1>
      ) : (
        <div className={cx(styles.newhero_slogan_container, styles.newhero_slogan)}>{title}</div>
      )}
      <div className={styles.newhero_desc_container}>
        <div className={styles.newhero_desc}>{description}</div>
      </div>
      <a href={button.href} target={'_blank'} className={styles.btnLink}>
        <Button className={styles.btn}>{button.text}</Button>
      </a>
    </div>
  );
}

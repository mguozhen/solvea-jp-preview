import SolveaButton from '../SolveaButton';
import styles from './index.module.scss';

interface Props {
  title: string;
  description: string;
  button: { text: string; href: string };
  img: string;
  h1?: boolean; // 是否是h1标签
}
export default function SolveaValueProposition(props: Props) {
  const { title, description, button, img, h1 = false } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            {h1 ? (
              <h1 className={styles.title}>{title}</h1>
            ) : (
              <h2 className={styles.title}>{title}</h2>
            )}
            <div className={styles.description}>{description}</div>
          </div>
          <SolveaButton button={button} className={styles.buttonLink} />
        </div>
        <img
          src={img}
          alt={title}
          className={styles.img}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

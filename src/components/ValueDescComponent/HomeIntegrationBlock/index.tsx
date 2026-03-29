import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import LabelMod from 'components/ValueDescComponent/LabelMod';
import WithAnimation from 'components/WithAnimation';
import styles from './index.module.scss';

interface Props {
  label: string;
  title: string;
  desc: string;
  url: string;
  button: {
    text: string;
    link: string;
  };
}

export default function IntegrationBlock(props: Props) {
  const { label, title, desc, url, button } = props;
  return (
    <WithAnimation animationType="fadeInUp" delay={0} duration={800}>
      <div className={styles.container}>
        <div className={styles.left}>
          <picture>
            <img
              src={url}
              alt="integration"
              className={styles.img}
              width={580}
              height={'auto'}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className={styles.right}>
          <LabelMod text={label} className={styles.label} />
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>{desc}</div>
          <GetStartedBtn
            link={button.link}
            text={button.text}
            type="black"
            className={styles.button}
            id="integrationCta"
          />
        </div>
      </div>
    </WithAnimation>
  );
}

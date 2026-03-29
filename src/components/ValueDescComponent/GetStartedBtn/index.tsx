'use client';

import cx from 'classnames';
import BtnIcon from 'components/ValueDescComponent/SvgMod/commonSvg/BtnIcon';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  link: string;
  text: string;
  type: 'white' | 'black';
  className?: string;
  showIcon?: boolean;
  id?: string;
}

export default function GetStartedBtn(props: Props) {
  const { link, text, type = 'white', className, showIcon = true, id } = props;
  const [href, setHref] = useState(link);

  useEffect(() => {
    const papPartnerId = localStorage.getItem('pap_partner_id');
    setHref(papPartnerId ? `${link}?partner=${papPartnerId}` : link);
  }, [link]);

  return (
    <a
      href={href}
      className={cx(styles.button, { [styles.black]: type === 'black' }, className)}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
    >
      {text}
      {showIcon && <BtnIcon color={type === 'black' ? '#FFFFFF' : '#000000'} />}
    </a>
  );
}

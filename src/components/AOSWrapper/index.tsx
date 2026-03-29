'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const iosVersion = () => {
  // 判断是否为iOS设备
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    // 获取iOS版本号
    const version = parseFloat(
      (
        '' +
        (/CPU.*OS ([0-9_]{1,5})|(like Mac OS X)/i.exec(navigator.userAgent) || [
          0,
          '',
        ])[1]
      )
        .replace('undefined', '3_2')
        .replace('_', '.')
        .replace('_', ''),
    );
    // 判断版本是否小于16.0
    if (version < 16.0) {
      // setBtnStyle(styles.btnColor2);
    }
  }
};

export default function AOSWrapper() {
  useEffect(() => {
    // 动效库初始化
    AOS.init();
    iosVersion();
  }, []);

  return null;
}

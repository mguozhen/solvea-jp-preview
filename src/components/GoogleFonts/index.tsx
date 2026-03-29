import Head from 'next/head';
import React from 'react';

// https://www.woorank.com/en/edu/seo-guides/hreflang-seo-guide/

export default function GoogleFonts() {
  return (
    <Head>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Work+Sans:wght@400;600;700;800&family=Noto+Sans+JP:wght@400;600;700;800&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Work+Sans:wght@400;600;700;800&family=Noto+Sans+JP:wght@400;600;700;800&display=swap"
        media="print"
        // onLoad="this.media='all'"
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap"
        />
      </noscript>
    </Head>
  );
}

import Script from 'next/script';

export default function TrackingUtils() {
  return (
    <Script
      src="https://cdn.shulex-voc.com/shulex-official-widget/UTM_6b9bd1ec.js"
      strategy="afterInteractive"
    />
  );
}

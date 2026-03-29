'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export default function AffiliatesWelcomePage() {
  const searchParams = useSearchParams();
  const [, setIsApproved] = useState(false);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'approved') {
      setIsApproved(true);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome to Solvea Affiliate Program!</h1>
        <p className={styles.subtitle}>
          Your account has been approved and you can start promoting now!
        </p>
      </div>


      <div className={styles.steps}>
        <h2>What&apos;s Next?</h2>

        <div className={styles.stepList}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Login to Affiliate Dashboard</h3>
              <p>Use your registered email and password to login</p>
              <a
                href="https://solveacx.postaffiliatepro.com/affiliates/login.php"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Go to Login →
              </a>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Get Your Referral Link</h3>
              <p>Find your exclusive referral link and marketing materials in the dashboard</p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>Start Promoting</h3>
              <p>Share your referral link through social media, blogs, videos and other channels</p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3>Earn Commission</h3>
              <p>You&apos;ll receive commission when customers sign up or purchase through your link</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.resources}>
        <h2>Promotion Resources</h2>
        <div className={styles.resourceGrid}>
          <div className={styles.resourceCard}>
            <h3>Promotion Guide</h3>
            <p>Learn how to effectively promote Solvea</p>
          </div>
          <div className={styles.resourceCard}>
            <h3>Marketing Materials</h3>
            <p>Download banners, images and other assets</p>
          </div>
          <div className={styles.resourceCard}>
            <h3>Contact Support</h3>
            <p>Questions? Reach out to our affiliate manager</p>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <a
          href="https://solveacx.postaffiliatepro.com/affiliates/login.php"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryBtn}
        >
          Login to Dashboard
        </a>
        <a href="/" className={styles.secondaryBtn}>
          Back to Home
        </a>
      </div>

      {/* <div className={styles.contact}>
        <p>
          If you have any questions, please contact us:
          <a href="mailto:affiliates@solvea.cx">affiliates@solvea.cx</a>
        </p>
      </div> */}
    </div>
  );
}

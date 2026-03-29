'use client';
import { useEffect, useState } from 'react';
import { Input, Space, Button as AntButton, message } from 'antd';
import { Button } from 'pages/mod/Button';
import styles from './index.module.scss';

export default function RegisterForm() {
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

  const sendCode = async (email: string) => {
    if (!email) {
      console.error('Email is required');
      return null;
    }

    setCountdown(60);
    try {
      const response = await fetch(
        'https://apps.voc.ai/api_v2/ticket/user/verify_code/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
          }),
        },
      );

      if (response.ok) {
        // 开始倒计时
        // const data = await response.json();
        // if (data?.data?.registered) {
        //   message.error('The current mailbox has been registered');
        // } else {
        //   setCountdown(60);
        // }
        // return data;
      } else {
        setCountdown(0);
        console.error('Failed to send verification code');
        return null;
      }
    } catch (err) {
      setCountdown(0);
      console.error('Error sending verification code:', err);
      return null;
    }
  };

  const onVerify = async () => {
    if (!verificationCode || verifyLoading) {
      message.error('Please enter the verification code');
      return;
    }
    setVerifyLoading(true);
    fetch('https://apps.voc.ai/api_v2/ticket/user/verify_code/check_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        code: verificationCode,
        lang: 'en-US',
        utm: 'solvea',
      }),
    })
      .then((res) => {
        console.log('res', res);
        window.location.href = 'https://apps.voc.ai/chatbot';
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setVerifyLoading(false);
      });
    console.log('verificationCode', verificationCode);
  };

  // 倒计时逻辑
  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  useEffect(() => {
    // 从sessionStorage获取email
    const storedEmail = sessionStorage.getItem('registerEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      sendCode(storedEmail);
      //   sessionStorage.removeItem('registerEmail');
    }
  }, []);

  return (
    <div>
      <div className={styles.input}>
        <Space.Compact className={styles.inputWrapper}>
          <Input
            placeholder="Verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className={styles.verificationCodeInput}
          />
          <AntButton
            color="default"
            // variant="filled"
            disabled={countdown > 0}
            onClick={() => sendCode(email)}
            style={{ width: 150 }}
            className={styles.sendCodeBtn}
          >
            {countdown > 0 ? `Resend (${countdown}s)` : 'Send Code'}
          </AntButton>
        </Space.Compact>
      </div>
      <div onClick={onVerify}>
        <Button className={styles.submitBtn}>Verify</Button>
      </div>
    </div>
  );
}

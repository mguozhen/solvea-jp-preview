'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TwilioVoice.module.scss';

const DISPLAY_PHONE = '+1 903 564 0866';
const TOKEN_PHONE = '+19477777206';

export interface TwilioVoiceConfig {
  labelDialDirectly?: string;
  labelViaBrowser?: string;
  callButtonText?: string;
  hintText?: string;
  connectingText?: string;
  hangUpText?: string;
  signupTitle?: string;
  signupButtonText?: string;
  callAgainText?: string;
}

const DEFAULTS: Required<TwilioVoiceConfig> = {
  labelDialDirectly: 'Call directly',
  labelViaBrowser: 'Talk via browser',
  callButtonText: 'Call Solvea',
  hintText: 'No app needed · Rings right in your browser · Hang up anytime',
  connectingText: 'Connecting',
  hangUpText: 'Hang up',
  signupTitle: 'Ready to deploy your own AI receptionist?',
  signupButtonText: 'Sign up free — get 11k credits',
  callAgainText: 'or call again',
};

function getRegisterUrl() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isProduction = hostname !== 'localhost' && !hostname.includes('staging');
  return isProduction
    ? 'https://app.solvea.cx/#/auth/register'
    : 'https://apps-staging.solvea.cx/#/auth/register';
}

function getTokenUrl() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isProduction = hostname !== 'localhost' && !hostname.includes('staging');
  const base = isProduction ? 'https://app.solvea.cx' : 'https://apps-staging.solvea.cx';
  const phone = isProduction ? '+19035640866' : TOKEN_PHONE;
  return `${base}/api_v2/gpt/voice/solvea/webcall/token/by-phone?phoneNumber=${encodeURIComponent(phone)}`;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

type CallState = 'idle' | 'connecting' | 'active' | 'ended';

interface Props {
  config?: TwilioVoiceConfig;
}

export default function TwilioVoice({ config }: Props) {
  const t = { ...DEFAULTS, ...config };

  const [callState, setCallState] = useState<CallState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [signupVisible, setSignupVisible] = useState(false);
  const deviceRef = useRef<import('@twilio/voice-sdk').Device | null>(null);
  const callRef = useRef<import('@twilio/voice-sdk').Call | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (callState === 'active') {
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  useEffect(() => {
    if (callState === 'ended') {
      const timer = setTimeout(() => setSignupVisible(true), 400);
      return () => clearTimeout(timer);
    }
    setSignupVisible(false);
    return undefined;
  }, [callState]);

  useEffect(() => {
    return () => {
      callRef.current?.disconnect();
      deviceRef.current?.destroy();
    };
  }, []);

  async function startCall() {
    setError(null);
    setCallState('connecting');
    try {
      const res = await fetch(getTokenUrl(), { method: 'POST' });
      if (!res.ok) throw new Error('Failed to get token');
      const data = await res.json();
      const token: string = data.token;
      if (!token) throw new Error('No token in response');

      const { Device } = await import('@twilio/voice-sdk');
      const device = new Device(token, { logLevel: 'warn' });
      deviceRef.current = device;

      device.on('error', (err: Error & { code?: number }) => {
        const code = (err as { code?: number }).code;
        const msg =
          code === 31000 || err?.message?.includes('31000')
            ? 'Connection failed. Please check your network and try again.'
            : err?.message || 'Connection error';
        setError(msg);
        setCallState('idle');
        device.destroy();
        deviceRef.current = null;
      });

      const connectParams: Record<string, string> = {};
      if (data.assistantKey) connectParams.assistantKey = data.assistantKey;
      const call = await device.connect({ params: connectParams });
      callRef.current = call;

      call.on('accept', () => setCallState('active'));
      call.on('disconnect', () => {
        setCallState('ended');
        device.destroy();
      });
      call.on('error', (err: Error) => {
        setError(err.message);
        setCallState('idle');
        device.destroy();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCallState('idle');
    }
  }

  function hangUp() {
    callRef.current?.disconnect();
    deviceRef.current?.destroy();
    setCallState('ended');
  }

  function reset() {
    setCallState('idle');
    setElapsed(0);
    setError(null);
  }

  const isIdle = callState === 'idle';
  const isConnecting = callState === 'connecting';
  const isActive = callState === 'active';
  const isEnded = callState === 'ended';

  return (
    <div className={styles.container}>
      <div className={styles.visual}>
        {isIdle && <div className={styles.orbIdle}>📞</div>}
        {isConnecting && <div className={styles.orbConnecting} />}
        {isActive && (
          <div className={styles.waveform}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={styles.bar} />
            ))}
          </div>
        )}
        {isEnded && <div className={styles.orbEnded}>👋</div>}
      </div>

      {isActive && <div className={styles.timer}>{formatTime(elapsed)}</div>}

      <div className={`${styles.options} ${!isIdle ? styles.hidden : ''}`}>
        <div className={styles.optionDial}>
          <span className={styles.optionLabel}>{t.labelDialDirectly}</span>
          <a className={styles.phoneLink} href="tel:+19035640866">
            <span className={styles.phoneIcon}>📞</span>
            {DISPLAY_PHONE}
          </a>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <div className={styles.optionWebcall}>
          <span className={styles.optionLabel}>{t.labelViaBrowser}</span>
          <button className={styles.callBtn} onClick={startCall}>
            {t.callButtonText}
          </button>
          <p className={styles.hint}>{t.hintText}</p>
        </div>
      </div>

      {!isIdle && (
        <div className={`${styles.ctaArea} ${isEnded ? styles.ctaCentered : ''}`}>
          {isConnecting && (
            <button className={styles.callBtn} disabled>
              <span className={styles.dots}>{t.connectingText}</span>
            </button>
          )}

          {isActive && (
            <button className={`${styles.callBtn} ${styles.hangupBtn}`} onClick={hangUp}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.38 14.76c-.5-.44-1.14-.68-1.8-.68-.66 0-1.3.24-1.78.67l-1.7 1.5a13.3 13.3 0 01-6.33-6.33l1.5-1.7c.46-.5.7-1.14.7-1.8 0-.66-.24-1.3-.67-1.78L8.7 3.22A2.49 2.49 0 007 2.55c-.66 0-1.3.24-1.8.68L3.36 5c-.62.62-.97 1.47-.97 2.33C2.39 14.2 9.8 21.61 16.67 21.61c.86 0 1.71-.35 2.33-.97l1.77-1.84c.44-.5.68-1.14.68-1.8s-.24-1.3-.67-1.77l-1.4-1.47z" />
              </svg>
              {t.hangUpText}
            </button>
          )}

          {isEnded && (
            <div className={`${styles.signupPanel} ${signupVisible ? styles.signupVisible : ''}`}>
              <p className={styles.signupTitle}>{t.signupTitle}</p>
              <a
                className={styles.signupBtn}
                href={getRegisterUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.signupButtonText}
              </a>
              <button className={styles.callAgainLink} onClick={reset}>
                {t.callAgainText}
              </button>
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </div>
  );
}

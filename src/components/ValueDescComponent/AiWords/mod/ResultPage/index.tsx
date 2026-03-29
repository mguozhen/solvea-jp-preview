import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import AIWordsTable from '../Table';
import { WordCloudProps } from '../Wordcloud';
import { Button, Form, Select, Slider } from 'antd';
import i18n from 'util/i18nOld/i18nOld';
// import html2canvas from 'html2canvas';
// import { SvgDownload } from '@/components/Icons/Download';
const AIWordsWordCloud = React.lazy(() => import('../Wordcloud'));

interface ResultPageProps {
  className?: string;
  style?: React.CSSProperties;
  data?: Array<{
    word?: string;
    frequency?: number;
  }>;
  showSlider?: boolean;
}

export default function ResultPage(props: ResultPageProps) {
  const { className, style, data = [], showSlider = true } = props;
  // const [show, setShow] = useState(true);
  const [curData, setCurdata] = useState(data.slice(0, 50));
  const [count, setCount] = useState(50);
  const wordCloudRef = useRef(null);
  const [form] = Form.useForm();
  const [option, setOption] = useState<WordCloudProps['options']>({
    fontFamily: 'Helvetica Neue', // 字体
    clearCanvas: true, // 透明背景
    fontWeight: 'normal', // 字体粗细
    color: 'random-light', // 字的颜色
    gridSize: 0, // 边距
    shape: 'circle',
    backgroundColor: '#ffffff',
  });

  const renderLabel = (prefix: string, content: string) => {
    const element = (
      <div className={styles.label}>
        <span className="prefix" style={{ display: 'none' }}>
          {prefix}:
        </span>
        <span className={styles.content}>{content}</span>
      </div>
    );
    return element;
  };
  const shapes = [
    {
      value: 'circle',
      label: renderLabel(
        i18n('wordcloud.config.shape.name'),
        i18n('wordcloud.config.shape.circle'),
      ),
    },
    {
      value: 'cardioid',
      label: renderLabel(
        i18n('wordcloud.config.shape.name'),
        i18n('wordcloud.config.shape.cardioid'),
      ),
    },
    {
      value: 'diamond',
      label: renderLabel(
        i18n('wordcloud.config.shape.name'),
        i18n('wordcloud.config.shape.diamond'),
      ),
    },
    {
      value: 'square',
      label: renderLabel(
        i18n('wordcloud.config.shape.name'),
        i18n('wordcloud.config.shape.square'),
      ),
    },
    {
      value: 'triangle',
      label: renderLabel(
        i18n('wordcloud.config.shape.name'),
        i18n('wordcloud.config.shape.triangle'),
      ),
    },
    {
      value: 'pentagon',
      label: renderLabel(
        i18n('wordcloud.config.shape.name'),
        i18n('wordcloud.config.shape.pentagon'),
      ),
    },
    {
      value: 'star',
      label: renderLabel(
        i18n('wordcloud.config.shape.name'),
        i18n('wordcloud.config.shape.star'),
      ),
    },
  ];

  const colors = [
    {
      value: 'random-light',
      label: renderLabel(
        i18n('wordcloud.config.color.name'),
        i18n('wordcloud.config.color.light'),
      ),
    },
    {
      value: 'random-dark',
      label: renderLabel(
        i18n('wordcloud.config.color.name'),
        i18n('wordcloud.config.color.dark'),
      ),
    },
  ];

  const fonts = [
    {
      value: 'Helvetica Neue',
      label: renderLabel(i18n('wordcloud.config.font'), 'Helvetica Neue'),
    },
    {
      value: 'PingFang SC',
      label: renderLabel(i18n('wordcloud.config.font'), 'PingFang SC'),
    },
  ];

  const onFinish = (values: any) => {
    setOption({ ...option, ...values });
  };

  const onSliderChange = (val: number) => {
    setCount(val);
  };

  useEffect(() => {
    const cur = [...data];
    while (cur?.length < count) {
      cur.push(...cur);
    }
    setCurdata(cur.slice(0, count));
  }, [data, count]);

  const handleExport = () => {
    if (!wordCloudRef.current) return;

    // html2canvas(wordCloudRef.current).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const link = document.createElement('a');
    //   link.download = 'wordcloud.png';
    //   link.href = imgData;
    //   link.click();
    // });
    console.log('Export functionality disabled - html2canvas not available');
  };
  return (
    <div className={cx(styles.container, className)} style={style}>
      {/* {show && ( */}
      <div className={styles.inner}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <Form
              name="basic"
              form={form}
              style={{ paddingRight: 16 }}
              onFinish={onFinish}
              initialValues={option}
              className={styles.renderConfig}
            >
              <Form.Item name="fontFamily" className={styles.formItem}>
                <Select
                  options={fonts}
                  defaultValue={'Helvetica Neue'}
                  onChange={(e) => {
                    setOption({ ...option, fontFamily: e });
                  }}
                />
              </Form.Item>

              <Form.Item name="color" className={styles.formItem}>
                <Select
                  options={colors}
                  defaultValue={'Light'}
                  style={{ minWidth: 80 }}
                  onChange={(e) => {
                    setOption({ ...option, color: e });
                  }}
                />
              </Form.Item>

              <Form.Item name="shape" className={styles.formItem}>
                <Select
                  options={shapes}
                  defaultValue={'Circle'}
                  style={{ minWidth: 100 }}
                  // onChange={onFinish}
                  onChange={(e: any) => {
                    setOption({ ...option, shape: e });
                  }}
                />
              </Form.Item>

              <Form.Item
                label={i18n('wordcloud.config.background')}
                name="backgroundColor"
                className={styles.formItem}
              >
                <input
                  type="color"
                  className={styles.colorInput}
                  onChange={(e) => {
                    setOption({ ...option, backgroundColor: e.target.value });
                  }}
                />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              className={styles.exportBtn}
              onClick={handleExport}
            >
              {/* <SvgDownload className={styles.icon} /> */}
              <span>{i18n('wordcloud.export')}</span>
            </Button>
          </div>
          {showSlider && (
            <Slider
              className={styles.slider}
              railStyle={{ height: 24, borderRadius: 24 }}
              trackStyle={{
                height: 24,
                borderRadius: '24px 0 0 24px',
                background: '#1570EF',
              }}
              handleStyle={{ transform: 'translate(-50%,3px)' }}
              defaultValue={50}
              min={0}
              max={100}
              onChange={onSliderChange}
            />
          )}
        </div>
        <AIWordsWordCloud
          data={showSlider ? curData : data}
          className={styles.wordcloud}
          options={option}
          ref={wordCloudRef}
        />
      </div>
      {/* )} */}
      <div style={{ marginTop: 40 }}>
        <AIWordsTable data={curData} />
      </div>
    </div>
  );
}

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { getAiWords, wordSummarize } from 'util/services';
import {
  Button,
  Input,
  Slider,
  Upload,
  message,
  Form,
} from 'antd';
import i18n, { useI18n } from 'util/i18nOld/i18nOld';
import ResultPage from './mod/ResultPage';
import EnTabs from '@/components/SharedModules/Tabs';

export interface Props extends BaseCSSProps {}
const DEFAULT_COUNT = 20;
const MAX_FILE_SIZE = 500 * 1024; // 500KB

const langMap = { 'ja-JP': 'Japanese', 'en-US': 'English' };

const defaultList = [
  {
    word: 'your',
    frequency: 3,
  },
  {
    word: 'text',
    frequency: 3,
  },
  {
    word: 'it',
    frequency: 3,
  },
  {
    word: 'wordcloud',
    frequency: 3,
  },
  {
    word: 'type',
    frequency: 2,
  },
  {
    word: 'into',
    frequency: 2,
  },
  {
    word: 'Simply',
    frequency: 1,
  },
  {
    word: 'paste',
    frequency: 1,
  },
  {
    word: 'upload',
    frequency: 1,
  },
  {
    word: 'watch',
    frequency: 1,
  },
  {
    word: 'as',
    frequency: 1,
  },
  {
    word: 's',
    frequency: 1,
  },
  {
    word: 'transformed',
    frequency: 1,
  },
  {
    word: 'captivating',
    frequency: 1,
  },
  {
    word: 'Transform',
    frequency: 1,
  },
  {
    word: 'beautiful',
    frequency: 1,
  },
  {
    word: 'Whether',
    frequency: 1,
  },
  {
    word: 'you',
    frequency: 1,
  },
  {
    word: 'have',
    frequency: 1,
  },
  {
    word: 'social',
    frequency: 1,
  },
  {
    word: 'media',
    frequency: 1,
  },
  {
    word: 'posts',
    frequency: 1,
  },
  {
    word: 'comments',
    frequency: 1,
  },
  {
    word: 'online',
    frequency: 1,
  },
  {
    word: 'reviews',
    frequency: 1,
  },
  {
    word: 'feedback',
    frequency: 1,
  },
  {
    word: 'polls',
    frequency: 1,
  },
  {
    word: 'any',
    frequency: 1,
  },
  {
    word: 'other',
    frequency: 1,
  },
  {
    word: 'content',
    frequency: 1,
  },
  {
    word: 'You',
    frequency: 1,
  },
  {
    word: 'easily',
    frequency: 1,
  },
  {
    word: 'summarize',
    frequency: 1,
  },
  {
    word: 'analyze',
    frequency: 1,
  },
  {
    word: 'most',
    frequency: 1,
  },
  {
    word: 'prominent',
    frequency: 1,
  },
  {
    word: 'words',
    frequency: 1,
  },
  {
    word: 'making',
    frequency: 1,
  },
  {
    word: 'powerful',
    frequency: 1,
  },
  {
    word: 'tool',
    frequency: 1,
  },
  {
    word: 'understanding',
    frequency: 1,
  },
  {
    word: 'sentiment',
    frequency: 1,
  },
  {
    word: 'themes',
    frequency: 1,
  },
  {
    word: 'Try',
    frequency: 1,
  },
  {
    word: 'out',
    frequency: 1,
  },
  {
    word: 'today',
    frequency: 1,
  },
  {
    word: 'see',
    frequency: 1,
  },
  {
    word: 'power',
    frequency: 1,
  },
  {
    word: 'yourself',
    frequency: 1,
  },
  {
    word: 'see',
    frequency: 1,
  },
];

export default function AiWords(props: Props) {
  const { className, style } = props;
  const [text, setText] = useState('');
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [words, setWords] = useState<
    Array<{ word: string; frequency: number }>
  >([]);
  const { locale } = useI18n();
  const [loading, setLoading] = useState(false);
  const [longWords, setLongWords] = useState('');
  const [show, setShow] = useState(false);
  const [showSlider, setShowSlider] = useState(true);

  const { TextArea } = Input;
  const { Dragger } = Upload;

  // GPT get words
  const getWords = async () => {
    if (text.trim() === '') {
      message.error('No Content');
      return;
    }
    setLoading(true);
    try {
      const words = await getAiWords(text, count, langMap[locale]);
      setWords(words);
      setShow(true);
    } catch (err) {
      console.log(err);
      message.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const getSum = async (text?: string) => {
    console.log('longWords', longWords);
    if (longWords.trim() === '' && !text) {
      message.error('No Content');
      return;
    }
    setLoading(true);
    try {
      const words = await wordSummarize(text || longWords, langMap[locale]);
      setWords(words);
      setShow(true);
    } catch (err) {
      console.log(err);
      message.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const onUpload = useCallback((file) => {
    // 检查文件类型
    if (
      file.type !== 'application/vnd.ms-excel' &&
      file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      file.type !== 'text/plain'
    ) {
      message.error('Wrong File Type!');
      return;
    }

    // 检查文件大小 <500KB
    if (file.size > MAX_FILE_SIZE) {
      message.error('The file should be less than 500KB in size.');
      return;
    }

    // 读取文件
    const reader = new FileReader();

    // txt文件
    if (file.name.indexOf('txt') >= 0) {
      reader.onload = () => {
        const fileContent = reader.result;
        getSum(String(fileContent));
      };
      reader.readAsText(file);
    } else {
      reader.onload = async (e: any) => {
        const { read, utils } = await import('xlsx');
        const fileData = new Uint8Array(e.target.result);
        const workbook = read(fileData, { type: 'array' });
        // 读取第一个工作表
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // 将工作表转换为 JSON 对象数组
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        const str = jsonData.join('\n');
        getSum(str);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  useEffect(() => {
    // getSum(i18n('wordcloud.init'));
    setWords(defaultList);
    setShow(true);
  }, []);

  const TitleHeader = (
    <div className={styles.header}>
      <div className={styles.title}>{i18n('homepage.tools.wordcloud.title')}</div>
      <div className={styles.subTitle}>
        {i18n('homepage.tools.wordcloud.subTitle')}
      </div>
    </div>
  );

  const items = [
    {
      key: 'paste',

      label: i18n('homepage.sourceText'),
      children: (
        <>
          {TitleHeader}
          <div className={cx(styles.left)}>
            <TextArea
              className={styles.input}
              rows={8}
              placeholder={i18n('wordcloud.init')}
              onChange={(e) => {
                console.log(e.target.value, typeof e.target.value);
                setLongWords(e.target.value);
              }}
              disabled={loading}
              // value={longWords}
            />
            <Button
              onClick={() => {
                getSum();
              }}
              type="primary"
              className={styles.btn}
              loading={loading}
            >
              {i18n('homepage.generate')}
            </Button>
          </div>
        </>
      ),
    },

    // {
    //   key: 'ecommerce',
    //   label: (
    //     <div className={styles.link}>
    //       <a href={ecommerceLink} target="_blank">
    //         {i18n('homepage.gptEcommerce')}
    //       </a>
    //       {/* <div className={styles.tag}>new</div> */}
    //     </div>
    //   ),
    //   noSwitch: true,
    //   tabClass: styles.linkTab,
    // },
    {
      key: 'gpt',
      label: (
        <div className={styles.outer}>
          {/* <div className={styles.tag} style={{ top: '-65%' }}>
            new
          </div> */}
          {i18n('homepage.wordsGenerate')}
        </div>
      ),
      children: (
        <>
          {TitleHeader}
          <div className={cx(styles.left)}>
            <div className={styles.flex}>
              <div className={styles.topText}>{i18n('homepage.useAI')}</div>
              <div className={styles.top}>
                <Form className={styles.form} layout="vertical">
                  <Form.Item
                    label={
                      <>
                        {i18n('homepage.wordCount')}:
                        <span style={{ fontWeight: 600 }}> {count}</span>
                      </>
                    }
                    className={styles.formItem}
                  >
                    <Slider
                      className={styles.slider}
                      railStyle={{ height: 24, borderRadius: 24 }}
                      trackStyle={{
                        height: 24,
                        borderRadius: '24px 0 0 24px',
                        background: '#1570EF',
                      }}
                      handleStyle={{ transform: 'translate(-50%,3px)' }}
                      step={5}
                      // marks={marks}
                      style={{ width: '100%' }}
                      defaultValue={DEFAULT_COUNT}
                      min={10}
                      max={40}
                      onChange={(val: number) => setCount(val || DEFAULT_COUNT)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={i18n('homepage.content')}
                    required
                    className={styles.formItem}
                  >
                    <Input
                      required
                      maxLength={50}
                      style={{ maxWidth: 650 }}
                      showCount
                      onChange={(e) => setText(e.target.value)}
                      disabled={loading}
                    />
                  </Form.Item>
                </Form>
              </div>
              <Button
                onClick={getWords}
                type="primary"
                className={styles.btn}
                loading={loading}
              >
                {i18n('homepage.generate')}
              </Button>
            </div>
          </div>
        </>
      ),
    },
    {
      key: 'file',
      label: i18n('homepage.uploadFile'),
      children: (
        <>
          {TitleHeader}
          <div>
            <Dragger
              maxCount={1}
              beforeUpload={onUpload}
              accept=".xls,.xlsx,.csv,.txt"
            >
              <div className={styles.text}>
                {i18n('homepage.dropFile')}
                <span style={{ color: '#1677ff' }}>
                  {' '}
                  {i18n('homepage.clickUpload')}
                </span>
              </div>
            </Dragger>
            <div className={styles.tip}>
              csv/xlsx/xls/txt files with a size less than 500KB
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className={cx(styles.container, className)} style={style}>
        <div className={styles.right}>
          <EnTabs
            defaultActiveKey="paste"
            className={styles.tabs}
            wrapperClassName={styles.tabsContainer}
            onChange={(key) => {
              if (key === 'gpt') {
                setShowSlider(false);
              } else {
                setShowSlider(true);
              }
            }}
            onTabClick={() => {
              setWords([]);
              setShow(false);
            }}
            tabs={items}
          />
          {show && words?.length && (
            <div className={styles.wordcloud}>
              <ResultPage data={words} showSlider={showSlider} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

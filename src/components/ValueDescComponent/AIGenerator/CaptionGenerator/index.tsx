import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import cx from 'classnames';
import { Button, Form, Input, Select, Spin } from 'antd';
import { aiCaption } from 'util/services';
import GuideModal from '../GuideModal';

interface Props extends BaseCSSProps {
  defaultNetwork?: string;
}

/**
 * 社媒文章标题caption生成器
 * @param props
 * @returns
 */
export default function CaptionGenerator(props: Props) {
  const { className, style, defaultNetwork } = props;
  const [showRes, setShowRes] = useState(false);
  const [form] = Form.useForm();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const networks = [
    {
      value: 'Tiktok',
      label: 'Tiktok',
    },
    {
      value: 'Instagram',
      label: 'Instagram',
    },
    {
      value: 'Twitter',
      label: 'Twitter',
    },
    {
      value: 'Facebook',
      label: 'Facebook',
    },

    {
      value: 'LinkedIn',
      label: 'LinkedIn',
    },
    {
      value: 'Pinterest',
      label: 'Pinterest',
    },
  ];

  const language = [
    {
      value: 'English',
      label: 'English',
    },
    {
      value: 'Chinese',
      label: 'Chinese',
    },
    {
      value: 'Japanese',
      label: 'Japanese',
    },
    {
      value: 'France',
      label: 'France',
    },
    {
      value: 'German',
      label: 'German',
    },
    {
      value: 'Protuguese',
      label: 'Protuguese',
    },
    {
      value: 'Spanish',
      label: 'Spanish',
    },
  ];

  const styleList = [
    { label: 'Casual', value: 'Casual' },
    { label: 'Cheeky', value: 'Cheeky' },
    { label: 'Cheerful', value: 'Cheerful' },
    { label: 'Confident', value: 'Confident' },
    { label: 'Direct', value: 'Direct' },
    { label: 'Dry', value: 'Dry' },
    { label: 'Educational', value: 'Educational' },
    { label: 'Firm', value: 'Firm' },
    { label: 'Flowery', value: 'Flowery' },
    { label: 'Formal', value: 'Formal' },
    { label: 'Frank', value: 'Frank' },
    { label: 'Friendly', value: 'Friendly' },
    { label: 'Fun', value: 'Fun' },
    { label: 'Grumpy', value: 'Grumpy' },
    { label: 'Helpful', value: 'Helpful' },
    { label: 'Inspirational', value: 'Inspirational' },
    { label: 'Irreverent', value: 'Irreverent' },
    { label: 'Matter-of-fact', value: 'Matter-of-fact' },
    { label: 'Mysterious', value: 'Mysterious' },
    { label: 'Playful', value: 'Playful' },
    { label: 'Respectful', value: 'Respectful' },
    { label: 'Sophisticated', value: 'Sophisticated' },
    { label: 'Succinct', value: 'Succinct' },
    { label: 'Unhinged', value: 'Unhinged' },
    { label: 'Witty', value: 'Witty' },
    { label: 'ASMRtist', value: 'ASMRtist' },
    { label: 'Bestie', value: 'Bestie' },
    { label: 'Boomer', value: 'Boomer' },
    { label: 'Cyborg', value: 'Cyborg' },
    { label: '18th-century poet', value: '18th-century poet' },
    { label: 'Emo teenager', value: 'Emo teenager' },
    { label: 'Fitness influencer', value: 'Fitness influencer' },
    { label: 'Gen Xer', value: 'Gen Xer' },
    { label: 'Gen Zer', value: 'Gen Zer' },
    { label: 'Girlboss', value: 'Girlboss' },
    { label: 'Gryffindor', value: 'Gryffindor' },
    { label: 'Hufflepuff', value: 'Hufflepuff' },
    { label: 'LA influencer', value: 'LA influencer' },
    { label: 'Linkedin bro', value: 'Linkedin bro' },
    { label: 'Makeup influencer', value: 'Makeup influencer' },
    { label: 'Millennial', value: 'Millennial' },
    { label: 'NY influencer', value: 'NY influencer' },
    { label: 'Older sister', value: 'Older sister' },
    { label: 'Optimistic soccer coach', value: 'Optimistic soccer coach' },
    { label: 'Pirate', value: 'Pirate' },
    { label: 'Pop singer', value: 'Pop singer' },
    { label: 'Professional wrestler', value: 'Professional wrestler' },
    { label: 'Queen of England', value: 'Queen of England' },
    { label: 'Ravenclaw', value: 'Ravenclaw' },
    { label: 'Real housewife', value: 'Real housewife' },
    { label: 'Robot', value: 'Robot' },
    { label: 'Sad boi', value: 'Sad boi' },
    { label: 'Shakespearean actor', value: 'Shakespearean actor' },
    { label: 'Slytherin', value: 'Slytherin' },
    { label: 'Soft boy', value: 'Soft boy' },
    { label: 'Stand-up comedian', value: 'Stand-up comedian' },
    { label: 'Stern teacher', value: 'Stern teacher' },
    { label: 'Tech girlie', value: 'Tech girlie' },
    { label: 'Thought leader', value: 'Thought leader' },
    { label: 'Tour guide', value: 'Tour guide' },
    { label: 'True crime podcast host', value: 'True crime podcast host' },
    { label: 'Used car salesperson', value: 'Used car salesperson' },
    { label: 'VSCO girl', value: 'VSCO girl' },
    { label: 'Y2K teenager', value: 'Y2K teenager' },
    { label: 'YouTube creator', value: 'YouTube creator' },
  ];

  const onFinish = async () => {
    try {
      setLoading(true);
      const res = await aiCaption({ ...form.getFieldsValue() });
      setNames(res);
      setShowRes(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (defaultNetwork) {
      form.setFieldValue('network', defaultNetwork);
    }
  }, [defaultNetwork, form]);

  return (
    <div className={cx(styles.container, className)} style={style}>
      <div className={styles.form}>
        <Form
          name="captionGenerator"
          form={form}
          layout="vertical"
          labelCol={{ span: 4 }}
          className={styles.formInner}
          onFinish={onFinish}
        >
          <div className={cx({ [styles.none]: showRes })}>
            <Form.Item
              label="Network"
              name="network"
              rules={[{ required: true, message: 'Please select network!' }]}
            >
              <Select
                placeholder="Select Network"
                options={networks}
                defaultValue={defaultNetwork}
              />
            </Form.Item>
            <Form.Item
              label="Style"
              name="style"
              rules={[{ required: true, message: 'Please select style!' }]}
            >
              <Select placeholder="Select Style" options={styleList} />
            </Form.Item>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: 'Please select language!' }]}
            >
              <Select placeholder="Select Language" options={language} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: 'Please input your description!' },
              ]}
            >
              <Input
                showCount
                maxLength={200}
                placeholder="Type Your Description"
              />
            </Form.Item>
            <Form.Item
              label="Keywords"
              name="keywords"
              rules={[
                { required: true, message: 'Please input your keywords!' },
              ]}
            >
              <Input
                showCount
                maxLength={200}
                placeholder="Type Your Keywords"
              />
            </Form.Item>
          </div>
          <div className={cx(styles.result, { [styles.none]: !showRes })}>
            <Spin spinning={loading}>
              {Array.isArray(names) &&
                names.map((item, index) => {
                  return (
                    <div key={index} className={styles.item}>
                      {index + 1}. {item}
                    </div>
                  );
                })}
            </Spin>
          </div>
          <div className={cx(styles.tip, { [styles.none]: !showRes })}>
            Attention: Kindly be advised that this utility may potentially
            present distorted or objectionable content that does not reflect the
            perspectives of voc.ai. The usage of this tool, along with any
            resultant content, is entirely your responsibility to ensure its
            adherence to relevant laws and the rights of third parties.
          </div>
          <div className={styles.buttons}>
            <Button
              className={styles.btn}
              onClick={() => {
                form.resetFields();
                setShowRes(false);
              }}
            >
              Reset
            </Button>
            <Button
              loading={loading}
              className={cx(styles.btn, { [styles.none]: showRes })}
              htmlType="submit"
              type="primary"
            >
              Generate
            </Button>
            <Button
              className={cx(styles.btn, { [styles.none]: !showRes })}
              type="primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              Need more ideas?
            </Button>
          </div>
        </Form>
      </div>
      <GuideModal open={open} onClose={onClose} />
    </div>
  );
}

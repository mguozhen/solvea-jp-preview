import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import cx from 'classnames';
import { Button, Form, Input, Select, Spin } from 'antd';
import { aiHashtag } from 'util/services';
import GuideModal from '../GuideModal';

interface Props extends BaseCSSProps {
  defaultNetwork?: string;
}

/**
 * ins hashtag生成器
 * @param props
 * @returns
 */
export default function InsHashtagGenerator(props: Props) {
  const { className, style, defaultNetwork } = props;
  const [showRes, setShowRes] = useState(false);
  const [form] = Form.useForm();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

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

  const onFinish = async () => {
    try {
      setLoading(true);
      const res = await aiHashtag({
        ...form.getFieldsValue(),
      });
      setNames(res);
      setShowRes(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          name="hashtagGenerator"
          form={form}
          layout="vertical"
          className={styles.formInner}
          labelCol={{ span: 4 }}
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
              label="Language"
              name="language"
              rules={[{ required: true, message: 'Please select language!' }]}
            >
              <Select placeholder="Select Language" options={language} />
            </Form.Item>
            <Form.Item
              label="Keywords"
              name="keywords"
              rules={[
                { required: true, message: 'Please input your keowords' },
              ]}
            >
              <Input
                showCount
                maxLength={200}
                placeholder="Type Your Keywords"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: 'Please input your description.' },
              ]}
            >
              <Input
                showCount
                maxLength={200}
                placeholder="Type Your Description"
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
        <GuideModal open={open} onClose={onClose} />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import cx from 'classnames';
import { Button, Form, Input, Select, Spin } from 'antd';
import { aiUsername } from 'util/services';
import GuideModal from '../GuideModal';

interface Props extends BaseCSSProps {
  defaultNetwork?: string;
}

/**
 * username生成器
 * @param props
 * @returns
 */
export default function UsernameGenerator(props: Props) {
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
      value: 'YouTube',
      label: 'YouTube',
    },
    {
      value: 'Tumblr',
      label: 'Tumblr',
    },
    {
      value: 'Xbox',
      label: 'Xbox',
    },
    {
      value: 'Playstation',
      label: 'Playstation',
    },
    {
      value: 'Twitch',
      label: 'Twitch',
    },
    {
      value: 'Reddit',
      label: 'Reddit',
    },
    {
      value: 'Steam',
      label: 'Steam',
    },
    {
      value: 'Github',
      label: 'Github',
    },
    {
      value: 'Minecraft',
      label: 'Minecraft',
    },
    {
      value: 'Pinterest',
      label: 'Pinterest',
    },
    {
      value: 'BeReal',
      label: 'BeReal',
    },
    {
      value: 'Mastodon',
      label: 'Mastodon',
    },
  ];

  const accountTypes = [
    {
      value: 'Personal',
      label: 'Personal',
    },
    {
      value: 'Business',
      label: 'Business',
    },
  ];

  const categories = [
    { label: 'Education', value: 'Education' },
    { label: 'Nonprofit', value: 'Nonprofit' },
    { label: 'Banking', value: 'Banking' },
    { label: 'Retail', value: 'Retail' },
    { label: 'Interior design', value: 'Interior design' },
    { label: 'Real estate', value: 'Real estate' },
    { label: 'Architecture', value: 'Architecture' },
    { label: 'Wellness', value: 'Wellness' },
    { label: 'Tech', value: 'Tech' },
    { label: 'Health', value: 'Health' },
    { label: 'Coaching', value: 'Coaching' },
    { label: 'Hotel', value: 'Hotel' },
    { label: 'Insurance', value: 'Insurance' },
    { label: 'Clothing', value: 'Clothing' },
    { label: 'Preschool', value: 'Preschool' },
    { label: 'Jewelry', value: 'Jewelry' },
    { label: 'Hair salon', value: 'Hair salon' },
    { label: 'Nail salon', value: 'Nail salon' },
    { label: 'Grocery', value: 'Grocery' },
    { label: 'Furniture', value: 'Furniture' },
    { label: 'Home goods', value: 'Home goods' },
    { label: 'Ceramics', value: 'Ceramics' },
    { label: 'Pet grooming', value: 'Pet grooming' },
    { label: 'Clinic', value: 'Clinic' },
    { label: 'Bookstore', value: 'Bookstore' },
    { label: 'Lighting', value: 'Lighting' },
    { label: 'Fabric store', value: 'Fabric store' },
    { label: 'Beauty', value: 'Beauty' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Foodie', value: 'Foodie' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Gaming', value: 'Gaming' },
    { label: 'Daily vlog', value: 'Daily vlog' },
    { label: 'Family vlog', value: 'Family vlog' },
    { label: 'Travel vlog', value: 'Travel vlog' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Pet', value: 'Pet' },
    { label: 'Artist', value: 'Artist' },
    { label: 'Musician', value: 'Musician' },
    { label: 'Reviews', value: 'Reviews' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Chef', value: 'Chef' },
    { label: 'Fashion', value: 'Fashion' },
  ];

  const onFinish = async () => {
    try {
      setLoading(true);
      const res = await aiUsername({ ...form.getFieldsValue() });
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
          name="usernameGenerator"
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
              label="Account Type"
              name="accountType"
              rules={[
                { required: true, message: 'Please select account type!' },
              ]}
            >
              <Select
                placeholder="Select Account Type"
                options={accountTypes}
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select category!' }]}
            >
              <Select placeholder="Select Category" options={categories} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input description.' }]}
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
      </div>
      <GuideModal open={open} onClose={onClose} />
    </div>
  );
}

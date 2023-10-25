import { Flex, Form, Input, Radio, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/elements'
import { useUserSending } from '@/hooks/user'

export function BuisnessFrom() {
  const { mutate: SendUserInfo } = useUserSending()
  const router = useRouter()
  const onFinish = async (values) => {
    try {
      await SendUserInfo({
        buisness: values,
      })
      router.push('/photo')
    } catch (err) {
      console.log(err)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const [form] = Form.useForm()
  return (
    <Flex vertical justify="center">
      <Typography.Title>Account Setup</Typography.Title>
      <Typography.Text type="secondary">
        Complete data to personalized your experience!
      </Typography.Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Form.Item
          label="Business Name"
          name="companyName"
          rules={[{ required: true, message: 'Business Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type of Business"
          name="buisnessType"
          rules={[{ required: true, message: 'Type of Business' }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="Type of Business"
          name="motherName"
          rules={[{ required: true, message: 'Type of Business' }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item label="Marital Status" name="Marital">
          <Radio.Group>
            <Radio value>Married</Radio>
            <Radio value={false}>Not Maried</Radio>
          </Radio.Group>
        </Form.Item>
        <div className="flex flex-row justify-between gap-7">
          <Link href="/education">
            <button
              type="button"
              className="flex h-12 w-40 items-center justify-center rounded-full border-2 border-neutral-700 px-6 py-3 text-base font-bold text-neutral-700"
            >
              Previously
            </button>
          </Link>
          <Button type="submit">Continue</Button>
        </div>
      </Form>
    </Flex>
  )
}

export default BuisnessFrom

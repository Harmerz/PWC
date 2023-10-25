import { Flex, Form, Input, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/elements'
import { useUserSending } from '@/hooks/user'

export function PhotoForm() {
  const { mutate: SendUserInfo } = useUserSending()
  const router = useRouter()
  const onFinish = async (values) => {
    try {
      await SendUserInfo({
        finansial: values,
      })
      router.push('/chat/lending')
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
          label="Owned Properties 1"
          name="owned1"
          rules={[{ required: true, message: 'Owned Properties 1' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Properties 1 Addresses"
          name="properties1"
          rules={[{ required: true, message: 'Properties 1 Addresses' }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="Owned Properties 2 (Optional)"
          name="owned2"
          rules={[{ message: 'Owned Properties 2 (Optional)' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Properties 2 Addresses (Optional)"
          name="properties2"
          rules={[{ message: 'Properties 2 Addresses (Optional)' }]}
        >
          <Input />
        </Form.Item>
        <div className="flex flex-row justify-between gap-7">
          <Link href="/buisness">
            <button
              type="button"
              className="flex h-12 w-40 items-center justify-center rounded-full border-2 border-neutral-700 px-6 py-3 text-base font-bold text-neutral-700"
            >
              Previously
            </button>
          </Link>
          <Button type="submit">Finish</Button>
        </div>
      </Form>
    </Flex>
  )
}

export default PhotoForm

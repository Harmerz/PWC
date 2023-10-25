import { Flex, Form, Input, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/elements'
import { useUserSending } from '@/hooks/user'

export function EducationForm() {
  const { mutate: SendUserInfo } = useUserSending()
  const router = useRouter()
  const onFinish = async (values) => {
    try {
      await SendUserInfo({
        information: values,
      })
      router.push('/buisness')
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
          label="Highest Education Attained"
          name="education"
          rules={[{ required: true, message: 'Highest Education Attained' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Occupation"
          name="occupation"
          rules={[{ required: true, message: 'Occupation' }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="Tax Identification Number (NPWP)"
          name="NPWP"
          rules={[{ required: true, message: 'Tax Identification Number (NPWP)' }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="Business Trading License (SLUP)"
          name="SLUP"
          rules={[{ required: true, message: 'HBusiness Trading License (SLUP)' }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="National Identity Card (KTP)"
          name="KTP"
          rules={[{ required: true, message: 'National Identity Card (KTP)' }]}
        >
          <Input />
        </Form.Item>
        <div className="flex flex-row justify-between gap-7">
          <Link href="/personal">
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

export default EducationForm

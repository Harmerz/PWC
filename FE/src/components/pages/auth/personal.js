import { DatePicker, Flex, Form, Input, Select, Typography } from 'antd'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/elements'
import { useUserSending } from '@/hooks/user'

export function PersonalForm() {
  const { mutate: SendUserInfo } = useUserSending()
  const router = useRouter()
  const onFinish = async (values) => {
    try {
      await SendUserInfo({
        basic: values,
      })
      router.push('/education')
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
          label="Fullname"
          name="name"
          rules={[{ required: true, message: 'e.g. John Doe' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'eg: 87654321' }]}
        >
          <Input
            addonBefore={
              <Form.Item name="suffix" noStyle>
                62
              </Form.Item>
            }
            style={{ width: '100%' }}
          />
        </Form.Item>

        <div className="flex flex-row gap-3">
          <Form.Item
            label="Place Of Birth"
            name="birthPlace"
            rules={[{ required: true, message: 'e.g. Yogyakarta' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="birthDate"
            rules={[{ required: true, message: 'Date of Birth' }]}
          >
            <DatePicker />
          </Form.Item>
        </div>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="select your gender">
            <Select.Option value>Male</Select.Option>
            <Select.Option value={false}>Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'e.g. Yogyakarta' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="submit">Continue</Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default PersonalForm

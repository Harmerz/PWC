import { Flex, Form, Input, message, Space, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/elements'
import { useSignUp } from '@/hooks/user'

export function RegisterForm() {
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate: SignUp, data, isError } = useSignUp()
  const router = useRouter()

  const success = (succ) => {
    messageApi.open({
      type: 'success',
      content: succ,
    })
  }

  const error = (err) => {
    messageApi.open({
      type: 'success',
      content: `Error ${err}`,
    })
  }

  // localStorage.removeItem('values')
  // localStorage.removeItem('date')
  const onFinish = async (values) => {
    try {
      const date = new Date()
      localStorage.setItem('values', JSON.stringify(values))
      localStorage.setItem('date', JSON.stringify(date))
      SignUp(values)
      success(data?.message)
      router.push('/need-verify')
      router.refresh()
    } catch (err) {
      console.log(err)
    }
    if (isError) error(data)
  }

  const onFinishFailed = (errorInfo) => {
    error(errorInfo)
  }
  const [form] = Form.useForm()
  return (
    <>
      {contextHolder}
      <Flex vertical justify="center">
        <Typography.Title>Create an Account</Typography.Title>
        <Typography.Text type="secondary">
          Start your journey with us. Register now to explore a world of possibilities.
        </Typography.Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="submit">Register</Button>
          </Form.Item>
        </Form>
        <Space direction="horizontal">
          <Typography.Text>Don’t have an Account?</Typography.Text>
          <Link href="/signin">
            <Typography.Text className="font-inter text-bluey-500" strong>
              Log In
            </Typography.Text>
          </Link>
        </Space>
      </Flex>
    </>
  )
}

export default RegisterForm

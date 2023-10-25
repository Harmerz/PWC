import { Flex, Form, Input, Space, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/elements'

export function LoginForm() {
  const router = useRouter()
  const onFinish = async (e) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: e.email,
        password: e.password,
      })
      if (!res?.error) {
        router.refresh()
      }
    } catch (err) {
      throw Error.message(err)
    }
  }

  const onFinishFailed = (errorInfo) => {
    throw Error.message('Failed:', errorInfo)
  }
  const [form] = Form.useForm()
  return (
    <Flex vertical justify="center">
      <Typography.Title className=" font-dmsans">Log In to Your Account</Typography.Title>
      <Typography.Text className="font-inter" type="secondary">
        Welcome back! Enter your credentials to access your personalized experience.
      </Typography.Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Form.Item
          className="font-inter"
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="font-inter"
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="submit" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
      <Space direction="horizontal">
        <Typography.Text className="font-inter">Don’t have an Account?</Typography.Text>
        <Link href="/signup">
          <Typography.Text className="text-bluey-500 font-inter" strong>
            Register
          </Typography.Text>
        </Link>
      </Space>
    </Flex>
  )
}

export default LoginForm

import React from 'react'
import {
  Button,
  Form,
  Input,
  Typography
} from "antd"

const { Title } = Typography

type Props = {
  submitForm: (values: Record<string, unknown>, resetFields: () => void) => void
  onSubmitFail: () => void
}

const NewEntryForm = ({ submitForm, onSubmitFail }: Props) => {
  const [form] = Form.useForm()

  const onFinish = (values: Record<string, unknown>) => {
    submitForm(values, () => form.resetFields())
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onSubmitFail}
        autoComplete="off"
      >
        <Title level={5} style={{ textAlign: "center" }}>New Entry</Title>
        <Form.Item
          label="calories"
          name="calories"
          rules={[{ required: true, message: 'Calories are required!' }]}
        >
          <Input type="number"/>
        </Form.Item>

        <Form.Item
          label="food"
          name="food"
          rules={[{ required: true, message: 'Specify the food!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="price"
          name="price"
        >
          <Input type="number"/>
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}


export default NewEntryForm
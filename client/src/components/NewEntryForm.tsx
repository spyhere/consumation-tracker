import React from 'react'
import {
  Button,
  Form,
  FormInstance,
  Input,
  Typography
} from "antd"
import { EntryUpdateT } from "api/entry"

const { Title } = Typography

type Props = {
  submitForm: (values: EntryUpdateT) => void
  onSubmitFail: () => void
  form: FormInstance
}

const NewEntryForm = ({ submitForm, onSubmitFail, form }: Props) => {
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={submitForm}
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
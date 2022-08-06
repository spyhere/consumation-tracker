import React, { useState } from 'react'
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Typography
} from "antd"
import {
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons"
import { EntryT } from "api/entry"
import { useAuthContext } from "contexts/AuthContext"
import { AuthEnum } from "../enums"
import { useStateContext } from "contexts/entryContext"

type Props = {
  data: EntryT[]
}

const EntryList = ({ data }: Props) => {
  const { role } = useAuthContext()
  const [form] = Form.useForm()
  const { deleteEntry, editEntry } = useStateContext()
  const [entry, setEntry] = useState<EntryT | null>()

  const handleEdit = (entry: EntryT) => {
    setEntry(entry)
  }

  const handleCancel = () => {
    form.resetFields()
    setEntry(null)
  }

  const handleOk = () => {
    form.validateFields(["calories", "food"])
      .then(() => {
        editEntry(entry!.id, form.getFieldsValue())
        setEntry(null)
      })
      .catch((err) => console.log(err))
  }


  const isAdmin = role === AuthEnum.ADMIN

  return (
    <>
      <Table
        rowKey={row => row.id}
        dataSource={data}
        pagination={false}
        bordered={true}
      >
        <Table.Column title="Food" dataIndex="food" key="food"/>
        <Table.Column title="Calories" dataIndex="calories" key="calories"/>
        <Table.Column title="Price" dataIndex="price" key="price"/>
        <Table.Column title="Time" dataIndex="createdAt" key="time"
                      render={(time) => new Date(time).toLocaleTimeString()}/>
        {isAdmin && (
          <Table.Column title="Actions" key="action" dataIndex="id" render={(id) => (
            <Row justify="space-around">
              <Button
                icon={<EditOutlined/>}
                onClick={() => handleEdit(data.find(it => it.id === id)!)}
                shape="circle"
                size="middle"
                type="primary"
              />
              <Button
                danger
                icon={<DeleteOutlined/>}
                onClick={() => deleteEntry(id)}
                shape="circle"
                size="middle"
                type="primary"
              />
            </Row>
          )}/>
        )}
      </Table>
      {entry && (
        <Modal
          title="Title"
          visible={!!entry}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
          >
            <Typography.Title level={5} style={{ textAlign: "center" }}>Edit</Typography.Title>
            <Form.Item
              initialValue={entry.calories}
              label="calories"
              name="calories"
              rules={[{ required: true, message: 'Calories are required!' }]}
            >
              <Input type="number"/>
            </Form.Item>

            <Form.Item
              initialValue={entry.food}
              label="food"
              name="food"
              rules={[{ required: true, message: 'Specify the food!' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              initialValue={entry.price}
              label="price"
              name="price"
            >
              <Input type="number"/>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  )
}


export default EntryList
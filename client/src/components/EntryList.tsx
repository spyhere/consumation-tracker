import React from 'react'
import {
  Button,
  Row,
  Table
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
  const { deleteEntry } = useStateContext()

  const isAdmin = role === AuthEnum.ADMIN

  return (
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
              onClick={() => {}}
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
  )
}


export default EntryList
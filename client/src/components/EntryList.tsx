import React from 'react'
import { Table } from "antd"
import { EntryT } from "../api/entry"
import { ColumnsType } from "antd/es/table"

type Props = {
  data: EntryT[]
}

const columns: ColumnsType<EntryT> = [
  {
    title: "Food",
    dataIndex: "food",
    key: "food",
  },
  {
    title: "Calories",
    dataIndex: "calories",
    key: "calories",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: price => `$${price}`
  },
  {
    title: "Time",
    dataIndex: "createdAt",
    key: "time",
    render: time => new Date(time).toDateString()
  },
]

const EntryList = ({ data }: Props) => {

  return <Table
    rowKey={row => row.id}
    columns={columns}
    dataSource={data}
    pagination={false}
    bordered={true}
  />
}


export default EntryList
import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import { DayT } from "api/entry"
import Day from "./Day"
import {
  Col,
  Empty,
  Row,
  Space,
  Spin
} from "antd"

type Props = {
  days: DayT[]
  hasNextPage?: boolean
  loaderFunction: () => void
}

const DaysOverview = ({ days, hasNextPage, loaderFunction }: Props) => {

  if (!days.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You have no entries" />
  }
  return (
    <>
      <InfiniteScroll
        dataLength={days.length}
        hasMore={!!hasNextPage}
        loader={<Row justify="center"><Spin /></Row>}
        next={loaderFunction}
      >
        <Row justify="center" gutter={16}>
          <Col span={12}>
            <Space direction="vertical" size="middle" style={{ display: "flex" }}>
              {days.map(it => <Day data={it} key={it.id}/>)}
            </Space>
          </Col>
        </Row>
      </InfiniteScroll>
    </>
  )
}


export default DaysOverview
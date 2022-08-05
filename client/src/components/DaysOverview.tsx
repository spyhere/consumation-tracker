import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import { DayT } from "../api/entry"
import Day from "./Day"
import {
  Col,
  Row,
  Space
} from "antd"

type Props = {
  days: DayT[]
  hasNextPage?: boolean
  loaderFunction: () => void
}

const DaysOverview = ({ days, hasNextPage, loaderFunction }: Props) => {
  return (
    <>
      <InfiniteScroll
        dataLength={days.length}
        hasMore={!!hasNextPage}
        loader={<span>Loading...</span>}
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
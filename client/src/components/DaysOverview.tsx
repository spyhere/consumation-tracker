import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import { DayT } from "../api/entry"
import Day from "./Day"
import { Col, Row, Space } from "antd"

type Props = {
  data: {
    dates: DayT[]
  }
  meta: {
    cursor: number
  }
  loaderFunction: () => void
}

const DaysOverview = ({ data, meta, loaderFunction }: Props) => {
  return (
    <>
      <InfiniteScroll
        dataLength={data.dates.length}
        hasMore={!!meta.cursor}
        loader={<span>Loading...</span>}
        next={loaderFunction}
      >
        <Row justify="center" gutter={16}>
          <Col span={12}>
            <Space direction="vertical" size="middle" style={{ display: "flex" }}>
              {data.dates.map(it => <Day data={it} key={it.id}/>)}
            </Space>
          </Col>
        </Row>
      </InfiniteScroll>
    </>
  )
}


export default DaysOverview
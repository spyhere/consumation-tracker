import React from 'react'
import { DayT } from "api/entry"
import {
  Card,
  Collapse
} from "antd"
import EntryList from "./EntryList"
import CardWarningTitle from "./CardWarningTitle"
import { CALORIES_LIMIT } from "resources/constants"

const { Panel } = Collapse

type Props = {
  data: DayT
}

const today = new Date().toISOString().split("T")[0]

const Day = ({ data }: Props) => {
  const calLimitReached = data.consumed >= Number(CALORIES_LIMIT)

  const dangerStyle = calLimitReached ? { background: "#ff7875", color: "#fff" } : {}
  const isToday = (data.daytime === today) ? "Today " : ""

  return (
    <Card title={<CardWarningTitle title={isToday + data.daytime} isWarning={calLimitReached}/>} hoverable
          headStyle={dangerStyle}>
      <b>Consumed: </b><code>{data.consumed}</code>
      {' '}
      <b>Entries: </b><code>{data.Entry.length}</code>
      <Collapse accordion>
        <Panel header="Show entries" key={data.daytime}>
          <EntryList data={data.Entry}/>
        </Panel>
      </Collapse>
    </Card>
  )
}


export default Day
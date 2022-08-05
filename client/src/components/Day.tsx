import React from 'react'
import { DayT } from "../api/entry"
import { Card, Collapse } from "antd"
import EntryList from "./EntryList"

const { Panel } = Collapse

type Props = {
  data: DayT
}


const Day = ({ data }: Props) => {

  return (
    <Card title={data.daytime} hoverable>
      <b>Consumed: </b><code>{data.consumed}</code>
      {' '}
      <b>Entries: </b><code>{data.Entry.length}</code>
      <Collapse accordion>
        <Panel header="Show entries" key={data.daytime}>
          <EntryList data={data.Entry} />
        </Panel>
      </Collapse>
    </Card>
  )
}


export default Day
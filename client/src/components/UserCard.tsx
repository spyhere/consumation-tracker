import React from 'react'
import {
  Card,
  Col,
  Row,
  Statistic
} from "antd"
import { UserT } from "api/user"

type Props = {
  user: UserT
}

const UserCard = ({ user }: Props) => {
  return (
    <Card title={user.name} bordered={false} className="user-card" hoverable>
      <Row>
        <Col span={12}>
          <Statistic title="This week entries" value={user.currentWeekEntries}/>
        </Col>
        <Col span={12}>
          <Statistic title="Previous week entries" value={user.previousWeekEntries}/>
        </Col>
      </Row>
      <Col span={12}>
        <Statistic title="Avg. calories per week" value={user.averageCalories.toFixed(2)}/>
      </Col>
      <Row>
      </Row>
    </Card>
  )
}


export default UserCard
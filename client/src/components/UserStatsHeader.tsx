import React from "react"
import {
  Alert,
  Col,
  Row,
  Statistic
} from "antd"
import {
  DollarOutlined,
  DotChartOutlined
} from "@ant-design/icons"
import {
  CALORIES_LIMIT,
  MONEY_SPENT_LIMIT
} from "../resources/constants"

type Props = {
  monthMoneySpent: string,
  dayCalories: number | null
}

const UserStatsHeader = ({ monthMoneySpent, dayCalories }: Props) => {
  const isCaloriesLimitReached = (dayCalories || 0) >= CALORIES_LIMIT
  const isMoneyLimitReached = (monthMoneySpent || 0) >= MONEY_SPENT_LIMIT

  return <Row justify="center" gutter={16}>
    <Col span={5}>
      <Statistic title="Money spent this month" value={monthMoneySpent} prefix={<DollarOutlined/>}/>
      {isMoneyLimitReached && (
        <Alert message="Money limit is reached" type="warning" showIcon closable/>
      )}
    </Col>
    <Col span={5}>
      <Statistic title="Calories consumed this day" value={dayCalories || 0} prefix={<DotChartOutlined/>}/>
      {isCaloriesLimitReached && (
        <Alert message="Calories limit is reached" type="warning" showIcon closable/>
      )}
    </Col>
  </Row>
}

export default UserStatsHeader

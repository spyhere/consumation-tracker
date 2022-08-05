import React from 'react'
import DaysOverview from "components/DaysOverview"
import {
  useEntriesPaginated,
  useEntriesStats
} from "queries/entry"
import {
  DollarOutlined,
  DotChartOutlined
} from "@ant-design/icons"
import {
  Col,
  Divider,
  Layout,
  PageHeader,
  Row,
  Statistic,
  Typography
} from "antd"

const { Header, Content } = Layout
const { Title } = Typography

const Entries = () => {
  const { data: { data, meta } = {} } = useEntriesPaginated()
  const { data: { monthMoneySpent, dayCalories } = { monthMoneySpent: "", dayCalories: null } } = useEntriesStats()

  const loadMoreDates = () => {
    console.log("load more")
  }

  return (
    <>
      <PageHeader>
        <Title level={3}>Entries</Title>
      </PageHeader>
      <Layout>
        <Header>
          <Row justify="center" gutter={16}>
            <Col span={4}>
              <Statistic title="Money spent this month" value={monthMoneySpent} prefix={<DollarOutlined/>}/>
            </Col>
            <Col span={4}>
              <Statistic title="Calories consumed this day" value={dayCalories || 0} prefix={<DotChartOutlined/>}/>
            </Col>
          </Row>
        </Header>
        <Content>
          <Divider/>
          {data?.dates && meta && (
            <DaysOverview data={data} meta={meta} loaderFunction={loadMoreDates}/>
          )}
        </Content>
      </Layout>
    </>
  )
}


export default Entries
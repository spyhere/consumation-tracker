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
  Spin,
  Statistic,
  Typography
} from "antd"

const { Header, Content } = Layout
const { Title } = Typography

const Entries = () => {
  const { data, fetchNextPage, hasNextPage, isLoading: isLoadingEntries } = useEntriesPaginated()
  const { data : entriesStats, isLoading: isLoadingStats} = useEntriesStats()

  const loadMoreDates = () => {
    fetchNextPage()
  }

  const days = data?.pages.map(it => it.data.dates).flat()
  const { monthMoneySpent, dayCalories } = entriesStats || { monthMoneySpent: "", dayCalories: "" }

  return (
    <Spin spinning={isLoadingStats || isLoadingEntries}>
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
          {days && (
            <DaysOverview days={days} hasNextPage={hasNextPage} loaderFunction={loadMoreDates}/>
          )}
        </Content>
      </Layout>
    </Spin>
  )
}


export default Entries
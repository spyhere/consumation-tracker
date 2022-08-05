import React from 'react'
import DaysOverview from "components/DaysOverview"
import {
  useEntriesPaginated,
  useEntriesPaginatedKey,
  useEntriesStats,
  useEntriesStatsKey,
} from "queries/entry"
import EntryService from "api/entry"
import {
  DollarOutlined,
  DotChartOutlined,
  ToTopOutlined
} from "@ant-design/icons"
import {
  Alert,
  BackTop,
  Col,
  Divider,
  Form,
  Layout,
  PageHeader,
  Row,
  Spin,
  Statistic,
  Typography
} from "antd"
import NewEntryForm from "components/NewEntryForm"
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query"
import {
  CALORIES_LIMIT,
  MONEY_SPENT_LIMIT
} from "resources/constants"

const { Header, Content } = Layout
const { Title } = Typography

const Entries = () => {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const { data, fetchNextPage, hasNextPage, isLoading: isLoadingEntries } = useEntriesPaginated()
  const { data: entriesStats, isLoading: isLoadingStats } = useEntriesStats()
  const entryCreate = useMutation(EntryService.createEntry, {
    onSuccess: () => {
      form.resetFields()
      queryClient.invalidateQueries([useEntriesPaginatedKey])
      queryClient.invalidateQueries([useEntriesStatsKey])
    }
  })

  const loadMoreDates = () => {
    fetchNextPage()
  }

  const submitForm = (values: Record<string, unknown>) => {
    entryCreate.mutate(values)
  }


  const days = data?.pages.map(it => it.data.dates).flat()
  const { monthMoneySpent, dayCalories } = entriesStats || { monthMoneySpent: "", dayCalories: "" }

  const isCaloriesLimitReached = (dayCalories || 0) >= CALORIES_LIMIT
  const isMoneyLimitReached = (monthMoneySpent || 0) >= MONEY_SPENT_LIMIT

  return (
    <Spin spinning={isLoadingStats || isLoadingEntries}>
      <PageHeader>
        <Title level={3}>Entries</Title>
      </PageHeader>
      <Layout>
        <Header>
          <Row justify="center" gutter={16}>
            <Col span={5}>
              <Statistic title="Money spent this month" value={monthMoneySpent} prefix={<DollarOutlined/>}/>
              {isMoneyLimitReached && (
                <Alert message="Money limit is reached" type="warning" showIcon closable />
              )}
            </Col>
            <Col span={5}>
              <Statistic title="Calories consumed this day" value={dayCalories || 0} prefix={<DotChartOutlined/>}/>
              {isCaloriesLimitReached && (
                <Alert message="Calories limit is reached" type="warning" showIcon closable />
              )}
            </Col>
          </Row>
        </Header>
        <Content>
          <Divider/>
          <NewEntryForm submitForm={submitForm} onSubmitFail={() => {}} form={form}/>
          <Divider/>
          {days && (
            <DaysOverview days={days} hasNextPage={hasNextPage} loaderFunction={loadMoreDates}/>
          )}
        </Content>
      </Layout>
      <BackTop>
        <ToTopOutlined style={{ fontSize: "40px" }}/>
      </BackTop>
    </Spin>
  )
}


export default Entries
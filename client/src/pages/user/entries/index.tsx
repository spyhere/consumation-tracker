import React, { useState } from 'react'
import DaysOverview from "components/DaysOverview"
import {
  Link,
  useLocation,
  useParams
} from "react-router-dom"
import {
  useEntriesByDates,
  useEntriesPaginated,
  useEntriesPaginatedKey,
  useEntriesStats,
  useEntriesStatsKey,
} from "queries/entry"
import EntryService, { EntryBodyT } from "api/entry"
import {
  LeftOutlined,
  ToTopOutlined
} from "@ant-design/icons"
import {
  BackTop,
  DatePicker,
  Divider,
  Form,
  Layout,
  PageHeader,
  Space,
  Spin,
  Typography,
} from "antd"
import NewEntryForm from "components/NewEntryForm"
import UserStatsHeader from "components/UserStatsHeader"
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query"
import { StateContextProvider } from "contexts/entryContext"

const { Header, Content } = Layout
const { Title } = Typography

const Entries = () => {
  const { id: userId } = useParams()
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const { data, fetchNextPage, hasNextPage, isLoading: isLoadingEntries } = useEntriesPaginated(userId)
  const [{ from, to }, setRange] = useState<{ from?: string, to?: string }>({})
  const {
    data: entriesByDatesData,
    isFetching: isFetchingEntryByDates
  } = useEntriesByDates(from!, to!, { enabled: !!from || !!to })
  const { data: entriesStats, isLoading: isLoadingStats, isFetching: isFetchingStats } = useEntriesStats(userId)
  const entryCreate = useMutation(EntryService.createEntry, {
    onSuccess: () => {
      form.resetFields()
      queryClient.invalidateQueries([useEntriesPaginatedKey])
      queryClient.invalidateQueries([useEntriesStatsKey])
    }
  })
  const entryDelete = useMutation(EntryService.deleteEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries([useEntriesPaginatedKey])
      queryClient.invalidateQueries([useEntriesStatsKey])
    }
  })
  const entryEdit = useMutation(EntryService.editEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries([useEntriesPaginatedKey])
      queryClient.invalidateQueries([useEntriesStatsKey])
    }
  })

  const loadMoreDates = () => {
    fetchNextPage()
  }

  const submitForm = (values: EntryBodyT) => {
    const body = {
      ...values,
      time: (values.time as any).toDate().toISOString()
    }
    entryCreate.mutate({ body, userId })
  }

  const deleteEntry = (id: number) => {
    entryDelete.mutate(id)
  }

  const editEntry = (id: number, body: EntryBodyT) => {
    entryEdit.mutate({ id, body })
  }

  const handleDateFilter = (_: unknown, data: string[]) => {
    const [from, to] = data
    if (from && to) {
      setRange({ from, to })
    } else {
      setRange({})
    }
  }

  const daysFiltered = entriesByDatesData?.data.dates
  const days = data?.pages.map(it => it.data.dates).flat()
  const { monthMoneySpent, dayCalories } = entriesStats || { monthMoneySpent: "", dayCalories: null }

  return (
    <StateContextProvider defaultValue={{ deleteEntry, editEntry }}>
      <Spin spinning={isLoadingStats || isLoadingEntries || isFetchingStats || isFetchingEntryByDates}>
        <PageHeader>
          <Space direction="vertical">
            {userId && (
              <Link to={pathname.split(`/users/${userId}`)[0]}>
                <LeftOutlined/>
              </Link>
            )}
            <Title level={3}>Entries</Title>
          </Space>
        </PageHeader>
        <Layout>
          <Header>
            <UserStatsHeader monthMoneySpent={monthMoneySpent} dayCalories={dayCalories}/>
          </Header>
          <Content>
            <Divider/>
            <NewEntryForm submitForm={submitForm} onSubmitFail={() => {
            }} form={form}/>
            <Divider/>
            <DatePicker.RangePicker onChange={handleDateFilter} className="datepicker"/>
            <Divider/>
            {days && ((!from && !to) || isFetchingEntryByDates) && (
              <DaysOverview days={days} hasNextPage={hasNextPage} loaderFunction={loadMoreDates}/>
            )}
            {daysFiltered && (
              <DaysOverview days={daysFiltered}/>
            )}
          </Content>
        </Layout>
        <BackTop>
          <ToTopOutlined style={{ fontSize: "40px" }}/>
        </BackTop>
      </Spin>
    </StateContextProvider>
  )
}


export default Entries
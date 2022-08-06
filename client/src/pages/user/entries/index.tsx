import React from 'react'
import DaysOverview from "components/DaysOverview"
import {
  Link,
  useLocation,
  useParams
} from "react-router-dom"
import {
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
  Divider,
  Form,
  Layout,
  PageHeader,
  Space,
  Spin,
  Typography
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
  const { data: entriesStats, isLoading: isLoadingStats } = useEntriesStats(userId)
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
    entryCreate.mutate({ body: values, userId })
  }

  const deleteEntry = (id: number) => {
    entryDelete.mutate(id)
  }

  const editEntry = (id: number, body: EntryBodyT) => {
    entryEdit.mutate({ id, body })
  }


  const days = data?.pages.map(it => it.data.dates).flat()
  const { monthMoneySpent, dayCalories } = entriesStats || { monthMoneySpent: "", dayCalories: null }

  return (
    <StateContextProvider defaultValue={{ deleteEntry, editEntry }}>
      <Spin spinning={isLoadingStats || isLoadingEntries}>
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
            {days && (
              <DaysOverview days={days} hasNextPage={hasNextPage} loaderFunction={loadMoreDates}/>
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
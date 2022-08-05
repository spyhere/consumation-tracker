import React from 'react'
import {
  Link,
  useLocation
} from "react-router-dom"
import {
  Col,
  Layout,
  PageHeader,
  Row,
  Spin,
  Typography
} from "antd"
import { useUsersStats } from "queries/user"
import UserCard from "components/UserCard"


const AdminOverview = () => {
  const { pathname } = useLocation()
  const { data: usersData, isLoading: isLoadingUsers } = useUsersStats()

  const { data: users } = usersData || {}

  return (
    <Spin spinning={isLoadingUsers}>
      <PageHeader>
        <Typography.Title level={3}>Users Overview</Typography.Title>
      </PageHeader>
      <Layout>
        <Layout.Content>
          <Row gutter={[16, 16]}>
            {users?.map(it => (
              <Col span={8} key={it.id}>
                <Link to={`${pathname}/users/${it.id}`}>
                  <UserCard user={it} key={it.id}/>
                </Link>
              </Col>
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    </Spin>
  )
}


export default AdminOverview
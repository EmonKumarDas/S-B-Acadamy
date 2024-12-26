import { Typography, Card, Row, Col, Statistic, List, Tag } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { user, checkRole } = useUserContext()

  // Fetch data based on role
  const { data: students } = Api.user.findMany.useQuery(
    checkRole('ADMIN')
      ? { where: { globalRole: 'STUDENT' } }
      : { where: { id: '' } },
  )

  const { data: teachers } = Api.user.findMany.useQuery(
    checkRole('ADMIN')
      ? { where: { globalRole: 'TEACHER' } }
      : { where: { id: '' } },
  )

  const { data: schedules } = Api.schedule.findMany.useQuery({
    where: { userId: user?.id },
    include: { subject: true },
  })

  const { data: attendances } = Api.attendance.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { data: fees } = Api.fee.findMany.useQuery({
    where: { userId: user?.id },
  })

  const renderAdminDashboard = () => (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={
                <>
                  <i className="las la-user-graduate"></i> Total Students
                </>
              }
              value={students?.length || 0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={
                <>
                  <i className="las la-chalkboard-teacher"></i> Total Teachers
                </>
              }
              value={teachers?.length || 0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={
                <>
                  <i className="las la-clock"></i> Pending Actions
                </>
              }
              value={fees?.filter(f => f.status === 'PENDING').length || 0}
            />
          </Card>
        </Col>
      </Row>
    </>
  )

  const renderTeacherDashboard = () => (
    <>
      <Card
        title={
          <>
            <i className="las la-calendar"></i> Upcoming Classes
          </>
        }
      >
        <List
          dataSource={schedules}
          renderItem={item => (
            <List.Item>
              <Text>
                {item.subject?.name} - {item.startTime} to {item.endTime}
                (Day {item.dayOfWeek.toString()})
              </Text>
            </List.Item>
          )}
        />
      </Card>
    </>
  )

  const renderStudentDashboard = () => (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <i className="las la-chart-bar"></i> Attendance Summary
              </>
            }
          >
            <List
              dataSource={attendances?.slice(0, 5)}
              renderItem={item => (
                <List.Item>
                  <Text>
                    {dayjs(item.date).format('MMM DD, YYYY')} -
                    <Tag color={item.status === 'PRESENT' ? 'green' : 'red'}>
                      {item.status}
                    </Tag>
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <i className="las la-money-bill"></i> Upcoming Fees
              </>
            }
          >
            <List
              dataSource={fees?.filter(f => f.status === 'PENDING')}
              renderItem={item => (
                <List.Item>
                  <Text>
                    {item.type} - ${item.amount}
                    (Due: {dayjs(item.dueDate).format('MMM DD, YYYY')})
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  )

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tachometer-alt"></i> Dashboard
        </Title>
        <Text type="secondary">
          Welcome back, {user?.name}! Here's your personalized dashboard.
        </Text>

        <div style={{ marginTop: 24 }}>
          {checkRole('ADMIN') && renderAdminDashboard()}
          {checkRole('TEACHER') && renderTeacherDashboard()}
          {checkRole('STUDENT') && renderStudentDashboard()}
        </div>
      </div>
    </PageLayout>
  )
}

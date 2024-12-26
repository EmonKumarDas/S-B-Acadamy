import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Select,
  TimePicker,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SchedulePage() {
  const { user, checkRole } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Fetch all schedules with related data
  const { data: schedules, refetch } = Api.schedule.findMany.useQuery({
    include: {
      user: true,
      subject: true,
    },
  })

  // Fetch all subjects for dropdown
  const { data: subjects } = Api.subject.findMany.useQuery()

  // Fetch all teachers for dropdown
  const { data: teachers } = Api.user.findMany.useQuery({
    where: {
      globalRole: 'TEACHER',
    },
  })

  // Create schedule mutation
  const { mutateAsync: createSchedule } = Api.schedule.create.useMutation()

  const handleCreateSchedule = async (values: any) => {
    try {
      await createSchedule({
        data: {
          dayOfWeek: parseFloat(values.dayOfWeek),
          startTime: values.timeRange[0].format('HH:mm'),
          endTime: values.timeRange[1].format('HH:mm'),
          userId: values.teacherId,
          subjectId: values.subjectId,
        },
      })
      message.success('Schedule created successfully')
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create schedule')
    }
  }

  const columns = [
    {
      title: 'Day',
      dataIndex: 'dayOfWeek',
      key: 'dayOfWeek',
      render: (day: number) => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        return days[day - 1]
      },
    },
    {
      title: 'Time',
      key: 'time',
      render: (record: any) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: 'Subject',
      dataIndex: ['subject', 'name'],
      key: 'subject',
    },
    {
      title: 'Teacher',
      dataIndex: ['user', 'name'],
      key: 'teacher',
    },
  ]

  const filteredSchedules = schedules?.filter(schedule => {
    if (checkRole('ADMIN')) return true
    if (checkRole('TEACHER')) return schedule.userId === user?.id
    return true // Students can see all schedules
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={2}>
              <i className="las la-calendar-alt" style={{ marginRight: 8 }}></i>
              Class Schedule
            </Title>
            <Text type="secondary">Manage and view class schedules</Text>
          </div>

          {checkRole('ADMIN') && (
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              <i className="las la-plus" style={{ marginRight: 8 }}></i>
              Create Schedule
            </Button>
          )}
        </div>

        <Table
          dataSource={filteredSchedules}
          columns={columns}
          rowKey="id"
          pagination={false}
        />

        <Modal
          title="Create New Schedule"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateSchedule}>
            <Form.Item
              name="dayOfWeek"
              label="Day of Week"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="1">Monday</Select.Option>
                <Select.Option value="2">Tuesday</Select.Option>
                <Select.Option value="3">Wednesday</Select.Option>
                <Select.Option value="4">Thursday</Select.Option>
                <Select.Option value="5">Friday</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="timeRange"
              label="Time Range"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="subjectId"
              label="Subject"
              rules={[{ required: true }]}
            >
              <Select>
                {subjects?.map(subject => (
                  <Select.Option key={subject.id} value={subject.id}>
                    {subject.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="teacherId"
              label="Teacher"
              rules={[{ required: true }]}
            >
              <Select>
                {teachers?.map(teacher => (
                  <Select.Option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Schedule
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

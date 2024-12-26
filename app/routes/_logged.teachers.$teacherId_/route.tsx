import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Select,
  TimePicker,
  message,
  Table,
  Space,
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

export default function TeacherDetailsPage() {
  const { teacherId } = useParams()
  const navigate = useNavigate()
  const { checkRole } = useUserContext()
  const isAdmin = checkRole('ADMIN')
  const [form] = Form.useForm()
  const [scheduleForm] = Form.useForm()
  const [editMode, setEditMode] = useState(false)

  // Fetch teacher data
  const { data: teacher, refetch: refetchTeacher } =
    Api.user.findFirst.useQuery({
      where: { id: teacherId },
      include: {
        schedules: {
          include: { subject: true },
        },
      },
    })

  // Fetch subjects for assignment
  const { data: subjects } = Api.subject.findMany.useQuery({})

  // Mutations
  const { mutateAsync: updateTeacher } = Api.user.update.useMutation()
  const { mutateAsync: createSchedule } = Api.schedule.create.useMutation()
  const { mutateAsync: deleteSchedule } = Api.schedule.delete.useMutation()

  const handleUpdateTeacher = async (values: any) => {
    try {
      await updateTeacher({
        where: { id: teacherId },
        data: values,
      })
      message.success('Teacher information updated successfully')
      setEditMode(false)
      refetchTeacher()
    } catch (error) {
      message.error('Failed to update teacher information')
    }
  }

  const handleAddSchedule = async (values: any) => {
    try {
      await createSchedule({
        data: {
          userId: teacherId!,
          subjectId: values.subjectId,
          dayOfWeek: values.dayOfWeek,
          startTime: values.timeRange[0].format('HH:mm'),
          endTime: values.timeRange[1].format('HH:mm'),
        },
      })
      message.success('Schedule added successfully')
      scheduleForm.resetFields()
      refetchTeacher()
    } catch (error) {
      message.error('Failed to add schedule')
    }
  }

  const handleDeleteSchedule = async (scheduleId: string) => {
    try {
      await deleteSchedule({ where: { id: scheduleId } })
      message.success('Schedule deleted successfully')
      refetchTeacher()
    } catch (error) {
      message.error('Failed to delete schedule')
    }
  }

  const scheduleColumns = [
    {
      title: 'Day',
      dataIndex: 'dayOfWeek',
      render: (day: number) =>
        [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][day],
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      render: (subject: any) => subject.name,
    },
    {
      title: 'Time',
      render: (record: any) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: 'Actions',
      render: (record: any) =>
        isAdmin && (
          <Button
            type="link"
            danger
            onClick={() => handleDeleteSchedule(record.id)}
          >
            <i className="las la-trash"></i>
          </Button>
        ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chalkboard-teacher"></i> Teacher Details
        </Title>

        <Card style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {!editMode ? (
              <>
                <Text strong>Name:</Text>
                <Text>{teacher?.name}</Text>
                <Text strong>Email:</Text>
                <Text>{teacher?.email}</Text>
                {isAdmin && (
                  <Button type="primary" onClick={() => setEditMode(true)}>
                    <i className="las la-edit"></i> Edit Information
                  </Button>
                )}
              </>
            ) : (
              <Form
                form={form}
                initialValues={teacher}
                onFinish={handleUpdateTeacher}
                layout="vertical"
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input />
                </Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    <i className="las la-save"></i> Save
                  </Button>
                  <Button onClick={() => setEditMode(false)}>Cancel</Button>
                </Space>
              </Form>
            )}
          </Space>
        </Card>

        <Title level={3}>
          <i className="las la-calendar"></i> Schedule
        </Title>

        {isAdmin && (
          <Card style={{ marginBottom: 24 }}>
            <Form
              form={scheduleForm}
              onFinish={handleAddSchedule}
              layout="vertical"
            >
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
                name="dayOfWeek"
                label="Day"
                rules={[{ required: true }]}
              >
                <Select>
                  {[
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ].map((day, index) => (
                    <Select.Option key={index} value={index}>
                      {day}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="timeRange"
                label="Time Range"
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                <i className="las la-plus"></i> Add Schedule
              </Button>
            </Form>
          </Card>
        )}

        <Table
          dataSource={teacher?.schedules}
          columns={scheduleColumns}
          rowKey="id"
          pagination={false}
        />
      </div>
    </PageLayout>
  )
}

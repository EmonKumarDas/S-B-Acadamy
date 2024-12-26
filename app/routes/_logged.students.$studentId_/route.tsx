import {
  Typography,
  Tabs,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Tag,
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

export default function StudentDetailsPage() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const { checkRole, user } = useUserContext()
  const [activeTab, setActiveTab] = useState('1')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const { data: student, refetch } = Api.user.findFirst.useQuery({
    where: { id: studentId },
    include: {
      attendances: true,
      fees: true,
      results: true,
      schedules: {
        include: { subject: true },
      },
    },
  })

  const { mutateAsync: updateAttendance } = Api.attendance.update.useMutation()
  const { mutateAsync: updateFee } = Api.fee.update.useMutation()
  const { mutateAsync: updateResult } = Api.result.update.useMutation()

  const isAdmin = checkRole('ADMIN')
  const isTeacher = checkRole('TEACHER')
  const canEdit =
    isAdmin ||
    (isTeacher && student?.schedules?.some(s => s.userId === user?.id))

  const attendanceColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'PRESENT' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    canEdit && {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          onClick={() => handleEdit('attendance', record)}
          icon={<i className="las la-edit" />}
        >
          Edit
        </Button>
      ),
    },
  ].filter(Boolean)

  const feeColumns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'PAID' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    canEdit && {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          onClick={() => handleEdit('fee', record)}
          icon={<i className="las la-edit" />}
        >
          Edit
        </Button>
      ),
    },
  ].filter(Boolean)

  const resultColumns = [
    { title: 'Subject', dataIndex: ['subject', 'name'], key: 'subject' },
    { title: 'Score', dataIndex: 'score', key: 'score' },
    { title: 'Term', dataIndex: 'term', key: 'term' },
    canEdit && {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          onClick={() => handleEdit('result', record)}
          icon={<i className="las la-edit" />}
        >
          Edit
        </Button>
      ),
    },
  ].filter(Boolean)

  const handleEdit = (type: string, record: any) => {
    form.setFieldsValue(record)
    setActiveTab(type)
    setIsModalVisible(true)
  }

  const handleSubmit = async (values: any) => {
    try {
      switch (activeTab) {
        case 'attendance':
          await updateAttendance({
            where: { id: values.id },
            data: { status: values.status },
          })
          break
        case 'fee':
          await updateFee({
            where: { id: values.id },
            data: { status: values.status, amount: values.amount },
          })
          break
        case 'result':
          await updateResult({
            where: { id: values.id },
            data: { score: values.score },
          })
          break
      }
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      Modal.error({ title: 'Error', content: 'Failed to update record' })
    }
  }

  if (!student) return null

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Title level={2}>
              <i className="las la-user-graduate" /> Student Details
            </Title>
            <Button
              onClick={() => navigate('/users')}
              icon={<i className="las la-arrow-left" />}
            >
              Back
            </Button>
          </div>

          <div
            style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}
          >
            <Space direction="vertical" size="middle">
              <Text strong>Name:</Text>
              <Text>{student.name}</Text>
              <Text strong>Email:</Text>
              <Text>{student.email}</Text>
            </Space>
          </div>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={
                <span>
                  <i className="las la-calendar-check" /> Attendance
                </span>
              }
              key="1"
            >
              <Table
                dataSource={student.attendances}
                columns={attendanceColumns}
                rowKey="id"
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <i className="las la-money-bill" /> Fees
                </span>
              }
              key="2"
            >
              <Table
                dataSource={student.fees}
                columns={feeColumns}
                rowKey="id"
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <i className="las la-graduation-cap" /> Results
                </span>
              }
              key="3"
            >
              <Table
                dataSource={student.results}
                columns={resultColumns}
                rowKey="id"
              />
            </Tabs.TabPane>
          </Tabs>
        </Space>

        <Modal
          title="Edit Record"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            {activeTab === 'attendance' && (
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="PRESENT">Present</Select.Option>
                  <Select.Option value="ABSENT">Absent</Select.Option>
                </Select>
              </Form.Item>
            )}
            {activeTab === 'fee' && (
              <>
                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="PAID">Paid</Select.Option>
                    <Select.Option value="PENDING">Pending</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
            {activeTab === 'result' && (
              <Form.Item
                name="score"
                label="Score"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

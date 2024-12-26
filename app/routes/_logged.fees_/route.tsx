import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
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

export default function FeesPage() {
  const { user, checkRole } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const isAdmin = checkRole('ADMIN')

  // Fetch all fees for admin, or user-specific fees for students
  const { data: fees, refetch } = Api.fee.findMany.useQuery({
    where: isAdmin ? {} : { userId: user?.id },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })

  const { mutateAsync: createFee } = Api.fee.create.useMutation()
  const { mutateAsync: updateFee } = Api.fee.update.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (values.id) {
        await updateFee({
          where: { id: values.id },
          data: {
            amount: values.amount,
            dueDate: values.dueDate,
            status: values.status,
            type: values.type,
            userId: values.userId,
          },
        })
      } else {
        await createFee({
          data: {
            amount: values.amount,
            dueDate: values.dueDate,
            status: values.status,
            type: values.type,
            userId: values.userId,
          },
        })
      }
      message.success('Fee record saved successfully')
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Error saving fee record')
    }
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Text>
          <i className="las la-file-invoice-dollar"></i> {text}
        </Text>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => (
        <Text>
          <i className="las la-dollar-sign"></i> {text}
        </Text>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => (
        <Text>
          <i className="las la-calendar"></i>{' '}
          {dayjs(date).format('MMMM D, YYYY')}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text type={status === 'PAID' ? 'success' : 'danger'}>
          <i
            className={`las ${
              status === 'PAID' ? 'la-check-circle' : 'la-exclamation-circle'
            }`}
          ></i>{' '}
          {status}
        </Text>
      ),
    },
    ...(isAdmin
      ? [
          {
            title: 'Student',
            dataIndex: 'user',
            key: 'user',
            render: (user: any) => (
              <Text>
                <i className="las la-user"></i> {user?.name}
              </Text>
            ),
          },
        ]
      : []),
  ]

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
              <i className="las la-money-bill"></i> Fee Management
            </Title>
            <Text type="secondary">
              {isAdmin
                ? 'Manage fee structures and records for all students'
                : 'View your fee status and payment history'}
            </Text>
          </div>
          {isAdmin && (
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              <i className="las la-plus"></i> Add Fee Record
            </Button>
          )}
        </div>

        <Table
          dataSource={fees}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title="Fee Record"
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            form.resetFields()
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="type"
              label="Fee Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="TUITION">Tuition</Select.Option>
                <Select.Option value="LIBRARY">Library</Select.Option>
                <Select.Option value="LABORATORY">Laboratory</Select.Option>
                <Select.Option value="EXAMINATION">Examination</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <Input prefix={<i className="las la-dollar-sign"></i>} />
            </Form.Item>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="PENDING">Pending</Select.Option>
                <Select.Option value="PAID">Paid</Select.Option>
                <Select.Option value="OVERDUE">Overdue</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="userId"
              label="Student ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save Fee Record
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

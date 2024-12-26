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
import type { User } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function UsersPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form] = Form.useForm()

  // Fetch users
  const {
    data: users,
    isLoading,
    refetch,
  } = Api.user.findMany.useQuery({
    include: { schedules: true },
  })

  // Mutations
  const { mutateAsync: createUser } = Api.user.create.useMutation()
  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: deleteUser } = Api.user.delete.useMutation()

  const handleAddEdit = async (values: any) => {
    try {
      if (editingUser) {
        await updateUser({
          where: { id: editingUser.id },
          data: values,
        })
        message.success('User updated successfully')
      } else {
        await createUser({
          data: {
            ...values,
            status: 'VERIFIED',
          },
        })
        message.success('User created successfully')
      }
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const handleDelete = async (userId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteUser({ where: { id: userId } })
          message.success('User deleted successfully')
          refetch()
        } catch (error) {
          message.error('An error occurred')
        }
      },
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text>{text || 'N/A'}</Text>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'globalRole',
      key: 'globalRole',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="primary"
            icon={<i className="las la-edit" />}
            onClick={() => {
              setEditingUser(record)
              form.setFieldsValue(record)
              setIsModalOpen(true)
            }}
          />
          <Button
            type="primary"
            danger
            icon={<i className="las la-trash-alt" />}
            onClick={() => handleDelete(record.id)}
          />
          <Button
            icon={<i className="las la-eye" />}
            onClick={() =>
              navigate(
                record.globalRole === 'TEACHER'
                  ? `/teachers/${record.id}`
                  : `/students/${record.id}`,
              )
            }
          />
        </div>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div>
            <Title level={2}>User Management</Title>
            <Text>Manage all users in the system</Text>
          </div>
          <Button
            type="primary"
            icon={<i className="las la-plus" />}
            onClick={() => {
              setEditingUser(null)
              form.resetFields()
              setIsModalOpen(true)
            }}
          >
            Add User
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={editingUser ? 'Edit User' : 'Add New User'}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            form.resetFields()
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleAddEdit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="globalRole"
              label="Role"
              rules={[{ required: true, message: 'Please select a role!' }]}
            >
              <Select>
                <Select.Option value="STUDENT">Student</Select.Option>
                <Select.Option value="TEACHER">Teacher</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                }}
              >
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  {editingUser ? 'Update' : 'Create'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

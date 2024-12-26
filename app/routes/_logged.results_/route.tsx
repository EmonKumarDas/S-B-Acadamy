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
import { Prisma } from '@prisma/client'
import type { ColumnsType } from 'antd/es/table'
const { Title, Text } = Typography
type ResultWithRelations = Prisma.ResultGetPayload<{
  include: {
    user: true
    subject: true
  }
}>
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ResultsPage() {
  const { user, checkRole } = useUserContext()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingResult, setEditingResult] =
    useState<ResultWithRelations | null>(null)

  const { data: results, refetch } = Api.result.findMany.useQuery({
    include: {
      user: true,
      subject: true,
    },
  })

  const { data: subjects } = Api.subject.findMany.useQuery({})
  const { data: users } = Api.user.findMany.useQuery({
    where: { globalRole: 'USER' },
  })

  const { mutateAsync: createResult } = Api.result.create.useMutation()
  const { mutateAsync: updateResult } = Api.result.update.useMutation()
  const { mutateAsync: deleteResult } = Api.result.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingResult) {
        await updateResult({
          where: { id: editingResult.id },
          data: values,
        })
      } else {
        await createResult({
          data: values,
        })
      }
      message.success('Result saved successfully')
      setIsModalOpen(false)
      form.resetFields()
      setEditingResult(null)
      refetch()
    } catch (error) {
      message.error('Error saving result')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteResult({ where: { id } })
      message.success('Result deleted successfully')
      refetch()
    } catch (error) {
      message.error('Error deleting result')
    }
  }

  const columns: ColumnsType<ResultWithRelations> = [
    {
      title: 'Student',
      dataIndex: ['user', 'name'],
      key: 'userName',
    },
    {
      title: 'Subject',
      dataIndex: ['subject', 'name'],
      key: 'subjectName',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
    },
  ]

  if (checkRole('ADMIN')) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setEditingResult(record)
              form.setFieldsValue(record)
              setIsModalOpen(true)
            }}
          >
            <i className="las la-edit"></i> Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            <i className="las la-trash"></i> Delete
          </Button>
        </div>
      ),
    })
  }

  const filteredResults = results?.filter(result => {
    if (checkRole('ADMIN')) return true
    if (checkRole('USER')) return result.userId === user?.id
    return false
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Title level={2}>
            <i className="las la-graduation-cap"></i> Academic Results
          </Title>
          {checkRole('ADMIN') && (
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              <i className="las la-plus"></i> Add New Result
            </Button>
          )}
        </div>

        <Table
          dataSource={filteredResults}
          columns={columns}
          rowKey="id"
          scroll={{ x: true }}
        />

        <Modal
          title={editingResult ? 'Edit Result' : 'Add New Result'}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingResult(null)
            form.resetFields()
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="userId"
              label="Student"
              rules={[{ required: true }]}
            >
              <Select>
                {users?.map(user => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.name}
                  </Select.Option>
                ))}
              </Select>
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

            <Form.Item name="score" label="Score" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="term" label="Term" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="First">First Term</Select.Option>
                <Select.Option value="Second">Second Term</Select.Option>
                <Select.Option value="Third">Third Term</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingResult ? 'Update' : 'Create'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

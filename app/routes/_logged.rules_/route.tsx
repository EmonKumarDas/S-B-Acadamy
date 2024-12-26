import {
  Typography,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
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

export default function RulesPage() {
  const { user, checkRole } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Fetch rules
  const { data: rules, refetch } = Api.rule.findMany.useQuery({
    orderBy: { createdAt: 'desc' },
  })

  // Create rule mutation
  const { mutateAsync: createRule } = Api.rule.create.useMutation()

  // Delete rule mutation
  const { mutateAsync: deleteRule } = Api.rule.delete.useMutation()

  const handleCreate = async (values: {
    title: string
    description: string
    applicableRole: string
  }) => {
    try {
      await createRule({
        data: {
          title: values.title,
          description: values.description,
          applicableRole: values.applicableRole,
        },
      })
      message.success('Rule created successfully')
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create rule')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteRule({ where: { id } })
      message.success('Rule deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete rule')
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Applicable To',
      dataIndex: 'applicableRole',
      key: 'applicableRole',
    },
    checkRole('ADMIN') && {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type="link" danger onClick={() => handleDelete(record.id)}>
          <i className="las la-trash"></i> Delete
        </Button>
      ),
    },
  ].filter(Boolean)

  // Filter rules based on user role
  const filteredRules = rules?.filter(rule => {
    if (checkRole('ADMIN')) return true
    return rule.applicableRole === user?.globalRole
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
          <div>
            <Title level={2}>
              <i className="las la-scroll"></i> School Rules
            </Title>
            <Text type="secondary">
              View and manage rules applicable to students and teachers
            </Text>
          </div>
          {checkRole('ADMIN') && (
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              <i className="las la-plus"></i> Create New Rule
            </Button>
          )}
        </div>

        <Table
          dataSource={filteredRules}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title="Create New Rule"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleCreate}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: 'Please input the rule title!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Please input the rule description!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="applicableRole"
              label="Applicable To"
              rules={[
                {
                  required: true,
                  message: 'Please select who this rule applies to!',
                },
              ]}
            >
              <Input.Select
                options={[
                  { label: 'Student', value: 'STUDENT' },
                  { label: 'Teacher', value: 'TEACHER' },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Create Rule
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

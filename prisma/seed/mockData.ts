import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('0cad4e34-647e-484c-84ec-1600fa4f822f', '1Queen89@yahoo.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=3', 'ghi789token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1a72d448-a4bc-4308-b4db-ca4bcbd80cbf', '9Genesis_Crooks@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=11', 'def456token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('db854a49-d937-43c3-a3ac-55aa4c60f6ff', '25Abraham.Collins@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=27', 'abc123token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('42e7ef03-0294-4ad8-95c6-8e878e2aa19d', '33Alison.Lockman3@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', 'abc123token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('823d16c7-de8c-443f-bcbe-692805280024', '41Rupert7@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=43', 'mno345token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('5799f5f0-6146-4340-a390-56c3b27dec04', '49Giovanni90@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=51', 'def456token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e9f2475f-7883-4b96-a95c-2b431e32ec23', '57Seth69@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=59', 'ghi789token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2af21a5a-c500-463b-8557-30700ec07cfe', '65Belle71@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=67', 'abc123token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('5a675a35-59f2-4e94-b011-dbc7ab72a42d', '73Brenda_Macejkovic@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=75', 'def456token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('c908112f-4e9e-4b3b-b8ba-ff0a213a46ab', 'Fee payment deadline approaching', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('0a2da268-c265-4d04-b467-41d9524a88d2', 'Fee payment deadline approaching', '0cad4e34-647e-484c-84ec-1600fa4f822f');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('e430b59e-c82b-41bc-b03a-56d9f5ba2fbf', 'New assignment posted in your class', '823d16c7-de8c-443f-bcbe-692805280024');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('a91d91c1-c95d-4b20-b7b0-932bd257e264', 'Fee payment deadline approaching', '0cad4e34-647e-484c-84ec-1600fa4f822f');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('993c73f7-c1ea-4f0f-b2c5-d46d683df9be', 'Upcoming parentteacher meeting reminder', '42e7ef03-0294-4ad8-95c6-8e878e2aa19d');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('0a5ab3b6-da5b-4f42-8d74-2e9c166c7578', 'New course notifications available', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('29612891-75c0-45b5-b049-b04d5b10ab18', 'New assignment posted in your class', '2af21a5a-c500-463b-8557-30700ec07cfe');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('a6a2f82b-b371-4047-8879-4d9c88509f86', 'New assignment posted in your class', '2af21a5a-c500-463b-8557-30700ec07cfe');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('727dc7b4-bcc8-48f7-bb14-f683dee817d3', 'Weekly attendance report ready', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('96e2602b-bd14-4d1d-b1ee-776fd935aacd', 'New assignment posted in your class', '42e7ef03-0294-4ad8-95c6-8e878e2aa19d');

INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('0b49d625-f3e2-4bdf-971d-bb19526dc18f', 'Fee Submission Guidelines', 'Fees must be submitted by the 5th of each month.', 'Teacher');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('6a9d181b-982c-4937-961b-5b064f12bd23', 'Fee Submission Guidelines', 'Students must attend at least 75 of classes to be eligible for exams.', 'Teacher');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('eadfb05a-1180-41e1-a66b-43f3e519309b', 'Grading Criteria', 'Grades will be based on assignments quizzes and exams.', 'Teacher');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('b8db8993-b104-46d7-a374-92a40e6d58b7', 'Attendance Policy', 'Maintain silence and discipline during class hours.', 'Admin');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('af4b0e73-8166-42bd-8b6b-c1f490f28c3e', 'Attendance Policy', 'Grades will be based on assignments quizzes and exams.', 'Student');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('ef66eb07-fa57-49ee-abf3-036e20226fb4', 'Classroom Etiquette', 'All members must adhere to the schools code of conduct.', 'Teacher');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('1c2374a9-3363-41c0-ab58-068e50164bd8', 'Attendance Policy', 'Fees must be submitted by the 5th of each month.', 'Teacher');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('96872490-f025-47eb-b01f-1a9e4d8c4df6', 'Attendance Policy', 'Fees must be submitted by the 5th of each month.', 'Teacher');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('9ec0ecaa-8f25-4818-bdc2-9f74075a505c', 'Classroom Etiquette', 'Students must attend at least 75 of classes to be eligible for exams.', 'Student');
INSERT INTO "Rule" ("id", "title", "description", "applicableRole") VALUES ('39ee8cba-053c-4fc0-bb28-e355d6b6d04a', 'Code of Conduct', 'Maintain silence and discipline during class hours.', 'Student');

INSERT INTO "Subject" ("id", "name", "description") VALUES ('adc08eb7-f270-4367-8493-6d6209c1fe4b', 'Mathematics', 'Study of living organisms and life processes.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('c2b852e0-60dc-409b-bae6-80cb7246ad6a', 'History', 'Exploration of historical events and their impact on the modern world.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('302c2f88-bef5-4398-9601-0632fbfdd75c', 'Mathematics', 'Understanding the principles of matter and energy.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('3df4c9e6-6ec2-495d-95a7-b7cfae674f02', 'History', 'An introduction to the fundamental concepts of algebra and geometry.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('f6854a71-d084-489b-8805-54fc837281fb', 'Biology', 'Analysis of classic and contemporary literary works.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('addea47e-33d0-4ef6-9db5-5ce49541d005', 'Physics', 'Exploration of historical events and their impact on the modern world.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('f32e6ddb-a511-4cf1-a845-460dc79a1cbf', 'English Literature', 'Exploration of historical events and their impact on the modern world.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('15af7789-6014-4175-821a-e120a26f7a5a', 'English Literature', 'Analysis of classic and contemporary literary works.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('765325ef-023a-4c06-84b7-d2bab3713fc0', 'Physics', 'An introduction to the fundamental concepts of algebra and geometry.');
INSERT INTO "Subject" ("id", "name", "description") VALUES ('9e974d78-8a96-4be4-bba0-386cf533c3e8', 'Physics', 'Exploration of historical events and their impact on the modern world.');

INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('305fd28e-29b0-4e64-8cb3-da604212bd96', '2024-08-06T14:03:24.011Z', 'Unexcused', '0cad4e34-647e-484c-84ec-1600fa4f822f');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('b6a52729-aa4c-4aef-8b3e-8eb474c9f808', '2025-01-09T12:31:45.565Z', 'Absent', '5a675a35-59f2-4e94-b011-dbc7ab72a42d');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('7230b4f1-5667-4fef-b758-0c4e19280b43', '2025-05-06T23:23:22.269Z', 'Excused', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('24bf02de-fe7b-4505-ad86-1f93873e28f6', '2025-09-07T07:05:22.957Z', 'Present', '0cad4e34-647e-484c-84ec-1600fa4f822f');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('61c20357-d00f-4ebb-acb6-3a92548eb723', '2024-12-28T06:28:54.136Z', 'Late', '823d16c7-de8c-443f-bcbe-692805280024');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('07ed3749-0be0-480d-8b43-390070c7e355', '2024-07-04T21:52:36.201Z', 'Absent', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('73828721-5450-4634-bbae-c1664db90d63', '2024-12-25T15:17:51.173Z', 'Absent', 'e9f2475f-7883-4b96-a95c-2b431e32ec23');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('155da971-85dc-46c6-b030-8829326b3b68', '2024-11-24T17:15:27.673Z', 'Present', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('1eaafa42-25ac-4dfb-a83f-bc35fdd7510e', '2024-12-21T15:07:12.613Z', 'Absent', '5a675a35-59f2-4e94-b011-dbc7ab72a42d');
INSERT INTO "Attendance" ("id", "date", "status", "userId") VALUES ('b946315a-7a34-482e-8cfd-971aff07c8a9', '2025-03-14T12:33:57.189Z', 'Absent', '1a72d448-a4bc-4308-b4db-ca4bcbd80cbf');

INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('ae8d90fd-fc8b-4a56-9df7-32b37a993b0c', '15000', '2025-11-15T09:30:13.565Z', 'Partially Paid', 'Lab', '5799f5f0-6146-4340-a390-56c3b27dec04');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('47756b4a-5caa-462a-9963-cf5382d5e044', '10000', '2025-01-28T13:42:08.514Z', 'Unpaid', 'Lab', '42e7ef03-0294-4ad8-95c6-8e878e2aa19d');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('dcd01710-51c8-48ce-aefe-b3a1f2f72dc6', '12000', '2024-10-04T10:59:00.897Z', 'Overdue', 'Tuition', '0cad4e34-647e-484c-84ec-1600fa4f822f');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('59505005-44af-4afa-8cd7-f9968d511b82', '10000', '2025-03-20T09:12:54.513Z', 'Partially Paid', 'Lab', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('8a39a7cb-2ef3-4674-87e2-65ae003f2aa5', '12000', '2024-02-02T02:53:09.292Z', 'Overdue', 'Transport', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('2d6a4f48-359c-4792-afed-a0dc0d83779f', '5000', '2024-01-07T16:35:30.121Z', 'Partially Paid', 'Library', '0cad4e34-647e-484c-84ec-1600fa4f822f');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('9c81a012-2e41-48b0-ae15-e4c99b507c3c', '12000', '2025-03-07T03:11:24.717Z', 'Paid', 'Library', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('05104115-bd37-4665-b37e-15a906e96a76', '7500', '2024-05-24T02:02:00.393Z', 'Unpaid', 'Lab', '1a72d448-a4bc-4308-b4db-ca4bcbd80cbf');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('6f2c3151-b08a-469a-893a-7e0c5ca8156c', '7500', '2024-01-26T12:45:12.049Z', 'Partially Paid', 'Sports', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');
INSERT INTO "Fee" ("id", "amount", "dueDate", "status", "type", "userId") VALUES ('93416cbd-4361-4e1e-a830-bd1fb817d03f', '15000', '2024-04-06T03:34:19.985Z', 'Paid', 'Lab', 'db854a49-d937-43c3-a3ac-55aa4c60f6ff');

INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('6eb9cc7c-eb1c-4f3a-91af-df33bb8ed4fb', '85', 'Fall 2023', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'c2b852e0-60dc-409b-bae6-80cb7246ad6a');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('d24ebdf1-58b2-4f7f-aca0-da5f914a2ff9', '85', 'Fall 2023', '5a675a35-59f2-4e94-b011-dbc7ab72a42d', 'addea47e-33d0-4ef6-9db5-5ce49541d005');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('c2e3f446-e2e1-49af-96f5-fc8df9d87820', '85', 'Fall 2023', '1a72d448-a4bc-4308-b4db-ca4bcbd80cbf', 'addea47e-33d0-4ef6-9db5-5ce49541d005');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('5372f308-b9c6-4d76-ab80-104930e970ae', '95', 'Winter 2023', 'e9f2475f-7883-4b96-a95c-2b431e32ec23', '3df4c9e6-6ec2-495d-95a7-b7cfae674f02');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('56db57d9-510c-4d5c-982e-3c46a9e93079', '85', 'Fall 2023', '2af21a5a-c500-463b-8557-30700ec07cfe', '3df4c9e6-6ec2-495d-95a7-b7cfae674f02');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('2c4ac74f-7f17-4382-8f22-3a077f5c2619', '76', 'Fall 2023', 'e9f2475f-7883-4b96-a95c-2b431e32ec23', 'c2b852e0-60dc-409b-bae6-80cb7246ad6a');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('8b47944c-968d-46bf-87ad-adb88598f625', '76', 'Winter 2023', '1a72d448-a4bc-4308-b4db-ca4bcbd80cbf', 'f32e6ddb-a511-4cf1-a845-460dc79a1cbf');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('61244720-6522-4d96-88b5-d3e767ffd8e0', '95', 'Summer 2023', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '3df4c9e6-6ec2-495d-95a7-b7cfae674f02');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('de3b4213-2abc-4c32-a4ee-b1170abef5ff', '85', 'Summer 2023', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '15af7789-6014-4175-821a-e120a26f7a5a');
INSERT INTO "Result" ("id", "score", "term", "userId", "subjectId") VALUES ('27db4c2b-8910-4345-b4e8-a1aa345e0a6a', '92', 'Winter 2023', '5799f5f0-6146-4340-a390-56c3b27dec04', '302c2f88-bef5-4398-9601-0632fbfdd75c');

INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('221efbcd-d396-400f-ae4f-a9815bdfe7da', 523, '0930', '1030', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '302c2f88-bef5-4398-9601-0632fbfdd75c');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('a9924e47-4295-4cfb-8c16-0b525aa45baf', 629, '0800', '1400', '5799f5f0-6146-4340-a390-56c3b27dec04', 'f32e6ddb-a511-4cf1-a845-460dc79a1cbf');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('a867f293-4895-4d03-943c-cc1873b40529', 497, '0800', '1400', '5799f5f0-6146-4340-a390-56c3b27dec04', '15af7789-6014-4175-821a-e120a26f7a5a');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('d69d0c16-3ae9-404f-ba5e-61b954b9ecf6', 490, '0800', '1200', 'e9f2475f-7883-4b96-a95c-2b431e32ec23', '9e974d78-8a96-4be4-bba0-386cf533c3e8');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('f6d3b19e-5ba0-4baf-a255-45bba63ec2c0', 867, '0800', '0900', '42e7ef03-0294-4ad8-95c6-8e878e2aa19d', 'addea47e-33d0-4ef6-9db5-5ce49541d005');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('87be7d3e-2980-4a82-a11a-71eb850f181b', 521, '1100', '1530', '2af21a5a-c500-463b-8557-30700ec07cfe', 'f6854a71-d084-489b-8805-54fc837281fb');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('0fc40c65-88df-4acf-a9ee-9900543cd896', 430, '0800', '0900', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '3df4c9e6-6ec2-495d-95a7-b7cfae674f02');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('914217c5-fd2a-4cf5-b234-ff9ec3c40cea', 678, '1430', '1530', '1a72d448-a4bc-4308-b4db-ca4bcbd80cbf', 'c2b852e0-60dc-409b-bae6-80cb7246ad6a');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('9ac37383-3412-471d-90d1-fad80782fc3b', 27, '1300', '1030', '5a675a35-59f2-4e94-b011-dbc7ab72a42d', 'addea47e-33d0-4ef6-9db5-5ce49541d005');
INSERT INTO "Schedule" ("id", "dayOfWeek", "startTime", "endTime", "userId", "subjectId") VALUES ('4ff56a4b-7071-47ef-a1be-abdb7a86cd6e', 325, '1100', '0900', '5799f5f0-6146-4340-a390-56c3b27dec04', '9e974d78-8a96-4be4-bba0-386cf533c3e8');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

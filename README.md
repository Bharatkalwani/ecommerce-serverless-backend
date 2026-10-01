# 🛒 Ecommerce Serverless Backend

A scalable **serverless ecommerce backend** built using **Node.js, AWS Lambda, API Gateway, PostgreSQL, Sequelize, Amazon S3, Amazon SQS and Amazon SES**.

The project follows a layered architecture similar to a production/company backend with separation between **Lambda handlers, services, database models, middleware and utilities**.

---

## 🚀 Tech Stack

### Backend
- Node.js
- JavaScript
- Serverless Framework
- AWS Lambda
- API Gateway
- JWT Authentication
- Sequelize ORM

### Database
- PostgreSQL
- Sequelize Migrations
- Sequelize Models
- Transactions
- Foreign Key Relationships

### AWS Services
- AWS Lambda
- API Gateway
- Amazon S3
- Amazon SQS
- Amazon SES
- Amazon CloudFormation
- Amazon CloudWatch
- AWS IAM
- AWS Systems Manager Parameter Store

### Development Tools
- Serverless Offline
- Git
- GitHub
- npm
- Postman

---

# 🏗️ Architecture

The application follows a layered backend architecture.

```text
                         ┌───────────────────┐
                         │   Next.js Client  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   API Gateway     │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   AWS Lambda      │
                         │   API Handlers    │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    Middleware     │
                         │ JWT / Validation  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     Services      │
                         │ Business Logic    │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   Repositories    │
                         │   Data Access     │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    Sequelize      │
                         │      Models       │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    PostgreSQL     │
                         └───────────────────┘
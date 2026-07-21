# Revenue Reconciliation Dashboard

An AI-powered Revenue Reconciliation Dashboard built with **Next.js 15**, **TypeScript**, **Prisma**, and **PostgreSQL**.

The application allows finance teams to upload Orders and Payments CSV files, automatically reconcile transactions, detect discrepancies, visualize revenue metrics, and generate AI-powered explanations for reconciliation issues.

---

# Features

- User Authentication (JWT)
- Upload Orders CSV
- Upload Payments CSV
- CSV Parsing & Validation
- Duplicate Record Prevention
- Automatic Revenue Reconciliation
- Dashboard Analytics
- Revenue At Risk Calculation
- AI Explanation for Discrepancies (Google Gemini)
- Responsive Dashboard UI
- PostgreSQL Database
- Prisma ORM

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide Icons
- Recharts

## Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- JWT Authentication

## AI

- Google Gemini API
- @google/genai SDK

---

# Folder Structure

```
app/
    api/
    dashboard/
components/
lib/
prisma/
public/
```

---

# Prerequisites

Install the following before running the project.

- Node.js 20+
- PostgreSQL
- npm

---

# Installation

Clone the repository

```bash
git clone <repository-url>

cd revenue-reconciliation-dashboard
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://username:password@localhost:5432/revenue_dashboard"

JWT_SECRET="your-secret-key"

JWT_EXPIRES_IN="7d"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

GEMINI_API_KEY="your_google_gemini_api_key"
```

> **Note**
>
> Never expose your Gemini API key using `NEXT_PUBLIC_`.
>
> Use:
>
> ```
> GEMINI_API_KEY
> ```
>
> instead of
>
> ```
> NEXT_PUBLIC_GEMINI_API_KEY
> ```

And initialize the Gemini client like this:

```ts
apiKey: process.env.GEMINI_API_KEY
```

---

# Prisma Setup

Generate Prisma Client

```bash
npx prisma generate
```

Push schema to PostgreSQL

```bash
npx prisma db push
```

(Optional) Format schema

```bash
npx prisma format
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# Running the Project

Development

```bash
npm run dev
```

Application will be available at

```
http://localhost:3000
```

---

# Production Build

```bash
npm run build
```

Run production server

```bash
npm start
```

---

# Application Workflow

## Step 1

Register/Login

↓

## Step 2

Upload Orders CSV

↓

## Step 3

Upload Payments CSV

↓

## Step 4

Click **Run Reconciliation**

↓

## Step 5

Dashboard Metrics are Generated

↓

## Step 6

View Discrepancies

↓

## Step 7

Generate AI Explanation

---

# Dashboard Metrics

The dashboard displays

- Total Orders
- Matched Orders
- Mismatched Orders
- Missing Payments
- Revenue At Risk

---

# AI Explanation

The AI assistant analyzes reconciliation records and generates:

- Issue Summary
- Root Cause
- Business Impact
- Suggested Resolution
- Confidence Level

Powered by Google Gemini.

---

# Duplicate Protection

The application prevents duplicate uploads.

Orders are checked using:

```
orderId
```

Payments are checked using:

```
transactionRef
```

Uploading the same CSV multiple times **will not create duplicate database records**.

---

# CSV Files

The project supports two CSV formats.

## Orders

Example fields

```
order_id
order_date
customer_email
currency
gross_amount
discount
net_amount
status
```

## Payments

Example fields

```
transaction_ref
processed_at
order_reference
currency
amount
fee
net_settled
type
status
```

---

# Database

Main Tables

- User
- Upload
- Order
- Payment
- Reconciliation
- AIReport

---

# Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Create production build.

```bash
npm start
```

Run production server.

```bash
npm run lint
```

Run ESLint.

---

# Deployment

This project can be deployed on:

- Vercel
- Railway
- Render
- DigitalOcean
- AWS

Remember to configure the following environment variables on the deployment platform:

- DATABASE_URL
- JWT_SECRET
- JWT_EXPIRES_IN
- GEMINI_API_KEY
- NEXT_PUBLIC_APP_URL

Also ensure PostgreSQL is accessible from the deployed application.

---

# Future Improvements

- Pagination
- CSV Validation Reports
- Export Reconciliation Report
- Background Job Processing
- Email Notifications
- Role Based Access Control
- Audit Logs
- Multi-Tenant Support

---

# Author

Raj Aryan

Senior Software Development Engineer

---

# License

This project was created as a technical assessment and is intended for educational and demonstration purposes.
# 🎓 Stream Portal

Stream Portal is a full-stack **Student Counseling Web Application** built using **Next.js**, **Prisma**, and **Clerk**, designed to streamline the student admission process through secure seat allocation, real-time offer letters, and payment verification for 1000+ students.

---

## 🚀 Features

- 🔐 **Clerk Authentication** – Secure login with Google/email for students and admins
- 📊 **Admin Dashboard** – View, search, and update student statuses with ease
- 📝 **Seat Allocation** – Manually or automatically assign seats to students
- 📄 **Offer Letter Generation** – Real-time secure URL-based offer letters
- 💸 **Payment Receipt Upload** – Upload and verify payment proofs
- 🔔 **Notifications System** – Bell icon with red dot and dropdown for seat and offer letter alerts
- 📱 **Fully Responsive** – Designed for all devices with clean, accessible UI
- ⚡ **Optimized APIs** – Improved backend performance with up to 40% faster API responses
- ✅ **Zod Validation** – Strong type-safe validation for form data

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Node.js, Prisma ORM, NeonDB (PostgreSQL)
- **Auth & Storage**: Clerk (Auth), Cloudinary (Image Upload)
- **Deployment**: Vercel

---

## 📦 Project Structure

```bash
Stream_Portal/
├── components/       # Reusable UI components
├── pages/            # Routes and API endpoints
├── lib/              # Utility functions and helpers
├── prisma/           # Prisma schema and seed
├── public/           # Static assets
├── styles/           # Global styles
├── .env.local        # Environment variables
└── README.md         # You're here

---

🧪 Local Setup
1. Clone the repository
git clone https://github.com/yourusername/Stream_Portal.git

cd Stream_Portal
2. Install dependencies
npm install

3. Set environment variables

4. Push Prisma schema to the database
npx prisma db push

5. Start the development server

npm run dev
Now open http://localhost:3000 to see the app.

📌 Notable Implementation Highlights
🧠 Zod for form validation

🚀 Optimized API performance (up to 40% faster responses)

📊 Admin dashboard with filtering and status control

✉️ Real-time offer letter delivery via secure dynamic URLs

💬 Notification system with alert dot and dropdown

🌐 Fully responsive UI with accessibility in mind

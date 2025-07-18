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

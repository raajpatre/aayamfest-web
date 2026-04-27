# AAYAM Tech Fest 2026 

**AAYAM** is the flagship technical festival of **Newton School of Technology x S-VYASA University**. This website serves as the digital terminal for the event, featuring a futuristic "cyber-grid" aesthetic, real-time event tracking"

---

## ✨ Features

- **Futuristic Terminal UI**: A high-performance, neon-drenched interface built with custom CSS and Framer Motion.
- **Event Terminal**: A centralized catalog for all technical events, robotics competitions, and workshops.
- **Dynamic Content**: Managed via a secure admin API and MongoDB.
- **Security-First Architecture**: Implemented with strict CSP headers, SSRF protection, and bearer-token authentication.
- **Performance Optimized**: Features a low-performance detection system to ensure smooth 60fps experiences on all devices.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Styling**: Vanilla CSS & [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & WebGL
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Analytics**: Google Analytics 4

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ 
- MongoDB (Local or Atlas)
- Cloudinary Account

### 2. Installation
```bash
git clone https://github.com/raajpatre/Aayam-TechFest-.git
cd Aayam-TechFest-
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and fill in the following:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security
ADMIN_PASSWORD=your_secure_bearer_token
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the grid in action.

---

## 🔐 Administration

Administrative routes (`POST`, `PATCH`, `DELETE`) are protected by a **Bearer Token** authentication system. 

To perform administrative actions, include the following header in your requests:
`Authorization: Bearer <YOUR_ADMIN_PASSWORD>`

---

## 📄 License
This project is for the AAYAM Tech Fest. All rights reserved.

---

**Developed for AAYAM with ❤️**

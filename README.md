
# AAYAM Tech Fest 2026 
<img width="1457" height="868" alt="Screenshot 2026-05-16 at 4 50 57 PM" src="https://github.com/user-attachments/assets/6508e1c4-7dbb-4491-aa7c-2263b9869487" />
🚧 Current Status: Rebuilding homepage with Post event updates


---

**AAYAM 2026** — the official digital home for **Newton School of Technology x S-VYASA University's** National tech fest. A neon-drenched, performance-tuned web experience built to handle real traffic during a live event.
🌐 **Live:** [aayamfest.com](https://aayamfest.com)

---

<p align="center">
  <img src="https://img.shields.io/github/stars/raajpatre/aayamfest-web?style=for-the-badge&color=FFD700" alt="Stars" />
  <img src="https://img.shields.io/github/last-commit/raajpatre/aayamfest-web?style=for-the-badge&color=00C7B7" alt="Last Commit" />
  <img src="https://img.shields.io/github/languages/top/raajpatre/aayamfest-web?style=for-the-badge&color=3178C6" alt="Top Language" />
  <img src="https://img.shields.io/github/repo-size/raajpatre/aayamfest-web?style=for-the-badge&color=8A2BE2" alt="Repo Size" />
</p>

<p align="center">
  <a href="https://aayamfest.com">🌐 Live Demo</a> ·
  <a href="#-features">Features</a> ·
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a>
</p>

---


## ✨ Features

- **Futuristic Terminal UI**: A high-performance, neon-drenched interface built with custom CSS and Framer Motion.
- **Event Terminal**: A centralized catalog for all technical events, robotics competitions, and workshops.
- **Dynamic Content**: Managed via a secure admin API and MongoDB.
- **Security-First Architecture**: Implemented with strict CSP headers, SSRF protection, and bearer-token authentication.
- **Performance Optimized**: Low-end device detection that gracefully degrades animations to keep 60fps across hardware.


---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (Local or Atlas)
- Cloudinary Account

### Installation
\`\`\`bash
git clone https://github.com/raajpatre/aayamfest-web.git
cd aayamfest-web
npm install
\`\`\`

### Environment
Copy \`.env.example\` to \`.env.local\` and fill in your keys.

### Run locally
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000).

---

## 🔐 Administration

Admin routes (`POST`, `PATCH`, `DELETE`) are protected by bearer-token auth.
Include the header on requests:

\`\`\`
Authorization: Bearer <ADMIN_PASSWORD>
\`\`\`


---

## 📸 Gallery
<img width="1459" height="869" alt="Screenshot 2026-05-16 at 4 50 46 PM" src="https://github.com/user-attachments/assets/a0548f41-65cf-4710-9a96-c6c662922a7d" />
<table>
  <tr>
    <td><img width="1457" height="868" alt="Screenshot 2026-05-16 at 4 50 57 PM" src="https://github.com/user-attachments/assets/6508e1c4-7dbb-4491-aa7c-2263b9869487" /></td>
    <td><img width="1452" height="870" alt="Screenshot 2026-05-16 at 4 51 48 PM" src="https://github.com/user-attachments/assets/48065f2f-bc33-4128-80be-ec7c234f695f" /></td>
  </tr>
  <tr>
    <td><img width="1458" height="868" alt="Screenshot 2026-05-16 at 4 51 24 PM" src="https://github.com/user-attachments/assets/f6d2faed-c97a-4a85-9a71-af331eab8a65" /></td>
    <td><img width="1456" height="869" alt="Screenshot 2026-05-16 at 4 51 32 PM" src="https://github.com/user-attachments/assets/13b86c88-2aeb-45f8-b541-2e3a39733a93" /></td>
  </tr>
</table>


---

## 🛠️ Tech Stack
<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>


---

## 📄 License
For AAYAM Tech Fest. All rights reserved.

---

Built for AAYAM with ❤️ by [@raajpatre](https://github.com/raajpatre)

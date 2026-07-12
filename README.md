<div align="center">
  <img src="https://raw.githubusercontent.com/itanishqshelar/ecosphere/main/public/logo.png" alt="GreenPulse AI Logo" width="120" style="border-radius: 20px;"/>
  <h1>🌿 GreenPulse AI</h1>
  <p><strong>Intelligent ESG tracking, carbon accounting, and workforce gamification platform.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  </p>
</div>

<hr />

## 🌍 Overview

GreenPulse AI is a comprehensive enterprise platform designed to streamline Corporate Sustainability and ESG (Environmental, Social, and Governance) reporting. It empowers organizations to automatically track carbon emissions, enforce compliance policies, manage CSR events, and engage employees through a robust gamification system.

## ✨ Key Features

- **📊 Dynamic Dashboard**: Real-time overview of your company's ESG score, broken down by department, with historical trends and goal tracking.
- **💨 Carbon Accounting**: Log carbon transactions with pre-calculated emission factors (e.g., Grid Electricity, Diesel Fuel, Air Travel).
- **🛡️ Governance & Compliance**: Distribute policies and track employee acknowledgements in real-time.
- **🤝 CSR Activities**: Create volunteering events and let employees join and earn points.
- **🏆 Gamification Engine**: 
  - **Challenges**: Engage the workforce with eco-friendly challenges (e.g., "Zero Plastic Week").
  - **Badges & XP**: Employees earn experience points (XP) and unlock badges for their sustainable actions.
  - **Leaderboard**: Foster healthy competition with an all-time and monthly leaderboard.
  - **Rewards Store**: Employees can redeem their earned XP for perks like vouchers, movie tickets, or extra leave days.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Supabase Project (PostgreSQL)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itanishqshelar/ecosphere.git
   cd ecosphere/greenpluse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file in `greenpluse/`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── src/
│   ├── app/           # Next.js App Router (Pages & API routes)
│   ├── components/    # Reusable UI components & Icons
│   ├── lib/           # Supabase clients, DB utilities, and Type definitions
│   └── styles/        # Global CSS (Tailwind v4 tokens)
└── supabase/          # Supabase configuration, schema, and seed files
```

## 🎨 Design System

GreenPulse AI utilizes a modern, sleek aesthetic built entirely with **Tailwind CSS v4** and customized with CSS Variables. 
It features a premium "Glassmorphism" effect, seamless micro-animations with **Framer Motion**, and accessible interactive components via **Radix UI**.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

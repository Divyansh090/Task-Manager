# 📝 Task Manager App

**Task Manager** is a modern full-stack application built with Next.js, TypeScript, and Tailwind CSS. It allows users to sign up/login, manage tasks (add/edit/delete), toggle statuses between *pending/completed*, with backend integration and live deployment.

---

##  Live Demo & Resources

- **Live App:** https://taskmanagerassignment.vercel.app
- **GitHub Repo:** https://github.com/Divyansh090/Task-Manager
- **Demo Video (2 mins):** https://drive.google.com/file/d/1wxI7sDKz1T43YX1vq_8F0q9ClwJ_L76C/view?usp=drive_link

---

##  Features

- **Authentication:** User sign-up/login implemented using NextAuth 
- **Task CRUD:** Create, read, update, and delete tasks  
- **Status Toggle:** Switch tasks between *pending* and *completed*  
- **Responsive UI:** Beautiful design using **Next.js**, **TypeScript**, and **Tailwind CSS**  
- **Deployment:** Backend and frontend deployed on **Vercel** 


---

##  Tech Stack

| Layer        | Technologies                                 |
|--------------|----------------------------------------------|
| Frontend     | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend      | Node.js / Next.js API routes,Next Auth, Prisma ORM |
| Database     | PostgreSQL, Neon Console |
| Deployment   | Frontend: Vercel; Backend: Same 

---

##  Quick Start

1. **Clone the repository**
   git clone https://github.com/Divyansh090/Task-Manager
   cd task-manager

Install dependencies
npm install
# or
yarn install

Configure environment variables
Create a .env.local file:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000

Run the development server

npm run dev
# or
yarn dev
Navigate to http://localhost:3000 to view the app.

Project Structure
. 
├── prisma/ 
├── public/             # Static files and assets
├── src/
│   ├── app/            # Next.js App Router (layouts, pages, components)
│   ├── components/     # UI components
│   ├── lib/            # Utilities (e.g., auth middlewares, API utils)
├── .env          # Environment variables (not committed)
├── next.config.js
├── package.json
└── README.md


How to Use

Sign Up / Login
Create a new account or authenticate to access your tasks.

Add Tasks
Click “Add Task,” provide a title (and optional description), and save.

Edit & Delete
Modify existing tasks or remove them completely.

Toggle Status
Click the status button to switch tasks between pending and completed.



Thank You!
Thanks for reviewing my Task Manager App! I’d love to hear your feedback. Feel free to reach out if you'd like a walkthrough or further details.

Contact
Name: Divyansh Rathi
Email: divyanshrathi90@gmail.com
Portfolio: https://divyanshrathii.vercel.app

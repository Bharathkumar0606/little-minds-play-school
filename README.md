# Little Minds Play School

A modern full-stack play school management web application built using React, TypeScript, Vite, and Supabase.

## Overview

Little Minds Play School is designed to help parents and administrators manage admissions and student information through a clean and responsive web interface.

The project started as an educational startup idea and evolved into a working web application with real-time database integration.

---

# Features

* Student admission form
* Parent enquiry handling
* Responsive modern UI
* Authentication system
* Dashboard architecture
* Supabase database integration
* Real-time data storage
* GitHub integration
* Full-stack workflow

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM

## Backend / Database

* Supabase

## Tools

* Git
* GitHub
* VS Code

---

# Project Structure

```plaintext
little-minds-play-school/
│── src/
│── public/
│── components/
│── pages/
│── lib/
│   └── supabase.ts
│── .env
│── package.json
│── vite.config.ts
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/sreevalli2307/little-minds-play-school.git
```

## Navigate to Project

```bash
cd little-minds-play-school
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# Run the Project

```bash
npm run dev
```

The application will start locally on:

```plaintext
http://localhost:5173
```

---

# Supabase Setup

1. Create a project in Supabase
2. Copy Project URL
3. Copy Anon Public Key
4. Add them inside `.env`
5. Create required database tables

Example SQL:

```sql
create table students (
  id bigint generated always as identity primary key,
  name text,
  age text,
  parent_name text,
  phone text,
  created_at timestamp default now()
);
```

---

# Future Improvements

* Admin dashboard
* Student analytics
* Attendance tracking
* Parent notifications
* Secure role-based authentication
* File/image uploads
* Payment integration
* Live chat support

---

# Learning Outcomes

This project helped in learning:

* Full-stack web development
* API integration
* Authentication systems
* Database management
* Git & GitHub workflow
* Real-world deployment workflow
* Responsive UI design

---

# Deployment

Recommended platforms:

* Vercel
* Netlify

---

# Author

Bharath Kumar

GitHub:
[https://github.com/sreevalli2307](https://github.com/sreevalli2307)

---

# License

This project is created for educational and learning purposes.

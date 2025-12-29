🌐 Personal Portfolio Website

A Personal Portfolio Website built with Django (backend) and React (frontend).  
This project allows you to dynamically manage all portfolio sections from the Django Admin Panel, without touching code.

---

✨ Features

- ⚡ Modern Frontend – React with smooth animations and responsive design.
- 🛠 Backend API – Django REST Framework provides clean and secure APIs.
- 🎨 Dynamic Content – Manage all content via Django Admin:
  - Navbar items (with logo or brand name)
  - Home section (title, tagline, CV link, etc.)
  - About section (bio, image, soft skills)
  - Skills (frontend, backend, design, etc.)
  - Education (with duration)
  - Certificates (with issuing date)
  - Experience (roles, companies, dates, descriptions)
  - Projects (with tools, languages, links, and images)
  - Contact info + messages
  - Footer links (GitHub, LinkedIn, Email, etc.)
  - Favicon and Title (tab customization)

---

🛠 Tech Stack

Frontend:

- React (Vite)
- Bootstrap 5 / Custom CSS

Backend:

- Django
- Django REST Framework
- MySQL / SQLite

---

🚀 Getting Started

1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio
```

2️⃣ Backend Setup (Django)

```bash
cd portfolio-backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Your backend will run at: http://127.0.0.1:8000/

3️⃣ Frontend Setup (React)

```bash
cd saifullah-portfolio
npm install
npm run dev
```

Your frontend will run at: http://localhost:5173/

---

👨‍💻 Author

Saif U.

- [LinkedIn] www.linkedin.com/in/saif-ullah-se
- [GitHub]   https://github.com/saifullah-se
- [Email] saifullahbhatti.se@gmail.com
- [Live] https://saifullah-portfolio.onrender.com

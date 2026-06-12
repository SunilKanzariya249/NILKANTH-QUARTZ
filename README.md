# Nilkanth Quartz

Premium MERN Stack E-Commerce Catalog & WhatsApp Inquiry Website for Nilkanth Quartz ( Morbi, Gujarat, India ).

---

## 🛠️ Tech Stack & Key Modules

* **Frontend:** React + Vite, Tailwind CSS, Zustand (State Management), Lucide React (Icons), Canvas Confetti.
* **Backend:** Node.js + Express.js, MongoDB Atlas (Mongoose ORM).
* **Security & Auth:** JWT (JSON Web Tokens), bcryptjs (Hashing), Helmet (Secure Headers), Express Rate Limit.
* **Storage:** Multer, Cloudinary API (with automatic local disk storage fallback if credentials are unset).
* **SEO:** Dynamic Meta Titles/Descriptions, Open Graph, Sitemap.xml, Robots.txt, and JSON-LD Product Schema.

---

## 🚀 Getting Started

### 1. Prerequisite Configuration
Create a `.env` file in the `/backend` folder with the following variables:
```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/nilkanth-quartz
JWT_SECRET=your_jwt_signing_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 2. Install Dependencies
```bash
# Install backend packages
cd backend
npm install

# Install frontend packages
cd ../frontend
npm install
```

### 3. Run Development Servers
```bash
# In backend/
npm run dev

# In frontend/
npm run dev
```

### 4. Admin Portal Login
* **URL:** `http://localhost:5173/admin/login`
* **Default credentials:** `admin@gmail.com` / `sunil`

---

## 📦 Folder Structure

```
d:\NILKANTH-QUARTZ
├── backend/
│   ├── config/           # Database and Cloudinary settings
│   ├── controllers/      # Route handlers (Auth & Products)
│   ├── middleware/       # JWT auth & Multer file uploads
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints routing
│   └── server.js         # Entrypoint & database seed routine
│
└── frontend/
    ├── public/           # Static assets, sitemaps & robots
    ├── src/
    │   ├── components/   # Headers, footers, protectors, and SEO
    │   ├── pages/        # Client routing pages
    │   └── store/        # Zustand state stores
    ├── tailwind.config.js
    └── vite.config.js
```

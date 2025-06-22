# 💊 Online Pharmacy

An advanced React + Node.js powered full-stack application for ordering medicines online — inspired by Flipkart's user-friendly experience. This project allows users to search medicines, upload prescriptions, place orders, and manage profiles with seamless UI and smart features.

# 🚀 Features

- 🔐 **Authentication**: Sign Up / Sign In with validation and session persistence.
- 🛒 **Smart Cart Flow**: Multi-step cart system with address, summary, and payment options.
- 📷 **Prescription Upload**: Users can upload prescriptions and auto-add items to the cart via OCR.
- 🔎 **Dynamic Medicine Search**: Integrated with RxNav API and fallback support for Indian brands.
- 📦 **Order History**: View all past orders and details inside the account dashboard.
- 📚 **Health Tips**: Dedicated page for healthy living and lifestyle guidance.
- 🎨 **Responsive UI**: Flipkart-style modern layout with animated carousel, bottom nav, and custom icons.

## 🛠️ Tech Stack

- **Frontend**: React, React Router, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI/OCR**: RxNav API + Custom image recognition (Tesseract.js or server-side OCR)
- **Auth**: JWT + LocalStorage


# 📸 Screenshots 

🏠 Home Page

(/screenshots/Home.png)  

🛒 Cart

(/screenshots/Cart.png)  

👤 Account Page

(/screenshots/Account.png)  

🩺 HealthTips Page

(/screenshots/HealthTips.png)  

📄  Order via Prescription Page

(/screenshots/Prescription.png) 


# 🚀 Installation & Setup
Follow these steps to run the project locally on your system:

1. 📦 Clone the Repository

git clone https://github.com/your-username/Online-Pharmacy.git
cd Online-Pharmacy

2. 📁 Set Up the Server (Backend)

cd server

npm install

Create a .env file inside the server directory and add your MongoDB connection string:

MONGO_URI=mongodb://localhost:27017/medstore

PORT=5000

Then start the backend server:

node server.js

3. 💻 Set Up the Frontend 

cd ..

npm install

npm start

The frontend will run on http://localhost:3000 and the backend on http://localhost:5000.

✅ Prerequisites
Node.js (v14+ recommended)

MongoDB (running locally or on cloud)

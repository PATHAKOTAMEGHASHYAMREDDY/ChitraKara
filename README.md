# Chitrakar: Unleash Your Creativity 🎨✨

Chitrakar is a platform designed to connect artists and customers, facilitating the creation and sale of unique artwork. Artists can showcase their paintings, manage custom requests, and engage with customers, while customers can browse available art, request personalized pieces, and track their orders. This application aims to streamline the art creation process, making it accessible and enjoyable for everyone.

## 🚀 Key Features

- **Artist Portal**:
    - Upload and manage paintings with titles, images, prices, and contact information. 🖼️
    - Handle custom painting requests, accepting or rejecting them based on availability. ✅ ❌
    - View and manage orders placed by customers. 📦
    - Chat with customers regarding custom requests and orders. 💬
- **Customer Portal**:
    - Browse available paintings and search for specific artworks. 🔍
    - Request custom paintings from preferred artists, providing detailed specifications. 🖌️
    - Track order history and view order details. 🚚
    - Chat with artists about ongoing requests. 🗣️
- **Authentication**:
    - Secure login and signup for both artists and customers. 🔑
    - Forgot password functionality with OTP verification. 📧
- **Image Management**:
    - Utilizes Cloudinary for efficient image storage and delivery. ☁️
- **Real-time Communication**:
    - Integrated chat functionality for seamless communication between artists and customers. 📡

## 🛠️ Tech Stack

- **Frontend**:
    - React: JavaScript library for building user interfaces.
    - React Router DOM: For client-side routing.
    - Vite: Build tool for fast development.
    - Ant Design: UI library for React.
    - Bootstrap: CSS framework for styling.
    - Axios: HTTP client for making API requests.
    - Lottie-react: React component for rendering Lottie animations.
    - lucide-react: Collection of icons.
    - react-icons: Icon library.
- **Backend**:
    - Node.js: JavaScript runtime environment.
    - Express: Web application framework for Node.js.
    - Mongoose: MongoDB object modeling tool.
    - CORS: Middleware for enabling Cross-Origin Resource Sharing.
    - Nodemailer: For sending emails.
    - Multer: Middleware for handling file uploads.
    - Multer Storage Cloudinary: Multer storage engine for Cloudinary.
    - bcryptjs: For hashing passwords.
    - crypto: Provides cryptographic functionality.
    - dotenv: Loads environment variables from a `.env` file.
- **Database**:
    - MongoDB: NoSQL database for storing application data.
- **Cloud Services**:
    - Cloudinary: For image and video management.

## 📦 Getting Started / Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running or a MongoDB Atlas account.
- Cloudinary account for image storage.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd Chitrakar
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure backend environment variables:**

    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables:

    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    CORS_ORIGIN=https://chitrakar-app.vercel.app
    EMAIL_USER=<your_email_address>
    EMAIL_PASS=<your_email_password>
    VITE_API_URL=http://localhost:5000 # or your deployed backend URL
    ```

4.  **Install frontend dependencies:**

    ```bash
    cd ../frontend/myapp
    npm install
    ```

5.  **Configure frontend environment variables:**

    - Create a `.env` file in the `frontend/myapp` directory.
    - Add the following environment variable:

    ```
    VITE_API_URL=http://localhost:5000 # or your deployed backend URL
    ```

### Running Locally

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend/myapp
    npm run dev
    ```

    The frontend application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
Chitrakar/
├── backend/
│   ├── models/
│   │   ├── artistusers.js
│   │   ├── customerusers.js
│   │   ├── painting.js
│   │   ├── orders.js
│   │   ├── custompaintingrequest.js
│   │   └── ...
│   ├── routes/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── myapp/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Artistlog.jsx
│   │   │   │   ├── Customerlog.jsx
│   │   │   │   ├── Artisthome.jsx
│   │   │   │   ├── Customerhome.jsx
│   │   │   │   ├── CustomerOrders.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── Team.jsx
│   │   │   │   └── ...
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   ├── styles/
│   │   │   │   ├── Home.css
│   │   │   │   ├── artistlog.css
│   │   │   │   ├── customerlog.css
│   │   │   │   ├── artisthome.css
│   │   │   │   ├── customerhome.css
│   │   │   │   ├── customerorders.css
│   │   │   │   └── team.css
│   │   │   ├── assets/
│   │   │   │   ├── logo.png
│   │   │   │   ├── front.json
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── vite.config.js
│   │   ├── package.json
│   │   └── ...
├── .gitignore
├── README.md
└── ...
```

## 📸 Screenshots

<img width="1892" height="820" alt="Image" src="https://github.com/user-attachments/assets/ac695e2a-c9b1-4ad3-b612-bf2d9df95f2b" />

<img width="1919" height="855" alt="Image" src="https://github.com/user-attachments/assets/6b229323-2c51-4b59-95ae-ede9a0b85f06" />

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## 📝 License

This project is licensed under the [MIT License](LICENSE).





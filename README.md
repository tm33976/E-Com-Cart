# Vibe Commerce - Mock E-Com Cart

This is a full-stack mock e-commerce shopping cart application built for the Vibe Commerce screening. It features a React/Vite frontend, a Node/Express backend, and a MongoDB Atlas database.

The app allows users to view products, add them to a cart, view their cart, and "check out" with a mock receipt.

**Live Demo:** (Link to your 1-2 minute Loom/YouTube demo video here)
**Screenshots:** (Add 2-3 screenshots: Product Page, Cart Page, Checkout Modal)

---

## 🚀 Features

* **Product Listing:** Fetches products from the backend API (seeded by Fake Store API).
* **Shopping Cart:** Full cart functionality (add, remove, update, view items).
* **Persistent Cart:** Cart state is saved in the database per a "mock user."
* **Checkout Process:** A simple form leads to a mock receipt modal.
* **Responsive Design:** Built with Tailwind CSS, a mobile-first approach.
* **Notifications:** Uses `react-hot-toast` for user feedback (e.g., "Item added!").
* **Bonus:** Integrates Fake Store API for product seeding and includes robust error handling.

---

## 🛠 Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Font Awesome
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (using Mongoose)
* **Deployment:** Designed for a GitHub repository (no live hosting).

---

## Setup and Installation

This project is a monorepo containing the `backend` and `frontend` in one directory.

### Prerequisites

* Node.js (v18.x or later)
* npm
* A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd vibe-commerce-cart
```

### 2. Backend Setup (`/backend`)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create your MongoDB Atlas database and get your **connection string**.

4.  Create a `.env` file in the `/backend` directory and add your connection string:
    ```
    # /backend/.env
    MONGO_URI="your_mongodb_atlas_connection_string_here"
    PORT=3001
    ```

5.  Start the backend server (with nodemon for auto-reloading):
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3001`. On first launch, it will automatically fetch products from the Fake Store API and populate your database.

### 3. Frontend Setup (`/frontend`)

1.  Open a **new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `/frontend` directory to tell React where the API is:
    ```
    # /frontend/.env
    VITE_API_URL="http://localhost:3001/api"
    ```

4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The app will open and run on `http://localhost:5173`.

You are all set! The app should be fully functional.

---

## 🧪 API Endpoints (for Testing)

The backend server runs on `http://localhost:3001`. You can use a tool like Postman or Insomnia to test these endpoints.

* **`GET /api/products`**
    * **Description:** Fetches all 10 products from the database.
    * **Body:** None.

* **`POST /api/cart`**
    * **Description:** Adds a product to the cart. If the item already exists, it increases the quantity.
    * **Body (JSON):**
        ```json
        {
          "productId": "<product_id_from_GET_products>",
          "quantity": 1
        }
        ```

* **`GET /api/cart`**
    * **Description:** Fetches all items in the cart and the total price.
    * **Body:** None.

* **`PUT /api/cart/:id`**
    * **Description:** Updates the quantity of a specific item in the cart. The `:id` is the **cart item's ID** (from the `GET /api/cart` response), *not* the product ID.
    * **Body (JSON):**
        ```json
        {
          "quantity": 3
        }
        ```

* **`DELETE /api/cart/:id`**
    * **Description:** Removes a specific item from the cart. The `:id` is the **cart item's ID**.
    * **Body:** None.

* **`POST /api/checkout`**
    * **Description:** Simulates a checkout. It returns a mock receipt and clears the cart in the database.
    * **Body (JSON):**
        ```json
        {
          "userInfo": {
            "name": "Test User",
            "email": "test@example.com"
          },
          "total": 109.95 
        }
        ```

---

## 📄 Author

👨‍💻 **Tushar Mishra**  
📧 tm3390782@gmail.com  
🌐 [Portfolio](https://tushar-mishra-cse-portfolio.vercel.app) | [GitHub](https://github.com/tm33976) | [LinkedIn](https://www.linkedin.com/in/tushar-mishra-5253ab311/)

---
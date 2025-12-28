# 🛒 SuperSimple E-Commerce Platform

A feature-rich, responsive e-commerce application built with **React** and **JSX**. This project demonstrates a complete shopping flow, from product selection to real-time cart updates and order tracking.
![App Demo](https://github.com/KVS2025/E-Commerce-WebPage/blob/main/project-demo.gif?raw=true) 

## 🌟 Key Features

* **Dynamic Product Grid:** Renders products dynamically with star ratings and pricing.
* **Real-time Cart Management:** * Add/Remove items.
    * Adjust quantities via dropdowns.
    * Live "Cart Count" badge updates in the header.
* **Interactive Checkout:** * Choose between different delivery speeds (Free, $4.99, or $9.99).
    * Automatic recalculation of shipping, tax (10%), and total price.
* **Order History & Tracking:** * A dedicated "Orders" page to view previous purchases.
    * A "Tracking" page with a visual progress bar (Preparing -> Shipped -> Delivered).
* **Responsive Design:** Styled with CSS to ensure a seamless experience across desktop and mobile devices.

## 🛠️ Tech Stack

| Technology | Usage |
| :--- | :--- |
| **React (JSX)** | UI Library & Component Architecture |
| **CSS3** | Custom styling & Responsive Layouts |
| **React Hooks** | State management (`useState`, `useEffect`) |
| **React Router** | Client-side navigation between Home, Checkout, and Orders |
| **Axios** | API integration for fetching product and order data |
| **Vite** | Fast development build tool |

## 📁 Project Structure

* `src/components/`: Reusable UI elements (Header, Product cards).
* `src/pages/`: Main views (HomePage, CheckoutPage, OrdersPage, TrackingPage).
* `backend/`: (Optional) Minor backend scripts for API handling.
* `App.jsx`: Main application logic and routing.

## 🚀 Installation & Setup

1.  **Clone the repo:**
    ```bash
    git clone [(https://github.com/KVS2025/E-Commerce-WebPage).git]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the App:**
    ```bash
    npm run dev
    ```
4.  **View in Browser:**
    Open `http://localhost:5173`

## 🧠 What I Learned

This project was my first major dive into the React ecosystem. Key takeaways included:
* **State Lifting:** Managing state across different pages (e.g., ensuring the Cart count is consistent across Home and Checkout).
* **Date Logic:** Using date libraries to calculate and display accurate delivery dates based on user selection.
* **API Workflow:** Implementing `GET` and `POST` requests using Axios to simulate real-world data handling.

---

### 📬 Connect with me
* **LinkedIn:** https://www.linkedin.com/in/keval-shah-554511330
* **GitHub:** https://github.com/KVS2025

---
*Credits: Built as part of a deep-dive into Modern Web Development.*

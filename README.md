# ecommerce-angular-project

# 🛋️ 3legant - Modern E-Commerce Platform

A fully responsive, full-stack simulated E-Commerce platform built with **Angular 20+** and **TypeScript**. This project demonstrates enterprise-level frontend architecture, utilizing a **JSON Server** to mock RESTful API interactions, authentication, and CRUD operations.

## 🚀 Key Features

### 🏗️ Architecture & Performance
* **Bleeding Edge Angular:** Built with **Angular 20**, utilizing the latest features like **Signals** and **Standalone Components**.
* **Lazy Loading:** Implemented module federation with `loadChildren` for the `/shop` and `/auth` routes to optimize initial bundle size and load time.
* **State Management:** Powered by **RxJS BehaviorSubjects** in the `AuthService` to maintain real-time user session state across the application.

### 🎨 UI/UX & Interactivity
* **Custom Directives:** Includes a custom `HighlightOnHover` directive (`@Input` driven) to enhance user interaction on product cards.
* **Dynamic Routing:** Features a dedicated Product Details page (`/shop/:id`) that fetches unique data based on active route parameters.
* **Secure Authentication:** Fully functional Sign-In/Sign-Up flow using **Route Guards** (`CanActivate`) and simulated JWT token storage in `localStorage`.

## 🛠️ Tech Stack

* **Framework:** Angular 20.3.0
* **Language:** TypeScript 5.9
* **Backend Mock:** JSON Server (Simulating REST API)
* **Styling:** SCSS / CSS3 (Responsive Design)
* **Tools:** Jasmine & Karma (Testing), RxJS 7.8

## ⚙️ Installation & Setup

To run this project, you need to start the backend simulation and the frontend application.

```bash
# 1. Clone the repository
git clone [https://github.com/nika131/ecommerce-angular-project](https://github.com/nika131/ecommerce-angular-project)
cd ecommerce-angular-project

# 2. Install dependencies
npm install

# 3. Start the Mock Backend (Runs on Port 3000)
# (If you don't have json-server installed globally, run: npm install -g json-server)
npx json-server --watch db.json --port 3000

# 4. Start the Angular App (Runs on Port 4200)
# Open a NEW terminal window/tab to run this:
ng serve

# ecommerce-angular-project

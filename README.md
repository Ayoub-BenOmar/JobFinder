# 🚀 JobFinder

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-BA2BD2?style=for-the-badge&logo=ngrx&logoColor=white)

**JobFinder** is a modern, responsive job search application designed to streamline the process of finding and tracking job opportunities. Built with the latest web technologies, it offers a seamless user experience for searching jobs, managing favorites, and tracking application statuses.

---

## ✨ Features

### 🔍 **Smart Job Search**
- Integration with **The Muse API** for real-time job listings.
- Filter by **Keyword** (e.g., "Frontend", "Engineer") and **Location**.
- Client-side filtering ensures immediate and relevant results.
- Optimized pagination for browsing through hundreds of listings.

### ⭐ **Favorites Management**
- Save interesting jobs to your personal **Favorites** list.
- Powered by **NgRx** for efficient state management and instant UI updates.
- Easily remove jobs when they show no longer interest you.

### 📝 **Application Tracking**
- Keep track of jobs you've applied to in the dedicated **Applications** dashboard.
- Update application status: `Pending`, `Accepted`, or `Rejected`.
- Add personal notes to remember specific details about each application.

### 👤 **User Profile & Authentication**
- Secure **Registration** and **Login** system.
- Manage your personal details (Name, Email).
- Account management options including account deletion.

---

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **Angular 17+** | Component-based architecture, standalone components, signals. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid UI development. |
| **State Management** | **NgRx** | Reactive state management for handling Favorites and data consistency. |
| **Programming Language** | **TypeScript** | Strongly typed JavaScript for scalable development. |
| **Reactive Programming** | **RxJS** | Managing asynchronous data streams and API integrations. |
| **Backend / Mock API** | **JSON Server** | Simulates a full REST API for Users, Favorites, and Applications. |

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v18.13.0 or higher)
- **npm** (v9.0.0 or higher)
- **Angular CLI** (`npm install -g @angular/cli`)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Ayoub-BenOmar/JobFinder.git
    cd JobFinder
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### ▶️ Running the Application

This project requires both the backend mock server and the frontend application to run simultaneously.

1.  **Start the Backend Server** (Open a new terminal)
    ```bash
    npm run server
    ```
    *Runs on: `http://localhost:3000`*

2.  **Start the Frontend Application** (Open a second terminal)
    ```bash
    ng serve
    ```
    *Runs on: `http://localhost:4200`*

3.  **Open your browser** and navigate to `http://localhost:4200/`.

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── core/           # Singleton services, guards, models, and header
│   ├── features/       # Feature modules vs Standalone Components
│   │   ├── auth/       # Login & Register components
│   │   ├── jobs/       # Search, List, and Job Container components
│   │   ├── favorites/  # Favorites page component
│   │   ├── applications/ # Application tracking component
│   │   └── profile/    # User profile management
│   ├── store/          # NgRx state management (Actions, Reducers, Effects)
│   ├── app.config.ts   # App-wide configuration (Routes, Providers)
│   └── app.routes.ts   # Application routing definitions
└── styles.css          # Global styles and Tailwind imports
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [@Ayoub-BenOmar](https://github.com/Ayoub-BenOmar).

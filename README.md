# User Management Dashboard

## 🚀 Live Demo
[User Management Dashboard](https://user-management-dashboard-one-delta.vercel.app)

## 📌 Objective
Develop a simple web application that allows users to **view, add, edit, and delete** user details using a mock backend API.

## 🛠 Features
- **View Users**: Display a list of users with details such as **ID, First Name, Last Name, Email, and Department**.
- **Add User**: Fill in a form to add a new user (simulated using JSONPlaceholder API).
- **Edit User**: Modify an existing user's details and update the API.
- **Delete User**: Remove a user by sending a DELETE request.
- **Error Handling**: Handles API request failures gracefully.
- **Bonus Features**:
  - Responsive design for various screen sizes.
  - Client-side validation for form inputs.
  - Optional pagination or infinite scrolling.

## 🏗 Tech Stack
- **Frontend**: Vite + React 
- **HTTP Requests**: Fetch API / Axios
- **Mock Backend**: [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)
- **Hosting**: Vercel

## 🔧 Setup Instructions

### Prerequisites
- Install [Node.js](https://nodejs.org/) (Ensure you have the latest LTS version)
- Install a package manager like `npm`

### Installation & Running Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/your-github-username/user-management-dashboard.git
   cd user-management-dashboard
   ```
2. Install dependencies:
   ```sh
   npm install  
   ```
3. Start the development server:
   ```sh
   npm run dev 
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment
To deploy the project on Vercel:
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   vercel
   ```

## 🤔 Challenges Faced
- **Ensuring smooth UI interactions**: Used local state management to reflect API changes instantly.

## 🔥 Future Improvements
- Integrate a real backend with a database for persistent data storage.
- Implement authentication and role-based access control.
---
### 📢 Contributions & Feedback
Feel free to fork this project, suggest improvements, or report issues via GitHub.

Happy Coding! 🚀


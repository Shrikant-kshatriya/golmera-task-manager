# Task Manager Application

This is a full-stack web application for managing tasks using Material UI for styling, and the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, log in, and manage their tasks. Administrators have additional privileges to manage tasks for all users.

## Features

### Frontend

- **User Authentication**
  - Register: Users can create new accounts.
  - Login: Registered users can log in securely.
  - Logout: Users can log out of their accounts.

- **Task Management**
  - View Tasks: Users can view their own tasks.
  - Add Task: Users can create new tasks.
  - Edit Task: Users can modify existing tasks.
  - Delete Task: Users can delete tasks they've created.

- **Admin Privileges**
  - View All Tasks: Admin users can see tasks of all users.
  - Edit and Delete Tasks: Admins can edit and delete tasks created by any user.

### Backend

- **RESTful API**

  #### `/tasks`

  - `GET /tasks`: Retrieve all tasks.
  - `POST /tasks`: Create a new task.
  - `GET /tasks/:id`: Retrieve a task by ID.
  - `PUT /tasks/:id`: Update a task by ID.
  - `DELETE /tasks/:id`: Delete a task by ID.

  #### `/auth`

  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Authenticate and log in a user.
  - `POST /auth/logout`: Log out authenticated users.

  #### `/admin`

  - `GET /admin/tasks`: Retrieve all tasks (admin access).

To run the project:

1. **Navigate to Backend:**
   ```
   cd main-folder/backend
   npm install
   npm start
   ```

2. **Navigate to Frontend:**
   ```
   cd main-folder/frontend
   npm install
   npm start
   ```

   This will start the frontend server on `http://localhost:3000` and the backend server on `http://localhost:3001`.

## License

This project is licensed under the ISC License - see the [LICENSE](./LICENSE) file for details.

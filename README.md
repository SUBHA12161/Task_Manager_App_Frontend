# Task Manager Frontend

A user-friendly task management application built with React.js, designed to work with a separate backend API. This frontend application allows users to create, view, update, and delete tasks, manage categories, and filter tasks by various criteria.

## Features

- User authentication (signup and login)
- Create, read, update, and delete (CRUD) tasks
- Categorize tasks for better organization
- Filter tasks by status and category
- Pagination for easier navigation
- Responsive design for desktop and mobile devices

## Tech Stack

- **Frontend**: React.js, React Router, Reactstrap
- **Backend**: The backend API is built with Node.js and Express.js (not included in this repository)
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version 14 or later)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

### Installation

1. **Clone the Repository**

- git clone https://github.com/SUBHA12161/Task_Manager_App_Frontend.git
- cd Task_Manager_App_Frontend

2. **Install Dependencies**

- npm install

3. **Start the Application**

- npm start
- The application should now be running on http://localhost:3000.

### Usage

1. **User Registration and Login**

- Navigate to /signup to create a new account.
- Log in at the /login route after signing up.

2. **Managing Tasks**

- Use the "Add Task" option to create new tasks.
- View your tasks on the "View Tasks" page.
- Filter tasks by category and status using the provided filters.
- Edit or delete tasks directly from the task list.

3. **Categories**

- Manage task categories by navigating to "Add Category" and "View Categories."

## API Endpoints

- This frontend interacts with the following key API endpoints:

1. **Tasks**

- GET /api/tasks - Fetch all tasks (supports pagination and filtering)
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update an existing task
- DELETE /api/tasks/:id - Delete a task

2. **Categories**

- GET /api/categories - Fetch all categories
- POST /api/categories - Create a new category

3. **Authentication**

- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Log in a user
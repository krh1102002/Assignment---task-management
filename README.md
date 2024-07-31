Sure! Here is the complete README file as requested:

```markdown
# Task-Management

TaskManagement is a website built using React, Node.js, Express.js, MongoDB, and TailwindCSS where users can manage their tasks efficiently.

## Features

- Sign Up
- Sign In
- Google Sign Up/Sign In
- Adding a Task
- Updating a Task
- Deleting a Task
- Searching a Task
- Sorting Tasks
- Viewing Tasks

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Deployment:** Vercel (Frontend), Render (Backend)

## Installation Guide

To run the TaskManagement project on your local system, follow these simple steps:

### Step 1: Clone the Project

Clone this project to your local system:

```bash
git clone https://github.com/krh1102002/Assignment---task-management.git
```

### Step 2: Install Dependencies

Install dependencies for both the client and server.

Navigate to the project directory:

```bash
cd Assignment---task-management
```

Install dependencies for the client:

```bash
cd frontend
npm install
```

Install dependencies for the server:

```bash
cd backend
npm install
```

### Step 3: Add Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
MONGO_URL=<Your MongoDB URL>
SECRET_KEY=<Your Secret Key>
CLIENT_ID=<Your Google Client ID>
SECRET_ID=<Your Google Secret ID>
```

### Step 4: Start the Application on Local Machine

#### Start Frontend Server (Client):

Move into the frontend directory:

```bash
cd frontend
```

Start the frontend server:

```bash
npm run dev
```

#### Start Backend Server (Server):

Move into the backend directory:

```bash
cd backend
```

Start the backend server:

```bash
npm run dev
```

After starting both frontend and backend servers, you can access the application on your browser.
```

This README file provides a comprehensive guide to setting up and running the TaskManagement application locally, including the necessary environment variables for Google Sign Up/Sign In functionality.

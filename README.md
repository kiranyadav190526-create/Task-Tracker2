# Task Tracker

## About

Task Tracker is a Next.js application for creating, organizing, updating, and reviewing tasks. It began as a simple single-page tracker and has been upgraded into a routed app with dynamic task detail pages and browser persistence.

## Features

- Dashboard with task statistics and priority queue
- All tasks page with create, read, update, and delete operations
- Dynamic task details route at `/tasks/[id]`
- Edit task details including title, description, priority, status, category, and due date
- Mark tasks as completed or pending
- Delete confirmation before removing a task
- Filters for all, pending, and completed tasks
- Search by title, description, or category
- Sort by newest, priority, or due date
- localStorage persistence after refresh or browser reopen
- Responsive UI for desktop and mobile screens

## Tech Stack

- Next.js App Router
- React
- JavaScript
- CSS
- Browser localStorage

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Build for production:

```bash
npm run build
```

## Project Structure

```text
app/
  about/page.js
  page.js
  tasks/page.js
  tasks/[id]/page.js
components/
  ConfirmDialog.jsx
  DashboardClient.jsx
  Navbar.jsx
  TaskCard.jsx
  TaskDetailClient.jsx
  TaskFilters.jsx
  TaskForm.jsx
  TaskList.jsx
  TaskStats.jsx
utils/
  tasks.js
```

## What I Learned

- How to split a React interface into reusable components
- How to pass data and callbacks through props
- How to use `useState`, `useEffect`, and derived state
- How to render arrays with `map()` and update them immutably with `filter()` and `map()`
- How to use `localStorage` with `JSON.stringify()` and `JSON.parse()`
- How to build multiple routes and dynamic pages with the Next.js App Router

## Future Improvements

- Add drag-and-drop task ordering
- Add toast notifications for saved changes
- Add task labels and saved custom filters
- Add keyboard shortcuts for fast task entry

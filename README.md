# Task Tracker with Supabase & Authentication

A complete task management application built with React, TypeScript, Ant Design, and React Router. Features authentication flow and protected routes, ready for Supabase integration.

## ✨ New Features

- 🔐 **Authentication System** with login/signup pages
- 🛡️ **Protected Routes** - Tasks page requires authentication
- 🚦 **React Router** for navigation
- 👤 **User Context** for state management
- 🔄 **Mock Authentication** (ready for Supabase integration)

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations for tasks
- 📊 Task statistics dashboard
- 🔍 Search and filter functionality
- 📱 Responsive design with Ant Design
- 🎯 Priority levels (Low, Medium, High)
- 📅 Due date tracking
- 🏷️ Status management (Pending, In Progress, Completed)
- 🔐 User authentication and protected routes

## Routes

- `/login` - Login page (public)
- `/signup` - Sign up page (public)
- `/tasks` - Task management dashboard (protected)
- `/` - Redirects to `/tasks`

## Current State

The application currently uses **mock authentication and localStorage** for task data. All components are ready for Supabase integration.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Update the `.env` file in the root directory:

   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

## Database Schema

When you're ready to connect to Supabase, create a table with this schema:

```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## Connecting to Supabase

The API integration points are clearly marked in `/src/services/taskService.ts`. Look for the `TODO` comments to replace mock implementations with actual Supabase calls.

### Example API Integration

Here's how to replace the mock `getAllTasks` method:

```typescript
async getAllTasks(): Promise<Task[]> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}
```

## File Structure

```
src/
├── components/
│   ├── TaskFormModal.tsx      # Create/Edit task modal
│   ├── TaskTable.tsx          # Tasks display table
│   ├── TaskStats.tsx          # Statistics dashboard
│   ├── TaskFilters.tsx        # Search and filter controls
│   └── ProtectedRoute.tsx     # Route protection component
├── contexts/
│   └── AuthContext.tsx        # Authentication context & state
├── pages/
│   ├── LoginPage.tsx          # Login page
│   ├── SignUpPage.tsx         # Sign up page
│   └── TasksPage.tsx          # Main task dashboard
├── services/
│   └── taskService.ts         # API service layer (YOUR INTEGRATION POINT)
├── types/
│   └── Task.ts               # TypeScript interfaces
├── App.tsx                   # Main app with routing
└── supabase-client.ts        # Supabase client configuration
```

## Available Scripts

- `npm start` - Run the development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Next Steps for Database Integration

1. **Set up your Supabase project** and get your URL and anon key
2. **Create the tasks table** using the schema provided above
3. **Update the environment variables** in `.env`
4. **Replace the mock implementations** in `taskService.ts` with actual Supabase calls
5. **Test the integration** and handle any errors appropriately

## Mock Data

The application comes with sample tasks to help you see the UI in action:

- Setup Supabase Database (Completed, High Priority)
- Implement Authentication (In Progress, High Priority)
- Design Task Dashboard (Pending, Medium Priority)

You can interact with these tasks to understand the functionality before connecting to your database.

## Contributing

Feel free to extend this application with additional features like:

- User authentication
- Team collaboration
- File attachments
- Comments and notes
- Time tracking
- Task categories/tags

Enjoy building your task tracker! 🚀

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

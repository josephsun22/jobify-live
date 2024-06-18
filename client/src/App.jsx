import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { action as deleteJobAction } from './pages/DeleteJob';

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as AllJobsLoader} from './pages/AllJobs';
import { action as addJobAction } from './pages/AddJob';
import { loader as EditJobLoader} from './pages/EditJob';
import { action as EditJobAction } from './pages/EditJob';
import { loader as adminLoader } from './pages/Admin';
import { loader as DashboardLoader } from './pages/DashboardLayout';


const checkDefaultTheme = () => {
  const isDarkTheme =
    localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: DashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction
          },
          { path: 'stats', element: <Stats /> },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: AllJobsLoader
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: EditJobLoader,
            action: EditJobAction,
          },
          { path: 'delete-job/:id', action: deleteJobAction },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
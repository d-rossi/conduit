import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import '../index.css'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
    ]
  },
  {
    path: '/signup',
    element: <Register isSignUp={true} />
  },
  {
    path: '/login',
    element: <Register isSignUp={false} />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

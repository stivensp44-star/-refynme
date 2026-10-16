import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './index.css'
import './i18n/config.js'
import { appRoutes } from './App.jsx'

/* Data router (2026-10-16, owner-approved conversion from the declarative
   <BrowserRouter>): required for the Link viewTransition prop to work —
   React Router only orchestrates document.startViewTransition in
   framework/data modes. Routes are the same <Route> JSX, unchanged, now
   fed through createRoutesFromElements. i18n config still imports before
   the routes, same as before. */
const router = createBrowserRouter(createRoutesFromElements(appRoutes))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

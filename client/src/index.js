import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import {createBrowserRouter,RouterProvider} from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

const router = createBrowserRouter([
  {path: "/", element: <LoginPage/>,},
  {path: "/products", element: <ProductsPage />,},
  {path: "/stock", element: <StockPage />,},
  {path: "/home", element: <HomePage />,},
  {path: "/settings", element: <SettingsPage/>,},
  {path: "/profile", element: <ProfilePage/>,},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
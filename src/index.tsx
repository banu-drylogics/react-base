import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Root from "./routes/root";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import Contact from './routes/contacts';
import path from 'path';
import RecursiveMenu from './routes/RecursiveMenu';
import { MenuData } from './routes/MenuData';
import BillingTable from './components/billing_table/BillingTable';
import DonutChart from './components/dount/Dount';
import { transformedData } from './components/dount/chartData';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RecursiveMenu data={MenuData} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "billing-table",
    element: <BillingTable />,
  },
  {
    path: "donut-view",
    element: < DonutChart data={transformedData} />,
  }
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App  MenuData/> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

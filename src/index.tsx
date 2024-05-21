import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store';
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
import DropDown from './components/dropdown/DropDown';
import VirtualizedTable from './components/virtualized_table/VirtualizedTable';
import TableWithLoader from './components/topics_table/TopicsTable';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RecursiveMenu data={MenuData} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "billing-table",
        element: <BillingTable />,
      },
      {
        path: "donut-view",
        element: < DonutChart data={transformedData} />,
      },
      {
        path: "search-dropdown",
        element: <DropDown />,
      },
      {
        path: "textbox-view",
        element: <DropDown />,
      },
      {
        path: "virtualized-table",
        element: <VirtualizedTable />,
      },
      {
        path: "mock-table",
        element: <TableWithLoader />,
      }
    ]
  },

]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


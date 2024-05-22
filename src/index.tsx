import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RecursiveMenu, { loader as Menuloader } from './routes/RecursiveMenu';
import { MenuData } from './routes/MenuData';
import BillingTable from './components/billing_table/BillingTable';
import DonutChart from './components/dount/Dount';
import { transformedData } from './components/dount/chartData';
import DropDown from './components/dropdown/DropDown';
import VirtualizedTable from './components/virtualized_table/VirtualizedTable';
import TableWithLoader from './components/topics_table/TopicsTable';
import TextBoxComponent from './components/children-character/TextBoxComponent';
import ErrorPage from './error-page';
import CounterWrapper from './components/counter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RecursiveMenu data={MenuData} />,
    errorElement: <ErrorPage />,
    loader: Menuloader,
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
        path: "text-box-view",
        element: <TextBoxComponent />,
      },
      {
        path: "virtualized-table",
        element: <VirtualizedTable />,
      },
      {
        path: "mock-table",
        element: <TableWithLoader />,
      },
      {
        path: "counter",
        element: <CounterWrapper />,
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
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home';
import EditNote from '../Pages/EditNote';
import Layout from '../Components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,      // renders Home at "/"
        element: <Home />,
      },
      {
        path: 'new',      // renders EditNote at "/new"
        element: <EditNote />,
      },
      {
        path: 'edit/:id', // renders EditNote at "/edit/:id"
        element: <EditNote />,
      },
    ],
  },
]);

export default router;

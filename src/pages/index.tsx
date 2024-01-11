import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home/Home';
import Chat from './Chat/Chat';
import Profile from './Chat/Profile';
import Detail from './Detail/Detail';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'chat',
          children: [
            {
              index: true,
              element: <Chat />,
            },
            {
              path: 'profile',
              element: <Profile />,
            },
            // {
            //   path: 'date',
            //   element: <DateSelector clickOuter={true}/>,
            // },
          ],
        },
        {
          path: 'detail',
          children: [
            {
              index: true,
              element: <Detail />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

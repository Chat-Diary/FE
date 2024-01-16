import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home/Home';
import Chat from './Chat/Chat';
import Profile from './Chat/Profile';
import Detail from './Detail/Detail';
import { Analysis } from './Analsis/Analysis';
import Tag from './Tag/Tag';
import DetailEditing from './Detail/DetailEditing';

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
          path: 'tag',
          children: [
            {
              index: true,
              element: <Tag />,
            },
            {
              path: 'filter',
              element: <Tag />,
            },
          ],
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
          ],
        },
        {
          path: 'detail',
          children: [
            {
              index: true,
              element: <Detail />,
            },
            {
              path: 'edit',
              element: <DetailEditing />,
            },
          ],
        },
        {
          path: 'analysis',
          children: [
            {
              index: true,
              element: <Analysis />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

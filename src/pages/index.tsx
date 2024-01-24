import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home/Home';
import Chat from './Chat/Chat';
import Profile from './Chat/Profile/Profile';
import Detail from './Detail/Detail';
import { Analysis } from './Analysis/Analysis';
import Tag from './Tag/Tag';
import DetailEditing from './Detail/DetailEditing/DetailEditing';
import SelectTag from './Detail/DetailEditing/SelectTag/SelectTag';
import AnalysisDetail from './Analysis/AnalysisDetail/AnalysisDetail';
import TagFilter from './Tag/TagFilter/TagFilter';
import Mypage from './Mypage/Mypage';

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
              element: <TagFilter />,
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
              children: [
                {
                  index: true,
                  element: <DetailEditing />,
                },
                {
                  path: 'tags',
                  element: <SelectTag />, // UI 보려고 일단 이렇게 구현
                },
              ],
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
            {
              path: ':period',
              element: <AnalysisDetail />,
            },
          ],
        },
        {
          path: 'mypage',
          children: [
            {
              index: true,
              element: <Mypage />,
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

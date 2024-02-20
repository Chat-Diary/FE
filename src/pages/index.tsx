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
import MyPage from './MyPage/MyPage';
import Account from './MyPage/Account/Account';
import Notice from './MyPage/Notice/Notice';
import AccountQuit from './MyPage/Account/AccountQuit';
import AccountQuitFinish from './MyPage/Account/AccountQuitFinish';
import Login from './Login/Login';
import JoinName from './Login/JoinName';
import KakaoLogin from './Login/Kakao/KakaoLogin';

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
          path: 'login',
          children: [
            {
              path: 'name',
              element: <JoinName />,
            },
          ],
        },
        {
          path: 'kakao',
          children: [
            {
              path: 'callback',
              element: <KakaoLogin />,
            },
          ],
        },
        {
          path: 'login',
          children: [
            {
              index: true,
              element: <Login />,
            },
          ],
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
              path: 'modify',
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
              element: <MyPage />,
            },
            {
              path: 'account',
              children: [
                {
                  index: true,
                  element: <Account />,
                },
                {
                  path: 'quit',
                  children: [
                    {
                      index: true,
                      element: <AccountQuit />,
                    },
                    {
                      path: 'finish',
                      element: <AccountQuitFinish />,
                    },
                  ],
                },
              ],
            },
            {
              path: 'notice',
              children: [
                {
                  index: true,
                  element: <Notice />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

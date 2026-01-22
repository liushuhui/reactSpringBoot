import { ConfigProvider, Spin } from 'antd';
import ReactDOM from 'react-dom/client';
import { RouterProvider, useNavigate } from 'react-router-dom';
import router from './routes';

import menuStore from "@/store/menuStore";
import  userInfoStore  from '@/store/userInfoStore';
// import 'antd/dist/reset.css';

import './index.css';
// import dayjs from 'dayjs';
import { Suspense, use } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const initializeApp = async () => {
  const token = localStorage.getItem('app_token');
  if (token && location.pathname === '/login') {
    window.location.replace('/');
  }

  if (token) {
    await userInfoStore.getState().fetchUserInfo();
    await menuStore.getState().fetchMenu();
  }

  if (!token && location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

initializeApp();
root.render(
  <Suspense fallback={<div className='w-screen h-screen flex justify-center items-center'><Spin /></div>}>
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: '#f2f2f2',
          },
          Button: {
            colorPrimary: '#f29820',
            primaryColor: '#3d3d3d'
          },
          Menu: {
            itemBg: '#f5f5f5',
            itemColor: '#3d3d3d',
            itemSelectedColor: '#3d3d3d'
          }
        },
      }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Suspense>
);

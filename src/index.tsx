import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

import menuStore from "@/store/menuStore";
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const initializeApp = async () => {
  const token = localStorage.getItem('app_token');
  if (token) {
    await menuStore.getState().fetchMenu();
  }
};

initializeApp();
root.render(
  // <React.StrictMode>
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
          itemBg: '#',
          itemColor: '#ffffff'
        }
      },
    }}>
    <RouterProvider router={router} />
  </ConfigProvider>
  // </React.StrictMode>
);

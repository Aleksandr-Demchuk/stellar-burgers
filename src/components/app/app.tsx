import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  ProfileOrders,
  Profile,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, OrderInfo, Modal } from '@components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
  // <div className={styles.app}>
  //   <AppHeader />
  //   <ConstructorPage />
  // </div>
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      <>
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/ingredients/:id'
            element={<Modal title='' onClose={() => {}} />}
          />
          <Route
            path='/feed/:number'
            element={<Modal title='' onClose={() => {}} />}
          />
        </Routes>
      </>
    </div>
  </BrowserRouter>
);

export default App;

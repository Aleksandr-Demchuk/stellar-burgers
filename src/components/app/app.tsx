import '../../index.css';
import styles from './app.module.css';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { AppHeader } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { loadIngredients } from '../../services/slices/ingredientsSlice';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />

        <Route path='/feed/:number' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<ConstructorPage />} />
        <Route path='/profile/orders/:number' element={<ConstructorPage />} />
      </Routes>
    </div>
  );
};

export default App;

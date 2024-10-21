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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { loadIngredients } from '../../services/slices/ingredientsSlice';
import { Route, Routes, useNavigate, useLocation  } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundPosition = location.state?.background;
  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundPosition || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={() => navigate('/feed')}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='Детали заказа'
              onClose={() => navigate('/profile/orders')}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        {backgroundPosition && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={() => navigate('/feed')}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Детали заказа'
                onClose={() => navigate('/profile/orders')}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearIngredients,
  getIngredients
} from '../../services/slices/burgerConstructor';
import {
  getOrderRequest,
  getOrder,
  clearInfo,
  createOrder
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getIngredients);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrder);
  const userData = useSelector(UserData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!userData) {
      navigate('/login', { replace: true });
      return;
    }

    const ingredientsId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsId))
      .unwrap()
      .then(() => {
        dispatch(clearIngredients());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearInfo());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const showModal = userData && orderModalData;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={showModal ? orderModalData : null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

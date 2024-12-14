import {
    ordersReducer,
    loadingUsers,
    initialState
  } from '../src/services/slices/orders';
  
  describe('[ordersSlice] Проверка слайка', () => {
    const ordersMock = [
      {
        _id: '1',
        status: 'готов',
        name: 'Бургер',
        createdAt: '2024-11-22T20:45:45.515Z',
        updatedAt: '2024-11-22T20:45:46.382Z',
        number: 111,
        ingredients: ['Булка', 'Начинка']
      },
      {
        _id: '2',
        status: 'нe готов',
        name: 'Сыр',
        createdAt: '2024-11-22T20:45:45.515Z',
        updatedAt: '2024-11-22T20:45:46.382Z',
        number: 222,
        ingredients: ['Булка', 'Начинка']
      }
    ];
    it('[1] Загрузка пользователя pending', () => {
      const action = { type: loadingUsers.pending.type };
  
      const state = ordersReducer(initialState, action);
  
      expect(state.isLoading).toBe(true);
    });
  
    it('[2] Загрузка пользователя fulfilled', () => {
      const action = {
        type: loadingUsers.fulfilled.type,
        payload: ordersMock
      };
      const state = ordersReducer(initialState, action);
  
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(ordersMock);
    });
  
    it('[3] Загрузка пользователя rejected', () => {
      const action = { type: loadingUsers.rejected.type };
      const state = ordersReducer(initialState, action);
  
      expect(state.isLoading).toBe(false);
    });
  });
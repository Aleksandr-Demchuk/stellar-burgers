import { initialState, feedReducer, loadFeed } from '../src/services/slices/feedSlice';

describe('[feedSlice] Проверка слайса', () => {
  const orderMock = [
    {
      _id: '1',
      status: 'готов',
      name: 'Бургер',
      createdAt: '2024-11-22T20:45:45.515Z',
      updatedAt: '2024-11-22T20:45:46.382Z',
      number: 111,
      ingredients: ['Булка', 'Начинка']
    }
  ];

  const feedMock = {
    orders: orderMock,
    total: 75,
    totalToday: 50,
    error: null
  };

  it('[1] Получение заказа pending', () => {
    const action = { type: loadFeed.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.orders).toEqual([]);
    expect(state.error).toBe(null);
  });

  it('[2] Получение заказа fulfilled', () => {
    const action = {
      type: loadFeed.fulfilled.type,
      payload: feedMock
    };
    const state = feedReducer(initialState, action);

    expect(state.total).toBe(75);
    expect(state.totalToday).toBe(50);
    expect(state.orders).toEqual(orderMock);
    expect(state.error).toBe(null);
  });

  it('[3] Получение заказа rejected', () => {
    const action = { type: loadFeed.rejected.type };
    const state = feedReducer(initialState, action);

    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.error).toBe('Ошибка в получении заказа');
  });
});
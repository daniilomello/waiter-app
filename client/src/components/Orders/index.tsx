import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => setOrders(data));
  }, []);

  const ordersWaiting = orders.filter((order) => order.status === 'WAITING');
  const ordersInProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const ordersDone = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string | null) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string | null, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕐"
        title="Fila de espera"
        orders={ordersWaiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={ordersInProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={ordersDone}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}

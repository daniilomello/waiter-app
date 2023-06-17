import { useEffect } from 'react';
import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

interface OrderModalProps {
  visible: boolean;
  isLoading: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => void;
}

export function OrderModal({ visible, order, onClose, onCancelOrder, isLoading, onChangeOrderStatus }: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) return null;

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + (product.price * quantity);
  }, 0);

  const apiURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Table {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="close icon" />
          </button>
        </header>

        <div className="status-container">
          <small>Order status</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕐'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>

            <strong>
              {order.status === 'WAITING' && 'Waiting Line'}
              {order.status === 'IN_PRODUCTION' && 'In Production'}
              {order.status === 'DONE' && 'Done'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Items</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`${apiURL}/uploads/${product.imagePath}`}
                  alt={product.name}
                  height={32}
                />

                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button
              type='button'
              className='primary'
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '👨‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <span>
                {order.status === 'WAITING' && 'Start Production'}
                {order.status === 'IN_PRODUCTION' && 'Complete Order'}
              </span>
            </button>
          )}
          <button
            type='button'
            className='secondary'
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            <span>Close Order</span>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}

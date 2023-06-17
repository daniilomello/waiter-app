import { Modal } from 'react-native';
import { ButtonWhite, Container } from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

interface OrderConfirmedModalProps {
  visible: boolean;
  onConfirm: () => void;
}

export function OrderConfirmedModal({ visible, onConfirm }: OrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <Container>
        <CheckCircle />
        <Text size={20} weight='600' color='#fff'>Order Confirmed</Text>
        <Text color='#fff' opacity={0.9}>The order has already entered the production queue!</Text>

        <ButtonWhite onPress={onConfirm}>
          <Text color='#d73035' weight='600'>OK</Text>
        </ButtonWhite>
      </Container>
    </Modal>
  );
}

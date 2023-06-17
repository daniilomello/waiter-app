import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Welcome</Text>
          <Text size={24} weight='700'>
            Danilo
          </Text>
        </>
      )}

      {selectedTable && (
        <>
          <Content>
            <OrderHeader>
              <Text size={24} weight='600'>Order</Text>

              <TouchableOpacity onPress={onCancelOrder}>
                <Text color='#df3035' weight='600' size={14}>
                  Cancel Order
                </Text>
              </TouchableOpacity>
            </OrderHeader>

            <Table>
              <Text color='#666'>Table {selectedTable}</Text>
            </Table>
          </Content>
        </>
      )}
    </Container>
  );
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FlatList, Modal } from 'react-native';
import { Text } from '../Text';
import { Product } from '../../types/Product';
import {
  CloseButton,
  Header,
  Image,
  IngredientsContainer,
  ModalBody,
  Ingredient,
  FooterContainer,
  Footer,
  PriceContainer
} from './styles';
import { Close } from '../Icons/Close';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, onAddToCart, product }: ProductModalProps) {
  if (!product) return null;

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.100.4:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight='600'>{product.name}</Text>
          <Text color="#666">{product.description}</Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text color="#666" weight='600'>Ingredients</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredients }) => (
                <Ingredient>
                  <Text>{ingredients.icon}</Text>
                  <Text size={14} color='#666'>{ingredients.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'>Price</Text>
            <Text size={20} weight='600'>
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>

          <Button onPress={handleAddToCart}>
            Add to order
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}

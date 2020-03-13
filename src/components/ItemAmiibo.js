import React, {useState} from 'react';
import {
  List,
  Avatar,
  IconButton,
  Colors,
  Paragraph,
  Button,
} from 'react-native-paper';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import useCart from '../hooks/useCart';

const ItemAmiibo = ({
  image = '',
  name = '',
  type = '',
  id = '',
  price = '',
}) => {
  const [quantity, setQuantity] = useState(0);
  const {sendToCart} = useCart();

  const {isInCart} = useSelector(
    state => ({
      isInCart: !!state.cart[id],
    }),
    isEqual,
  );
  const onClickMinusButton = () =>
    setQuantity(quantity - 1 >= 0 ? quantity - 1 : 0);
  const onClickPlusButton = () => setQuantity(quantity + 1);

  return (
    <>
      <List.Item
        title={`${name}`}
        description={`Type: ${type}\nPrice: ${price}$`}
        left={() => (
          <Avatar.Image
            size={80}
            source={{
              uri: image,
            }}
          />
        )}
        right={() => (
          <>
            {!isInCart && (
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconButton
                    icon="minus-circle"
                    color={Colors.red500}
                    size={20}
                    onPress={onClickMinusButton}
                  />
                  <Paragraph style={{fontWeight: 'bold'}}>{quantity}</Paragraph>
                  <IconButton
                    icon="plus-circle"
                    color={Colors.red500}
                    size={20}
                    onPress={onClickPlusButton}
                  />
                </View>
                <Button
                  icon="cart"
                  mode="text"
                  disabled={quantity <= 0}
                  onPress={() => sendToCart(id, quantity)}>
                  Add
                </Button>
              </View>
            )}
          </>
        )}
      />
    </>
  );
};

export default ItemAmiibo;

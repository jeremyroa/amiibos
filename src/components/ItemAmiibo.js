import React, {useState} from 'react';
import {
  List,
  Avatar,
  IconButton,
  Colors,
  Paragraph,
  Button,
  useTheme,
} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import useCart from '../hooks/useCart';

const ItemAmiibo = ({
  image = '',
  name = '',
  type = '',
  id = '',
  price = '',
}) => {
  const [quantity, setQuantity] = useState(0);
  const {sendToCart, sendDeleteItem} = useCart();
  const theme = useTheme();
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
                <View style={styles.centerItems}>
                  <IconButton
                    icon="minus-circle"
                    color={Colors.red500}
                    size={20}
                    onPress={onClickMinusButton}
                  />
                  <Paragraph style={styles.bold}>{quantity}</Paragraph>
                  <IconButton
                    icon="plus-circle"
                    color={Colors.green500}
                    size={20}
                    onPress={onClickPlusButton}
                  />
                </View>
                <Button
                  icon="cart"
                  mode="text"
                  disabled={quantity <= 0}
                  onPress={() => {
                    sendToCart(id, quantity);
                    setQuantity(0);
                  }}>
                  Add
                </Button>
              </View>
            )}
            {isInCart && (
              <View style={styles.centerItems}>
                <Button
                  icon="delete"
                  mode="text"
                  color={theme.colors.notification}
                  onPress={() => sendDeleteItem(id)}>
                  Delete in Cart
                </Button>
              </View>
            )}
          </>
        )}
      />
    </>
  );
};
ItemAmiibo.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default ItemAmiibo;
const styles = StyleSheet.create({
  centerItems: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {fontWeight: 'bold'},
});

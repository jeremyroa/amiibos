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
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import useCart from '../hooks/useCart';

const ItemCart = ({
  image = '',
  name = '',
  type = '',
  id = '',
  price = '',
  quantity = '',
}) => {
  const {sendToCart} = useCart();
  const theme = useTheme();

  // const {isInCart} = useSelector(
  //   state => ({
  //     isInCart: !!state.cart[id],
  //   }),
  //   isEqual,
  // );
  // const onClickMinusButton = () =>
  //   setQuantity(quantity - 1 >= 0 ? quantity - 1 : 0);
  // const onClickPlusButton = () => setQuantity(quantity + 1);

  return (
    <>
      <List.Item
        title={`${name}`}
        style={{
          backgroundColor: theme.colors.backgroundModal,
        }}
        description={`Type: ${type}\n${quantity} x ${price}$ = ${quantity *
          price}$`}
        left={() => (
          <Avatar.Image
            size={50}
            source={{
              uri: image,
            }}
          />
        )}
        right={() => (
          <>
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
                  // onPress={onClickMinusButton}
                />
                <Paragraph style={{fontWeight: 'bold'}}>{quantity}</Paragraph>
                <IconButton
                  icon="plus-circle"
                  color={Colors.red500}
                  size={20}
                  // onPress={onClickPlusButton}
                />
              </View>
              <Button
                icon="delete"
                mode="text"
                color={theme.colors.notification}
                disabled={quantity <= 0}
                onPress={() => sendToCart(id, quantity)}>
                Delete
              </Button>
            </View>
          </>
        )}
      />
    </>
  );
};

export default ItemCart;

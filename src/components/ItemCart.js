import React from 'react';
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
import PropTypes from 'prop-types';

import useCart from '../hooks/useCart';

const ItemCart = ({
  image = '',
  name = '',
  type = '',
  id = '',
  price = '',
  quantity = '',
}) => {
  const {sendLessQuantity, sendMoreQuantity, sendDeleteItem} = useCart();
  const theme = useTheme();

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
              <View style={styles.centerItems}>
                <IconButton
                  icon="minus-circle"
                  color={Colors.red500}
                  size={20}
                  onPress={() => sendLessQuantity(id)}
                />
                <Paragraph style={styles.bold}>{quantity}</Paragraph>
                <IconButton
                  icon="plus-circle"
                  color={Colors.green500}
                  size={20}
                  onPress={() => sendMoreQuantity(id)}
                />
              </View>
              <Button
                icon="delete"
                mode="text"
                color={theme.colors.notification}
                disabled={quantity <= 0}
                onPress={() => sendDeleteItem(id)}>
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

ItemCart.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  centerItems: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {fontWeight: 'bold'},
});

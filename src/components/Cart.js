import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {useTheme, Text, Title, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import _ from 'lodash';
import ItemCart from './ItemCart';

const {block, set, greaterThan, lessThan, Value, cond, sub} = Animated;

const CartList = ({cart}) => {
  const theme = useTheme();

  return (
    <>
      {cart.map(
        ({head, tail, amiiboSeries, name, type, image, price, quantity}) => (
          <ItemCart
            key={`${head + tail}Cart`}
            id={`${head + tail}`}
            price={price}
            amiiboSeries={amiiboSeries}
            name={name}
            image={image}
            type={type}
            quantity={quantity}
          />
        ),
      )}
    </>
  );
};

const Cart = () => {
  const theme = useTheme();
  const trans = new Value(0);
  const untraversedPos = new Value(0);
  const prevTrans = new Value(0);
  const headerPos = block([
    cond(
      lessThan(untraversedPos, sub(trans, 50)),
      set(untraversedPos, sub(trans, 50)),
    ),
    cond(greaterThan(untraversedPos, trans), set(untraversedPos, trans)),
    set(prevTrans, trans),
    untraversedPos,
  ]);
  const {cart} = useSelector(
    state => ({
      cart: Object.values(state.cart),
    }),
    isEqual,
  );

  const renderHeader = () => (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.colors.primary,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100%',
        }}>
        <IconButton
          icon="arrow-up"
          color={theme.colors.background}
          size={26}
          disabled
          onPress={() => console.log('Pressed')}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <IconButton
            icon="cart"
            color={theme.colors.background}
            size={26}
            disabled
            onPress={() => console.log('Pressed')}
          /> */}
          <Title style={{color: theme.colors.background}}>Your Cart</Title>
        </View>
        <IconButton
          icon="cart"
          color={theme.colors.background}
          size={26}
          disabled
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  );

  const renderInner = () => (
    <View>
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: headerPos,
            },
          ],
        }}>
        {renderHeader()}
      </Animated.View>
      {/* <View> */}
      <CartList cart={cart} />
      {/* </View> */}
    </View>
  );

  return (
    <BottomSheet
      contentPosition={trans}
      snapPoints={[50, 200]}
      renderContent={renderInner}
    />
  );
};

export default Cart;

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
});

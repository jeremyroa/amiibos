import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {useTheme, Title, IconButton, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import ItemCart from './ItemCart';
import useCart from '../hooks/useCart';

const {block, set, greaterThan, lessThan, Value, cond, sub} = Animated;

const CartList = ({cart}) => {
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
  const bottomSheetRef = useRef();
  const {sendRedeemCart} = useCart();
  const trans = new Value(0);
  const untraversedPos = new Value(0);
  const prevTrans = new Value(0);
  const headerPos = block([
    cond(
      lessThan(untraversedPos, sub(trans, 0)),
      set(untraversedPos, sub(trans, 0)),
    ),
    cond(greaterThan(untraversedPos, trans), set(untraversedPos, trans)),
    set(prevTrans, trans),
    untraversedPos,
  ]);
  const {cart, total, amiibosLength} = useSelector(
    state => ({
      cart: Object.values(state.cart),
      amiibosLength: isEmpty(state.amiibos),
      total: Object.values(state.cart).reduce(
        (prev, value) => prev + value.quantity * value.price,
        0,
      ),
    }),
    isEqual,
  );

  const renderHeader = () => (
    <View
      style={[styles.containerHeader, {backgroundColor: theme.colors.primary}]}>
      <View style={styles.innerHeader}>
        <IconButton
          icon={total ? 'arrow-up' : 'sale'}
          color={theme.colors.background}
          size={26}
          disabled
        />
        <View style={styles.center}>
          <Title style={[{color: theme.colors.background}]}>
            {total ? `You have (${cart.length}) items selected` : 'Empty Cart'}
          </Title>
        </View>
        <IconButton
          icon="cart"
          color={theme.colors.background}
          size={26}
          disabled
        />
      </View>
    </View>
  );

  const renderInner = () => (
    <View>
      <Animated.View
        style={[
          styles.upper,
          {
            transform: [
              {
                translateY: headerPos,
              },
            ],
          },
        ]}>
        {renderHeader()}
      </Animated.View>
      <CartList cart={cart} />
      {!!total && (
        <View
          style={[
            styles.containerRedeem,
            {
              backgroundColor: theme.colors.backgroundModal,
            },
          ]}>
          <Title style={{color: theme.colors.primary}}>TOTAL: {total}$</Title>
          <Button
            icon="cash"
            mode="outlined"
            onPress={sendRedeemCart}
            style={[
              styles.borderWitdthButton,
              {
                borderColor: theme.colors.primary,
              },
            ]}>
            Redeem
          </Button>
        </View>
      )}
    </View>
  );
  if (!total && bottomSheetRef.current && !amiibosLength) {
    bottomSheetRef.current.snapTo(0);
  }
  return (
    <BottomSheet
      ref={bottomSheetRef}
      contentPosition={trans}
      enabledGestureInteraction={!!total}
      borderRadius={20}
      snapPoints={[45, 200]}
      renderContent={renderInner}
    />
  );
};

export default Cart;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    height: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  innerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  center: {flexDirection: 'row', alignItems: 'center'},
  upper: {zIndex: 1},
  containerRedeem: {
    padding: 15,
    paddingBottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderWitdthButton: {
    borderWidth: 1,
  },
});

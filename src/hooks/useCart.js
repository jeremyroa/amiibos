import {useDispatch} from 'react-redux';
import {
  addToCart,
  moreQuantity,
  lessQuantity,
  deleteItem,
  redeemCart,
} from '../actions/cartActions';

const useCart = () => {
  const dispatch = useDispatch();

  const sendToCart = (id, quantity) => dispatch(addToCart(id, quantity));

  const sendMoreQuantity = id => dispatch(moreQuantity(id));

  const sendLessQuantity = id => dispatch(lessQuantity(id));

  const sendDeleteItem = id => dispatch(deleteItem(id));

  const sendRedeemCart = id => dispatch(redeemCart());

  return {
    sendToCart,
    sendLessQuantity,
    sendMoreQuantity,
    sendDeleteItem,
    sendRedeemCart,
  };
};

export default useCart;

import {useDispatch} from 'react-redux';
import {fetchTypes} from '../actions/typesActions';
import {addToCart} from '../actions/cartActions';

const useTypes = () => {
  const dispatch = useDispatch();

  const sendToCart = async (id, quantity) => dispatch(addToCart(id, quantity));

  return {
    sendToCart,
  };
};

export default useTypes;

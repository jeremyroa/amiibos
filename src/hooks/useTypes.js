import {useDispatch} from 'react-redux';
import {fetchTypes} from '../actions/typesActions';

const useTypes = () => {
  const dispatch = useDispatch();

  const getTypes = async () => dispatch(fetchTypes());

  return {
    getTypes,
  };
};

export default useTypes;

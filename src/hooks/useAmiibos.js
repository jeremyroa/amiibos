import {useDispatch} from 'react-redux';
import {fetchAmiibosTypes, fetchInitialState} from '../actions/amiiboActions';

const useAmiibos = () => {
  const dispatch = useDispatch();

  const getInitialState = async () => dispatch(fetchInitialState());

  const getAmiibosForType = async type =>
    type ? dispatch(fetchAmiibosTypes(type)) : null;

  return {
    getInitialState,
    getAmiibosForType,
  };
};

export default useAmiibos;

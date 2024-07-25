import { FETCH_PRODUCTS_URL } from '../Backend/apis';
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from '../Store/slices/productSlice';
import useFetchData from './useFetchData';

const useFetchProductsData = () => {
  const dataDetails = {
    url: FETCH_PRODUCTS_URL,
    startAction: fetchProductsStart,
    successAction: fetchProductsSuccess,
    failureAction: fetchProductsFailure,
  };
  const fetchData = useFetchData(dataDetails);

  return fetchData;
};

export default useFetchProductsData;

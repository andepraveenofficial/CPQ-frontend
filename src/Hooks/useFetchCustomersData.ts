import { FETCH_CUSTOMERS_URL } from '../Backend/apis';
import useFetchData from './useFetchData';
import {
  fetchCustomersFailure,
  fetchCustomersStart,
  fetchCustomersSuccess,
} from '../Store/slices/customerSlice';

const useFetchCustomersData = () => {
  const dataDetails = {
    url: FETCH_CUSTOMERS_URL,
    startAction: fetchCustomersStart,
    successAction: fetchCustomersSuccess,
    failureAction: fetchCustomersFailure,
  };

  const fetchData = useFetchData(dataDetails);

  return fetchData;
};

export default useFetchCustomersData;

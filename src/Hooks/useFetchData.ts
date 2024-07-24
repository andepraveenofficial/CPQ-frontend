import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

interface FetchDataOptions<T> {
  url: string;
  startAction: () => any;
  successAction: (data: T[]) => any;
  failureAction: (error: string) => any;
}

const useFetchData = <T>({
  url,
  startAction,
  successAction,
  failureAction,
}: FetchDataOptions<T>) => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(startAction());
      const jwtToken = Cookies.get('jwtToken');

      const response = await axios.get<{ data: T[] }>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = response.data?.data;
      dispatch(successAction(data));
    } catch (err) {
      dispatch(failureAction('Error fetching data'));
    }
  };

  return fetchData;
};

export default useFetchData;

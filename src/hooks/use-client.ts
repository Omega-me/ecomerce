import { useEditMutation } from '.';
import { useOrdersQuery } from './useQueries';

const useClient = () => {
  const { data: orders, isPending } = useOrdersQuery();
  const { mutate: cancelOrder } = useEditMutation();
  const { mutate: changeStatus } = useEditMutation();

  return { orders, cancelOrder, changeStatus, isPending };
};

export default useClient;

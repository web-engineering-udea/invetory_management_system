import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { InventorysQuery } from '@/types';
import useSWR, { mutate } from 'swr';

const refetchInventorys = async () => {
  await mutate(API_ROUTES.inventorys);
};

const useGetInventorys = () => {
  const { data, isLoading, error } = useSWR<InventorysQuery>(
    API_ROUTES.inventorys,
    fetcher
  );
    console.log(data);
  return {
    inventorys: data?.inventoryMovements,
    inventorysLoading: isLoading,
    inventorysError: error,
  };
};

export { useGetInventorys, refetchInventorys };
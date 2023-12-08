import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { BalanceQuery } from '@/types';
import useSWR from 'swr';

const useGetBalance = (materialId: string) => {
  const { data, isLoading, error } = useSWR<BalanceQuery>(
    `${API_ROUTES.inventorys}/${materialId}`,
    fetcher
  );

  return {
    indicators: data?.indicators,
    isLoading,
    error,
  };
};

export { useGetBalance };
import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { MaterialsQuery } from '@/types';
import useSWR, { mutate } from 'swr';

const refetchMaterials = async () => {
  await mutate(API_ROUTES.materials);
};

const useGetMaterials = () => {
  const { data, isLoading, error } = useSWR<MaterialsQuery>(
    API_ROUTES.materials,
    fetcher
  );

  return {
    materials: data?.materials,
    materialsLoading: isLoading,
    materialsError: error,
  };
};

export { useGetMaterials, refetchMaterials };
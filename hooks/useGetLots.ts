// import { API_ROUTES, fetcher } from '@/service/apiConfig';
// import { LotsQuery } from '@/types';
// import useSWR from 'swr';

// const useGetLots = () => {
//   const { data, isLoading, error } = useSWR<LotsQuery>(
//     API_ROUTES.lots,
//     fetcher
//   );

//   return {
//     lots: data?.lots,
//     isLoading,
//     error,
//   };
// };

// export { useGetLots };
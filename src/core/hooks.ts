import { apiClient } from 'core/api';
import { useQuery, UseQueryResult } from 'react-query';
import { ProductRespone } from 'core/types';
import { useSearchParams } from 'react-router-dom';

export function useItems(): UseQueryResult<ProductRespone> {
  const [search] = useSearchParams({
    sort: 'name',
    minPrice: '0',
    maxPrice: '10000',
  });

  return useQuery(
    ['items', search.toString()],
    () =>
      apiClient
        .get('items', {
          params: search,
        })
        .then((res) => res.data),
    {
      staleTime: 120000,
    },
  );
}

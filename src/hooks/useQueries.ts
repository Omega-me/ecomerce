import { onGetProducts } from '@/services/actions/product';
import { onUserInfo } from '@/services/actions/user';
import { useQuery } from '@tanstack/react-query';

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: () => onUserInfo(),
  });
};

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: onGetProducts,
  });
};

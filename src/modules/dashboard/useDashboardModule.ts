'use client';
import { useProductsQuery, useUserInfoQuery } from '@/hooks';

const useDashboardModule = () => {
  const { data: user } = useUserInfoQuery();
  const { data: products } = useProductsQuery();

  return { user, products };
};

export default useDashboardModule;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DashboardModuleType
  extends ReturnType<typeof useDashboardModule> {}

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { MutationKey, QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useMutationData = <TData = unknown, TError = unknown, TVariables = void>(
  mutationKey: MutationKey,
  mutationFn: (variables: TVariables) => Promise<TData>,
  queryKey: QueryKey,
  onSuccessFn?: (data: any) => void
) => {
  const client = useQueryClient();
  const { mutate, isPending, variables } = useMutation<TData, TError, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccessFn) onSuccessFn(data);
      const mutationData = data as unknown as { status: number; data: TData };
      const headerTxt = mutationData?.status === 200 || mutationData?.status === 201 ? 'Success' : 'Error';
      return toast(headerTxt, {
        description: mutationData?.data as string,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey });
    },
  });

  return { mutate, isPending, variables };
};

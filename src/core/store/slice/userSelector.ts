import { RootState, useAppSelector } from "@/store/store";

export const useUserSelector = () => {
  return useAppSelector(({ user }: RootState) => user);
};

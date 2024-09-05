import { RootState, useAppSelector } from "@/store/store";

export const useSearchSelector = () => {
  return useAppSelector(({ search }: RootState) => search);
};

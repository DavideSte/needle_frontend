import { RootState, useAppSelector } from "@/store/store";

export const useAuthSelector = () => {
  return useAppSelector(({auth }: RootState) => auth);
};

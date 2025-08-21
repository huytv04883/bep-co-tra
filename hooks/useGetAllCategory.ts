import axiosInstance from "@/lib/axios";
import { Category } from "@/types/categories";
import { QueryOptions, StrapiResponse } from "@/types/react-query";
import { QueryFunction, useQuery } from "@tanstack/react-query";

const fn: QueryFunction<StrapiResponse<Category[]>> = (context) => {
  const params = context.queryKey[1];
  return axiosInstance.get(`/categories`, { params });
};

export const useGetAllCategory = (config: QueryOptions = {}) => {
  return useQuery<StrapiResponse<Category[]>, Error>({
    queryKey: ["GET_ALL_CATEGORIES"],
    queryFn: fn,
    ...config,
  });
};

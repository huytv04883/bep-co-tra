import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";
import { QueryOptions, StrapiResponse } from "@/types/react-query";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export type ProductQueryParams = {
  categorySlug?: string;
};

const fn: QueryFunction<StrapiResponse<Product[]>> = (context) => {
  const params = context.queryKey[1];
  return axiosInstance.get(`/products`, {
    params: {
      ...(params ?? {}),
      populate: "*",
      filters: {
        categories: {
          slug: {
            $eq: (params as ProductQueryParams)?.categorySlug,
          },
        },
      },
    },
  });
};

export const useGetProductsList = (
  params: ProductQueryParams,
  config: QueryOptions = {}
) => {
  return useQuery<StrapiResponse<Product[]>, Error>({
    queryKey: ["GET_PRODUCTS_LIST", params],
    queryFn: fn,
    ...config,
  });
};

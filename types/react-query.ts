import { UseQueryOptions } from "@tanstack/react-query";

export type QueryOptions = {
  config?: Omit<UseQueryOptions<unknown, Error>, "queryKey" | "queryFn">;
};

export type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
};

export type ItemBase = {
  createdAt: string;
  documentId: string;
  locale: string;
  updatedAt: string;
  publishedAt: string;
}

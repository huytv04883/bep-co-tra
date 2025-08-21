import { ItemBase } from "../react-query";
import { StrapiImageResponse } from "../strapi";

export type Product = ItemBase & {
  id: string;
  name: string;
  price: string;
  images: StrapiImageResponse[];
};

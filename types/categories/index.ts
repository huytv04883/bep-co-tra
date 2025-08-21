import { ItemBase } from "../react-query";

export type Category = ItemBase & {
  id: string;
  name: string;
  slug: string;
};

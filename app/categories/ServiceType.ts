import { ImagesType } from "../products/productTypes";

export type CategoriesResponseType = {
    data: CategoryType[]
}

export type CategoryType = {
    id: number;
    attributes: CategoryAttributesType;
}

export type CategoryAttributesType = {
    title: string;
    description?: string;
    slug: string;
    images?: ImagesType;
}
import { ImagesType } from "../products/productTypes";

export type ServicesResponseType = {
    data: ServiceType[]
}

export type ServiceType = {
    id: number;
    attributes: ServiceAttributesType;
}

export type ServiceAttributesType = {
    title: string;
    description?: string;
    richText?: string;
    fullContent?: string;
    images?: ImagesType;
    slug: string;
}
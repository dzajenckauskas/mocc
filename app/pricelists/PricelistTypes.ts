import { NoteType } from "../products/productTypes";

export type PricelistsResponseType = {
    data: PricelistType[];
}
export type PricelistType = {
    attributes: PricelistAttributesType;
    id: number;
}

export type PricelistAttributesType = {
    title: string;
    description?: string;
    serviceLines: ServicelineType[]
    notes?: NoteType[];
}

export type ServicelineType = {
    id: number;
    title: string;
    description?: string;
    duration?: string;
    price: string;
}
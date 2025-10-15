export type ReviewsResponseType = {
    data: ReviewType[]
}

export type ReviewType = {
    id: number;
    attributes: ReviewAttributesType
}
export type ReviewAttributesType = {
    review: string;
    customer: string;
    rate: number;
}
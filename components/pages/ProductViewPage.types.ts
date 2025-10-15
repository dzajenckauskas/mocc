export type ProductViewDiagnosis = {
    id: number;
    diagnose: string;
}

export type ProductViewDiagnosisTable = {
    id: number;
    percent?: string | null;
    specialists: string;
    diagnoses: ProductViewDiagnosis[];
}

export type ProductViewNote = {
    id: number;
    text: string;
}

export type ProductViewImage = {
    url: string;
    alternativeText?: string | null;
}

export type ProductViewData = {
    id: number;
    slug: string;
    categorySlug: string;
    title: string;
    description: string;
    type: string;
    prices?: string | null;
    categoryTitle?: string | null;
    image?: ProductViewImage | null;
    diagnosesTable: ProductViewDiagnosisTable[];
    notes: ProductViewNote[];
}

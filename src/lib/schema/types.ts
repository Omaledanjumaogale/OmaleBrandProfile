/**
 * Schema.org JSON-LD Types
 */

export interface SchemaBase {
    "@context"?: string;
    "@type": string;
    "@id"?: string;
    [key: string]: any;
}

export interface Crumb {
    name: string;
    item: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface AuthorData {
    name: string;
    role: string;
    url: string;
    image: string;
}

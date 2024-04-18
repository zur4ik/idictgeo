export interface TranslationResponse {
    from: string;
    to: string;
    str: string;
    found: Translation[] | [];
}

export interface Translation {
    id: number;
    ka: string;
    en: string;
    de: string;
    ka_description: string;
    en_description: string;
    de_description: string;
    source_id: number;
    created_at: string;
    updated_at: string;
    source: TranslationSource;
}

export interface TranslationSource {
    id: number;
    ka: string;
    en: any;
    de: any;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface TranslationItem {
    id: number;
    ka: string;
    en: string;
    source: string;
}

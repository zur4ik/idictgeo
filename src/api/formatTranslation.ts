import {TranslationItem, TranslationResponse} from "../types/data.js";

export default function formatTranslation(
    data: TranslationResponse,
): null | TranslationItem {
    // check if empty response
    if (data.found.length === 0) {
        return null;
    }

    // get first translation
    const translation = data.found[0];

    return {
        id: translation.id,
        ka: translation.ka,
        en: translation.en,
        source: translation.source.ka,
    }
}

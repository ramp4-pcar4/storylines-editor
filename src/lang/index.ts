import { createI18n } from 'vue-i18n';

type csvRows = { key: string; enValue: string; enValid: string; frValue: string; frValid: string }[];
interface LocaleMessages {
    [key: string]: { [name: string]: string };
}

import rows from './lang.csv';

const lang = document.documentElement.getAttribute('lang');

/**
 * Fold the imported CSV file in the form of `{ key: string, enValue: string, frValue: string }[]` to the form understood by VueI18n: `{ en: { [name: string]: string }, fr: { [name: string]: string } }`.
 *
 * @param {csvRows} rows
 * @returns {LocaleMessages}
 */
function fold(rows: csvRows): LocaleMessages {
    return rows.reduce(
        (map, item) => {
            map.en[item.key] = item.enValue;
            map.fr[item.key] = item.frValue;
            return map;
        },
        { en: {}, fr: {} } as LocaleMessages
    );
}

const i18n = createI18n({
    legacy: false,
    locale: lang || undefined,
    fallbackLocale: 'en',
    globalInjection: true,
    messages: fold(rows)
});

export { i18n };

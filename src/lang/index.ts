import { createI18n } from 'vue-i18n';
import { highchartsMessages } from 'highcharts-accessible-configuration-kit';

type csvRows = { key: string; enValue: string; frValue: string }[];
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

const appMessages = fold(rows);

const i18n = createI18n({
    legacy: false,
    locale: lang || undefined,
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
        en: { ...appMessages.en, ...highchartsMessages.en },
        fr: { ...appMessages.fr, ...highchartsMessages.fr }
    }
});

export { i18n };

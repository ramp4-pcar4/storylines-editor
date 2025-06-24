const TEXT_ALIGN_LEFT = 'text-align: left;';
const TEXT_ALIGN_LEFT_IMPORTANT = 'text-align: left !important;';

function addTextAlignLeft(text: string, styles?: string): string {
    return styles?.includes(text) ? styles : (styles || '') + text;
}

function removeTextAlignLeft(styles?: string): string {
    return (styles || '').replace(/text-align:\s*left\s*(?:!important)?;?/g, '');
}

/**
 * Applies or removes `text-align` styles to one or more panels based on their type.
 *
 * Handles both individual panels (text, map, video) and grouped panels
 * like slideshows that contain multiple items (images or charts).
 *
 * - For 'image' and 'chart' types, it adds/removes `text-align: left;`.
 * - For all other types, it adds/removes `text-align: left !important;`.
 * - If the input has an `items` array, each item is processed. 
 * - Otherwise, the input is treated as a single panel or an array of panels.
 */
export function applyTextAlign(panelOrGroup: any, centerSlide: boolean, dynamicSelected: boolean) {
    if (!dynamicSelected) return;

    const items = Array.isArray(panelOrGroup.items)
        ? panelOrGroup.items
        : Array.isArray(panelOrGroup)
        ? panelOrGroup
        : [panelOrGroup];

    if (centerSlide) {
        items.forEach((item: any) => {
            const isSlideshowType = item.type === 'image' || item.type === 'chart';
            const styleToAdd = isSlideshowType ? TEXT_ALIGN_LEFT : TEXT_ALIGN_LEFT_IMPORTANT;
            item.customStyles = addTextAlignLeft(styleToAdd, item.customStyles);
        });
    } else {
        items.forEach((item: any) => {
            item.customStyles = removeTextAlignLeft(item.customStyles);
        });
    }
}

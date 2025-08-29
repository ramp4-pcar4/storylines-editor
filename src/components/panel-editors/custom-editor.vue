<template>
    <div class="mt-4">
        <div
            class="w-full rounded-md bg-red-100 p-2 mb-3"
            :class="validatorErrors.length === 0 ? 'bg-green-200' : 'bg-red-100'"
        >
            <span class="flex flex-row items-center" v-if="validatorErrors.length === 0">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    style="color: rgb(23, 183, 126)"
                    class="w-10 h-10 pr-2"
                >
                    <path
                        fill="currentColor"
                        d="M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72L512,72z M758.9,374 c-48.5,48.6-81.2,76.9-172.3,186.8c-52.6,63.4-102.3,131.5-102.7,132L462.1,720c-4.6,6.1-13.5,6.8-19.1,1.6L267.9,558.9 c-17.8-16.5-18.8-44.4-2.3-62.2s44.4-18.8,62.2-2.3l104.9,97.5c5.5,5.1,14.1,4.5,18.9-1.3c16.2-20.1,38.4-44.5,62.4-68.6 c90.2-90.9,145.6-139.7,175.2-161.3c36-26.2,77.3-48.6,87.3-36.2C792,343.9,782.5,350.3,758.9,374L758.9,374z"
                    ></path>
                </svg>
                {{ $t('editor.slides.advanced.good') }}
            </span>

            <span class="flex flex-row items-center" v-else>
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    style="color: rgb(245, 108, 108)"
                    class="w-10 h-10 pr-2"
                >
                    <path
                        fill="currentColor"
                        d="M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M579.7,512l101.6-101.6 c18.7-18.7,18.7-49,0-67.7c-18.7-18.7-49-18.7-67.7,0l0,0L512,444.3L410.4,342.7c-18.7-18.7-49-18.7-67.7,0s-18.7,49,0,67.7 L444.3,512L342.7,613.6c-18.7,18.7-18.7,49,0,67.7c18.7,18.7,49,18.7,67.7,0L512,579.7l101.6,101.6c18.7,18.7,49,18.7,67.7,0 c18.7-18.7,18.7-49,0-67.7L579.7,512z"
                    ></path>
                </svg>
                {{ $t('editor.slides.advanced.broken') }}
                <button class="underline ml-1" @click="() => (showErrors = !showErrors)">
                    {{ $t('editor.slides.advanced.details') }}
                </button></span
            >

            <div v-if="showErrors">
                <ul class="list-disc ml-8">
                    <li v-for="(error, idx) in validatorErrors" :key="idx">{{ error }}</li>
                </ul>
            </div>
        </div>
        <Vue3JsonEditor
            v-model="config"
            lang="en"
            :mode="'text'"
            :show-btns="false"
            :expandedOnStart="true"
            @has-error="
                (err: string) => {
                    jsonError = err;
                    validate();
                }
            "
            @json-change="(json: any) => onJsonChange(json)"
        ></Vue3JsonEditor>
    </div>
</template>

<script setup lang="ts">
import { Vue3JsonEditor } from 'vue3-json-editor';
import { Validator } from 'jsonschema';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEditorStore } from '@/stores/editorStore';


// =========================================
// Component props and emits
// (If any are missing, they don't exist)

const emit = defineEmits(['title-edit', 'slide-edit', 'config-edited']);

// =========================================
// Definitions

const { $nextTick, $el } = getCurrentInstance()!.proxy!;
const { t } = useI18n();

const panelTypeToSchemaKey = {
    text: 'textPanel',
    map: 'mapPanel',
    video: 'multimediaVideo',
    chart: 'dqvchartPanel',
    dynamic: 'dynamicPanel',
    image: 'multimediaImage',
    slideshow: 'multimediaSlideshow',
    slideshowImage: 'multimediaSlideshow',
    slideshowChart: 'multimediaSlideshow'
} as const;
type PanelType = keyof typeof panelTypeToSchemaKey;

const editorStore = useEditorStore();
const config = computed(() => editorStore.currentSlide);

const edited = ref(false);

const jsonError = ref('');
const validator: Validator = new Validator();
const validatorErrors = ref([] as any[]);
const showErrors = ref(false);

const storylinesSchema = ref({} as Record<string, any>);

// =========================================
// Watchers

onMounted(() => {
    import('ramp-storylines_demo-scenarios-pcar/dist/StorylinesSchema.json').then((StorylinesSchema) => {
        storylinesSchema.value = {
            ...StorylinesSchema.$defs.slide,
            $defs: StorylinesSchema.$defs,
            additionalProperties: StorylinesSchema.additionalProperties
        };

        const checkValidation = validator.validate(config.value, storylinesSchema.value as any);
        if (checkValidation.errors.length !== 0) {
            // adding defaults for existing products that have missing required properties
            normalizeConfig(config.value, storylinesSchema.value.$defs.slide, storylinesSchema.value, true);
            // correct value types in config to match schema definitions.
            normalizeConfig(config.value, storylinesSchema.value.$defs.slide, storylinesSchema.value, false);
        }
        validate();
    });

    // selects the <textarea> inside json-editor and add label attribute dynamically
    $nextTick(() => {
        const textarea = $el.querySelector('textarea.jsoneditor-text');
        if (textarea) {
            textarea.setAttribute('aria-label', t('editor.slides.advanced.editor'));
        }
    });
});

// =========================================
// Lifecycle functions

// =========================================
// Component functions

// returns true if no validation errors, false if errors
function validate(validateJson?: any): boolean {
    // TODO: add any missing properties in schema as required (e.g. chart options)
    const checkConfig = validateJson ?? config.value;

    const checkValidation = validator.validate(checkConfig, storylinesSchema.value as any);
    validatorErrors.value = checkValidation.errors;
    if (jsonError.value) {
        validatorErrors.value.push(jsonError.value);
        return false;
    }
    return validatorErrors.value.length === 0;
}

// Helper function that either fills in missing required values or coerces incorrect types into the expected type format.
function defaultValues(type: string, value?: any) {
    switch (type) {
        case 'array':
            return Array.isArray(value) ? value : [];
        case 'string':
            return value !== undefined && value !== null ? String(value) : '';
        case 'number':
            return isNaN(Number(value)) ? 0 : Number(value);
        case 'boolean':
            if (value === 'true' || value === true) return true;
            if (value === 'false' || value === false) return false;
            return Boolean(value);
        default:
            return value;
    }
}

// Helper function that resolves a $ref in a JSON Schema to its actual schema definition.
function resolveSchemaRef(schemaPart: any, rootSchema: any) {
    if (!schemaPart) return null;
    if (schemaPart.$ref) {
        const path = schemaPart.$ref.replace(/^#\//, '').split('/');
        return path.reduce((acc: any, part: any) => acc && acc[part], rootSchema);
    }
    return schemaPart;
}

/**
 * Recursively normalizes a config object against the JSON Schema definition.
 * For older products where required types may be missing or of the wrong type.
 *
 * Supports two modes:
 *  - Injecting missing required fields with default values (`injectRequired = true`)
 *  - Coercing existing values to the correct types (`injectRequired = false`)
 */
function normalizeConfig(config: any, schema: any, rootSchema: any, injectRequired: boolean) {
    if (!schema || typeof schema !== 'object' || !config) return;

    const fields = injectRequired ? schema.required || [] : Object.keys(config);
    const properties = schema.properties || {};

    for (const key of fields) {
        if (!properties[key]) continue;

        // resolve $ref if property references another schema definition
        const resolvedSchema = resolveSchemaRef(properties[key], rootSchema);

        // inject default values for missing required fields
        if (injectRequired && !(key in config)) {
            config[key] = defaultValues(resolvedSchema.type, resolvedSchema.default);
            continue;
        }
        // coerce value to the correct type if incorrect
        else if (resolvedSchema.type && !(typeof config[key] === resolvedSchema.type)) {
            config[key] = defaultValues(resolvedSchema.type, config[key]);
        }
        // special case for video types, because it currently shows schema errors if it's an empty
        else if (key === 'videoType' && config[key] === '') {
            if (config['src'].startsWith('http')) {
                config[key] = 'external';
            } else {
                config[key] = 'local';
            }
        }

        const value = config[key];

        // if value is an array (e.g., panel), normalize each item
        if ((Array.isArray(value) && resolvedSchema.items) || Array.isArray(config?.children)) {
            const configItems = Array.isArray(value) && value.length > 0 ? value : (config?.children ?? []);

            for (const item of configItems) {
                if (config?.children?.includes(item)) {
                    const childSchema = rootSchema.$defs?.['dynamicChildItem'];
                    if (childSchema) normalizeConfig(item, childSchema, rootSchema, injectRequired);
                }

                const type = item?.type ?? item?.panel?.type;
                const target = item?.panel?.type ? item.panel : item;

                const schemaKey = panelTypeToSchemaKey[type as PanelType];
                const itemSchema = schemaKey ? rootSchema.$defs?.[schemaKey] : resolvedSchema.items;
                if (itemSchema) normalizeConfig(target, itemSchema, rootSchema, injectRequired);
            }
        } else if (typeof value === 'object' && value !== null) {
            normalizeConfig(value, resolvedSchema, rootSchema, injectRequired);
        }
    }
}

function onJsonChange(json: any): void {
    jsonError.value = '';
    const valid = validate(json);
    edited.value = true;
    emit('slide-edit');
    emit('title-edit', json.title);

    // if there are no validation errors update the slide config
    if (valid) {
        // json editor library does not contain 2-way v-model binding so need to set manually
        editorStore.currentSlide = json;
        edited.value = true;
        emit('slide-edit');
        emit('config-edited');
    }
}

function saveChanges(): void {
    edited.value = false;

    // If the user saves or leaves the advanced editor page with errors, give them a warning.
    if (validatorErrors.value.length !== 0) {
        alert(t('editor.slides.advanced.error'));
    }
}

// =========================================
// Component exposes

defineExpose({ saveChanges });
</script>

<style lang="scss" scoped>
:deep(.jsoneditor-vue) {
    height: 100vh;
}

:deep(div.jsoneditor) {
    border-color: #0657db;
}

:deep(.jsoneditor-menu) {
    background-color: #0657db;
}

:deep(div.jsoneditor-contextmenu ul li button) {
    color: #cdddf8;
}

:deep(button.jsoneditor-selected) {
    color: #383838 !important;
    background-color: #ffffff !important;
}
</style>

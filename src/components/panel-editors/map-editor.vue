<template>
    <div class="flex flex-col mt-4">
        <label class="respected-standard-label text-left" for="mapTitle">{{ $t('editor.map.title') }}</label>
        <input class="respected-standard-input" type="text" id="mapTitle" v-model="panel.title" />

        <div>
            <div class="flex items-center gap-2 mt-2">
                <input
                    class="rounded-none cursor-pointer w-4 h-4"
                    type="checkbox"
                    id="timeSliderToggle"
                    @change="saveTimeSlider"
                    v-model="usingTimeSlider"
                />
                <label class="respected-standard-label" for="timeSliderToggle">{{
                    $t('editor.map.timeslider.enable')
                }}</label>
                <!-- Use invisible instead of v-if to reserve space for button (so checkbox doesn't move around) -->
                <button
                    :class="{ 'hidden md:invisible': !usingTimeSlider }"
                    @click="$vfm.open('time-slider-edit-modal')"
                    class="respected-standard-button respected-black-bg-button respected-thin-button block md:inline-block ml-0 text-sm"
                >
                    {{ $t('editor.map.timeslider.edit') }}
                </button>
            </div>

            <div class="flex flex-col w-full text-left mt-5 mb-1">
                <label class="respected-standard-label" for="rampMapCaption">
                    {{ $t('editor.image.label.caption') }}</label
                >
                <input
                    id="rampMapCaption"
                    class="respected-standard-input w-full lg:w-2/5"
                    type="text"
                    v-model="panel.caption"
                    :placeholder="$t('editor.caption.placeholder')"
                />
            </div>

            <div
                class="ramp-editor mt-5"
                ref="editor"
                style="width: 70vw; height: 80vh"
                @input="stateStore.overrideChangeState(true)"
            ></div>
        </div>
        <VueFinalModal
            modalId="time-slider-edit-modal"
            content-class="flex flex-col max-w-xl mx-4 p-4 bg-white border rounded-lg space-y-2"
            class="flex justify-center items-center"
        >
            <h2 slot="header" class="text-xl font-bold">{{ $t('editor.map.timeslider.edit') }}</h2>
            <TimeSliderEditorV
                :config="timeSliderConf"
                :error="timeSliderError"
                @time-slider-changed="onTimeSliderInput"
            ></TimeSliderEditorV>
            <div class="w-full flex justify-end">
                <button
                    class="respected-standard-button respected-black-bg-button"
                    :class="timeSliderError ? '' : 'bg-black text-white hover:bg-gray-800'"
                    :disabled="timeSliderError"
                    @click="saveTimeSlider"
                >
                    {{ $t('editor.done') }}
                </button>
            </div>
        </VueFinalModal>
    </div>
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/stateStore';
import { MapPanel, TimeSliderConfig } from '@/definitions';
import { applyTextAlign } from '@/utils/styleUtils';
import { VueFinalModal } from 'vue-final-modal';
import defaultConfig from '../../../ramp-default.json';
import TimeSliderEditorV from '../support/time-slider-editor.vue';
import { createInstance as createRampEditorInstance } from 'ramp-config-editor_editeur-config-pcar';
import 'ramp-config-editor_editeur-config-pcar/style.css';
import { useProductStore } from '@/stores/productStore';
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

const props = withDefaults(
    defineProps<{
        panel: MapPanel;
        lang: string;
        centerSlide?: boolean;
        dynamicSelected?: boolean;
    }>(),
    {
        centerSlide: false,
        dynamicSelected: false
    }
);

const emit = defineEmits(['slide-edit']);

// =========================================
// Definitions

const { $vfm, $route } = getCurrentInstance()!.proxy!;

const stateStore = useStateStore();
const productStore = useProductStore();

const editor = useTemplateRef('editor');

// config editor
const rampEditorApi = ref('' as any);
const currLang = ref('en');

// For creating new files.
// const newFileName = ref('');

// TimeSlider
const usingTimeSlider = ref(false);
const timeSliderError = ref(false);
const timeSliderConf = ref({ range: [], start: [], attribute: '' } as TimeSliderConfig);
const status = ref('default');
const strippedFileName = ref('');

// =========================================
// Watchers

// =========================================
// Lifecycle functions

onMounted(() => {
    currLang.value = ($route.params.lang as string) || 'en';
    usingTimeSlider.value = !!props.panel.timeSlider;
    status.value = props.panel.config !== '' ? 'default' : 'creating';
    strippedFileName.value = props.panel.config !== '' ? props.panel.config.split('/')[2].split('.')[0] : '';

    timeSliderConf.value = JSON.parse(
        JSON.stringify({
            range: props.panel.timeSlider?.range ?? [1000, new Date().getFullYear()],
            start: props.panel.timeSlider?.start ?? [1000, new Date().getFullYear()],
            attribute: props.panel.timeSlider?.attribute ?? ''
        })
    );
    window.addEventListener('ramp4-config-edited', onConfigEdit);
    validateTimeSlider();

    if (status.value === 'creating') {
        createNewConfig();
    }

    applyTextAlign(props.panel, props.centerSlide, props.dynamicSelected);
    openEditor();
});

onBeforeUnmount(() => {
    emit('slide-edit', 'Kill map editor');
    window.removeEventListener('ramp4-config-edited', onConfigEdit);
});

// =========================================
// Component functions

function createNewConfig(): void {
    // Update the path to the new file.
    const uuid = productStore.configFileStructure.uuid;
    props.panel.config = `${uuid}/ramp-config/${uuid}-map-${getNumberOfMaps() + 1}.json`;
    strippedFileName.value = props.panel.config.split('/')[2].split('.')[0];

    productStore.incrementSourceCount(props.panel.config);

    // Create the new map configuration file in the ZIP folder. Copies the `config-default.json` file from the `ramp-editor` folder and renames it.
    productStore.configFileStructure.rampConfig.file(
        `${strippedFileName.value}.json`,
        JSON.stringify(defaultConfig, null, 4)
    );

    // Display the normal edit page now.
    status.value = 'default';
}

function openEditor(): void {
    if (props.panel.config === '') {
        return;
    }
    // Fetch the map configuration and load it into the editor.
    status.value = 'editing';

    if (props.panel.config) {
        // Check if the config file exists in the ZIP folder first.
        const assetSrc = `${props.panel.config.substring(props.panel.config.indexOf('/') + 1)}`;
        const configFile = productStore.configFileStructure.zip.file(assetSrc);

        if (configFile) {
            configFile.async('string').then((res: string) => {
                const conf = JSON.parse(res);
                rampEditorApi.value = createRampEditorInstance(editor.value, conf);
                rampEditorApi.value.setLanguage(currLang.value);
            });
        } else {
            // If it does not exist in the ZIP folder, try and fetch from server.
            fetch(props.panel.config).then((data) => {
                data.json().then((res) => {
                    let stringResponse = JSON.stringify(res);
                    const conf = JSON.parse(stringResponse);
                    rampEditorApi.value = createRampEditorInstance(editor.value, conf);
                    rampEditorApi.value.setLanguage(currLang.value);
                });
            });
        }
    }
}

function saveTimeSlider(): void {
    if (!timeSliderError.value || !usingTimeSlider.value) {
        props.panel.timeSlider = usingTimeSlider.value ? timeSliderConf.value : undefined;
    }
    emit('slide-edit', 'Map editor time slider');
    $vfm.close('time-slider-edit-modal');
}

function saveChanges(): void {
    // Add map config to ZIP file.
    productStore.configFileStructure.rampConfig.file(
        `${strippedFileName.value}.json`,
        JSON.stringify(rampEditorApi.value.getConfig(), null, 4)
    );
}

function onConfigEdit(): void {
    emit('slide-edit', 'Map editor');
}

function onTimeSliderInput(property: 'range' | 'start' | 'attribute' | 'layers', index: number, value: string): void {
    if (property === 'layers') {
        if (!value || value === '') {
            delete timeSliderConf.value['layers'];
        } else {
            timeSliderConf.value['layers'] = value.split(',').map((layerId) => {
                return layerId.trim();
            });
        }
    } else {
        property === 'attribute'
            ? (timeSliderConf.value[property] = value)
            : (timeSliderConf.value[property][index] = Number(value));
    }
    validateTimeSlider();
}

function validateTimeSlider(): void {
    timeSliderError.value =
        timeSliderConf.value.range.some((val) => val < 0 || !Number.isInteger(val)) ||
        timeSliderConf.value.start.some((val) => val < 0 || !Number.isInteger(val)) ||
        timeSliderConf.value.range[1] < timeSliderConf.value.range[0] ||
        timeSliderConf.value.start[1] < timeSliderConf.value.start[0];
}

function getNumberOfMaps(): number {
    let n = 0;
    productStore.configFileStructure.rampConfig.forEach((_f) => {
        n += 1;
    });
    return n;
}

// =========================================
// Component exposes

defineExpose({ saveChanges });
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
    width: fit-content !important;
}

select {
    border: 1px black solid;
    background: white;
    padding: 0.25rem 0.5rem;
}

.map-item {
    width: 300px;
    background: #eee;

    text-align: center;
    padding: 25px;
    cursor: pointer;

    button {
        padding: 0 !important;
    }
}

.edit-map {
    content: url('../assets/edit-icon.svg');
    margin: 0 auto;
    margin-bottom: 20px;
}

.add-map {
    content: url('../assets/add.svg');
    margin: 0 auto;
    margin-bottom: 20px;
}

input[type='number'] {
    width: 76px;
}

:deep(rv-basemap-item .rv-basemap-thumb img) {
    max-width: none;
}

:deep(.rv-details-attrib-value a) {
    white-space: unset !important;
}

$font-list:
    'Montserrat',
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Helvetica,
    Arial,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji;

:deep(.ramp-app) {
    height: 100%;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: $font-list;
        line-height: 1.5;
    }

    input[type='checkbox'] {
        margin-top: unset;
    }
}
</style>

<template>
    <div class="toc-container">
        <div class="flex items-center border-b p-2" :class="[isMobileSidebar ? 'justify-between' : 'justify-center']">
            <!-- Edit metadata button -->
            <!-- Opens the edit metadata modal -->
            <button
                style="padding: 4px 12px; font-weight: normal"
                class="respected-standard-button toc-popup-button"
                @click.stop="$emit('open-metadata-modal')"
            >
                <span class="align-middle inline-block pr-1"
                    ><svg
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        width="16"
                        height="16"
                        stroke-linejoin="round"
                        stroke-miterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                            fill-rule="nonzero"
                        />
                    </svg>
                </span>
                <span class="align-middle inline-block">{{ $t('editor.editMetadata') }}</span>
            </button>
            <!-- Close ToC sidebar button -->
            <button
                v-if="isMobileSidebar"
                :aria-label="$t(`editor.slides.toc.closeToC`)"
                class="respected-standard-button respected-gray-border-button"
                @click="$emit('close-sidebar')"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="16"
                    height="16"
                    viewBox="0 0 122.88 122.88"
                    style="enable-background: new 0 0 122.88 122.88"
                    xml:space="preserve"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                >
                    <g>
                        <path
                            class="st0"
                            d="M1.63,97.99l36.55-36.55L1.63,24.89c-2.17-2.17-2.17-5.73,0-7.9L16.99,1.63c2.17-2.17,5.73-2.17,7.9,0 l36.55,36.55L97.99,1.63c2.17-2.17,5.73-2.17,7.9,0l15.36,15.36c2.17,2.17,2.17,5.73,0,7.9L84.7,61.44l36.55,36.55 c2.17,2.17,2.17,5.73,0,7.9l-15.36,15.36c-2.17,2.17-5.73,2.17-7.9,0L61.44,84.7l-36.55,36.55c-2.17,2.17-5.73,2.17-7.9,0 L1.63,105.89C-0.54,103.72-0.54,100.16,1.63,97.99L1.63,97.99z"
                        />
                    </g>
                </svg>
            </button>
        </div>

        <!-- Sidebar header -->
        <div class="flex toc-header px-3 pt-2 mt-5 pb-2 border-b align-bottom items-end">
            <!-- Header title ("SLIDES" or equivalent) -->
            <p class="flex items-center justify-center font-bold">{{ $t('editor.slides.slideHeader') }}</p>
            <p class="flex-1"></p>
            <p class="ml-auto"></p>
            <!-- Add new slide button -->
            <!-- New slide will have a blank ENG and FR config, with some exceptions -->
            <button
                class="respected-standard-button toc-popup-button"
                style="padding: 2px 8px !important"
                @click="addNewSlide"
            >
                <span class="inline-block pr-1"
                    ><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                    </svg>
                </span>
                <span class="inline-block text-sm">{{ $t('editor.slides.addSlide') }}</span>
            </button>
            <br />
        </div>

        <!-- No slides message -->
        <div v-if="slides.length === 0" class="text-center px-6 py-6">
            <h4 class="text-lg font-bold">
                {{ $t('editor.slides.toc.noSlides') }}
            </h4>
            <p class="text-sm font-semibold text-gray-500">{{ $t('editor.slides.toc.selectNewSlideMessage') }}</p>
        </div>

        <!-- Slide list -->
        <ul class="toc-slide-list">
            <!-- Slide -->
            <!-- Dragging is turned off on mobile version as you can't scroll otherwise (component would think a scroll === a drag) -->
            <draggable
                :disabled="isMobileSidebar"
                :list="slides"
                @update="$emit('slides-updated', slides)"
                :item-key="getSlideId"
                v-tippy="{
                    trigger: 'focus',
                    delay: '200',
                    placement: 'top',
                    content: $t('editor.slides.toc.selectSlide')
                }"
                v-focus-list
            >
                <template #item="{ element, index }">
                    <li
                        class="toc-slide select-none border-t flex px-3 py-2 hover:bg-gray-50"
                        :style="{ 'margin-inline': !isMobileSidebar ? '2px' : '0px' }"
                        :class="slideIndex === index ? 'bg-gray-100 border-gray-300' : ''"
                        :id="(isMobileSidebar ? 'mobile' : '') + 'slide' + index"
                        :key="'slide' + index"
                        v-focus-item
                    >
                        <div class="flex space-between w-full align-center text-base">
                            <div class="flex flex-col flex-1">
                                <section class="flex space-between mb-1">
                                    <!-- Slide number -->
                                    <p
                                        class="font-semibold select-none overflow-ellipsis whitespace-nowrap self-center overflow-hidden flex-1"
                                    >
                                        {{ $t('editor.slides.slide') }} {{ index + 1 }}
                                    </p>
                                    <!-- Whole-slide options -->
                                    <div class="flex align-center mr-4 space-x-1">
                                        <!-- Copy slide button -->
                                        <button
                                            :aria-label="$t('editor.slides.toc.copySlide')"
                                            class="slide-toc-button"
                                            :class="{ 'toc-popup-button': isMobileSidebar }"
                                            @click.stop="copySlide(index)"
                                            v-tippy="{
                                                delay: '200',
                                                placement: 'top-start',
                                                content: $t('editor.slides.toc.copySlide'),
                                                touch: ['hold', 500]
                                            }"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="17"
                                                width="17"
                                                viewBox="0 0 24 24"
                                                :class="[isMobileSidebar ? 'mx-2 my-1' : 'mx-1']"
                                            >
                                                <path
                                                    d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                                                />
                                            </svg>
                                        </button>
                                        <!-- Delete slide button -->
                                        <button
                                            :aria-label="$t('editor.slides.toc.deleteSlide')"
                                            class="slide-toc-button"
                                            :class="{ 'toc-popup-button': isMobileSidebar }"
                                            @click.stop="$vfm.open(`delete-slide-${index}`)"
                                            v-tippy="{
                                                delay: '200',
                                                placement: 'top-start',
                                                content: $t('editor.slides.toc.deleteSlide'),
                                                touch: ['hold', 500]
                                            }"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 110.61 122.88"
                                                width="15"
                                                height="15"
                                                :class="[isMobileSidebar ? 'mx-2 my-1' : 'mx-1']"
                                            >
                                                <path
                                                    d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </section>
                                <!-- ENG and FR configs for slide -->
                                <section class="flex flex-col gap-0.5 text-sm w-64">
                                    <!-- ENG config for slide -->
                                    <slide-toc-button
                                        :element="element"
                                        selectedLang="en"
                                        :currentSlide="currentSlide"
                                        :isMobileSidebar="isMobileSidebar"
                                        :isActiveSlide="slideIndex === index"
                                        @selectSlide="selectSlide(index, 'en')"
                                        @closeSidebar="closeSidebar()"
                                        @copyConfig="copyConfigFromOtherLang(index, 'en')"
                                        @copy="
                                            {
                                                configEmpty(index, 'en')
                                                    ? copyConfigFromOtherLang(index, 'en')
                                                    : $vfm.open(`copy-other-slide-${index}-en-config`);
                                            }
                                        "
                                        @clear="$vfm.open(`delete-slide-${index}-en-config`)"
                                        @createConfig="createNewConfig(index, 'en')"
                                    />
                                    <!-- Delete ENG confirmation modal -->
                                    <action-modal
                                        :name="`delete-slide-${index}-en-config`"
                                        :title="
                                            $t('editor.slides.deleteConfig.title', {
                                                lang: $t('editor.lang.en').substring(0, 2).toUpperCase(),
                                                num: index + 1
                                            })
                                        "
                                        :message="
                                            $t('editor.slides.deleteConfig.confirm', {
                                                title: element['en']?.title || ''
                                            })
                                        "
                                        @ok="createNewConfig(index, 'en')"
                                    />
                                    <!-- ENG copy other slide confirmation modal -->
                                    <action-modal
                                        :name="`copy-other-slide-${index}-en-config`"
                                        :title="$t('editor.slides.toc.copySlide.warning.title')"
                                        :message="
                                            $t('editor.slides.toc.copySlide.warning.message', {
                                                num: index + 1,
                                                oldLang: $t('editor.lang.en'),
                                                newLang: $t('editor.lang.fr'),
                                                oldTitle: element['en']?.title || '',
                                                newTitle: element['fr']?.title || ''
                                            })
                                        "
                                        @ok="copyConfigFromOtherLang(index, 'en')"
                                    />
                                    <hr v-if="isMobileSidebar" />
                                    <!-- FR config for slide -->
                                    <slide-toc-button
                                        :element="element"
                                        selectedLang="fr"
                                        :currentSlide="currentSlide"
                                        :isMobileSidebar="isMobileSidebar"
                                        :isActiveSlide="slideIndex === index"
                                        @selectSlide="selectSlide(index, 'fr')"
                                        @closeSidebar="closeSidebar()"
                                        @copyConfig="copyConfigFromOtherLang(index, 'fr')"
                                        @copy="
                                            {
                                                configEmpty(index, 'fr')
                                                    ? copyConfigFromOtherLang(index, 'fr')
                                                    : $vfm.open(`copy-other-slide-${index}-fr-config`);
                                            }
                                        "
                                        @clear="$vfm.open(`delete-slide-${index}-fr-config`)"
                                        @createConfig="createNewConfig(index, 'fr')"
                                    />
                                    <!-- Delete FR confirmation modal -->
                                    <action-modal
                                        :name="`delete-slide-${index}-fr-config`"
                                        :title="
                                            $t('editor.slides.deleteConfig.title', {
                                                lang: $t('editor.lang.fr').substring(0, 2).toUpperCase(),
                                                num: index + 1
                                            })
                                        "
                                        :message="
                                            $t('editor.slides.deleteConfig.confirm', {
                                                title: element['fr']?.title || ''
                                            })
                                        "
                                        @ok="createNewConfig(index, 'fr')"
                                    />
                                    <!-- FR copy other slide confirmation modal -->
                                    <action-modal
                                        :name="`copy-other-slide-${index}-fr-config`"
                                        :title="$t('editor.slides.toc.copySlide.warning.title')"
                                        :message="
                                            $t('editor.slides.toc.copySlide.warning.message', {
                                                num: index + 1,
                                                oldLang: $t('editor.lang.fr'),
                                                newLang: $t('editor.lang.en'),
                                                oldTitle: element['fr']?.title || '',
                                                newTitle: element['en']?.title || ''
                                            })
                                        "
                                        @ok="copyConfigFromOtherLang(index, 'fr')"
                                    />
                                </section>
                            </div>

                            <!-- Move slide buttons -->
                            <div class="flex ml-0.5 flex-col space-between">
                                <!-- Move slide up button -->
                                <button
                                    :aria-label="$t('editor.slides.toc.moveSlideUp')"
                                    class="slide-toc-button h-auto grow-0"
                                    :class="{
                                        'toc-popup-button border-none bg-transparent': isMobileSidebar,
                                        'text-gray-400 cursor-not-allowed': index === 0
                                    }"
                                    @click.stop="moveUp(index)"
                                    :disabled="index == 0"
                                    v-tippy="{
                                        delay: '200',
                                        placement: 'right',
                                        content: $t('editor.slides.toc.moveSlideUp'),
                                        touch: ['hold', 500]
                                    }"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 66.91"
                                        style="enable-background: new 0 0 122.88 66.91"
                                        xml:space="preserve"
                                        height="14"
                                        width="14"
                                        class="fill-current"
                                        :class="[isMobileSidebar ? 'm-2' : 'm-1']"
                                    >
                                        <g>
                                            <path
                                                d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                <!-- Move slide down button -->
                                <button
                                    :aria-label="$t('editor.slides.toc.moveSlideDown')"
                                    class="slide-toc-button rotate-180 transform h-auto grow-0 mt-auto"
                                    :class="{
                                        'toc-popup-button border-none bg-transparent': isMobileSidebar,
                                        'text-gray-400 cursor-not-allowed': index == slides.length - 1
                                    }"
                                    @click.stop="moveDown(index)"
                                    :disabled="index == slides.length - 1"
                                    v-tippy="{
                                        delay: '200',
                                        placement: 'right',
                                        content: $t('editor.slides.toc.moveSlideDown'),
                                        touch: ['hold', 500]
                                    }"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 66.91"
                                        style="enable-background: new 0 0 122.88 66.91"
                                        xml:space="preserve"
                                        height="14"
                                        width="14"
                                        class="fill-current"
                                        :class="[isMobileSidebar ? 'm-2' : 'm-1']"
                                    >
                                        <g>
                                            <path
                                                d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <!-- Delete slide confirmation modal -->
                        <action-modal
                            :name="`delete-slide-${index}`"
                            :title="$t('editor.slides.deleteSlide.title', { num: index + 1 })"
                            :message="
                                $t('editor.slides.deleteSlide.confirm', {
                                    title:
                                        element['en']?.title !== undefined || element['fr']?.title !== undefined
                                            ? ': &quot;' +
                                              (element['en']?.title || $t('editor.slide.toc.untitledENG')) +
                                              '&quot;, &quot;' +
                                              (element['fr']?.title || $t('editor.slide.toc.untitledFR')) +
                                              '&quot;'
                                            : ''
                                })
                            "
                            @ok="removeSlide(index)"
                        />
                    </li>
                </template>
            </draggable>
        </ul>
    </div>
</template>

<script lang="ts">
import ActionModal from '@/components/support/action-modal.vue';
import SlideTocButton from '@/components/slide-toc/slide-toc-button.vue';
import { BasePanel, ChartPanel, ImagePanel, MultiLanguageSlide, Slide, TextPanel, VideoPanel } from '@/definitions';
import cloneDeep from 'clone-deep';
import { VueFinalModal } from 'vue-final-modal';

import Message from 'vue-m-message';
import { Options, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import ConfirmationModalV from '../support/confirmation-modal.vue';

import SlideEditorV from '../slide-editor.vue';
import { useProductStore } from '@/stores/productStore';

@Options({
    components: {
        ActionModal,
        'slide-editor': SlideEditorV,
        'confirmation-modal': ConfirmationModalV,
        'vue-final-modal': VueFinalModal,
        draggable,
        SlideTocButton
    }
})
export default class SlideTocV extends Vue {
    @Prop() slides!: MultiLanguageSlide[];
    @Prop() currentSlide!: Slide | string;
    @Prop() slideIndex!: number;
    @Prop() lang!: string;
    @Prop() closeSidebar!: () => void;
    @Prop({ default: false }) isMobileSidebar!: boolean;

    productStore = useProductStore();

    defaultBlankSlide: Slide = {
        title: '',
        panel: [
            {
                type: 'text',
                title: '',
                content: ''
            } as TextPanel,
            {
                type: 'text',
                title: '',
                content: ''
            } as TextPanel
        ],
        includeInToc: true
    };

    /**
     * Determines if a particular config is empty.
     * @param slide Slide object to check.
     * @param lang Specific config in slide to check ('en' or 'fr')
     */
    configEmpty(index: number, lang: keyof MultiLanguageSlide): boolean {
        const slide: MultiLanguageSlide = this.slides[index];
        return JSON.stringify(slide[lang]) === JSON.stringify(this.defaultBlankSlide);
    }

    /**
     * Selects a config (english or french) of a particular slide, and opens its editor.
     * @param index Index of slide to select (usually slide number [in UI] - 1)
     * @param lang Specific config in slide to select ('en' or 'fr')
     */
    selectSlide(index: number, lang: string): void {
        this.$emit('slide-change', index, lang);
    }

    /**
     * Adds a new slide at the end of the current list.
     */
    addNewSlide(): void {
        this.slides.push({
            en: JSON.parse(JSON.stringify(this.defaultBlankSlide)),
            fr: JSON.parse(JSON.stringify(this.defaultBlankSlide))
        });
        this.selectSlide(this.slides.length - 1, this.lang);
        this.$emit('slides-updated', this.slides);
        this.$emit('scroll-to-element', this.slides.length - 1);
    }

    /**
     * Deletes one of the language configs for a single slide. That config will be undefined after, and the slide will say "(No English/French Config)" or similar.
     * @param slides A slide, containing an English and French config.
     * @param currLang The config to delete, either 'en' for English of 'fr' for French.
     */
    deleteConfig(slides: MultiLanguageSlide, currLang: 'en' | 'fr'): void {
        slides[currLang]?.panel.forEach((panel: BasePanel) => this.productStore.removeSourceCounts(panel));
        slides[currLang] = undefined;
        this.$emit('slides-updated', this.slides);
    }

    // Assumes that you've already checked that the other lang DOES have a config.
    copyConfigFromOtherLang(index: number, currLang: keyof MultiLanguageSlide): void {
        const oppositeLang = currLang === 'en' ? 'fr' : 'en';
        // Called on each image/video panel in the opposite lang's config (at the provided index)
        // The asset within this panel (assuming one exists) must be moved to the shared folder (if its not already
        // there). However, we must check beforehand whether an asset with the same name and contents already exists
        // in the shared folder (in which case we do nothing), and if an asset with the same name and different
        // contents already exists in the shared folder (in which case we give the asset uploaded to the shared
        // asset folder a unique name)
        const oppositeToSharedFolder = async (panel: ImagePanel | VideoPanel, oppositeLang: string): Promise<void> => {
            // Copying to the shared folder isn't currently supported for maps or charts.
            // TODO: remove this once it is supported
            if ((panel as BasePanel).type === 'chart' || (panel as BasePanel).type === 'map') {
                console.warn('Shared asset functionality is not currently supported for maps or charts.');
                return;
            }

            if (panel.src) {
                const assetSrc = panel.src.split('/');
                const fileName = assetSrc.at(-1);
                const assetType = fileName?.split('.').at(-1);
                let inSharedAssets = assetSrc[2] === 'shared';
                let sharedFileSource = `${this.productStore.configFileStructure.uuid}/assets/shared/${fileName}`;

                // If the asset for this panel refers to the opposite lang's asset folder, we will assume that there
                // is no asset in the shared asset folder with the same name and contents as this asset. Otherwise
                // it would have already been moved there upon being uploaded
                if (!inSharedAssets) {
                    const oppositeFileSource = panel.src;
                    const oppositeRelativePath = assetSrc.slice(3).join('/');
                    let sharedAssetName = fileName;
                    let compressedFile =
                        this.productStore.configFileStructure.assets[oppositeLang].file(oppositeRelativePath);
                    let i = 2;

                    // If an asset with the same name, but different content, is already in the shared folder, we must
                    // give the asset we are uploading a unique name. Otherwise the existing asset will be overwritten
                    while (this.productStore.configFileStructure.assets['shared'].file(sharedAssetName as string)) {
                        sharedAssetName = `${compressedFile?.name.split('.').at(0)}(${i}).${compressedFile?.name
                            .split('.')
                            .at(-1)}`;
                        i++;
                    }
                    sharedFileSource = `${this.productStore.configFileStructure.uuid}/assets/shared/${sharedAssetName}`;
                    await compressedFile?.async(assetType !== 'svg' ? 'blob' : 'text').then((assetFile) => {
                        if (assetType === 'svg') {
                            assetFile = new File([assetFile], fileName as string, {
                                type: 'image/svg+xml'
                            });
                        }
                        this.productStore.configFileStructure.assets[oppositeLang].remove(oppositeRelativePath);
                        this.productStore.configFileStructure.assets['shared'].file(
                            sharedAssetName as string,
                            assetFile
                        );
                        this.productStore.sourceCounts[sharedFileSource] =
                            this.productStore.sourceCounts[oppositeFileSource] ?? 0;
                        this.productStore.sourceCounts[oppositeFileSource] = 0;
                        this.productStore.updateToSharedAsset(oppositeFileSource, sharedFileSource, oppositeLang);
                    });
                }
                this.productStore.sourceCounts[sharedFileSource] += 1;
            } else {
                this.productStore.sourceCounts[panel.src] += 1;
            }
        };

        this.slides[index][oppositeLang]?.panel.forEach((panel) => {
            this.productStore.panelHelper(panel, oppositeToSharedFolder, oppositeLang);
        });

        // TODO: find better alternative to setTimeout. This code MUST execute after the callback above executes on each
        // panel in the opposite lang's slide. Otherwise it will copy the contents of the opposite config before its
        // src values are updated
        setTimeout(() => {
            (this.slides[index][currLang] as Slide).panel.forEach((panel) =>
                this.productStore.removeSourceCounts(panel)
            );
            this.slides[index][currLang] = JSON.parse(JSON.stringify(this.slides[index][oppositeLang]));
            this.$emit('slides-updated', this.slides);
            this.$emit('slide-change', index, currLang);
        }, 300);
    }

    /**
     * Creates a new blank config for a single language on a particular slide.
     * @param index The index of the slide to be changed into a blank slide.
     * @param currLang The language to create a blank config for.
     */
    createNewConfig(index: number, currLang: 'en' | 'fr'): void {
        // Before wiping the slides, remove source counts as necessary.
        this.slides[index][currLang]!.panel.forEach((panel: BasePanel) => {
            // Remove source counts for each panel in the current config
            this.productStore.removeSourceCounts(panel);
        });

        this.slides[index][currLang] = JSON.parse(JSON.stringify(this.defaultBlankSlide));

        this.$emit('slides-updated', this.slides);
        this.$emit('slide-change', index, currLang);
    }

    /**
     * Copies an entire slide, creating a new identical slide at the next index.
     * @param index Index of the slide to copy.
     */
    copySlide(index: number): void {
        // First switch to the slide for which the copy button was pressed. In the case where a new slide is created
        // and copied right away, this will save changes for it
        this.selectSlide(index, this.lang);

        // increment source count of each asset in this slide
        const incrementSourceCounts = (panel: ImagePanel | VideoPanel | ChartPanel) => {
            const source = !!panel.src
                ? panel.src
                : !!(panel as ChartPanel).config
                  ? (panel as ChartPanel).config
                  : undefined;
            if (source) {
                this.productStore.sourceCounts[source] += 1;
            }
        };
        this.slides[index]?.en?.panel.forEach((panel) => this.productStore.panelHelper(panel, incrementSourceCounts));
        this.slides[index]?.fr?.panel.forEach((panel) => this.productStore.panelHelper(panel, incrementSourceCounts));

        // Copy must be created after changes have been saved for the copied slide (via the above call to selectSlide())
        this.slides.splice(index + 1, 0, cloneDeep(this.slides[index]));
        this.$emit('slides-updated', this.slides);
        this.selectSlide(index + 1, this.lang);
        Message.success(this.$t('editor.slide.copy.success'));
        this.$emit('scroll-to-element', index + 1);
    }

    removeSlide(index: number): void {
        if (index === this.slideIndex) {
            this.selectSlide(-1, this.lang);
            // this.$emit('slide-change', -1);
        }

        // Before removing the slide, updated the sources for the panels.
        this.removeSourceCounts(index);

        this.slides.splice(index, 1);
        this.selectSlide(this.slides.length - 1, this.lang);
        this.$emit('slides-updated', this.slides);
    }

    removeSourceCounts(deletedIndex: number): void {
        let panelEn = this.slides.find((slide: MultiLanguageSlide, idx: number) => idx === deletedIndex)?.en?.panel;
        let panelFr = this.slides.find((slide: MultiLanguageSlide, idx: number) => idx === deletedIndex)?.fr?.panel;

        panelEn?.forEach((p: BasePanel) => this.productStore.removeSourceCounts(p));
        panelFr?.forEach((p: BasePanel) => this.productStore.removeSourceCounts(p));
    }

    moveUp(index: number): void {
        this.moveDown(index - 1);
        this.$emit('scroll-to-element', index - 1);
    }

    moveDown(index: number): void {
        this.slides.splice(index + 1, 0, this.slides.splice(index, 1)[0]);
        this.$emit('scroll-to-element', index + 1);
        this.$emit('slides-updated', this.slides);
    }

    getSlideId(slide: MultiLanguageSlide): string {
        return 'slide' + this.slides.indexOf(slide);
    }

    resizeMobile(): void {
        let overlayElement = document.getElementById('overlay');
        let sidebarElement = document.getElementById('sidebar-mobile');

        if (overlayElement?.style.display != 'none' && window.innerWidth >= 768) {
            overlayElement!.style.display = 'none';
        } else if (sidebarElement?.style.width === '20rem' && window.innerWidth < 768) {
            overlayElement!.style.display = 'block';
        }
    }
    mounted() {
        window.addEventListener('resize', this.resizeMobile);
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeMobile);
    }
}

// More accurate page height for mobile
// Counts the URL bar for mobile browsers (e.g. iOS Safari) so the content doesn't vertically overshoot
// and get covered by the URL bar when it's opened

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
</script>

<style lang="scss" scoped>
.toc-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.toc-header {
    grid-area: header;
}

.toc-slide-list {
    grid-area: slide-list;
    flex: 1 1 0%;
    overflow: auto;
}

.toc-slide {
    cursor: grab;
}

.toc-slide-button {
    border: none !important;
    background: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

.toc-slide-button:hover {
    background: none !important;
}

.copy-select {
    width: 450px;
}

.focused {
    outline: 2px solid black;
}

.slide-toc-button {
    border-radius: 3px;
    padding: 2px;
}

.slide-toc-button:hover {
    background-color: rgb(209, 213, 219);
}

.selected-toc-config-item {
    background-color: rgb(225, 225, 225);
}

.slide-toc-button {
    border-radius: 3px;
    padding: 2px;
}

.slide-toc-button:hover {
    background-color: rgb(209, 213, 219);
}
</style>

<template>
    <div @click.stop @mouseover.stop class="slide-toc-button cursor-auto">
        <dropdown-menu
            class="flex-shrink-0"
            position="bottom-start"
            :tooltip="$t('editor.slides.toc.dropdownTooltip')"
            tooltipPlacement="top-start"
            tooltipPlacementAlt="left"
            ref="dropdown"
        >
            <template #header>
                <div class="slide-toc-button flex justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="14"
                        height="14"
                        viewBox="0 0 122.88 29.956"
                        enable-background="new 0 0 122.88 29.956"
                        xml:space="preserve"
                        class="mb-0 leading-none"
                    >
                        <g>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M122.88,14.978c0,8.271-6.708,14.979-14.979,14.979s-14.976-6.708-14.976-14.979 C92.926,6.708,99.631,0,107.901,0S122.88,6.708,122.88,14.978L122.88,14.978z M29.954,14.978c0,8.271-6.708,14.979-14.979,14.979 S0,23.248,0,14.978C0,6.708,6.705,0,14.976,0S29.954,6.708,29.954,14.978L29.954,14.978z M76.417,14.978 c0,8.271-6.708,14.979-14.979,14.979c-8.27,0-14.978-6.708-14.978-14.979C46.46,6.708,53.168,0,61.438,0 C69.709,0,76.417,6.708,76.417,14.978L76.417,14.978z"
                            />
                        </g>
                    </svg>
                </div>
            </template>
            <a
                href="javascript:;"
                class="flex items-center space-x-2 leading-snug text-left w-auto"
                :class="{
                    'disabled click-events-none cursor-not-allowed opacity-60': !copyAllowed
                }"
                @click="copyAllowed && copySlide()"
                role="button"
                aria-label="copy-contents"
            >
                <span class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="17"
                        width="17"
                        viewBox="0 0 24 24"
                        class="flex-shrink-0"
                        :class="[isMobileSidebar ? 'mx-2 my-1' : 'mx-1']"
                    >
                        <path
                            d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                        />
                    </svg>
                    <span>{{ $t('editor.slides.toc.dropdown.copy') }}</span>
                </span>
            </a>
            <a
                href="javascript:;"
                class="flex leading-snug items-center text-left w-auto"
                :class="{
                    'disabled click-events-none cursor-not-allowed opacity-60': !deleteAllowed
                }"
                @click="deleteAllowed && clearSlide()"
                role="button"
                aria-label="DELETE"
            >
                <span class="flex items-center gap-1.5">
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
                    <span>{{ $t('editor.slides.toc.dropdown.clear') }}</span>
                </span>
            </a>
        </dropdown-menu>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import DropdownMenu from '@/components/helpers/dropdown-menu.vue';

@Options({
    components: {
        'dropdown-menu': DropdownMenu
    }
})
export default class TocOptionsV extends Vue {
    @Prop({ default: true }) copyAllowed!: boolean;
    @Prop({ default: true }) deleteAllowed!: boolean;

    copySlide() {
        this.$emit('copy');
    }

    clearSlide() {
        this.$emit('clear');
    }
}
</script>

<style lang="css" scoped>
.slide-toc-button {
    border-radius: 3px;
    padding: 2px;
    line-height: 1;
}
.slide-toc-button:hover {
    background-color: rgb(209, 213, 219);
}
span {
    font-weight: 500;
}
</style>

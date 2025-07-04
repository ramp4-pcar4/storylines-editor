<template>
    <div class="block my-3">
        <!-- Metadata Editor -->

        <!-- Slideshow caption -->
        <div class="mt-5 mb-8">
            <label class="respected-standard-label" for="slideshowCaption">{{
                $t('editor.image.slideshowCaption')
            }}</label>
            <input
                id="slideshowCaption"
                class="respected-standard-input block w-full lg:w-1/2"
                type="text"
                :placeholder="$t('editor.slideshow.addSlideTitle')"
                v-model="panel.caption"
            />
        </div>

        <!-- Slideshow items heading -->
        <div class="flex items-center">
            <span class="font-bold pr-4">{{
                $t('editor.slideshow.label.info', {
                    num: panel.items.length
                })
            }}</span>
        </div>
        <hr class="border-solid border-t-2 border-gray-300 my-2" />
        <div class="w-full lg:w-4/5 max-h-96 overflow-y-auto mt-5 border border-gray-400 rounded-md">
            <table class="w-full border-separate">
                <thead class="bg-white sticky top-0 z-10">
                    <tr style="top: 2px" class="table-header sticky z-20">
                        <th
                            style="width: 10%; text-align: left !important"
                            class="rounded-tl"
                            :aria-label="$t('editor.slideshow.label.slideNumber')"
                        ></th>
                        <th
                            style="width: 40%; text-align: left !important"
                            :aria-label="$t('editor.slideshow.label.slideNumber')"
                        >
                            {{ $t('editor.slideshow.label.slideNumber') }}
                        </th>
                        <th style="width: 20%">{{ $t('editor.slideshow.label.type') }}</th>
                        <th style="width: 30%" class="rounded-tr">{{ $t('dynamic.panel.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-if="panel.items.length > 0"
                        class="table-contents"
                        style="cursor: default !important"
                        v-for="(item, idx) in panel.items"
                        :key="idx"
                        :class="{
                            'bg-gray-100': idx % 2 !== 0,
                            'bg-blue-200 hover-editing':
                                editingStatus !== 'none' && editingStatus !== 'create' && editingIdx === idx
                        }"
                    >
                        <td
                            class="px-0.5 flex flex-col lg:flex-row gap-0.5 justify-center items-center"
                            :class="{ 'rounded-bl': idx === panel.items.length - 1 }"
                        >
                            <button
                                :disabled="idx === 0 || editingStatus === 'edit'"
                                @click="moveSlideUp(idx)"
                                style="border: none !important; padding-left: 0.375rem; padding-right: 0.375rem"
                                class="respected-standard-button respected-transparent-button"
                                v-tippy="{
                                    delay: '200',
                                    placement: 'top',
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
                                >
                                    <g>
                                        <path
                                            d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                        />
                                    </g>
                                </svg>
                            </button>
                            <button
                                :disabled="idx === panel.items.length - 1 || editingStatus === 'edit'"
                                @click="moveSlideDown(idx)"
                                style="border: none !important; padding-left: 0.375rem; padding-right: 0.375rem"
                                class="respected-standard-button respected-transparent-button rotate-180 transform"
                                v-tippy="{
                                    delay: '200',
                                    placement: 'top',
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
                                >
                                    <g>
                                        <path
                                            d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                        />
                                    </g>
                                </svg>
                            </button>
                        </td>
                        <td style="text-align: left !important" class="truncate">
                            {{ idx + 1 }}. {{ item.title || $t('editor.slideshow.noTitle') }}
                        </td>
                        <td>{{ $t(`editor.slide.panel.type.${item.type}`) }}</td>
                        <td :class="{ 'rounded-br': idx === panel.items.length - 1 }">
                            <span
                                @click="editItem(idx)"
                                @keydown.enter="editItem(idx)"
                                class="slideshow-text-button underline cursor-pointer rounded-sm"
                                tabindex="0"
                                >{{ $t('editor.chart.label.edit') }}</span
                            >
                            |
                            <a
                                @click="deleteItem(idx)"
                                @keydown.enter="deleteItem(idx)"
                                class="slideshow-text-button underline cursor-pointer rounded-sm text-red-700"
                                tabindex="0"
                                >{{ $t('editor.remove') }}</a
                            >
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="self-center text-center italic" colspan="4">
                            {{ $t('editor.slideshow.noSlides') }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- add item button -->
        <button
            class="respected-standard-button w-full lg:w-4/5 max-h-96 bg-gray-100 border border-gray-400 hover:bg-gray-200"
            style="margin-top: 1.25rem; justify-content: start !important"
            @click="this.changeEditStatus()"
        >
            <svg
                height="18px"
                width="18px"
                viewBox="0 0 23 21"
                xmlns="http://www.w3.org/2000/svg"
                v-if="editingStatus !== 'create'"
            >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <svg
                class="fill-current"
                height="18px"
                width="18px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
                v-else
            >
                <path
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
            </svg>
            <span class="px-2">
                {{ editingStatus === 'create' ? $t('editor.cancel') : $t('editor.slideshow.label.create') }}
            </span>
        </button>

        <br /><br />
        <div
            id="create-and-edit-area"
            v-if="editingStatus !== 'none'"
            class="border rounded-md p-4"
            :class="[editingStatus !== 'create' ? 'border-blue-300' : 'border-gray-300']"
        >
            <div class="flex w-full justify-between items-center">
                <h2 class="text-xl font-semibold">
                    {{
                        $t(`editor.slideshow.label.${editingStatus}`) +
                        (editingStatus === 'edit' ? ` (#${editingIdx + 1})` : '')
                    }}
                </h2>
                <!-- Save new slide -->
                <button
                    v-if="editingStatus === 'create'"
                    id="add-new-item"
                    class="respected-standard-button respected-black-bg-button respected-thin-button"
                    @click="saveItem(true)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 122.73 122.88"
                        style="enable-background: new 0 0 122.73 122.88"
                        xml:space="preserve"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        height="16px"
                        width="16px"
                    >
                        <g>
                            <path
                                class="st0 fill-current"
                                d="M109.5,113.68L109.5,113.68l-6.09,0c-0.4,0-0.73-0.32-0.73-0.72V69.48l0-0.1c0-0.9-0.17-1.65-0.49-2.22 c-0.06-0.11-0.14-0.22-0.2-0.31c-0.06-0.09-0.16-0.18-0.23-0.27l-0.02-0.02c-0.3-0.3-0.68-0.53-1.12-0.69l-0.25-0.07l-0.04-0.01 l-0.01,0c-0.41-0.11-0.88-0.17-1.38-0.17h-0.05l-0.08,0H36.75c-0.89,0-1.62,0.17-2.18,0.49l-0.02,0.01l-0.27,0.17l-0.04,0.04 c-0.09,0.07-0.18,0.15-0.27,0.23l-0.02,0.02l-0.01,0.01c-0.62,0.63-0.92,1.57-0.92,2.82l0,0.04l0,43.54h0 c0,0.4-0.33,0.72-0.73,0.72l-9.85,0c0,0,0,0,0,0c-0.19,0-0.38-0.08-0.51-0.21L9.87,101.41c-0.18-0.14-0.29-0.36-0.29-0.59l0-87.91 l0-0.08c0-0.83,0.15-1.52,0.44-2.07l0,0c0.05-0.11,0.11-0.2,0.17-0.29l0.02-0.03c0.07-0.11,0.19-0.18,0.25-0.29l0.01-0.02 l0.02-0.02l0,0c0.25-0.25,0.57-0.45,0.92-0.59l0.04-0.02l0.02-0.01l0.02-0.01l0.18-0.06v0l0.01-0.01c0.42-0.14,0.9-0.2,1.44-0.21 l0.09-0.01l26.21,0c0.4,0,0.73,0.32,0.73,0.72v28.75c0,0.52,0.05,1.03,0.13,1.5c0.09,0.46,0.15,0.98,0.39,1.34l0.01,0.02l0,0.01v0 c0.18,0.44,0.42,0.87,0.67,1.25c0.24,0.37,0.56,0.77,0.9,1.13l0.02,0.02l0,0.01l0.01,0c0.48,0.5,0.94,1.15,1.62,1.27l0.01,0l0.01,0 l0.01,0.01l0.32,0.17l0,0l0.4,0.18v0l0.01,0l0,0l0,0v0c0.33,0.14,0.67,0.26,1,0.34l0.01,0l0.03,0l0.01,0l0.03,0l0.26,0.05v0 c0.45,0.09,0.93,0.14,1.42,0.14l0.02,0h47.8c1.03,0,1.98-0.18,2.85-0.53l0.01-0.01c0.87-0.36,1.67-0.9,2.39-1.61l0.03-0.03 c0.36-0.36,0.69-0.75,0.96-1.16c0.26-0.38,0.58-0.76,0.66-1.22l0-0.01l0.01-0.01l0.01-0.02c0.18-0.43,0.34-0.88,0.41-1.34l0-0.03 c0.09-0.47,0.13-0.97,0.13-1.49V9.92c0-0.4,0.33-0.73,0.73-0.73h6c0.58,0,1.09,0.07,1.54,0.21c0.48,0.15,0.89,0.39,1.2,0.7 c0.68,0.67,0.88,1.67,0.9,2.59l0.01,0.09v0.05l0,0.02v97.19c0,0.56-0.07,1.07-0.21,1.51l-0.01,0.03v0l0,0.02l-0.08,0.22l0,0 l-0.02,0.06l-0.09,0.2l-0.01,0.04l-0.02,0.04l0,0l-0.03,0.06l-0.15,0.22l0,0l-0.05,0.08l-0.14,0.17l-0.06,0.07 c-0.15,0.16-0.33,0.3-0.53,0.42c-0.17,0.1-0.36,0.19-0.55,0.26l-0.06,0.02c-0.16,0.05-0.34,0.1-0.53,0.14l-0.02,0l-0.01,0l-0.02,0 l-0.09,0.01l-0.02,0l0,0l-0.02,0c-0.22,0.03-0.49,0.05-0.76,0.06H109.5L109.5,113.68z M53.93,104.43c-1.66,0-3-1.34-3-3 c0-1.66,1.34-3,3-3h31.12c1.66,0,3,1.34,3,3c0,1.66-1.34,3-3,3H53.93L53.93,104.43z M53.93,89.03c-1.66,0-3-1.34-3-3s1.34-3,3-3 h31.12c1.66,0,3,1.34,3,3s-1.34,3-3,3H53.93L53.93,89.03z M94.03,9.39l-45.32-0.2v25.86H48.7c0,0.46,0.06,0.86,0.17,1.2 c0.03,0.06,0.04,0.1,0.07,0.15c0.09,0.23,0.22,0.44,0.4,0.61l0.03,0.03v0c0.06,0.06,0.11,0.1,0.17,0.15 c0.06,0.05,0.13,0.09,0.2,0.14c0.39,0.23,0.92,0.34,1.58,0.34v0l40.1,0.25v0l0,0v0c0.91,0,1.57-0.21,1.98-0.63 c0.42-0.43,0.63-1.1,0.63-2.02h0V9.39L94.03,9.39z M41.91,73.23h53.07v0c0.35,0,0.65,0.29,0.65,0.64l0,39.17 c0,0.35-0.29,0.65-0.65,0.65H41.91v0c-0.35,0-0.65-0.29-0.65-0.64l0-39.17C41.26,73.52,41.56,73.23,41.91,73.23L41.91,73.23 L41.91,73.23z M9.68,0h104.26c4.91,0,8.79,3.86,8.79,8.79V114c0,4.95-3.9,8.88-8.79,8.88l-96.61,0l-0.24-0.25L1.05,106.6L0,105.9 V8.76C0,3.28,4.81,0,9.68,0L9.68,0L9.68,0z"
                            />
                        </g>
                    </svg>
                    <div>{{ $t('editor.slideshow.label.add') }}</div>
                </button>
                <!-- Save changes to existing slide -->
                <button
                    v-else
                    id="edit-existing-item"
                    class="respected-standard-button respected-black-bg-button respected-thin-button"
                    @click="saveItem()"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 122.73 122.88"
                        style="enable-background: new 0 0 122.73 122.88"
                        xml:space="preserve"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        height="16px"
                        width="16px"
                    >
                        <g>
                            <path
                                class="st0 fill-current"
                                d="M109.5,113.68L109.5,113.68l-6.09,0c-0.4,0-0.73-0.32-0.73-0.72V69.48l0-0.1c0-0.9-0.17-1.65-0.49-2.22 c-0.06-0.11-0.14-0.22-0.2-0.31c-0.06-0.09-0.16-0.18-0.23-0.27l-0.02-0.02c-0.3-0.3-0.68-0.53-1.12-0.69l-0.25-0.07l-0.04-0.01 l-0.01,0c-0.41-0.11-0.88-0.17-1.38-0.17h-0.05l-0.08,0H36.75c-0.89,0-1.62,0.17-2.18,0.49l-0.02,0.01l-0.27,0.17l-0.04,0.04 c-0.09,0.07-0.18,0.15-0.27,0.23l-0.02,0.02l-0.01,0.01c-0.62,0.63-0.92,1.57-0.92,2.82l0,0.04l0,43.54h0 c0,0.4-0.33,0.72-0.73,0.72l-9.85,0c0,0,0,0,0,0c-0.19,0-0.38-0.08-0.51-0.21L9.87,101.41c-0.18-0.14-0.29-0.36-0.29-0.59l0-87.91 l0-0.08c0-0.83,0.15-1.52,0.44-2.07l0,0c0.05-0.11,0.11-0.2,0.17-0.29l0.02-0.03c0.07-0.11,0.19-0.18,0.25-0.29l0.01-0.02 l0.02-0.02l0,0c0.25-0.25,0.57-0.45,0.92-0.59l0.04-0.02l0.02-0.01l0.02-0.01l0.18-0.06v0l0.01-0.01c0.42-0.14,0.9-0.2,1.44-0.21 l0.09-0.01l26.21,0c0.4,0,0.73,0.32,0.73,0.72v28.75c0,0.52,0.05,1.03,0.13,1.5c0.09,0.46,0.15,0.98,0.39,1.34l0.01,0.02l0,0.01v0 c0.18,0.44,0.42,0.87,0.67,1.25c0.24,0.37,0.56,0.77,0.9,1.13l0.02,0.02l0,0.01l0.01,0c0.48,0.5,0.94,1.15,1.62,1.27l0.01,0l0.01,0 l0.01,0.01l0.32,0.17l0,0l0.4,0.18v0l0.01,0l0,0l0,0v0c0.33,0.14,0.67,0.26,1,0.34l0.01,0l0.03,0l0.01,0l0.03,0l0.26,0.05v0 c0.45,0.09,0.93,0.14,1.42,0.14l0.02,0h47.8c1.03,0,1.98-0.18,2.85-0.53l0.01-0.01c0.87-0.36,1.67-0.9,2.39-1.61l0.03-0.03 c0.36-0.36,0.69-0.75,0.96-1.16c0.26-0.38,0.58-0.76,0.66-1.22l0-0.01l0.01-0.01l0.01-0.02c0.18-0.43,0.34-0.88,0.41-1.34l0-0.03 c0.09-0.47,0.13-0.97,0.13-1.49V9.92c0-0.4,0.33-0.73,0.73-0.73h6c0.58,0,1.09,0.07,1.54,0.21c0.48,0.15,0.89,0.39,1.2,0.7 c0.68,0.67,0.88,1.67,0.9,2.59l0.01,0.09v0.05l0,0.02v97.19c0,0.56-0.07,1.07-0.21,1.51l-0.01,0.03v0l0,0.02l-0.08,0.22l0,0 l-0.02,0.06l-0.09,0.2l-0.01,0.04l-0.02,0.04l0,0l-0.03,0.06l-0.15,0.22l0,0l-0.05,0.08l-0.14,0.17l-0.06,0.07 c-0.15,0.16-0.33,0.3-0.53,0.42c-0.17,0.1-0.36,0.19-0.55,0.26l-0.06,0.02c-0.16,0.05-0.34,0.1-0.53,0.14l-0.02,0l-0.01,0l-0.02,0 l-0.09,0.01l-0.02,0l0,0l-0.02,0c-0.22,0.03-0.49,0.05-0.76,0.06H109.5L109.5,113.68z M53.93,104.43c-1.66,0-3-1.34-3-3 c0-1.66,1.34-3,3-3h31.12c1.66,0,3,1.34,3,3c0,1.66-1.34,3-3,3H53.93L53.93,104.43z M53.93,89.03c-1.66,0-3-1.34-3-3s1.34-3,3-3 h31.12c1.66,0,3,1.34,3,3s-1.34,3-3,3H53.93L53.93,89.03z M94.03,9.39l-45.32-0.2v25.86H48.7c0,0.46,0.06,0.86,0.17,1.2 c0.03,0.06,0.04,0.1,0.07,0.15c0.09,0.23,0.22,0.44,0.4,0.61l0.03,0.03v0c0.06,0.06,0.11,0.1,0.17,0.15 c0.06,0.05,0.13,0.09,0.2,0.14c0.39,0.23,0.92,0.34,1.58,0.34v0l40.1,0.25v0l0,0v0c0.91,0,1.57-0.21,1.98-0.63 c0.42-0.43,0.63-1.1,0.63-2.02h0V9.39L94.03,9.39z M41.91,73.23h53.07v0c0.35,0,0.65,0.29,0.65,0.64l0,39.17 c0,0.35-0.29,0.65-0.65,0.65H41.91v0c-0.35,0-0.65-0.29-0.65-0.64l0-39.17C41.26,73.52,41.56,73.23,41.91,73.23L41.91,73.23 L41.91,73.23z M9.68,0h104.26c4.91,0,8.79,3.86,8.79,8.79V114c0,4.95-3.9,8.88-8.79,8.88l-96.61,0l-0.24-0.25L1.05,106.6L0,105.9 V8.76C0,3.28,4.81,0,9.68,0L9.68,0L9.68,0z"
                            />
                        </g>
                    </svg>
                    <div>{{ $t('editor.saveChanges') }}</div>
                </button>
            </div>

            <hr class="border-solid border-t-2 border-gray-300 my-2" />
            <div>
                <div class="mt-3" v-if="editingStatus === 'create'">
                    <!-- Creating new slide -->
                    <label class="respected-standard-label mb-5 text-left">{{
                        $t('editor.slideshow.label.type')
                    }}</label>
                    <br />
                    <select class="rounded shadow w-48" @input="onTypeInput" :value="newSlideType">
                        <option v-for="thing in Object.keys(editors)" :key="thing" :value="thing">
                            {{ $t(`editor.slide.panel.type.${thing}`) }}
                        </option>
                    </select>
                    <component
                        v-if="editingStatus === 'create'"
                        ref="slideEditor"
                        :is="editors[newSlideType]"
                        :panel="JSON.parse(JSON.stringify(startingConfig[newSlideType]))"
                        :lang="lang"
                        :allowMany="false"
                    ></component>
                </div>
                <div v-else>
                    <!-- Editing existing slide-->
                    <component
                        ref="slideEditor"
                        :is="editors[panel.items[editingIdx].type]"
                        :panel="panel.items[editingIdx]"
                        :lang="lang"
                        :key="editingIdx + panel.items[editingIdx].type"
                        :allowMany="false"
                    ></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { BasePanel, BaseStartingConfig, DefaultConfigs, PanelType, SlideshowPanel } from '@/definitions';

import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import VideoEditorV from './video-editor.vue';

import { useProductStore } from '@/stores/productStore';

@Options({
    components: {
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'map-editor': MapEditorV,
        'video-editor': VideoEditorV
    }
})
export default class SlideshowEditorV extends Vue {
    @Prop() panel!: SlideshowPanel;
    @Prop() lang!: string;

    productStore = useProductStore();

    editors: Record<string, string> = {
        text: 'text-editor',
        image: 'image-editor',
        chart: 'chart-editor',
        map: 'map-editor',
        video: 'video-editor'
    };

    startingConfig: DefaultConfigs = {
        ...JSON.parse(JSON.stringify(BaseStartingConfig)),
        slideshow: {
            type: PanelType.Slideshow,
            items: []
        },
        map: {
            type: PanelType.Map,
            config: '',
            title: '',
            scrollguard: true // default to ON for slideshows. Allows users to use the cursor to switch slides.
        }
    };

    editingIdx = -1;
    newSlideName = '';
    newSlideType: 'text' | 'image' | 'chart' | 'map' = 'text';
    editingStatus: 'none' | 'edit' | 'create' = 'none';

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    onTypeInput(e: any): void {
        this.newSlideType = e.target.value;
    }

    editItem(idx: number): void {
        // Save slide changes if neccessary and switch to the newly selected slide.
        this.saveChanges();
        this.editingIdx = idx;
        this.editingStatus = 'edit';

        // After switching the edit status, scroll to the add button.
        this.$nextTick(() => {
            document.getElementById('create-and-edit-area')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
    }

    deleteItem(item: number): void {
        const panel = this.panel.items.find((panel: BasePanel, idx: number) => idx === item);

        // Update source counts based on which panel is removed.
        this.productStore.removeSourceCounts(panel as BasePanel);

        // Remove the panel itself.
        this.panel.items = this.panel.items.filter((panel: BasePanel, idx: number) => idx !== item);

        // If the slide being removed is the currently selected slide, unselect it.
        if (this.editingIdx === item) {
            this.editingIdx = -1;
            this.editingStatus = 'none';
        }
    }

    moveSlideUp(index: number): void {
        if (index === 0) {
            return;
        }

        const item = JSON.parse(JSON.stringify(this.panel.items[index]));

        this.panel.items.splice(index, 1);
        this.panel.items.splice(index - 1, 0, item);

        // Just in case we decide to allow it: handling edge case where a slide
        // being edited is moved. In that case, ensure focus remains on that slide
        if (this.editingStatus === 'edit') {
            // If slide being edited is current slide
            if (this.editingIdx === index) {
                this.editingIdx -= 1;
                // If slide being edited is previous slide (shift it down)
            } else if (this.editingIdx === index - 1) {
                this.editingIdx += 1;
            }
        }
    }

    moveSlideDown(index: number): void {
        if (index === this.panel.items.length - 1) {
            return;
        }

        const item = JSON.parse(JSON.stringify(this.panel.items[index]));

        this.panel.items.splice(index, 1);
        this.panel.items.splice(index + 1, 0, item);

        // Just in case we decide to allow it: handling edge case where a slide
        // being edited is moved. In that case, ensure focus remains on that slide
        if (this.editingStatus === 'edit') {
            // If slide being edited is current slide
            if (this.editingIdx === index) {
                this.editingIdx += 1;
                // If slide being edited is next slide (shift it up)
            } else if (this.editingIdx === index + 1) {
                this.editingIdx -= 1;
            }
        }
    }

    saveItem(add = false): void {
        let itemConfig;

        if (add) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            itemConfig = (this.$refs.slideEditor as any).panel;
            this.panel.items.push(itemConfig);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            itemConfig = (this.$refs.slideEditor as any).panel;
        }

        if (itemConfig.type !== PanelType.Text) {
            if (
                this.$refs.slideEditor !== undefined &&
                typeof (this.$refs.slideEditor as ImageEditorV | ChartEditorV).saveChanges === 'function'
            ) {
                (this.$refs.slideEditor as ImageEditorV | ChartEditorV).saveChanges();

                if (itemConfig.type === PanelType.Map) {
                    this.$emit('slide-edit');
                }
            }
        }

        this.editingStatus = 'none';
    }

    saveChanges(): void {
        return;
    }

    changeEditStatus(): void {
        if (this.editingStatus === 'create') {
            this.editingStatus = 'none';
        } else {
            this.editingStatus = 'create';

            // After switching the edit status, scroll to the add button.
            this.$nextTick(() => {
                document
                    .getElementById('create-and-edit-area')
                    ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            });
        }
    }
}
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
.table-header th {
    text-align: center;
    background-color: #ddd;
    padding: 5px 10px;
}
.table-contents td {
    text-align: center;
    padding: 5px 10px;
}
.table-contents:hover {
    background-color: #eee;
    cursor: pointer;
}
.table-add-row th {
    vertical-align: top;
    text-align: center;
    border-top: 1px solid #ddd;
    padding: 5px;
}
.table-add-row input[type='text'],
.table-add-row select,
.table-add-row button {
    width: 150px !important;
    text-align: center;
    font-weight: normal;
    border: 1px solid black;
    padding: 2px !important;
    margin-top: 0 !important;
}

.hover-editing:hover {
    background-color: rgb(219, 234, 254);
}

select {
    border: 1px solid #a1a1a1;
    background: white;
    padding: 0.25rem 0.5rem;
}

.slideshow-text-button:focus {
    outline: 2px solid royalblue;
    z-index: 2;
    outline-offset: 2px;
    transition-duration: 0.075s;
}
</style>

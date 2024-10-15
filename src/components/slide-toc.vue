<template>
    <div>
        <!-- Sidebar header -->
        <div class="flex toc-header px-3 pt-2 mt-5 pb-2 border-b align-bottom items-end">
            <!-- Header title ("SLIDES" or equivalent) -->
            <p class="flex items-center justify-center font-bold">{{ $t('editor.slides.slideHeader') }}</p>
            <p class="flex-1"></p>
            <p class="ml-auto"></p>
            <!-- Add new slide button -->
            <!-- New slide will have a blank ENG and FR config, with some exceptions -->
            <button class="mx-auto toc-popup-button py-0 px-2" @click="addNewSlide">
                <span class="inline-block pr-1"
                    ><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                    </svg>
                </span>
                <span class="inline-block text-sm font-normal">{{ $t('editor.slides.addSlide') }}</span>
            </button>
            <br />
        </div>

        <!-- Slide list -->
        <ul :class="[isMobileSidebar ? 'toc-list-mobile' : 'toc-list']">
            <!-- Slide -->
            <!-- Dragging is turned off on mobile version as you can't scroll otherwise (component would think a scroll === a drag) -->
            <draggable
                :disabled="isMobileSidebar"
                :list="slides"
                @update="$emit('slides-updated', slides)"
                :item-key="getSlideId"
                v-focus-list
            >
                <template #item="{ element, index }">
                    <li
                        class="toc-slide select-none border-t flex px-3 py-2 cursor-pointer hover:bg-gray-50"
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
                                <section class="flex flex-col gap-0.5 text-sm">
                                    <!-- ENG config for slide -->
                                    <button
                                        class="flex gap-2 px-2 rounded-md bg-transparent hover:bg-gray-200"
                                        :disabled="!element.en"
                                        :class="{
                                            'selected-toc-config-item': element.en === currentSlide,
                                            'py-1': !isMobileSidebar,
                                            'py-2': isMobileSidebar,
                                            'border-2 border-blue-500': isMobileSidebar && element.en === currentSlide,
                                            'cursor-not-allowed border-2 border-red-400': !element.en
                                        }"
                                        v-tippy="{
                                            delay: '200',
                                            placement: isMobileSidebar ? 'top' : 'right',
                                            content:
                                                element.en?.title ||
                                                (element.en?.title === ''
                                                    ? $t('editor.slides.toc.newENGSlideText')
                                                    : $t('editor.slides.toc.noENGslide')),
                                            animateFill: true,
                                            offset: [0, isMobileSidebar ? 0 : 50],
                                            touch: ['hold', 500]
                                        }"
                                        @click.stop="
                                            selectSlide(index, 'en');
                                            isMobileSidebar && closeSidebar();
                                        "
                                    >
                                        <!-- "EN" text -->
                                        <p
                                            class="font-bold italic text-gray-500 select-none"
                                            :class="{ 'text-gray-700': slideIndex === index }"
                                        >
                                            EN
                                        </p>
                                        <!-- Config title -->
                                        <p
                                            class="text-left line-clamp-2 select-none"
                                            :class="{
                                                italic: !element.en?.title
                                            }"
                                        >
                                            {{
                                                element.en?.title ||
                                                (element.en?.title === ''
                                                    ? $t('editor.slides.toc.newENGSlideText')
                                                    : $t('editor.slides.toc.noENGslide'))
                                            }}
                                        </p>
                                        <!-- Options for EN items with missing configs (e.g. one language has config, other doesn't) -->
                                        <div v-if="!element.en" class="ml-auto flex my-auto">
                                            <!-- Create a new blank config -->
                                            <button
                                                class="slide-toc-button"
                                                :class="{
                                                    'cursor-not-allowed opacity-50':
                                                        index - 1 !== -1 && !slides[index - 1]?.en
                                                }"
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'top-start',
                                                    content:
                                                        index - 1 !== -1 && !slides[index - 1]?.en
                                                            ? $t('editor.slides.toc.prevEngDNE')
                                                            : $t('editor.slides.toc.newBlankConfig'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                                @click="
                                                    index - 1 !== -1 && !slides[index - 1]?.en
                                                        ? ''
                                                        : createNewConfig(element, 'en')
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    shape-rendering="geometricPrecision"
                                                    text-rendering="geometricPrecision"
                                                    image-rendering="optimizeQuality"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    viewBox="0 0 399 511.66"
                                                    width="14"
                                                    height="14"
                                                    class="mx-1"
                                                >
                                                    <path
                                                        fill-rule="nonzero"
                                                        d="M71.1 0h190.92c5.22 0 9.85 2.5 12.77 6.38L394.7 136.11c2.81 3.05 4.21 6.92 4.21 10.78l.09 293.67c0 19.47-8.02 37.23-20.9 50.14l-.09.08c-12.9 12.87-30.66 20.88-50.11 20.88H71.1c-19.54 0-37.33-8.01-50.22-20.9C8.01 477.89 0 460.1 0 440.56V71.1c0-19.56 8-37.35 20.87-50.23C33.75 8 51.54 0 71.1 0zm45.78 254.04c-8.81 0-15.96-7.15-15.96-15.95 0-8.81 7.15-15.96 15.96-15.96h165.23c8.81 0 15.96 7.15 15.96 15.96 0 8.8-7.15 15.95-15.96 15.95H116.88zm0 79.38c-8.81 0-15.96-7.15-15.96-15.96 0-8.8 7.15-15.95 15.96-15.95h156.47c8.81 0 15.96 7.15 15.96 15.95 0 8.81-7.15 15.96-15.96 15.96H116.88zm0 79.39c-8.81 0-15.96-7.15-15.96-15.96s7.15-15.95 15.96-15.95h132.7c8.81 0 15.95 7.14 15.95 15.95 0 8.81-7.14 15.96-15.95 15.96h-132.7zm154.2-363.67v54.21c1.07 13.59 5.77 24.22 13.99 31.24 8.63 7.37 21.65 11.52 38.95 11.83l36.93-.05-89.87-97.23zm96.01 129.11-43.31-.05c-25.2-.4-45.08-7.2-59.39-19.43-14.91-12.76-23.34-30.81-25.07-53.11l-.15-2.22V31.91H71.1c-10.77 0-20.58 4.42-27.68 11.51-7.09 7.1-11.51 16.91-11.51 27.68v369.46c0 10.76 4.43 20.56 11.52 27.65 7.11 7.12 16.92 11.53 27.67 11.53h256.8c10.78 0 20.58-4.4 27.65-11.48 7.13-7.12 11.54-16.93 11.54-27.7V178.25z"
                                                    />
                                                </svg>
                                            </button>
                                            <!-- Button: Copy the FR config in the same slide, if it exists -->
                                            <!-- Only available if the slide's ENG config is undefined -->
                                            <button
                                                v-if="element.fr"
                                                class="slide-toc-button"
                                                :class="{
                                                    'cursor-not-allowed opacity-50':
                                                        index - 1 !== -1 && !slides[index - 1]?.en
                                                }"
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'top-start',
                                                    content:
                                                        index - 1 !== -1 && !slides[index - 1]?.en
                                                            ? $t('editor.slides.toc.prevEngDNE')
                                                            : $t('editor.slides.toc.newConfigFromFR'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                                @click="
                                                    index - 1 !== -1 && !slides[index - 1]?.en
                                                        ? ''
                                                        : copyConfigFromOtherLang(element, 'en')
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="16"
                                                    width="16"
                                                    viewBox="0 0 24 24"
                                                    class="mx-1"
                                                >
                                                    <path
                                                        d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                                                    />
                                                </svg>
                                            </button>
                                            <!-- Warning indicator for isolated undefined configs: Defined configs below it WILL be moved up! -->
                                            <button
                                                class="slide-toc-button cursor-default"
                                                v-if="
                                                    slides.slice(0, index).some((slide) => slide.en) &&
                                                    slides.slice(index + 1).some((slide) => slide.en)
                                                "
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'top-start',
                                                    content: $t('editor.slides.toc.isolatedUndefinedENGconfig'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    shape-rendering="geometricPrecision"
                                                    text-rendering="geometricPrecision"
                                                    image-rendering="optimizeQuality"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    viewBox="0 0 512 463.43"
                                                    height="16"
                                                    width="16"
                                                    style="fill: rgb(248, 113, 113)"
                                                >
                                                    <path
                                                        d="M189.46 44.02c34.26-58.66 99.16-58.77 133.24.12l.97 1.81 175.27 304.4c33.71 56.4-1.2 113.76-66.17 112.96v.12H73.53c-.9 0-1.78-.04-2.66-.11-58.34-.79-86.64-54.22-61.9-106.84.39-.85.82-1.67 1.28-2.46l-.04-.03 179.3-309.94-.05-.03zm50.32 302.4c4.26-4.13 9.35-6.19 14.45-6.56 3.4-.24 6.8.29 9.94 1.48 3.13 1.19 6.01 3.03 8.39 5.41 6.92 6.91 8.72 17.38 4.64 26.16-2.69 5.8-7.08 9.7-12.11 11.78-3.03 1.27-6.3 1.84-9.56 1.76-3.27-.08-6.49-.82-9.41-2.18-5.02-2.33-9.3-6.43-11.7-12.2-2.65-6.36-2.27-12.96.63-19.15 1.15-2.46 2.75-4.81 4.73-6.5zm33.86-47.07c-.8 19.91-34.51 19.93-35.28-.01-3.41-34.1-12.13-110.53-11.85-142.58.28-9.87 8.47-15.72 18.94-17.95 3.23-.69 6.78-1.03 10.35-1.02 3.6.01 7.16.36 10.39 1.05 10.82 2.3 19.31 8.39 19.31 18.45l-.05 1-11.81 141.06z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div v-else class="ml-auto flex my-auto">
                                            <!-- Allow deleting the final slide -->
                                            <!-- TODO: Do we want a warning for deleting individual configs in a slide? -->
                                            <button
                                                class="slide-toc-button"
                                                v-if="!slides.slice(index + 1).some((slide) => slide.en)"
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'top-start',
                                                    content: $t('editor.slides.toc.deleteConfig'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                                @click.stop="$vfm.open(`delete-slide-${index}-en-config`)"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 110.61 122.88"
                                                    width="14"
                                                    height="14"
                                                    class="mx-1 my-0.5"
                                                >
                                                    <path
                                                        d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </button>
                                    <!-- Delete ENG confirmation modal -->
                                    <confirmation-modal
                                        :name="`delete-slide-${index}-en-config`"
                                        :message="
                                            $t('editor.slides.deleteConfig.confirm', {
                                                title: element['en']?.title
                                            })
                                        "
                                        @ok="deleteConfig(element, 'en')"
                                    />
                                    <hr v-if="isMobileSidebar" />
                                    <!-- FR config for slide -->
                                    <button
                                        class="flex gap-2 px-2 py-1 rounded-md bg-transparent hover:bg-gray-200"
                                        :disabled="!element.fr"
                                        :class="{
                                            'selected-toc-config-item': element.fr === currentSlide,
                                            'py-1': !isMobileSidebar,
                                            'py-2': isMobileSidebar,
                                            'border-2 border-blue-500': isMobileSidebar && element.fr === currentSlide,
                                            'cursor-not-allowed border-2 border-red-400': !element.fr
                                        }"
                                        v-tippy="{
                                            delay: '200',
                                            placement: isMobileSidebar ? 'bottom' : 'right',
                                            content:
                                                element.fr?.title ||
                                                (element.fr?.title === ''
                                                    ? $t('editor.slides.toc.newFRSlideText')
                                                    : $t('editor.slide.toc.noFRSlide')),
                                            animateFill: true,
                                            offset: [0, isMobileSidebar ? 0 : 50],
                                            touch: ['hold', 500]
                                        }"
                                        @click.stop="
                                            selectSlide(index, 'fr');
                                            isMobileSidebar && closeSidebar();
                                        "
                                    >
                                        <!-- "FR" text -->
                                        <p
                                            class="font-bold italic text-gray-500 select-none"
                                            :class="{ 'text-gray-700': slideIndex === index }"
                                        >
                                            FR
                                        </p>
                                        <!-- Config title -->
                                        <p
                                            class="text-left line-clamp-2 select-none"
                                            :class="{
                                                italic: !element.fr?.title
                                            }"
                                        >
                                            {{
                                                element.fr?.title ||
                                                (element.fr?.title === ''
                                                    ? $t('editor.slides.toc.newFRSlideText')
                                                    : $t('editor.slide.toc.noFRSlide'))
                                            }}
                                        </p>
                                        <!-- Options for FR items with missing configs (e.g. one language has config, other doesn't) -->
                                        <div v-if="!element.fr" class="ml-auto flex my-auto">
                                            <!-- Create a new blank config -->
                                            <button
                                                class="slide-toc-button"
                                                :class="{
                                                    'cursor-not-allowed opacity-50':
                                                        index - 1 !== -1 && !slides[index - 1]?.fr
                                                }"
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'bottom-start',
                                                    content:
                                                        index - 1 !== -1 && !slides[index - 1]?.fr
                                                            ? $t('editor.slide.toc.prevFrDNE')
                                                            : $t('editor.slides.toc.newBlankConfig'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                                @click="
                                                    index - 1 !== -1 && !slides[index - 1]?.fr
                                                        ? ''
                                                        : createNewConfig(element, 'fr')
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    shape-rendering="geometricPrecision"
                                                    text-rendering="geometricPrecision"
                                                    image-rendering="optimizeQuality"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    viewBox="0 0 399 511.66"
                                                    width="14"
                                                    height="14"
                                                    class="mx-1"
                                                >
                                                    <path
                                                        fill-rule="nonzero"
                                                        d="M71.1 0h190.92c5.22 0 9.85 2.5 12.77 6.38L394.7 136.11c2.81 3.05 4.21 6.92 4.21 10.78l.09 293.67c0 19.47-8.02 37.23-20.9 50.14l-.09.08c-12.9 12.87-30.66 20.88-50.11 20.88H71.1c-19.54 0-37.33-8.01-50.22-20.9C8.01 477.89 0 460.1 0 440.56V71.1c0-19.56 8-37.35 20.87-50.23C33.75 8 51.54 0 71.1 0zm45.78 254.04c-8.81 0-15.96-7.15-15.96-15.95 0-8.81 7.15-15.96 15.96-15.96h165.23c8.81 0 15.96 7.15 15.96 15.96 0 8.8-7.15 15.95-15.96 15.95H116.88zm0 79.38c-8.81 0-15.96-7.15-15.96-15.96 0-8.8 7.15-15.95 15.96-15.95h156.47c8.81 0 15.96 7.15 15.96 15.95 0 8.81-7.15 15.96-15.96 15.96H116.88zm0 79.39c-8.81 0-15.96-7.15-15.96-15.96s7.15-15.95 15.96-15.95h132.7c8.81 0 15.95 7.14 15.95 15.95 0 8.81-7.14 15.96-15.95 15.96h-132.7zm154.2-363.67v54.21c1.07 13.59 5.77 24.22 13.99 31.24 8.63 7.37 21.65 11.52 38.95 11.83l36.93-.05-89.87-97.23zm96.01 129.11-43.31-.05c-25.2-.4-45.08-7.2-59.39-19.43-14.91-12.76-23.34-30.81-25.07-53.11l-.15-2.22V31.91H71.1c-10.77 0-20.58 4.42-27.68 11.51-7.09 7.1-11.51 16.91-11.51 27.68v369.46c0 10.76 4.43 20.56 11.52 27.65 7.11 7.12 16.92 11.53 27.67 11.53h256.8c10.78 0 20.58-4.4 27.65-11.48 7.13-7.12 11.54-16.93 11.54-27.7V178.25z"
                                                    />
                                                </svg>
                                            </button>
                                            <!-- Button: Copy the ENG config in the same slide, if it exists -->
                                            <!-- Only available if the slide's FR config is undefined -->
                                            <button
                                                v-if="element.en"
                                                class="slide-toc-button"
                                                :class="{
                                                    'cursor-not-allowed opacity-50':
                                                        index - 1 !== -1 && !slides[index - 1]?.fr
                                                }"
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'bottom-start',
                                                    content:
                                                        index - 1 !== -1 && !slides[index - 1]?.fr
                                                            ? $t('editor.slide.toc.prevFrDNE')
                                                            : $t('editor.slides.toc.newConfigFromEng'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                                @click="
                                                    index - 1 !== -1 && !slides[index - 1]?.fr
                                                        ? ''
                                                        : copyConfigFromOtherLang(element, 'fr')
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="16"
                                                    width="16"
                                                    viewBox="0 0 24 24"
                                                    class="mx-1"
                                                >
                                                    <path
                                                        d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                                                    />
                                                </svg>
                                            </button>
                                            <!-- Warning indicator for isolated undefined configs: Defined configs below it WILL be moved up! -->
                                            <button
                                                class="slide-toc-button cursor-default"
                                                v-if="
                                                    slides.slice(0, index).some((slide) => slide.fr) &&
                                                    slides.slice(index + 1).some((slide) => slide.fr)
                                                "
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'bottom-start',
                                                    content: $t('editor.slides.toc.isolatedUndefinedFRconfig'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    shape-rendering="geometricPrecision"
                                                    text-rendering="geometricPrecision"
                                                    image-rendering="optimizeQuality"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    viewBox="0 0 512 463.43"
                                                    height="16"
                                                    width="16"
                                                    style="fill: rgb(248, 113, 113)"
                                                >
                                                    <path
                                                        d="M189.46 44.02c34.26-58.66 99.16-58.77 133.24.12l.97 1.81 175.27 304.4c33.71 56.4-1.2 113.76-66.17 112.96v.12H73.53c-.9 0-1.78-.04-2.66-.11-58.34-.79-86.64-54.22-61.9-106.84.39-.85.82-1.67 1.28-2.46l-.04-.03 179.3-309.94-.05-.03zm50.32 302.4c4.26-4.13 9.35-6.19 14.45-6.56 3.4-.24 6.8.29 9.94 1.48 3.13 1.19 6.01 3.03 8.39 5.41 6.92 6.91 8.72 17.38 4.64 26.16-2.69 5.8-7.08 9.7-12.11 11.78-3.03 1.27-6.3 1.84-9.56 1.76-3.27-.08-6.49-.82-9.41-2.18-5.02-2.33-9.3-6.43-11.7-12.2-2.65-6.36-2.27-12.96.63-19.15 1.15-2.46 2.75-4.81 4.73-6.5zm33.86-47.07c-.8 19.91-34.51 19.93-35.28-.01-3.41-34.1-12.13-110.53-11.85-142.58.28-9.87 8.47-15.72 18.94-17.95 3.23-.69 6.78-1.03 10.35-1.02 3.6.01 7.16.36 10.39 1.05 10.82 2.3 19.31 8.39 19.31 18.45l-.05 1-11.81 141.06z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div v-else class="ml-auto flex my-auto">
                                            <!-- Allow deleting the final slide -->
                                            <button
                                                class="slide-toc-button"
                                                v-if="!slides.slice(index + 1).some((slide) => slide.fr)"
                                                v-tippy="{
                                                    delay: '200',
                                                    placement: 'bottom-start',
                                                    content: $t('editor.slides.toc.deleteConfig'),
                                                    animateFill: false,
                                                    touch: ['hold', 500]
                                                }"
                                                @click.stop="$vfm.open(`delete-slide-${index}-fr-config`)"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 110.61 122.88"
                                                    width="14"
                                                    height="14"
                                                    class="mx-1 my-0.5"
                                                >
                                                    <path
                                                        d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </button>
                                    <!-- Delete FR confirmation modal -->
                                    <confirmation-modal
                                        :name="`delete-slide-${index}-fr-config`"
                                        :message="
                                            $t('editor.slides.deleteConfig.confirm', {
                                                title: element['fr']?.title
                                            })
                                        "
                                        @ok="deleteConfig(element, 'fr')"
                                    />
                                </section>
                            </div>

                            <!-- Move slide buttons -->
                            <div class="flex ml-0.5 flex-col space-between">
                                <!-- Move slide up button -->
                                <button
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
import ActionModal from '@/components/helpers/action-modal.vue';
import { Options, Prop, Vue } from 'vue-property-decorator';
import {
    BasePanel,
    ChartPanel,
    ConfigFileStructure,
    DynamicChildItem,
    DynamicPanel,
    ImagePanel,
    MapPanel,
    Slide,
    SlideForBothLanguages,
    SlideshowPanel,
    SourceCounts,
    TextPanel,
    VideoPanel
} from '@/definitions';

import Message from 'vue-m-message';
import { VueFinalModal } from 'vue-final-modal';
import cloneDeep from 'clone-deep';
import draggable from 'vuedraggable';

import SlideEditorV from './slide-editor.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';

@Options({
    components: {
        ActionModal,
        'slide-editor': SlideEditorV,
        'confirmation-modal': ConfirmationModalV,
        'vue-final-modal': VueFinalModal,
        draggable
    }
})
export default class SlideTocV extends Vue {
    @Prop() slides!: SlideForBothLanguages[];
    @Prop() currentSlide!: Slide | string;
    @Prop() slideIndex!: number;
    @Prop() configFileStructure!: ConfigFileStructure;
    @Prop() lang!: string;
    @Prop() sourceCounts!: SourceCounts;
    @Prop() closeSidebar!: Function;
    @Prop({ default: false }) isMobileSidebar!: boolean;

    selectedForCopying = 0;

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
        ]
    };

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
        const lastSlide = this.slides[this.slides.length - 1];
        this.slides.push({
            en:
                !lastSlide?.en && this.slides.length !== 0
                    ? undefined
                    : JSON.parse(JSON.stringify(this.defaultBlankSlide)),
            fr:
                !lastSlide?.fr && this.slides.length !== 0
                    ? undefined
                    : JSON.parse(JSON.stringify(this.defaultBlankSlide))
        });
        this.selectSlide(this.slides.length - 1, this.lang);
        this.$emit('slides-updated', this.slides);
        this.scrollToElement(this.slides.length - 1);
    }

    /**
     * Deletes one of the language configs for a single slide. That config will be undefined after, and the slide will say "(No English/French Config)" or similar.
     * @param slides A slide, containing an English and French config.
     * @param currLang The config to delete, either 'en' for English of 'fr' for French.
     */
    deleteConfig(slides: SlideForBothLanguages, currLang: 'en' | 'fr'): void {
        slides[currLang] = undefined;
        this.$emit('slides-updated', this.slides);
    }

    /**
     * Smooth scroll to an element on the table of contents. Will end scroll in the middle of the ToC vertical area, if able.
     * @param index The index of the slide to scroll to.
     */
    scrollToElement(index: number): void {
        setTimeout(() => {
            document
                .getElementById((this.isMobileSidebar ? 'mobile' : '') + 'slide' + index)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 10);
    }

    // Assumes that you've already checked that the other lang DOES have a config.
    copyConfigFromOtherLang(slides: SlideForBothLanguages, currLang: string): void {
        slides[currLang as keyof SlideForBothLanguages] = JSON.parse(
            JSON.stringify(slides[currLang === 'en' ? 'fr' : 'en'])
        );
        this.$emit('slides-updated', this.slides);
    }

    /**
     * Creates a new blank config for a single language on a particular slide.
     * @param slides A slide, containing an English and French config (either/both can be undefined).
     * @param currLang The language to create a blank config for.
     */
    createNewConfig(slides: SlideForBothLanguages, currLang: 'en' | 'fr'): void {
        slides[currLang] = JSON.parse(JSON.stringify(this.defaultBlankSlide));
        this.$emit('slides-updated', this.slides);
    }

    /**
     * Copies an entire slide, creating a new identical slide at the next index.
     * @param index Index of the slide to copy.
     */
    copySlide(index: number): void {
        this.slides.splice(index + 1, 0, cloneDeep(this.slides[index]));
        this.$emit('slides-updated', this.slides);
        this.selectSlide(index + 1, this.lang);
        Message.success(this.$t('editor.slide.copy.success'));
        this.scrollToElement(index + 1);
    }

    removeSlide(index: number): void {
        if (index === this.slideIndex) {
            this.$emit('slide-change', -1);
        }

        // Before removing the slide, updated the sources for the panels.
        this.removeSourceCounts(index);

        this.slides.splice(index, 1);
        this.$emit('slides-updated', this.slides);
    }

    removeSourceCounts(deletedIndex: number): void {
        let panelEn = this.slides.find((slide: SlideForBothLanguages, idx: number) => idx === deletedIndex)?.en?.panel;
        let panelFr = this.slides.find((slide: SlideForBothLanguages, idx: number) => idx === deletedIndex)?.fr?.panel;

        panelEn?.forEach((p: BasePanel) => this.removeSourceHelper(p));
        panelFr?.forEach((p: BasePanel) => this.removeSourceHelper(p));
    }

    removeSourceHelper(panel: BasePanel): void {
        // The provided panel is being removed. Update source counts accordingly.
        switch (panel.type) {
            case 'map': {
                const mapPanel = panel as MapPanel;
                this.sourceCounts[mapPanel.config] -= 1;
                if (this.sourceCounts[mapPanel.config] === 0) {
                    this.configFileStructure.zip.remove(
                        `${mapPanel.config.substring(mapPanel.config.indexOf('/') + 1)}`
                    );
                }
                break;
            }

            case 'image': {
                const imagePanel = panel as ImagePanel;
                this.sourceCounts[imagePanel.src] -= 1;
                if (this.sourceCounts[imagePanel.src] === 0) {
                    this.configFileStructure.zip.remove(`${imagePanel.src.substring(imagePanel.src.indexOf('/') + 1)}`);
                }

                break;
            }

            case 'chart': {
                const chartPanel = panel as ChartPanel;
                this.sourceCounts[chartPanel.src] -= 1;
                if (this.sourceCounts[chartPanel.src] === 0) {
                    this.configFileStructure.zip.remove(`${chartPanel.src.substring(chartPanel.src.indexOf('/') + 1)}`);
                }

                break;
            }

            case 'slideshow': {
                const slideshowPanel = panel as SlideshowPanel;
                slideshowPanel.items.forEach((item: TextPanel | MapPanel | ChartPanel | ImagePanel) => {
                    this.removeSourceHelper(item);
                });
                break;
            }

            case 'video': {
                const videoPanel = panel as VideoPanel;
                if (videoPanel.videoType === 'local') {
                    this.sourceCounts[videoPanel.src] -= 1;
                    if (this.sourceCounts[videoPanel.src] === 0) {
                        this.configFileStructure.zip.remove(
                            `${videoPanel.src.substring(videoPanel.src.indexOf('/') + 1)}`
                        );
                    }
                }
                break;
            }

            case 'dynamic': {
                const dynamicPanel = panel as DynamicPanel;
                dynamicPanel.children.forEach((subPanel: DynamicChildItem) => {
                    this.removeSourceHelper(subPanel.panel);
                });
                break;
            }

            case 'text': {
                break;
            }
        }
    }

    moveUp(index: number): void {
        this.moveDown(index - 1);
    }

    moveDown(index: number): void {
        this.slides.splice(index + 1, 0, this.slides.splice(index, 1)[0]);
        this.$emit('slides-updated', this.slides);
    }

    getSlideId(slide: SlideForBothLanguages): string {
        return 'slide' + this.slides.indexOf(slide);
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

.editor-toc-button {
    margin: 10px 0px 0px 0px !important;
}

.slide-toc-button {
    border-radius: 3px;
    padding: 2px;
}
.slide-toc-button:hover {
    background-color: rgb(209, 213, 219);
}

.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

/* Hard coded height :(
   TODO: Change positioning of app components so we don't need to hardcode
   TODO: Change height here when any new changes cause overshoot
 */
.toc-list {
    height: calc(100vh - 177px);
    height: calc(calc(var(--vh, 1vh) * 100) - 177px);
    overflow-y: auto;
}

/* TODO: Change height here when any new changes cause overshoot */
.toc-list-mobile {
    height: calc(100vh - 123px);
    height: calc(calc(var(--vh, 1vh) * 100) - 123px);
    overflow-y: auto;
}

.selected-toc-config-item {
    background-color: rgb(225, 225, 225);
}
</style>

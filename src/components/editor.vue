<template>
    <div class="main-editor-container">
        <!-- Background overlay for when the mobile sidebar drawer is open -->
        <!-- Should prevent stuff in the background from being scrolled or interacted with. Click it to close the sidebar -->
        <div id="overlay" class="overlay" @click="closeSidebar"></div>
        <!-- Header bar -->
        <div class="sticky top-0" style="z-index: 150">
            <div
                class="editor-header-upper sticky top-0 bg-white border-b border-black max-h-full"
                :class="{ 'border-t': currentRoute.includes('index-ca') }"
            >
                <div class="flex flex-row justify-between items-center px-3 py-0.5 md:py-0">
                    <div class="flex flex-row items-center gap-2">
                        <!-- Back to landing page button -->
                        <router-link
                            :to="{ name: 'home' }"
                            target
                            :aria-label="$t('editor.returnToLanding')"
                            tabindex="-1"
                        >
                            <button
                                class="editor-button py-2 md:py-1.5 my-1 md:my-1.5 flex flex-row items-center md:gap-2 w-fit"
                                truncate-trigger
                                tabindex="0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18.001"
                                    viewBox="0 0 18 18.001"
                                >
                                    <path
                                        id="logout-Icon-SVG-098767893"
                                        d="M5.808,13.782v1.406A2.816,2.816,0,0,0,8.621,18h7.067A2.816,2.816,0,0,0,18.5,15.188V2.813A2.816,2.816,0,0,0,15.687,0H8.621A2.816,2.816,0,0,0,5.808,2.813V4.219a.7.7,0,0,0,1.406,0V2.813A1.408,1.408,0,0,1,8.621,1.406h7.067a1.408,1.408,0,0,1,1.406,1.406V15.188a1.408,1.408,0,0,1-1.406,1.406H8.621a1.408,1.408,0,0,1-1.406-1.406V13.782a.7.7,0,0,0-1.406,0ZM1.014,7.793,2.589,6.218a.7.7,0,0,1,.994.994l-1.12,1.12h8.443a.7.7,0,1,1,0,1.406H2.463l1.12,1.12a.7.7,0,1,1-.994.994L1.014,10.279A1.76,1.76,0,0,1,1.014,7.793Zm0,0"
                                        transform="translate(-0.5)"
                                    />
                                </svg>
                                <p
                                    class="mobile-hidden-text border md:border-0 border-black font-medium"
                                    v-truncate="{
                                        externalTrigger: true,
                                        options: {
                                            delay: '200',
                                            placement: 'bottom',
                                            content: $t('editor.returnToLanding'),
                                            animateFill: true,
                                            touch: ['hold', 500],
                                            offset: [0, 20]
                                        }
                                    }"
                                >
                                    {{ $t('editor.leaveEditor') }}
                                </p>
                            </button>
                        </router-link>

                        <!-- Open mobile sidebar hamburger button -->
                        <!-- Only shows up on small viewport widths -->
                        <button
                            @click="openSidebar"
                            :aria-label="$t('editor.openSidebar')"
                            class="editor-button self-center bg-transparent border border-gray-700 my-0 md:hidden"
                            v-tippy="{
                                delay: '200',
                                placement: 'bottom',
                                content: $t('editor.openSidebar'),
                                animateFill: true,
                                touch: ['hold', 500],
                                offset: [0, 2]
                            }"
                        >
                            <svg
                                class="inline self-center mb-1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="15"
                                height="15"
                                viewBox="0 0 122.88 95.95"
                                style="enable-background: new 0 0 122.88 95.95"
                                xml:space="preserve"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            >
                                <g>
                                    <path
                                        class="st0"
                                        d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"
                                    />
                                </g>
                            </svg>
                        </button>
                    </div>

                    <div class="space-x-2 flex flex-row items-center">
                        <!-- Unsaved changes indicator -->
                        <div
                            v-if="unsavedChanges"
                            class="text-red-700 flex flex-row items-center w-auto"
                            v-tippy="{
                                delay: '200',
                                placement: 'bottom',
                                content: $t('editor.unsavedChanges'),
                                animateFill: true,
                                touch: ['hold', 500]
                            }"
                            tabindex="0"
                        >
                            <div class="mr-1 pb-1 fill-current">
                                <svg
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                    class="mt-1 fill-current"
                                    width="18"
                                    height="18"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        class="fill-current"
                                        d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                                        fill-rule="nonzero"
                                    />
                                </svg>
                            </div>
                            <p class="mobile-hidden-text select-none">{{ $t('editor.unsavedChanges') }}</p>
                        </div>
                        <!-- Reset changes button -->
                        <button
                            :disabled="!unsavedChanges"
                            @click="$vfm.open(`reload-config`)"
                            class="editor-button flex flex-row border border-gray-700 text-gray-800 rounded my-0"
                            truncate-trigger
                        >
                            <svg
                                class="inline fill-current mb-0.5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="18px"
                                height="18px"
                                style="margin-top: 3px; margin-bottom: 3px"
                            >
                                <path
                                    d="M 2 2 L 4.9394531 4.9394531 C 3.1262684 6.7482143 2 9.2427079 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 6.486 17.514 2 12 2 L 12 4 C 16.411 4 20 7.589 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 9.7940092 4.9004767 7.7972757 6.3496094 6.3496094 L 9 9 L 9 2 L 2 2 z"
                                />
                            </svg>
                            <span
                                class="mobile-hidden-text font-medium md:ml-1"
                                v-truncate="{
                                    externalTrigger: true,
                                    options: {
                                        delay: '200',
                                        placement: 'bottom',
                                        content: $t('editor.resetChanges'),
                                        animateFill: true,
                                        touch: ['hold', 500],
                                        offset: [-10, 32]
                                    }
                                }"
                                >{{ $t('editor.resetChanges') }}</span
                            >
                        </button>

                        <!-- Save changes button -->
                        <button
                            @click="saveChanges"
                            class="editor-button flex flex-row md:gap-1.5 items-center m-0 bg-black text-white hover:bg-gray-900 border border-black"
                            :disabled="!unsavedChanges || saving"
                            truncate-trigger
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 122.73 122.88"
                                style="margin-top: 3px; margin-bottom: 3px; enable-background: new 0 0 122.73 122.88"
                                xml:space="preserve"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                height="18px"
                                width="18px"
                            >
                                <g>
                                    <path
                                        class="st0 fill-current"
                                        d="M109.5,113.68L109.5,113.68l-6.09,0c-0.4,0-0.73-0.32-0.73-0.72V69.48l0-0.1c0-0.9-0.17-1.65-0.49-2.22 c-0.06-0.11-0.14-0.22-0.2-0.31c-0.06-0.09-0.16-0.18-0.23-0.27l-0.02-0.02c-0.3-0.3-0.68-0.53-1.12-0.69l-0.25-0.07l-0.04-0.01 l-0.01,0c-0.41-0.11-0.88-0.17-1.38-0.17h-0.05l-0.08,0H36.75c-0.89,0-1.62,0.17-2.18,0.49l-0.02,0.01l-0.27,0.17l-0.04,0.04 c-0.09,0.07-0.18,0.15-0.27,0.23l-0.02,0.02l-0.01,0.01c-0.62,0.63-0.92,1.57-0.92,2.82l0,0.04l0,43.54h0 c0,0.4-0.33,0.72-0.73,0.72l-9.85,0c0,0,0,0,0,0c-0.19,0-0.38-0.08-0.51-0.21L9.87,101.41c-0.18-0.14-0.29-0.36-0.29-0.59l0-87.91 l0-0.08c0-0.83,0.15-1.52,0.44-2.07l0,0c0.05-0.11,0.11-0.2,0.17-0.29l0.02-0.03c0.07-0.11,0.19-0.18,0.25-0.29l0.01-0.02 l0.02-0.02l0,0c0.25-0.25,0.57-0.45,0.92-0.59l0.04-0.02l0.02-0.01l0.02-0.01l0.18-0.06v0l0.01-0.01c0.42-0.14,0.9-0.2,1.44-0.21 l0.09-0.01l26.21,0c0.4,0,0.73,0.32,0.73,0.72v28.75c0,0.52,0.05,1.03,0.13,1.5c0.09,0.46,0.15,0.98,0.39,1.34l0.01,0.02l0,0.01v0 c0.18,0.44,0.42,0.87,0.67,1.25c0.24,0.37,0.56,0.77,0.9,1.13l0.02,0.02l0,0.01l0.01,0c0.48,0.5,0.94,1.15,1.62,1.27l0.01,0l0.01,0 l0.01,0.01l0.32,0.17l0,0l0.4,0.18v0l0.01,0l0,0l0,0v0c0.33,0.14,0.67,0.26,1,0.34l0.01,0l0.03,0l0.01,0l0.03,0l0.26,0.05v0 c0.45,0.09,0.93,0.14,1.42,0.14l0.02,0h47.8c1.03,0,1.98-0.18,2.85-0.53l0.01-0.01c0.87-0.36,1.67-0.9,2.39-1.61l0.03-0.03 c0.36-0.36,0.69-0.75,0.96-1.16c0.26-0.38,0.58-0.76,0.66-1.22l0-0.01l0.01-0.01l0.01-0.02c0.18-0.43,0.34-0.88,0.41-1.34l0-0.03 c0.09-0.47,0.13-0.97,0.13-1.49V9.92c0-0.4,0.33-0.73,0.73-0.73h6c0.58,0,1.09,0.07,1.54,0.21c0.48,0.15,0.89,0.39,1.2,0.7 c0.68,0.67,0.88,1.67,0.9,2.59l0.01,0.09v0.05l0,0.02v97.19c0,0.56-0.07,1.07-0.21,1.51l-0.01,0.03v0l0,0.02l-0.08,0.22l0,0 l-0.02,0.06l-0.09,0.2l-0.01,0.04l-0.02,0.04l0,0l-0.03,0.06l-0.15,0.22l0,0l-0.05,0.08l-0.14,0.17l-0.06,0.07 c-0.15,0.16-0.33,0.3-0.53,0.42c-0.17,0.1-0.36,0.19-0.55,0.26l-0.06,0.02c-0.16,0.05-0.34,0.1-0.53,0.14l-0.02,0l-0.01,0l-0.02,0 l-0.09,0.01l-0.02,0l0,0l-0.02,0c-0.22,0.03-0.49,0.05-0.76,0.06H109.5L109.5,113.68z M53.93,104.43c-1.66,0-3-1.34-3-3 c0-1.66,1.34-3,3-3h31.12c1.66,0,3,1.34,3,3c0,1.66-1.34,3-3,3H53.93L53.93,104.43z M53.93,89.03c-1.66,0-3-1.34-3-3s1.34-3,3-3 h31.12c1.66,0,3,1.34,3,3s-1.34,3-3,3H53.93L53.93,89.03z M94.03,9.39l-45.32-0.2v25.86H48.7c0,0.46,0.06,0.86,0.17,1.2 c0.03,0.06,0.04,0.1,0.07,0.15c0.09,0.23,0.22,0.44,0.4,0.61l0.03,0.03v0c0.06,0.06,0.11,0.1,0.17,0.15 c0.06,0.05,0.13,0.09,0.2,0.14c0.39,0.23,0.92,0.34,1.58,0.34v0l40.1,0.25v0l0,0v0c0.91,0,1.57-0.21,1.98-0.63 c0.42-0.43,0.63-1.1,0.63-2.02h0V9.39L94.03,9.39z M41.91,73.23h53.07v0c0.35,0,0.65,0.29,0.65,0.64l0,39.17 c0,0.35-0.29,0.65-0.65,0.65H41.91v0c-0.35,0-0.65-0.29-0.65-0.64l0-39.17C41.26,73.52,41.56,73.23,41.91,73.23L41.91,73.23 L41.91,73.23z M9.68,0h104.26c4.91,0,8.79,3.86,8.79,8.79V114c0,4.95-3.9,8.88-8.79,8.88l-96.61,0l-0.24-0.25L1.05,106.6L0,105.9 V8.76C0,3.28,4.81,0,9.68,0L9.68,0L9.68,0z"
                                    />
                                </g>
                            </svg>
                            <span
                                class="mobile-hidden-text font-medium"
                                v-truncate="{
                                    externalTrigger: true,
                                    options: {
                                        delay: '200',
                                        placement: 'bottom',
                                        content: $t('editor.saveChanges'),
                                        animateFill: true,
                                        touch: ['hold', 500],
                                        offset: [-10, 20]
                                    }
                                }"
                                >{{ saving ? $t('editor.savingChanges') : $t('editor.saveChanges') }}</span
                            >
                            <span v-if="saving" class="align-middle inline-block px-1">
                                <spinner size="16px" color="#009cd1" class="ml-1 mb-1"></spinner>
                            </span>
                        </button>

                        <!-- ENG/FR page toggle -->
                        <router-link
                            target
                            v-if="uuid && !currentRoute.includes('index-ca')"
                            :to="{
                                name: 'editor',
                                params: { lang: currentRoute.includes('#/en') ? 'fr' : 'en', uid: uuid }
                            }"
                            class="underline text-black font-medium px-2"
                        >
                            <a>
                                {{ currentRoute.includes('#/en') ? 'Français' : 'English' }}
                            </a>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="editor-header">
                <div class="flex items-center border-b border-black bg-gray-200 py-2 px-3 flex-wrap">
                    <div class="flex flex-1 flex-col gap-0.5 md:flex-row justify-between">
                        <!-- Storylines project title and UUID -->
                        <div class="flex flex-col">
                            <span
                                tabindex="0"
                                class="font-semibold text-lg line-clamp-1 leading-snug"
                                :class="{ italic: !metadata.title }"
                                v-truncate="{
                                    options: {
                                        delay: '200',
                                        placement: 'bottom-start',
                                        content: metadata.title,
                                        animateFill: true,
                                        touch: ['hold', 500]
                                    }
                                }"
                                >{{ metadata.title || $t('editor.untitledProject') }}</span
                            >
                            <span
                                tabindex="0"
                                class="line-clamp-1"
                                :class="metadata.title ? 'text-xs' : ''"
                                v-truncate="{
                                    options: {
                                        delay: '200',
                                        placement: 'bottom-start',
                                        content: uuid,
                                        animateFill: true,
                                        touch: ['hold', 500]
                                    }
                                }"
                                >{{ $t('editor.uuid') }}: {{ uuid }}</span
                            >
                        </div>
                        <span class="ml-auto"></span>
                        <div class="flex items-center flex-nowrap gap-1 justify-between md:justify-start">
                            <slot name="langModal" v-bind="{ unsavedChanges: unsavedChanges }"></slot>
                            <!-- Preview dropdown -->
                            <div class="dropdown editor-button">
                                <!-- The "Preview" button - hover over it to show the options -->
                                <button class="dropbtn flex gap-2 items-center cursor-default">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 83.78"
                                        style="enable-background: new 0 0 122.88 83.78"
                                        xml:space="preserve"
                                        width="18px"
                                        height="18px"
                                        class="my-0 md:my-0.5 lg:my-0"
                                    >
                                        <g>
                                            <path
                                                class="fill-current"
                                                d="M95.73,10.81c10.53,7.09,19.6,17.37,26.48,29.86l0.67,1.22l-0.67,1.21c-6.88,12.49-15.96,22.77-26.48,29.86 C85.46,79.88,73.8,83.78,61.44,83.78c-12.36,0-24.02-3.9-34.28-10.81C16.62,65.87,7.55,55.59,0.67,43.1L0,41.89l0.67-1.22 c6.88-12.49,15.95-22.77,26.48-29.86C37.42,3.9,49.08,0,61.44,0C73.8,0,85.45,3.9,95.73,10.81L95.73,10.81z M60.79,22.17l4.08,0.39 c-1.45,2.18-2.31,4.82-2.31,7.67c0,7.48,5.86,13.54,13.1,13.54c2.32,0,4.5-0.62,6.39-1.72c0.03,0.47,0.05,0.94,0.05,1.42 c0,11.77-9.54,21.31-21.31,21.31c-11.77,0-21.31-9.54-21.31-21.31C39.48,31.71,49.02,22.17,60.79,22.17L60.79,22.17L60.79,22.17z M109,41.89c-5.5-9.66-12.61-17.6-20.79-23.11c-8.05-5.42-17.15-8.48-26.77-8.48c-9.61,0-18.71,3.06-26.76,8.48 c-8.18,5.51-15.29,13.45-20.8,23.11c5.5,9.66,12.62,17.6,20.8,23.1c8.05,5.42,17.15,8.48,26.76,8.48c9.62,0,18.71-3.06,26.77-8.48 C96.39,59.49,103.5,51.55,109,41.89L109,41.89z"
                                            />
                                        </g>
                                    </svg>
                                    <p>{{ $t('editor.preview') }}</p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 66.91"
                                        style="enable-background: new 0 0 122.88 66.91"
                                        xml:space="preserve"
                                        height="12"
                                        width="12"
                                        class="fill-current transform rotate-180"
                                    >
                                        <g>
                                            <path
                                                d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                <!-- The two preview language config options: English and French -->
                                <div class="dropdown-content w-full">
                                    <!-- English config button -->
                                    <button @click.stop="preview('en')" class="border-b border-gray-400">
                                        {{ $t('editor.lang.en') }}
                                    </button>
                                    <!-- French config button -->
                                    <button @click.stop="preview('fr')">{{ $t('editor.lang.fr') }}</button>
                                </div>
                            </div>
                            <div class="flex flex-row gap-1">
                                <!-- Export button -->
                                <button
                                    @click="exportProduct"
                                    class="bg-white border border-black rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                                    v-tippy="{
                                        delay: '200',
                                        placement: 'bottom',
                                        content: $t('editor.export'),
                                        animateFill: true,
                                        touch: ['hold', 500]
                                    }"
                                    :aria-label="$t('editor.export')"
                                >
                                    <span class="bottom-0 question-mark-button">
                                        <svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#000000"
                                            stroke-width="0.336"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke="#CCCCCC"
                                                stroke-width="0.288"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
                                                    fill="#000"
                                                ></path>
                                                <path
                                                    d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                                                    fill="#000"
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>
                                </button>

                                <!-- Help button -->
                                <button
                                    @click="$vfm.open(`help-panel`)"
                                    :aria-label="$t('help.title')"
                                    class="bg-white border border-black rounded-full w-9 h-9 hover:bg-gray-100"
                                    v-tippy="{
                                        delay: '200',
                                        placement: 'bottom',
                                        content: $t('help.title'),
                                        animateFill: true,
                                        touch: ['hold', 500]
                                    }"
                                >
                                    <span class="bottom-0 question-mark-button"> ? </span>
                                </button>

                                <!-- Feedback button -->
                                <button
                                    class="bg-white border border-black rounded-full w-9 h-9 hover:bg-gray-100"
                                    :aria-label="$t('editor.feedback')"
                                    v-tippy="{
                                        delay: '200',
                                        placement: 'bottom',
                                        content: $t('editor.feedback'),
                                        animateFill: true,
                                        touch: ['hold', 500]
                                    }"
                                >
                                    <a
                                        class="flex items-center justify-center"
                                        :aria-label="$t('editor.feedback')"
                                        :href="`mailto:applicationsdecartographieweb-webmappingapplications@ec.gc.ca?subject=${$t(
                                            'editor.feedback.subject'
                                        )}`"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g>
                                                <path
                                                    id="Vector"
                                                    d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M16.8281 5.17188C17.1996 5.54331 17.4942 5.98427 17.6952 6.46957C17.8962 6.95487 17.9999 7.47533 17.9999 8.00062C17.9999 8.52591 17.8963 9.04497 17.6953 9.53027C17.4943 10.0156 17.1996 10.457 16.8281 10.8285M19 3C19.6566 3.65661 20.1775 4.43612 20.5328 5.29402C20.8882 6.15192 21.0718 7.07127 21.0718 7.99985C21.0718 8.92844 20.8886 9.84815 20.5332 10.7061C20.1778 11.564 19.6566 12.3435 19 13.0001M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
                                                    stroke="#000000"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </g>
                                        </svg>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Body content -->
        <div class="editor-body flex">
            <!-- Left side -->
            <!-- Sidebar, desktop version -->
            <div id="sidebar-desktop" class="w-80 flex flex-col flex-shrink-0 border-r border-black editor-toc hidden">
                <!-- ToC -->
                <slide-toc
                    class="flex-1"
                    :slides="slides"
                    :currentSlide="currentSlide"
                    :slideIndex="slideIndex"
                    @slide-change="selectSlide"
                    @slide-edit="$emit('save-status', undefined, 'ToC')"
                    @slides-updated="updateSlides"
                    @open-metadata-modal="$vfm.open('metadata-edit-modal')"
                    @shared-asset="(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string) => {
                        $emit('shared-asset', oppositeAssetPath, sharedAssetPath, oppositeLang);
                    }"
                    @process-panel="
                        (panel, callback, ...args) => {
                            $emit('process-panel', panel, callback, ...args);
                        }
                    "
                    :configFileStructure="configFileStructure"
                    :lang="configLang"
                    :sourceCounts="sourceCounts"
                ></slide-toc>
            </div>
            <!-- Sidebar, mobile version -->
            <div id="sidebar-mobile" class="w-0 flex-shrink-0 border-r border-black editor-toc md:hidden">
                <!-- Mobile ToC -->
                <!-- Bigger buttons, more visual dividers, more colors -->
                <slide-toc
                    :slides="slides"
                    :currentSlide="currentSlide"
                    :slideIndex="slideIndex"
                    @slide-change="selectSlide"
                    @slides-updated="updateSlides"
                    @open-metadata-modal="$vfm.open('metadata-edit-modal')"
                    @close-sidebar="closeSidebar"
                    @shared-asset="(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string) => {
                        $emit('shared-asset', oppositeAssetPath, sharedAssetPath, oppositeLang);
                    }"
                    @process-panel="
                        (panel, callback, ...args) => {
                            $emit('process-panel', panel, callback, ...args);
                        }
                    "
                    :configFileStructure="configFileStructure"
                    :lang="configLang"
                    :sourceCounts="sourceCounts"
                    :closeSidebar="closeSidebar"
                    :isMobileSidebar="true"
                ></slide-toc>
            </div>
            <!-- Right side -->
            <div class="w-full">
                <!-- Slide editor -->
                <slide-editor
                    class="editor-area w-full"
                    ref="slide"
                    :configFileStructure="configFileStructure"
                    :currentSlide="currentSlide"
                    :otherLangSlide="
                        slides[slideIndex]?.[slides.find((slide) => slide.fr === currentSlide) ? 'en' : 'fr']
                    "
                    :lang="slides.find((slide) => slide.fr === currentSlide) ? 'fr' : 'en'"
                    :slideIndex="slideIndex"
                    :isLast="slideIndex === slides.length - 1"
                    :uid="uuid"
                    @shared-asset="(oppositeAssetPath: string, sharedAssetPath: string, oppositeLang: string) => {
                        $emit('shared-asset', oppositeAssetPath, sharedAssetPath, oppositeLang);
                    }"
                    @slide-change="selectSlide"
                    @slide-edit="onSlidesEdited"
                    @custom-slide-updated="updateCustomSlide"
                    :sourceCounts="sourceCounts"
                ></slide-editor>
            </div>
        </div>

        <!-- Edit metadata modal -->
        <slot name="metadataModal"></slot>
        <!-- Help modal -->
        <help-panel :helpSections="helpSections" :originalTextArray="originalTextArray"></help-panel>
        <!-- Reload config confirmation modal -->
        <confirmation-modal
            :name="`reload-config`"
            :message="$t('editor.refreshChanges.modal')"
            @ok="$emit('refresh-config')"
        />
    </div>
</template>

<script lang="ts">
import { useStateStore } from '@/stores/stateStore';
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';
import {
    BasePanel,
    ConfigFileStructure,
    HelpSection,
    ImagePanel,
    MetadataContent,
    MultiLanguageSlide,
    Slide,
    SourceCounts,
    StoryRampConfig,
    SupportedLanguages,
    TextPanel
} from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import axios from 'axios';
import { marked } from 'marked';

import SlideEditorV from './slide-editor.vue';
import SlideTocV from './slide-toc.vue';
import MetadataContentV from './helpers/metadata-content.vue';
import ConfirmationModalV from './helpers/confirmation-modal.vue';
import HelpPanelV from './help-panel.vue';
import HelpSectionV from './helpers/help-section.vue';
import { useLockStore } from '@/stores/lockStore';

@Options({
    components: {
        'metadata-content': MetadataContentV,
        'confirmation-modal': ConfirmationModalV,
        spinner: VueSpinnerOval,
        'slide-editor': SlideEditorV,
        'slide-toc': SlideTocV,
        'help-panel': HelpPanelV,
        'help-section': HelpSectionV
    }
})
export default class EditorV extends Vue {
    @Prop() configs!: {
        [key: string]: StoryRampConfig | undefined;
    };
    @Prop() configFileStructure!: ConfigFileStructure | undefined;
    @Prop() sourceCounts!: SourceCounts;
    @Prop() metadata!: MetadataContent;

    @Prop() slides!: MultiLanguageSlide[];
    @Prop() configLang!: string;
    @Prop() saving!: boolean;
    @Prop() unsavedChanges!: boolean;

    currentRoute = window.location.href;

    stateStore = useStateStore();

    // Form properties.
    uuid = '';
    logoImage: undefined | File = undefined;
    loadSlides: undefined | MultiLanguageSlide[] = undefined;
    currentSlide: Slide | string = '';
    slideIndex = -1;
    helpSections: HelpSection[] = [];
    helpMd = '';
    originalTextArray: string[] = [];

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

    @Watch('slides', { deep: true })
    onSlidesEdited(): void {
        this.$emit('save-status', true);
    }

    @Watch('metadata', { deep: true })
    onMetadataEdited(): void {
        this.$emit('save-status', true);
    }

    created(): void {
        this.loadSlides = this.slides;
        this.uuid = this.$route.params.uid as string;

        window.addEventListener('beforeunload', this.beforeWindowUnload);

        this.fetchMarkdown();
    }

    mounted(): void {
        // from https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/
        const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('z-40', e.intersectionRatio < 1), {
            threshold: [1]
        });

        observer.observe(document.querySelector('.editor-header') as Element);
    }

    beforeDestroy(): void {
        window.removeEventListener('beforeunload', this.beforeWindowUnload);
    }

    /**
     * Opens the mobile sidebar drawer.
     */
    openSidebar(): void {
        document.getElementById('sidebar-mobile')!.style.width = '20rem';
        document.getElementById('overlay')!.style.display = 'block'; // Show the overlay
        document.body.style.overflow = 'hidden'; // Disable background scrolling
    }

    /**
     * Closes the mobile sidebar drawer.
     */
    closeSidebar(): void {
        document.getElementById('sidebar-mobile')!.style.width = '0px';
        document.getElementById('overlay')!.style.display = 'none'; // Hide the overlay
        document.body.style.overflow = ''; // Re-enable background scrolling
    }

    /**
     * Change current slide to selected slide.
     */
    selectSlide(index: number, lang?: SupportedLanguages): void {
        // save changes to current slide before changing slides
        if (this.$refs.slide !== undefined) {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        // Quickly swap to loading page, and then swap to new slide. Allows Vue to re-draw page correctly.
        this.currentSlide = {
            title: '',
            panel: [{ type: 'loading-page' }, { type: 'loading-page' }]
        };

        const newLang = lang || this.configLang || 'en';
        if (this.configLang !== newLang) {
            this.$emit('lang-change', newLang);
        }

        setTimeout(() => {
            if (index === -1 || !this.loadSlides) {
                this.currentSlide = '';
            } else {
                const selectedLang = newLang as keyof MultiLanguageSlide;
                const selectedSlide = this.loadSlides[index][selectedLang];

                // If the requested language config for a slide doesn't exist, open the other language
                // This edge case should ONLY pop up while using the "Next/Previous Slide" buttons
                this.currentSlide = selectedSlide ?? this.loadSlides[index][selectedLang === 'en' ? 'fr' : 'en'] ?? '';
            }
            this.slideIndex = index;
            (this.$refs.slide as SlideEditorV).panelIndex = 0;
            (this.$refs.slide as SlideEditorV).advancedEditorView = false;
        }, 5);
    }

    /**
     * Update slide for a custom config made through advanced editor.
     */
    updateCustomSlide(slideConfig: Slide, save?: boolean, lang?: string): void {
        this.currentSlide = slideConfig;
        this.slides[this.slideIndex][(lang ?? this.configLang) as keyof MultiLanguageSlide] = slideConfig;

        this.configs[(lang ?? this.configLang) as keyof MultiLanguageSlide]!.slides[this.slideIndex] = slideConfig;

        // save changes emitted from advanced editor
        if (save) {
            this.$emit('save-changes');
        }
    }

    /**
     * Updates slides after adding, removing, or reordering.
     */
    updateSlides(slides: MultiLanguageSlide[]): void {
        this.loadSlides = slides;
        this.slideIndex = this.loadSlides.findIndex(
            (bothSlides) =>
                (this.currentSlide as Slide) === bothSlides['en'] || (this.currentSlide as Slide) === bothSlides['fr']
        );
        this.configs.en!.slides = this.slides.map((slides) => slides.en!);
        this.configs.fr!.slides = this.slides.map((slides) => slides.fr!);

        this.$emit("save-status", undefined, 'Slide updated');
    }

    /**
     * Fetch markdown content for help panel.
     */
    fetchMarkdown(): void {
        const helpPath = process.env.NODE_ENV === 'development' ? `../../help/` : `./help/`;
        const helpFile = `respect-help-${this.$route.params.lang}.md`;

        axios.get(`${helpPath}${helpFile}`).then((r) => {
            const reg = /^#\s(.*)\n{2}(?:.+|\n(?!\n{2,}))*/gm;
            const renderer = new marked.Renderer();
            renderer.image = (href: string, title: string, text: string) => {
                if (href.indexOf('http') === -1) {
                    href = helpPath + 'images/' + href;
                }
                return `<img src="${href}" alt="${text}">`;
            };
            this.helpMd = r.data.replace(new RegExp(String.fromCharCode(13), 'g'), '');
            let section;
            while ((section = reg.exec(this.helpMd))) {
                const info_results = marked(section[0].split('\n').splice(2).join('\n'), { renderer }) as string;
                this.helpSections.push({
                    header: section[1],
                    info: info_results,
                    drawn: true,
                    expanded: false
                });
                //copy of the original text to refer to after highlighting
                this.originalTextArray.push(info_results);
            }
        });
    }

    exportProduct(): void {
        if (this.$refs.slide != null && this.currentSlide !== '') {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        this.$emit('export-product');
    }

    /**
     * Open current editor config as a new Storylines product in new tab.
     * @param language The config language to preview (either 'en' or 'fr')
     */
    preview(language: string): void {
        // save current slide final changes before previewing product
        if (this.$refs.slide != null && this.currentSlide !== '') {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        const previewConfigs = this.configs;
        // Replace undefined slides with empty slides, just like in final save
        previewConfigs.en!.slides = previewConfigs.en!.slides.map((slide) => {
            return slide ?? JSON.parse(JSON.stringify(this.defaultBlankSlide));
        });
        previewConfigs.fr!.slides = previewConfigs.fr!.slides.map((slide) => {
            return slide ?? JSON.parse(JSON.stringify(this.defaultBlankSlide));
        });
        const lockStore = useLockStore();
        setTimeout(() => {
            const routeData = this.$router.resolve({
                name: 'preview',
                params: { lang: language, uid: this.uuid }
            });
            const previewTab = window.open(routeData.href, '_blank');
            (previewTab as Window).props = {
                configs: previewConfigs,
                configFileStructure: this.configFileStructure,
                secret: lockStore.secret,
                timeRemaining: lockStore.timeRemaining
            };
        }, 5);
    }

    saveChanges(): void {
        // save current slide final changes before generating config file
        if (this.$refs.slide !== undefined) {
            (this.$refs.slide as SlideEditorV).saveChanges();
        }

        // emit save changes event
        this.$emit('save-changes');
    }

    beforeWindowUnload(e: BeforeUnloadEvent): void {
        // show popup if when leaving page with unsaved changes
        if (this.unsavedChanges && !window.confirm()) {
            e.preventDefault();
        }
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

<style lang="scss">
.main-editor-container {
    margin: 0 auto;

    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
        'header-upper'
        'header'
        'main';
}

.editor-label {
    font-weight: 600;
    text-align: left;
}

.editor-h3 {
    font-size: larger;
}

.editor-input {
    padding: 7px 10px;
    margin-top: 3px;
    border: 1px solid #a1a1a1;
    //display: inline;
    border-radius: 5px;
    --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.editor-container .input-error {
    border: 1px solid red;
    outline-color: red;
}

.editor-button {
    border-radius: 3px;
    padding: 5px 12px;
    font-weight: 600;
    transition-duration: 0.2s;
}

.editor-forms-button {
    padding: 8px 15px;
    border-radius: 5px;
}

.editor-button:hover:enabled {
    background-color: #dbdbdb;
    color: black;
}

button:focus,
.editor-button:focus,
input:focus,
select:focus {
    outline: 2px solid royalblue;
    z-index: 2;
    outline-offset: 2px;
    transition-duration: 0.075s;
}

.editor-button:disabled {
    border: 1px solid gray;
    color: gray;
    cursor: not-allowed;
}

.editor-toc-button {
    background-color: #f3f4f6;
    color: black;
    border: none;
    transition-duration: 0.2s;
    padding: 0.25 0.25em !important;
}

.editor-header-upper {
    grid-area: 'header-upper';
    z-index: 150;
}

.editor-header {
    grid-area: header;
    z-index: 150;
}

.editor-body {
    grid-area: main;
    overflow: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.question-mark-button {
    font-size: 20px;
    line-height: 1.4rem;
    font-weight: 500;
}

.toc-popup-button {
    border: 1px solid rgb(135, 135, 135);
    background-color: rgb(243, 243, 243);
    border-radius: 3px;
    padding: 3px 12px;
}
.toc-popup-button:hover {
    background-color: rgb(234, 234, 234);
}
.toc-popup-button:active {
    background-color: rgb(221, 221, 221);
}

// Independent scrollable editor area only on desktop, so that header isn't fixed on mobile
// (takes up too much space)
@media only screen and (min-width: 768px) {
    .editor-area {
        overflow-y: auto;
        height: 100%;
    }
}

/*
 * Preview language selection dropdown styling
 * Base (pre-styling) code graciously provided by
 * https://www.w3schools.com/howto/howto_css_dropdown.asp
 */

/* Dropdown Button */
.dropbtn {
    background-color: white;
    color: black;
    padding: 5px 14px;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid black;
    transition: background-color 0.2s;
    border-radius: 3px;
}

/* Main dropdown icon - required for positioning */
.dropdown {
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0;
}

/* The dropdown box with the links */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border: 1px solid lightgray;
}

/* Links inside the dropdown */
.dropdown-content button {
    color: black;
    padding: 7px 10px;
    text-decoration: none;
    display: block;
    text-align: center;
    font-weight: 500;
    width: 100%;
}

/* Change color of dropdown links on hover */
.dropdown-content button:hover {
    background-color: #e6e5e5;
}

/* Show the dropdown menu on hover or focus */
.dropdown:hover .dropdown-content,
.dropdown:focus-within .dropdown-content {
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
    background-color: #dbdbdb;
}

#sidebar-mobile {
    z-index: 201 !important; // should be on top
    height: 100%;
    width: 0; /* Initial width is 0 to be hidden */
    max-width: 100%;
    position: fixed; /* Sidebar is fixed, hovering over content */
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.5s; /* Smooth transition when opening/closing */
    background-color: white;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Translucent black */
    z-index: 199; /* Ensure it appears just under the sidebar */
    display: none; /* Initially hidden */
}

.line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.mobile-hidden-text {
    width: auto;
}

@media only screen and (min-width: 768px) {
    #sidebar-desktop {
        display: block !important;
    }
}

@media only screen and (max-width: 768px) {
    .mobile-hidden-text {
        width: 0 !important;
        height: 0 !important;
        padding: 0;
        margin: 0;
        overflow: hidden;
        border: none;
    }
}
</style>

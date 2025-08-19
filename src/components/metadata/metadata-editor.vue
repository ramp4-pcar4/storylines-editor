<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
        <template v-if="!loadEditor">
            <div>
                <!-- Main section: Page header -->
                <header
                    class="flex justify-between flex-wrap items-center pt-3 pb-2 border-b-2 border-solid border-black mb-5"
                >
                    <div class="flex items-center gap-3 px-4 md:px-20">
                        <!-- Icon -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 36 36"
                            style="flex: 0 0 24px"
                        >
                            <path
                                fill="#DD2E44"
                                d="M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5s-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292s1.542-10.5 1.086-10.698s-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125s-3.337-1.48-3.793-1.282s1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5s-3.125.312-3.125 1s8.438 5.235 9 5.771s-2.914 2.802-2.417 3.229c.576.496 3.839-.83 10.417-.957V35a1 1 0 1 0 2 0v-6.04c6.577.127 9.841 1.453 10.417.957c.496-.428-2.979-2.694-2.417-3.229s9-5.084 9-5.771"
                            />
                        </svg>
                        <!-- Application title -->
                        <h1 style="padding-top: 2px" class="text-xl font-semibold">
                            {{ $t('editor.respectTitle') }}
                        </h1>
                    </div>
                    <!-- Language toggle -->
                    <router-link
                        class="px-7 md:px-20"
                        v-if="!currentRoute.includes('index-ca')"
                        :to="{
                            name: editExisting ? 'metadataExisting' : 'metadataNew',
                            params: editExisting
                                ? { lang: currLang === 'en' ? 'fr' : 'en', uid: uuid }
                                : { lang: currLang === 'en' ? 'fr' : 'en' }
                        }"
                    >
                        <div class="respected-standard-link-button">
                            {{ `${currLang === 'en' ? 'Français' : 'English'}` }}
                        </div>
                    </router-link>
                </header>
                <!-- Main section: Page body content -->
                <section class="px-7 md:px-20 py-5">
                    <!-- Body heading and instructions -->

                    <h1 class="text-2xl font-bold" :class="[!editExisting ? 'pb-6' : '']">
                        {{ editExisting ? $t('editor.loadProduct') : $t('editor.createProduct') }}
                    </h1>

                    <p v-if="editExisting" class="text-md mb-10">
                        {{ $t('editor.metadata.uuidInstructions') }}
                    </p>

                    <!-- Body section: UUID input and rename -->
                    <section>
                        <label for="uuid-input" class="font-bold mb-0"
                            >{{ $t('editor.uuid') }}
                            <span class="text-red-600 font-normal">{{ $t('editor.uuid.required') }}</span></label
                        >
                        <!-- Button to switch between loading and renaming product UUIDs. -->
                        <span v-if="editExisting && loadStatus === 'loaded'" class="p-1">
                            <button
                                class="ml-10 sub-link inline-block select-none text-sm"
                                @click="
                                    renameMode = !renameMode;
                                    changeUuid = '';
                                    warning = warning === 'rename' ? 'none' : warning;
                                "
                            >
                                {{ renameMode ? $t('editor.cancel') : $t('editor.changeUuid') }}
                            </button>
                        </span>

                        <p v-if="!editExisting" class="font-normal">
                            {{ $t('editor.metadata.newUuidInstructions') }}
                        </p>

                        <!-- Subsection: UUID inputs -->
                        <div class="pb-5 pt-1">
                            <!-- UUID rename inputs -->
                            <!-- Shows up after you load a UUID and click the 'rename uuid' button (not exact text) -->
                            <div v-if="renameMode" class="flex flex-row items-center w-full md:w-3/4">
                                <label for="rename-input" class="mr-6"> {{ $t('editor.uuid.new') }}: </label>
                                <input
                                    id="rename-input"
                                    class="respected-standard-input mt-0 flex-2"
                                    type="search"
                                    @input="
                                        error = false;
                                        checkUuid(true);
                                    "
                                    v-model="changeUuid"
                                    @keyup.enter="!error && warning === 'none' && renameProduct()"
                                    :class="{
                                        'input-error': warning === 'rename' || error || !reqFields.uuid
                                    }"
                                    v-tippy="{
                                        content: $t('editor.editMetadata.input.tooltip'),
                                        trigger: 'focusin',
                                        placement: 'top-end',
                                        touch: false
                                    }"
                                    spellcheck="false"
                                />
                                <button
                                    @click="renameProduct"
                                    style="margin-left: 0.75rem"
                                    class="respected-standard-button respected-black-bg-button respected-form-button"
                                    :class="{ 'input-error': error }"
                                    :disabled="
                                        changeUuid.length === 0 ||
                                        checkingUuid ||
                                        processingRename ||
                                        error ||
                                        warning === 'rename'
                                    "
                                >
                                    {{ $t('editor.rename') }}
                                </button>

                                <!-- If config is loading, display a small spinner. -->
                                <div class="inline-flex align-middle mb-1" v-if="checkingUuid || processingRename">
                                    <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                                </div>
                            </div>
                            <!-- UUID entry (default) -->
                            <!-- Loads a new UUID -->
                            <div v-else class="flex flex-row items-center">
                                <div class="flex flex-row items-center w-full">
                                    <div class="relative w-full md:w-3/5 inline-block">
                                        <!-- Note: 'search'-type inputs will delete their inputted data if you press ESC. -->
                                        <input
                                            id="uuid-input"
                                            class="respected-standard-input mt-0"
                                            :disabled="loadStatus === 'loading'"
                                            type="search"
                                            @input="
                                                error = false;
                                                reqFields.uuid = true;
                                                checkUuid();
                                            "
                                            v-model.trim="uuid"
                                            v-on:keyup.enter="handleUuidEnter"
                                            @focus="showDropdown = true"
                                            @blur="showDropdown = false"
                                            @keydown.down.prevent="highlightNext"
                                            @keydown.up.prevent="highlightPrevious"
                                            @keydown.enter.prevent="selectHighlighted"
                                            :class="{
                                                'input-error': error || !reqFields.uuid,
                                                'input-success': loadStatus === 'loaded',
                                                'input-warning': warning !== 'none'
                                            }"
                                            v-tippy="{
                                                content: $t('editor.editMetadata.input.tooltip'),
                                                trigger: 'focusin',
                                                placement: 'top-end',
                                                touch: false
                                            }"
                                            spellcheck="false"
                                        />
                                        <!-- Previous storylines (?) dropdown -->
                                        <div
                                            class="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-60vh overflow-y-auto"
                                            v-show="showDropdown"
                                        >
                                            <ul>
                                                <li
                                                    v-for="(storyline, index) in getStorylines"
                                                    :key="storyline.uuid"
                                                    @mousedown.prevent="selectUuid(storyline.uuid)"
                                                    :class="[
                                                        'p-2 hover:bg-gray-100 cursor-pointer',
                                                        storyline.isUserStoryline ? 'bg-gray-200' : '',
                                                        { 'bg-gray-300': highlightedIndex === index }
                                                    ]"
                                                >
                                                    <div>
                                                        {{ storyline.uuid }} - <b>{{ getTitle(storyline) }}</b>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- If config is loading, display a small spinner. -->
                                    <div
                                        class="inline-flex align-middle ml-1 mb-1"
                                        v-if="checkingUuid && !editExisting"
                                    >
                                        <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                                    </div>
                                    <!-- Load UUID button -->
                                    <!-- Load storyline with the given UUID, if it exists on the server, and also
                                         any history associated with the product that can be found -->
                                    <button
                                        @click="handleUuidLoad"
                                        style="margin-left: 0.75rem"
                                        class="respected-standard-button respected-black-bg-button respected-form-button"
                                        :class="{ 'input-error': error }"
                                        :disabled="loadStatus === 'loading'"
                                        v-if="editExisting"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M9.8 21.75q-3.425-.775-5.613-3.5T2 12t2.188-6.25T9.8 2.25q.475-.125.838.175t.362.8q0 .35-.2.625t-.55.35Q7.5 4.825 5.75 7T4 12t1.75 5t4.5 2.8q.35.075.55.35t.2.625q0 .5-.362.8t-.838.175m4.4 0q-.475.125-.837-.175t-.363-.8q0-.35.2-.625t.55-.35q.675-.15 1.313-.413t1.212-.637q.275-.2.613-.15t.587.3q.35.35.3.813t-.45.737q-.725.45-1.513.775t-1.612.525m4.7-4.25q-.25-.25-.3-.587t.15-.613q.375-.575.638-1.225t.412-1.325q.075-.35.35-.537t.625-.188q.5 0 .8.363t.175.837q-.2.825-.525 1.613t-.775 1.512q-.275.4-.737.45t-.813-.3m1.875-6.5q-.35 0-.625-.2t-.35-.55q-.15-.675-.413-1.312t-.637-1.213q-.2-.3-.15-.637t.3-.588q.35-.35.813-.3t.737.475q.45.725.775 1.513T21.75 9.8q.125.475-.175.838t-.8.362m-4.5-5.75q-.575-.375-1.212-.638T13.75 4.2q-.35-.075-.55-.35t-.2-.625q0-.5.363-.8t.837-.175q.825.2 1.613.525t1.512.775q.425.275.475.738t-.3.812q-.25.25-.587.3t-.638-.15m-3.3 7.875l1.85-1.85q.3-.3.725-.3t.725.3t.288.725t-.313.725L12.675 16.3q-.275.275-.7.275t-.7-.275L7.65 12.65q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3l1.875 1.9V8q0-.425.288-.712T11.975 7t.713.288t.287.712z"
                                            />
                                        </svg>
                                        <div>{{ $t('editor.load') }}</div>
                                    </button>
                                </div>
                            </div>
                            <!-- Subsection: Loading icon -->
                            <!-- Shows up after the load UUID button is pressed.
                                 Displays a large spinner to indicate that config is loading.
                                 Also provides a button to cancel the loading, if desired. -->
                            <section class="flex flex-col gap-5 mt-10" v-if="loadStatus === 'loading'">
                                <!-- Loading text -->
                                <p>
                                    {{ $t('editor.editMetadata.loading') }}
                                </p>
                                <!-- Spinner -->
                                <div class="align-middle mb-1">
                                    <spinner size="65px" thickness="20" color="#009cd1" class="mx-2 my-auto"></spinner>
                                </div>
                                <!-- Cancel load button -->
                                <div class="flex">
                                    <a class="sub-link text-left" @click="controller.abort">{{
                                        $t('editor.editMetadata.load.cancel')
                                    }}</a>
                                </div>
                            </section>

                            <div>
                                <!-- Display a warning if there is one. -->
                                <span
                                    v-if="warning !== 'none'"
                                    class="flex flex-row items-center text-accent-dark-orange rounded p-1"
                                >
                                    <span
                                        class="align-middle inline-block mr-1 fill-current"
                                        :class="{ 'sm:ml-24': renameMode }"
                                    >
                                        <svg
                                            clip-rule="evenodd"
                                            fill-rule="evenodd"
                                            stroke-linejoin="round"
                                            stroke-miterlimit="2"
                                            viewBox="0 0 24 24"
                                            width="18"
                                            height="18"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                                                fill-rule="nonzero"
                                            />
                                        </svg>
                                    </span>
                                    <div>
                                        <span class="inline-block select-none text-sm">{{
                                            $t(`editor.warning.${warning}`, warning === 'uuidNotFound' ? { uuid } : {})
                                        }}</span>
                                    </div>
                                    <br />
                                </span>
                            </div>
                        </div>
                    </section>

                    <br />

                    <!-- Body section: Main page contents. -->
                    <!--Shows up either: once a UUID is entered and the storyline is loaded (existing), or immediately (new)-->
                    <section v-if="!editExisting || loadStatus === 'loaded'">
                        <!-- Subsection: Version history (existing only) -->
                        <section v-if="editExisting" class="pb-10">
                            <!-- Header -->
                            <h1 class="text-2xl font-semibold">
                                {{ $t('editor.editMetadata.versionHistory.header') }}
                            </h1>
                            <!-- Text indicating the amount of history results found -->
                            <p>
                                {{
                                    storylineHistory.length === 0
                                        ? $t('editor.editMetadata.versionHistory.noResults')
                                        : $t('editor.editMetadata.versionHistory.resultsFound')
                                }}
                            </p>
                            <!-- History results, if there are any -->
                            <div class="flex flex-col gap-5 pt-5" v-if="storylineHistory.length !== 0">
                                <div class="flex">
                                    <button
                                        class="respected-standard-button respected-gray-border-button respected-mainline-button"
                                        @click="() => (showHistory = !showHistory)"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <g
                                                fill="none"
                                                stroke="#374151"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                            >
                                                <path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                <path d="M3 3v5h5m4-1v5l4 2" />
                                            </g>
                                        </svg>
                                        <div>
                                            {{
                                                showHistory
                                                    ? $t('editor.editMetadata.versionHistory.buttonHide')
                                                    : $t('editor.editMetadata.versionHistory.buttonShow')
                                            }}
                                        </div>
                                    </button>
                                </div>

                                <!-- Version history table -->
                                <table v-show="showHistory" class="shadow-lg bg-white w-full md:w-3/4 lg:w-1/2">
                                    <colgroup>
                                        <col class="w-3/5" />
                                        <col span="1" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <td
                                                style="background-color: #e7e7e7"
                                                class="font-bold border-b border-solid border-black"
                                            >
                                                <div class="m-2 mr-0 ml-3">
                                                    {{ $t('editor.editMetadata.versionHistory.saveDate') }}
                                                </div>
                                            </td>
                                            <td
                                                style="background-color: #e7e7e7"
                                                class="font-bold border-b border-solid border-black"
                                            >
                                                <div class="ml-0">
                                                    {{ $t('editor.editMetadata.versionHistory.actions') }}
                                                </div>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(historyItem, idx) in storylineHistory" :key="idx">
                                            <td
                                                style="background-color: #f9f9f9"
                                                class="border-b border-solid pl-4"
                                                :class="
                                                    idx === storylineHistory.length - 1
                                                        ? 'border-black'
                                                        : 'border-gray-200'
                                                "
                                            >
                                                {{ formatDate(historyItem.created) }}
                                            </td>
                                            <td
                                                style="background-color: #f9f9f9"
                                                class="border-b border-solid py-3 pr-3"
                                                :class="
                                                    idx === storylineHistory.length - 1
                                                        ? 'border-black'
                                                        : 'border-gray-200'
                                                "
                                            >
                                                <button
                                                    class="respected-standard-button respected-gray-border-button respected-mainline-button"
                                                    @click="
                                                        () => {
                                                            selectHistory(historyItem);
                                                            loadHistory();
                                                        }
                                                    "
                                                >
                                                    <span>{{ $t('editor.editMetadata.versionHistory.load') }}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <!-- Subsection: Metadata details form -->
                        <section>
                            <!-- Headings (pre-form) -->
                            <section class="mb-4 flex gap-2 items-start md:items-center flex-col md:flex-row">
                                <!-- Heading/subheading text -->
                                <div class="flex-1">
                                    <h1 class="text-2xl font-semibold">{{ $t('editor.productDetails') }}</h1>
                                    <p>
                                        {{
                                            editExisting
                                                ? $t('editor.metadata.instructions.existing')
                                                : $t('editor.metadata.instructions.new')
                                        }}
                                    </p>
                                </div>
                                <!-- Preview project button (existing only) -->
                                <button
                                    v-if="editExisting"
                                    @click="preview"
                                    class="respected-standard-button respected-gray-border-button"
                                >
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
                                    <div>{{ $t('editor.editMetadata.previewProject') }}</div>
                                </button>
                            </section>
                            <!-- ENG/FR config language toggle -->
                            <a class="sub-link" @click="swapLang()" tabindex="0">
                                {{
                                    productStore.configLang === 'en'
                                        ? $t('editor.frenchConfig')
                                        : $t('editor.englishConfig')
                                }}
                            </a>
                            <!-- Metadata form -->
                            <div class="px-4 md:px-8 py-5 border rounded-md">
                                <!-- Edit form button (existing only) -->
                                <!-- Form defaults to view-only for existing projects, can edit only if this button pressed -->
                                <button
                                    v-if="!editingMetadata"
                                    @click="editingMetadata = !editingMetadata"
                                    class="respected-standard-button respected-gray-border-button md:float-right mb-3"
                                >
                                    <svg
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
                                    <p class="text-left">{{ $t('editor.editMetadata') }}</p>
                                </button>
                                <div class="overflow-visible">
                                    <!-- The form -->
                                    <!-- If editingMetadata === false, form is read-only; if true, it can be edited -->
                                    <!-- New projects can only be in edit mode; existing projects can be in both -->
                                    <metadata-content
                                        :metadata="metadata"
                                        :editing="editingMetadata"
                                        @metadata-changed="updateMetadata"
                                        @image-changed="onFileChange"
                                        @image-source-changed="onImageSourceInput"
                                        @logo-removed="productStore.decrementSourceCount('Logo')"
                                        @background-removed="productStore.decrementSourceCount('Background')"
                                    ></metadata-content>
                                    <!-- Save/discard changes buttons (existing only) -->
                                    <div v-if="editingMetadata && editExisting" class="flex gap-3 mt-2">
                                        <!-- Save changes -->
                                        <!-- Saves to remote copy on server -->
                                        <!-- NOTE: Changes are saved to local copy automatically as you fill the form. To delete these changes, press the discard button -->
                                        <button
                                            @click="saveMetadata(true)"
                                            class="respected-standard-button respected-black-bg-button"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                x="0px"
                                                y="0px"
                                                viewBox="0 0 122.73 122.88"
                                                style="
                                                    margin-top: 3px;
                                                    margin-bottom: 3px;
                                                    enable-background: new 0 0 122.73 122.88;
                                                "
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
                                            <div>{{ $t('editor.saveChanges') }}</div>
                                        </button>
                                        <!-- Discard changes -->
                                        <!-- Reverts to state before you enabled edit mode -->
                                        <button
                                            @click="discardMetadataUpdates()"
                                            class="respected-standard-button respected-gray-border-button"
                                        >
                                            {{ $t('editor.discardChanges') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>
            </div>

            <!-- Main section: page back/continue buttons -->
            <div class="flex px-7 md:px-20 py-5 mt-8" :disabled="loadStatus === 'loading'">
                <!-- Back button -->
                <!-- Moves you to the dashboard again -->
                <router-link :to="{ name: 'home' }" target tabindex="-1">
                    <button class="respected-standard-button respected-gray-border-button gap-1" tabindex="0">
                        <svg
                            style="margin-top: 1px"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                            />
                        </svg>
                        <div class="flex items-center gap-1">
                            {{ $t('editor.back') }}
                        </div>
                    </button>
                </router-link>
                <!-- Continue button -->
                <!-- Moves you to the editor -->
                <div class="ml-auto">
                    <div
                        class="flex justify-end gap-1 items-center"
                        :class="{ hidden: editExisting && loadStatus !== 'loaded' }"
                    >
                        <!-- If config is loading, display a small spinner. -->
                        <div class="inline-flex align-middle ml-1 mb-1" v-if="loadingIntoEditor">
                            <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                        </div>
                        <button
                            :disabled="loadingIntoEditor || !uuid || error || loadStatus === 'loading' || checkingUuid"
                            @click="warning === 'none' ? continueToEditor() : $vfm.open(`confirm-uuid-overwrite`)"
                            class="respected-standard-button respected-black-bg-button gap-1"
                        >
                            <div>{{ $t('editor.next') }}</div>
                            <svg
                                style="margin-top: 1px"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    class="fill-current"
                                    d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
                                />
                            </svg>
                        </button>
                    </div>

                    <confirmation-modal
                        :name="`confirm-uuid-overwrite`"
                        :message="
                            $t('editor.confirmOverwrite', {
                                uuid: uuid
                            })
                        "
                        @ok="continueToEditor()"
                    />
                </div>
            </div>
        </template>

        <!-- Loading spinner for when product is still being fetched -->
        <template v-if="loadEditor && loadStatus !== 'loaded'">
            <div class="flex flex-col justify-center items-center p-20" style="margin-top: 15%">
                <div class="py-10 text-xl text-center">{{ $t('editor.editMetadata.loading') }}</div>
                <spinner size="200px" color="#009cd1"></spinner>
            </div>
        </template>

        <!-- The editor -->
        <template v-if="loadEditor && loadStatus === 'loaded'">
            <editor
                :metadata="metadata"
                :slides="slides"
                :saving="saving"
                :unsavedChanges="unsavedChanges"
                @save-changes="onSave"
                @refresh-config="refreshConfig"
                @export-product="exportProduct"
                @lang-change="productStore.changeLang"
                @open-metadata-modal="openMetadataModal"
                ref="mainEditor"
            >
                <!-- Metadata editing modal inside the editor -->
                <!-- Click Done or outside the modal to save changes LOCALLY. -->
                <template v-slot:metadataModal>
                    <metadata-modal
                        :metadata="metadata"
                        @save-changes="saveMetadata(false)"
                        @lang-change="swapLang()"
                        @metadata-changed="updateMetadata"
                        @image-changed="onFileChange"
                        @image-source-changed="onImageSourceInput"
                    ></metadata-modal>
                </template>
            </editor>
        </template>
        <confirmation-modal
            :name="`confirm-extend-session-editor`"
            :message="
                $t('editor.extendSession', {
                    mins: Math.floor(lockStore.timeRemaining / 60),
                    secs: lockStore.timeRemaining - Math.floor(lockStore.timeRemaining / 60) * 60,
                    totalMins: totalTime
                })
            "
            :messageClass="'text-lg'"
            @ok="extendSession(true)"
        />
    </div>
</template>

<script lang="ts">
import ActionModal from '@/components/support/action-modal.vue';
import { Save, useStateStore } from '@/stores/stateStore';
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';
import { RouteLocationNormalized } from 'vue-router';
import { AxiosResponse } from 'axios';
import { debounce } from 'throttle-debounce';
import {
    ConfigFileStructure,
    MetadataContent,
    MultiLanguageSlide,
    Slide,
    SourceCounts,
    StoryRampConfig,
    TextPanel
} from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import { useUserStore } from '../../stores/userStore';
import { computed } from 'vue';

import JSZip from 'jszip';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';

import Message from 'vue-m-message';
import SlideEditorV from '../slide-editor.vue';
import SlideTocV from '../slide-toc/slide-toc.vue';
import MetadataContentV from './metadata-content.vue';
import MetadataModalV from './metadata-modal.vue';
import ConfirmationModalV from '../support/confirmation-modal.vue';
import EditorV from '../editor.vue';

import cloneDeep from 'clone-deep';
import { useLockStore } from '@/stores/lockStore';
import { useProductStore } from '@/stores/productStore';

interface RouteParams {
    uid: string;
    configLang: string;
    configs: {
        [key: string]: StoryRampConfig | undefined;
    };
    configFileStructure: ConfigFileStructure;
    metadata: MetadataContent;
    slides: Slide[];
    sourceCounts: SourceCounts;
    existing: boolean;
    unsavedChanges: boolean;
}

interface History {
    hash: string;
    storylineUUID: string;
    created: string;
}

@Options({
    components: {
        ActionModal,
        Editor: EditorV,
        'confirmation-modal': ConfirmationModalV,
        'metadata-content': MetadataContentV,
        'metadata-modal': MetadataModalV,
        spinner: VueSpinnerOval,
        'slide-editor': SlideEditorV,
        'slide-toc': SlideTocV
    }
})
export default class MetadataEditorV extends Vue {
    @Prop({ default: true }) editExisting!: boolean; // true if editing existing storylines product, false if new product

    currentRoute = window.location.href;
    user = computed(() => useUserStore().userProfile.userName || 'Guest');
    loadExisting = false;
    reloadExisting = false;
    loadStatus = 'waiting';
    checkingUuid = false;
    loadingIntoEditor = false;
    loadEditor = false;
    error = false; // whether an error has occurred
    warning: 'none' | 'uuid' | 'rename' | 'blank' | 'badChar' | 'uuidNotFound' = 'none'; // used for duplicate uuid warning
    currLang = 'en'; // page language
    showDropdown = false;
    highlightedIndex = -1;
    lockStore = useLockStore();
    stateStore = useStateStore();
    latestSchemaVersion = '';

    productStore = useProductStore();

    storylineHistory: History[] = [];
    selectedHistory: History | null = null;
    showHistory = false;

    // Saving properties.
    saving = false;
    unsavedChanges = this.stateStore.isChanged;

    @Watch('stateStore.isChanged')
    onChanged() {
        this.unsavedChanges = this.stateStore.isChanged;
    }

    @Watch('stateStore.reconcileToggler')
    onReconciliationRequest() {
        const newConfigs = this.stateStore.addChangesToNewSave(this.stateStore.getCurrentChangeLocation());

        this.productStore.configs.en = newConfigs.en;
        this.productStore.configs.fr = newConfigs.fr;
    }

    controller = new AbortController();

    apiUrl = import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040';

    // Form properties.
    uuid = '';
    baseUuid = ''; // to save the original UUID
    changeUuid = ''; // the model for the rename input
    renameMode = false; // if currently in rename mode
    processingRename = false; // only true while we're waiting for the server to process a rename
    logoImage: undefined | File = undefined;
    introBgImage: undefined | File = undefined;
    metadata: MetadataContent = {
        title: '',
        introTitle: '',
        introSubtitle: '',
        logoPreview: '',
        logoName: '',
        logoAltText: '',
        introBgName: '',
        introBgPreview: '',
        titleColour: '#1f2937',
        subtitleColour: '#6b7280',
        buttonColour: '#00d2d3',
        contextLink: '',
        contextLabel: '',
        tocOrientation: '',
        returnTop: true,
        sameConfig: true,
        dateModified: '',
        schemaVersion: ''
    };
    editingMetadata = false;
    temporaryMetadataCopy: MetadataContent = {
        // A copy to save changes before edit, so they can be reverted
        title: '',
        introTitle: '',
        introSubtitle: '',
        logoPreview: '',
        logoName: '',
        logoAltText: '',
        introBgName: '',
        introBgPreview: '',
        titleColour: '',
        subtitleColour: '',
        buttonColour: '',
        contextLink: '',
        contextLabel: '',
        tocOrientation: '',
        returnTop: true,
        sameConfig: true,
        dateModified: '',
        schemaVersion: ''
    };
    defaultBlankSlide: Slide = {
        title: '',
        backgroundImage: '',
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
    // add more required metadata fields to here as needed
    reqFields: { uuid: boolean } = {
        uuid: true
    };
    slides: MultiLanguageSlide[] = [];
    sourceCounts: SourceCounts = {};
    sessionExpired = false;
    totalTime = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_END) : 30;

    @Watch('loadEditor')
    @Watch('loadStatus')
    onEditorStateChange() {
        // Prevent double scrollbars when in main editor, but NOT in create/load product pages
        this.updateBodyClass();
    }

    // Adds a class that hides overflow (whole-page scrollbars) only when the main editor is loaded.
    // The create/load product forms obviously need scrollbars
    updateBodyClass() {
        if (this.loadEditor && this.loadStatus === 'loaded') {
            document.body.classList.add('editor-mode');
        } else {
            document.body.classList.remove('editor-mode');
        }
    }

    mounted(): void {
        import('ramp-storylines_demo-scenarios-pcar/dist/StorylinesSchema.json').then((StorylinesSchema) => {
            this.latestSchemaVersion = StorylinesSchema.version;
        });
        this.currLang = (this.$route.params.lang as string) || 'en';
        this.editingMetadata = !this.editExisting;

        // Prevent double scrollbars when in main editor, but NOT in create/load product pages
        this.updateBodyClass();
    }

    beforeDestroy(): void {
        document.body.classList.remove('editor-mode');
    }

    created(): void {
        this.loadExisting = this.editExisting;
        // Generate UUID for new product
        this.uuid = (this.$route.params.uid as string) ?? (this.loadExisting ? undefined : uuidv4());
        this.productStore.configLang = (this.$route.params.lang as string) || 'en';

        // Initialize Storylines config and the configuration structure.
        this.productStore.configs = { en: undefined, fr: undefined };
        this.productStore.configFileStructure = {} as ConfigFileStructure;

        // set any metadata default values for creating new product
        if (!this.loadExisting) {
            // set current date as default
            const curDate = new Date();
            const year = curDate.getFullYear();
            const month = (curDate.getMonth() + 1).toString().padStart(2, '0');
            const day = curDate.getDate().toString().padStart(2, '0');
            this.metadata.dateModified = `${year}-${month}-${day}`;
            // set vertical as the default table of contents orientation
            this.metadata.tocOrientation = 'vertical';
            this.metadata.returnTop = true;
            this.metadata.sameConfig = true;
        }
        // Find which view to render based on route
        if (this.$route.name === 'editor') {
            this.loadEditor = true;
            const props = this.$route.meta.data as RouteParams;

            // Properties already passed in props and storyline is locked, load editor view (could use a refactor to clean up this workflow process)
            if (props && props.configs && props.configFileStructure && this.lockStore.uuid) {
                this.productStore.configs = props.configs;
                this.productStore.configLang = props.configLang;
                this.productStore.configFileStructure = props.configFileStructure;

                this.metadata = props.metadata;
                this.productStore.sourceCounts = props.sourceCounts;
                this.loadExisting = props.existing;
                this.unsavedChanges = props.unsavedChanges;

                this.loadSlides(props.configs);

                // Load product logo and the introduction slide background image (if provided).
                const logoAsset = this.productStore.configs[this.productStore.configLang]?.introSlide.logo?.src;
                const introBgAsset =
                    this.productStore.configs[this.productStore.configLang]?.introSlide.backgroundImage;

                Promise.all([
                    this.processAsset(logoAsset, this.metadata.logoName),
                    this.processAsset(introBgAsset, this.metadata.introBgName)
                ]).then(([logoData, introBgData]) => {
                    if (logoData) {
                        this.logoImage = logoData.file;
                        this.metadata.logoPreview = logoData.preview;

                        // If an external source, fill in the name field whether it exists or not.
                        if (logoData.external) {
                            this.metadata.logoName = logoAsset ?? '';
                        }
                    }

                    if (introBgData) {
                        this.introBgImage = introBgData.file;
                        this.metadata.introBgPreview = introBgData.preview;

                        // If an external source, fill in the name field whether it exists or not.
                        if (introBgData.external) {
                            this.metadata.introBgName = introBgAsset ?? '';
                        }
                    }
                    this.loadStatus = 'loaded';
                });

                this.lockStore.broadcast!.onmessage = (e) => {
                    // session was extended from the preview tab, need to handle in editor tab
                    const msg = e.data;
                    if (msg.action === 'extend') {
                        this.$vfm.close('confirm-extend-session-editor');
                        this.extendSession(msg.showPopup);
                    }
                };
                this.extendSession(true);

                return;
            }
        }

        // If a product UUID is provided, fetch the contents from the server.
        if (this.$route.params.uid) {
            this.generateRemoteConfig().catch(() => {
                // Handle any connection/lock errors here
                Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                if (this.$route.name === 'editor') {
                    setTimeout(() => {
                        this.$router.push({ name: 'home' });
                    }, 2000);
                }
            });
        }
    }

    handleSessionTimeout(): void {
        // We prompt the user to extend the session when session warn minutes have passed.
        const warnTime = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_WARN) : 5;
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
        const timeBuffer = isFirefox ? 2000 : 0;
        this.lockStore.confirmationTimeout = setTimeout(
            () => {
                // First, remove inactivity event listeners, otherwise moving the mouse will extend the session!.
                document.onmousemove = () => undefined;
                document.onkeydown = () => undefined;
                this.$vfm.open(`confirm-extend-session-editor`);
                this.lockStore.broadcast?.postMessage({ action: 'confirm', value: this.lockStore.timeRemaining });
            },
            this.lockStore.timeRemaining * 1000 - warnTime * 60 * 1000 + timeBuffer
        );
        // After the timer has run out, if the session was not extended, go back to the landing page (which will unlock the storyline).
        this.lockStore.endTimeout = setTimeout(
            () => {
                // First, remove inactivity event listeners, otherwise moving the mouse will extend the session!.
                document.onmousemove = () => undefined;
                document.onkeydown = () => undefined;
                this.sessionExpired = true;
                this.$vfm.close('confirm-extend-session-editor');
                if (this.$route.name === 'editor') {
                    (this.$refs['mainEditor'] as any).saveChanges();
                } else {
                    this.generateConfig();
                }
            },
            this.lockStore.timeRemaining * 1000 + 1000 + timeBuffer
        );
        // Now add event listeners to detect for inactivity.
        document.onmousemove = () => this.extendSession();
        document.onkeydown = () => this.extendSession();
    }

    extendSession(showPopup?: boolean): void {
        // Clear any lingering timers
        clearTimeout(this.lockStore.endTimeout);
        clearTimeout(this.lockStore.confirmationTimeout);
        if (showPopup) {
            Message.success(this.$t('editor.session.extended'));
            this.lockStore.broadcast?.postMessage({ action: 'extend' });
        }
        // If the user wants to extend the timer, this method will reset the time remaining.
        this.lockStore.resetSession();
        // We need to call this method again because we need to keep checking that the time has not run out.
        this.handleSessionTimeout();
    }

    processAsset(assetPath: string | undefined, name: string): Promise<any> {
        if (!assetPath) return Promise.resolve();

        // Load asset (if provided).
        return new Promise((res) => {
            const assetSrc = assetPath.split('/').slice(1).join('/'); // Omit product UUID
            const assetFile = this.productStore.configFileStructure.zip.file(assetSrc);
            const assetType = assetSrc.split('.').at(-1);

            if (assetFile) {
                if (assetType !== 'svg') {
                    assetFile.async('blob').then((img: Blob) => {
                        res({
                            file: new File([img], name),
                            preview: URL.createObjectURL(img),
                            external: false // indicates that this asset lives in the ZIP folder
                        });
                    });
                } else {
                    assetFile.async('text').then((img) => {
                        const assetImageFile = new File([img], name, {
                            type: 'image/svg+xml'
                        });
                        res({
                            file: assetImageFile,
                            preview: URL.createObjectURL(assetImageFile),
                            external: false
                        });
                    });
                }
            } else {
                // If it doesn't exist, maybe it's a remote file?
                fetch(assetPath).then((data: Response) => {
                    if (data.status !== 404) {
                        data.blob().then((blob: Blob) => {
                            res({
                                file: new File([blob], name),
                                preview: assetPath,
                                external: true // indicates that this is an external asset
                            });
                        });
                    } else {
                        res(undefined); // resolve on 404 error, so that loadStatus gets set to loaded
                    }
                });
            }
        });
    }

    /**
     * Open current editor config as a new Storylines product in new tab.
     * Note: Preview button on metadata editor will only show when editing an existing product, not when creating a new one
     * This is a design decision, can change if we decide that people would want to preview new products for some reason
     */
    preview(): void {
        // save current metadata final changes before previewing product
        this.saveMetadata(false);
        setTimeout(() => {
            const routeData = this.$router.resolve({
                name: 'preview',
                params: { lang: this.productStore.configLang, uid: this.uuid }
            });
            const previewTab = window.open(routeData.href, '_blank');
            (previewTab as Window).props = {
                configs: this.productStore.configs,
                configFileStructure: this.productStore.configFileStructure,
                secret: this.lockStore.secret,
                timeRemaining: this.lockStore.timeRemaining
            };
        }, 5);
    }

    /**
     * Loads the slide variable with both EN and FR language configs.
     * @param configs The config object with separate EN and FR StoryRamp configs.
     */
    loadSlides(configs: { [p: string]: StoryRampConfig | undefined }): void {
        const engSlides =
            configs.en?.slides.map((engSlide) => {
                return {
                    // "Undefined" slides will be the undefined type while inside Storylines Editor, and {} on save/in file.
                    en: engSlide && Object.keys(engSlide).length ? (engSlide as Slide) : undefined
                };
            }) ?? [];
        const frSlides =
            configs.fr?.slides.map((frSlide) => {
                return {
                    // "Undefined" slides will be the undefined type while inside Storylines Editor, and {} on save/in file.
                    fr: frSlide && Object.keys(frSlide).length ? (frSlide as Slide) : undefined
                };
            }) ?? [];

        const maxLength = frSlides.length > engSlides.length ? frSlides.length : engSlides.length;
        this.slides = Array.from({ length: maxLength }, (_, index) =>
            Object.assign({}, engSlides?.[index] || { en: undefined }, frSlides?.[index] || { fr: undefined })
        );
    }

    /**
     * Generates a new product file for brand new products.
     * @param uuidCheck Passed to configFileStructureHelper to control UUID validation behavior.
     */
    generateNewConfig(uuidCheck: boolean = true): void {
        const configLang = this.productStore.configLang;
        const configZip = new JSZip();
        // Generate a new configuration file and populate required fields.
        this.productStore.configs[configLang] = this.configHelper();
        const config = this.productStore.configs[configLang] as StoryRampConfig;
        config.introSlide.logo.altText = this.metadata.logoAltText ?? '';
        config.schemaVersion = this.latestSchemaVersion;

        // Set the source of the product logo
        if (!this.metadata.logoName) {
            config.introSlide.logo.src = '';
        } else if (!this.metadata.logoName.includes('http')) {
            config.introSlide.logo.src = `${this.uuid}/assets/shared/${this.logoImage?.name}`;
        } else {
            config.introSlide.logo.src = this.metadata.logoName;
        }

        // Set the source of the introduction slide background image
        if (!this.metadata.introBgName) {
            config.introSlide.backgroundImage = '';
        } else if (!this.metadata.introBgName.includes('http')) {
            config.introSlide.backgroundImage = `${this.uuid}/assets/shared/${this.introBgImage?.name}`;
        } else {
            config.introSlide.backgroundImage = this.metadata.introBgName;
        }

        config.slides = [];

        const otherLang = this.productStore.oppositeLang;
        const baseConfig = (this.productStore.configs[otherLang] = cloneDeep(config));
        Object.assign(baseConfig, {
            title: '',
            lang: this.productStore.oppositeLang,
            contextLink: '',
            contextLabel: '',
            introSlide: {
                title: '',
                subtitle: '',
                logo: { src: '', altText: '' },
                backgroundImage: ''
            }
        });
        const otherConfig = this.productStore.configs[otherLang] as StoryRampConfig;
        const formattedOtherLangConfig = JSON.stringify(otherConfig, null, 4);

        // Add the newly generated Storylines configuration file to the ZIP file.
        const formattedConfigFile = JSON.stringify(config, null, 4);

        configZip.file(`${this.uuid}_${configLang}.json`, formattedConfigFile);
        configZip.file(`${this.uuid}_${otherLang}.json`, formattedOtherLangConfig);

        // Generate the file structure, defer uploading the image until the structure is created.
        this.configFileStructureHelper(configZip, uuidCheck, [this.logoImage, this.introBgImage]);
    }

    configHelper(): StoryRampConfig {
        return {
            title: this.metadata.title,
            schemaVersion: '',
            lang: this.productStore.configLang,
            introSlide: {
                logo: {
                    src: ''
                },
                backgroundImage: '',
                title: this.metadata.introTitle,
                subtitle: this.metadata.introSubtitle,
                titleColour: this.metadata.titleColour,
                subtitleColour: this.metadata.subtitleColour,
                buttonColour: this.metadata.buttonColour
            },
            slides: [],
            contextLabel: this.metadata.contextLabel,
            contextLink: this.metadata.contextLink,
            tocOrientation: this.metadata.tocOrientation,
            returnTop: this.metadata.returnTop,
            sameConfig: this.metadata.sameConfig,
            dateModified: this.metadata.dateModified
        };
    }

    /**
     * Provided with a UID and version, retrieve the project contents from the file server.
     */
    loadVersion(version: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.uuid === undefined || this.uuid === '') {
                Message.error(this.$t('editor.warning.mustEnterUuid'));
                this.loadStatus = 'waiting';
                reject();
                return;
            }
            // Create a new AbortController for each fetch attempt
            // as they get 'used up' after each successful abort() call
            this.controller = new AbortController();
            this.loadStatus = 'loading';
            const secret = this.lockStore.secret;
            fetch(this.apiUrl + `/retrieve/${this.uuid}/${version}`, {
                headers: { user: this.user as any, secret: secret },
                signal: this.controller.signal
            })
                .then((res: Response) => {
                    if (res.status === 404) {
                        // Version not found.
                        if (version === 'latest') {
                            Message.error(this.$t('editor.warning.uuidNotFound', { uuid: this.uuid }));
                        } else {
                            Message.error(this.$t('editor.editMetadata.message.error.noRequestedVersion'));
                        }
                        this.error = true;
                        this.warning = 'uuidNotFound';
                        this.loadStatus = 'waiting';
                        this.clearConfig();
                        // Product was not found, unlock the UUID
                        this.lockStore.unlockStoryline();
                        reject();
                    } else {
                        const configZip = new JSZip();
                        // Files retrieved. Convert them into a JSZip object.
                        res.blob().then((file: Blob) => {
                            configZip
                                .loadAsync(file)
                                .then(() => {
                                    this.configFileStructureHelper(configZip);
                                    // Extend the session on load
                                    this.extendSession();
                                    this.error = false;
                                    this.warning = 'none';
                                    this.loadStatus = 'loaded';
                                })
                                // Need to ensure we fail gracefully
                                .catch((error) => {
                                    Message.error(this.$t('editor.warning.serverError'));
                                    console.log(error.response || error);
                                    this.error = true;
                                    this.loadStatus = 'waiting';
                                    this.lockStore.unlockStoryline();
                                    reject();
                                });
                        });
                    }

                    // TODO: Should this run only on product fetch or also on version fetch?
                    // Right now we run for both.
                    fetch(this.apiUrl + `/retrieveMessages`)
                        .then((res: any) => {
                            if (res.ok) return res.json();
                        })
                        .then((data) => {
                            if (import.meta.env.VITE_APP_CURR_ENV) {
                                axios
                                    .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                                        messages: data.messages
                                    })
                                    .catch((error: any) => console.log(error.response || error));
                            }
                        })
                        .catch((error: any) => console.log(error.response || error));
                    resolve();
                })
                .catch((err) => {
                    if (err.name === 'AbortError' || err instanceof PointerEvent) {
                        Message.info(this.$t('editor.editMetadata.retrievalAborted'));
                    } else {
                        Message.error(this.$t('editor.warning.retrievalFailed'));
                    }
                    this.loadStatus = 'waiting';
                    // Unlock the UUID if loading failed
                    this.lockStore.unlockStoryline();
                    reject();
                });
        });
    }

    /**
     * Provided with a UID, retrieve the project contents from the file server.
     */
    generateRemoteConfig(): Promise<void> {
        // Reset fields
        this.baseUuid = this.uuid;
        this.changeUuid = '';

        // Attempt to fetch the project from the server.
        return new Promise((resolve, reject) => {
            // Clear any lingering timeouts, don't want to exit while stuff is loading.
            clearTimeout(this.lockStore.confirmationTimeout);
            clearTimeout(this.lockStore.endTimeout);

            // Before loading the product, we need to try and get its "lock".
            // If successful i.e. the product is free to use, we load the product.
            // If not i.e. another user is using it right now, we show an error message.
            this.lockStore
                .lockStoryline(this.uuid)
                .then(() => {
                    this.lockStore.broadcast!.onmessage = (e) => {
                        // session was extended from the preview tab, need to handle in editor tab
                        const msg = e.data;
                        if (msg.action === 'extend') {
                            this.$vfm.close('confirm-extend-session-editor');
                            this.extendSession(msg.showPopup);
                        }
                    };
                    this.loadStatus = 'loading';
                    this.error = false;

                    // Reset fields
                    this.baseUuid = this.uuid;
                    this.changeUuid = '';

                    // Attempt to fetch the project from the server.
                    this.loadVersion('latest').then(resolve).catch(reject);
                })
                .catch(() => {
                    this.error = true;
                    this.loadStatus = 'waiting';
                    this.clearConfig();
                    Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                    // If someone was loading the main editor tab directly and another user is accessing the
                    // product, redirect them to the home page.
                    if (this.$route.name === 'editor') {
                        setTimeout(() => {
                            this.$router.push({ name: 'home' });
                        }, 2000);
                    }
                });
        });
    }

    fetchHistory(): void {
        // Note: This part probably doesn't need an manual abort() trigger to kill on load cancel,
        // as the history should be much smaller and quicker to fetch than the config

        if (this.uuid === undefined || this.uuid === '') {
            return;
        }
        this.loadStatus = 'loading';
        const secret = this.lockStore.secret;
        fetch(this.apiUrl + `/history/${this.uuid}`, { headers: { user: this.user as any, secret } }).then(
            (res: Response) => {
                if (res.status === 404) {
                    // Product not found.
                    this.loadStatus = 'waiting';
                } else {
                    res.json().then((json) => {
                        this.storylineHistory = json;
                    });
                }
            }
        );
    }

    selectHistory(selected: any): void {
        this.selectedHistory = selected;
    }

    formatDate(created: string): string {
        const date = new Date(created);
        const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Toronto' }));
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/Toronto'
        };

        return new Intl.DateTimeFormat('en-US', options).format(estDate);
    }

    loadHistory(): void {
        if (this.selectedHistory) {
            this.loadVersion(this.selectedHistory.hash);
        }
    }

    async renameProduct(): Promise<void> {
        if (!this.productStore.configFileStructure) {
            return;
        }

        const prevUuid = this.productStore.configFileStructure.uuid;

        // Fetch the two existing configuration files.
        const enFile = this.productStore.configFileStructure.zip.file(`${prevUuid}_en.json`);
        const frFile = this.productStore.configFileStructure.zip.file(`${prevUuid}_fr.json`);

        if (enFile && frFile) {
            this.processingRename = true;

            // Fetch the contents of the two configuration files, and perform a find/replace on the UUID for each source.
            const englishConfig = await enFile?.async('string').then((res: string) => JSON.parse(res));
            const frenchConfig = await frFile?.async('string').then((res: string) => JSON.parse(res));
            [englishConfig, frenchConfig].forEach((config) =>
                this.productStore.renameSources(config, prevUuid, this.changeUuid)
            );
            // Convert the two configuration files into string format.
            const convertedEnglish = JSON.stringify(englishConfig, null, 4);
            const convertedFrench = JSON.stringify(frenchConfig, null, 4);

            // First, hit the Express server `rename` endpoint to perform the `rename` syscall on the file system.
            // Before doing so, we transfer the existing lock to the new uuid
            this.lockStore
                .transferLock(this.changeUuid)
                .then(async () => {
                    await axios
                        .post(this.apiUrl + `/rename`, {
                            user: this.user,
                            previousUuid: prevUuid,
                            newUuid: this.changeUuid,
                            configs: { en: convertedEnglish, fr: convertedFrench }
                        })
                        .then(async (_res: AxiosResponse) => {
                            // Once the server has processed the renaming, update the UUID in the database if not in dev mode.
                            if (import.meta.env.VITE_APP_NET_API_URL) {
                                await axios.post(import.meta.env.VITE_APP_NET_API_URL + '/api/version/update', {
                                    uuid: prevUuid,
                                    changeUuid: this.changeUuid
                                });
                            }

                            // After the server and database have been updated, re-build configFileStructure,
                            // save the new config files to the server and fetch the new Git history.
                            if (this.productStore.configFileStructure.zip) {
                                // Remove the current configuration files from the ZIP folder.
                                this.productStore.configFileStructure.zip.remove(enFile.name);
                                this.productStore.configFileStructure.zip.remove(frFile.name);

                                // Re-add the configuration files to the ZIP with the new UUID.
                                this.productStore.configFileStructure.zip.file(
                                    `${this.changeUuid}_en.json`,
                                    convertedEnglish
                                );
                                this.productStore.configFileStructure.zip.file(
                                    `${this.changeUuid}_fr.json`,
                                    convertedFrench
                                );

                                // Iterate through the RAMP configuration files and rename them using the new UUID.
                                const configPromises: Promise<void>[] = [];
                                this.productStore.configFileStructure.zip
                                    .folder('ramp-config/')
                                    ?.forEach((relativePath, file) => {
                                        configPromises.push(this.renameMapConfig(file.name, prevUuid));
                                    });

                                // Wait for map configuration files to be renamed.
                                await Promise.all(configPromises);

                                this.uuid = this.changeUuid;

                                // Reset source counts.
                                this.productStore.sourceCounts = {};

                                this.configFileStructureHelper(this.productStore.configFileStructure.zip).then(() => {
                                    this.fetchHistory();
                                    this.renameMode = this.processingRename = false;
                                });
                            }
                        })
                        .catch((err) => {
                            /** If the server returns a 500 error for whatever reason (most likely due to file in use),
                             * roll back the UUID to the previous value and display an error message.
                             */
                            if (err.status === 500) {
                                Message.error(this.$t('editor.warning.renameFailed'));
                                this.uuid = prevUuid;
                                this.processingRename = false;
                                return;
                            }
                        });
                })
                .catch(() => {
                    Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                    this.uuid = prevUuid;
                    this.processingRename = false;
                    return;
                });
        }
    }

    // Provided with the path of a RAMP configuration file, rename it in the JSZip object using the new UUID.
    renameMapConfig(oldPath: string, prevUuid: string): Promise<void> {
        return new Promise((resolve) => {
            this.productStore.configFileStructure.zip
                .file(oldPath)
                ?.async('string')
                .then((res: string) => {
                    // Remove the old config file.
                    this.productStore.configFileStructure.zip.remove(oldPath);

                    // Get the new config name.
                    const newFile = oldPath.replace(`/${prevUuid}-map-`, `/${this.changeUuid}-map-`);

                    // Re-add the config to the ZIP with the new name.
                    this.productStore.configFileStructure.zip.file(newFile, res);
                    resolve();
                });
        });
    }

    /**
     * Helper used to upload a new asset for the current langs config. Only needed when uploading a new asset to an
     * existing config (not when creating a new product). Here, an asset can either be a logo or a background image
     *
     * @param asset The asset being uploaded
     * @param config The config within which the asset was uploaded
     * @param type The type of asset being uploaded (either a logo or background image)
     */
    async uploadAsset(asset: File, config: StoryRampConfig, type: 'logo' | 'backgroundImage'): Promise<void> {
        const { inSharedAsset, newAssetName, uploadSource, oppositeSourceCount } =
            await this.productStore.addUploadedFile(asset, true);

        // Check if the asset src is the same as before. If it's not, then we increment the source count of the new
        // asset source. We also decrement source count of previous asset, as it has now been replaced
        if (type === 'backgroundImage') {
            if (config.introSlide.backgroundImage !== uploadSource) {
                this.productStore.incrementSourceCount(uploadSource);
                this.productStore.decrementSourceCount(config.introSlide.backgroundImage);
                this.productStore.sourceCounts[uploadSource] += oppositeSourceCount;
                config.introSlide.backgroundImage = uploadSource;
            }
        } else {
            if (config.introSlide.logo.src !== uploadSource) {
                this.productStore.incrementSourceCount(uploadSource);
                this.productStore.decrementSourceCount(config.introSlide.logo.src);
                this.productStore.sourceCounts[uploadSource] += oppositeSourceCount;
                config.introSlide.logo.src = uploadSource;
            }
        }
    }

    async createMainStyles(configZip: typeof JSZip): Promise<void> {
        const existingStyles = configZip.folder('styles')?.file('main.css');

        if (existingStyles) {
            // need to ensure the classes in this css file are not the same as the default ones...
            const res = await existingStyles.async('text');
            let styles = '';
            if (!res.includes('centerPanel')) {
                styles += `.centerPanel {\n\ttext-align: center;\n}\n\n`;
            }
            if (!res.includes('centerSlideLeft')) {
                styles += `.centerSlideLeft {\n\ttext-align: left;\n}\n\n`;
            }
            if (!res.includes('centerSlideRight')) {
                styles += `.centerSlideRight {\n\ttext-align: right;\n}\n\n`;
            }
            if (!res.includes('centerSlideFull')) {
                styles += `.centerSlideFull {\n\ttext-align: center;\n}\n\n`;
            }
            styles += res;
            configZip.folder('styles')?.file('main.css', styles);
        } else {
            const styles = `.centerPanel {\n\ttext-align: center;\n}\n\n.centerSlideLeft {\n\ttext-align: left;\n}\n
.centerSlideRight {\n\ttext-align: right;\n}\n\n.centerSlideFull {\n\ttext-align: center;\n}\n\n`;
            configZip.folder('styles')?.file('main.css', styles);
        }
    }

    /**
     * Generates or loads a ZIP file and creates required project folders if needed.
     * Returns an object that makes it easy to access any specific folder.
     */
    async configFileStructureHelper(
        configZip: typeof JSZip,
        uuidCheck: boolean = true,
        uploadFiles?: Array<File | undefined>
    ): Promise<void> {
        const assetsFolder = configZip.folder('assets');
        const chartsFolder = configZip.folder('charts');
        const rampConfigFolder = configZip.folder('ramp-config');
        const styles = configZip.folder('styles');
        await this.createMainStyles(configZip);

        this.productStore.configFileStructure = {
            uuid: this.uuid,
            zip: configZip,
            configs: this.productStore.configs as { [key: string]: StoryRampConfig },
            assets: {
                en: (assetsFolder as JSZip).folder('en') as JSZip,
                fr: (assetsFolder as JSZip).folder('fr') as JSZip,
                shared: (assetsFolder as JSZip).folder('shared') as JSZip
            },
            charts: {
                en: (chartsFolder as JSZip).folder('en') as JSZip,
                fr: (chartsFolder as JSZip).folder('fr') as JSZip
            },
            rampConfig: rampConfigFolder as JSZip,
            styles: styles as JSZip
        };

        // Upload each file in the `uploadFiles` array to the shared ZIP folder (due to cloning of configs in
        // generateNewConfig()). This is typically (and currently only) used for the product logo and the introduction
        // slide background image.
        if (uploadFiles !== undefined) {
            uploadFiles.forEach((file) => {
                if (file) {
                    this.productStore.configFileStructure.assets['shared'].file(file?.name, file);
                }
            });
        }
        if (uuidCheck) this.correctUuid();
    }

    /**
     * Ensure that `uuid` is a case-sensitive match with the product's uuid on the server
     */
    correctUuid(): void {
        const configFileNames = Object.keys(this.productStore.configFileStructure.zip.files).filter(
            (key) => key.includes('.json') && !key.includes('/')
        );
        if (configFileNames.length > 0) {
            const productUuid = configFileNames[0].substring(0, configFileNames[0].lastIndexOf('_')); // Case-sensitive UUID of product on server
            // Only update uuid if its the same as on the server, just with incorrect letter case
            if (productUuid !== this.uuid && productUuid.toLowerCase() === this.uuid.toLowerCase()) {
                this.lockStore
                    .transferLock(productUuid)
                    .then(() => {
                        this.uuid = productUuid;
                        this.productStore.configFileStructure.uuid = productUuid;
                        this.loadConfig();
                    })
                    .catch((err) => {
                        Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                        console.error(err);
                        this.error = true;
                        this.loadStatus = 'waiting';
                        this.clearConfig();
                    });
            } else {
                this.loadConfig();
            }
        } else {
            this.loadConfig();
        }
    }

    /**
     * Loads a configuration file from the product folder, and sets application data
     * as needed.
     * @param config the configuration object to load.
     */
    async loadConfig(config?: StoryRampConfig): Promise<void> {
        if (config) {
            this.useConfig(config);
            return;
        }

        // Fix various problems inside the config before load
        // Add more as they're discovered
        const fixConfigProblems = (config: StoryRampConfig) => {
            config.slides.forEach((slide) => {
                // If the slide has an undefined value for includeInToc, it's treated as true (as the schema wishes)
                // This change prevents state management detection issues (undefined != true when compared)
                slide.includeInToc = slide.includeInToc === undefined ? true : slide.includeInToc;
            });

            return config;
        };

        try {
            const stateSave = { en: {}, fr: {} };

            const enFile = this.productStore.configFileStructure.zip.file(`${this.uuid}_en.json`);
            const frFile = this.productStore.configFileStructure.zip.file(`${this.uuid}_fr.json`);
            await enFile?.async('string').then((res: string) => {
                const config = fixConfigProblems(JSON.parse(res));

                this.productStore.configs['en'] = config;
                stateSave.en = JSON.parse(JSON.stringify(config));

                // Check if config contains a link to the default stylesheet, and if so add it in (only if it doesn't
                // already contain it)
                // TODO: Fix (current implementation breaks state management)
                // if (!this.configs['en'].stylesheets) {
                //     this.configs['en'].stylesheets = [`${this.uuid}/styles/main.css`];
                // } else if (!this.configs['en'].stylesheets.includes(`${this.uuid}/styles/main.css`)) {
                //     this.configs['en'].stylesheets.push([`${this.uuid}/styles/main.css`]);
                // }
            });
            await frFile?.async('string').then((res: string) => {
                const config = fixConfigProblems(JSON.parse(res));
                this.productStore.configs['fr'] = config;
                stateSave.fr = JSON.parse(JSON.stringify(this.productStore.configs['fr']));

                // Check if config contains a link to the default stylesheet, and if so add it in (only if it doesn't
                // already contain it)
                // TODO: Fix (current implementation breaks state management)
                // if (!this.configs['fr'].stylesheets) {
                //     this.configs['fr'].stylesheets = [`${this.uuid}/styles/main.css`];
                // } else if (!this.configs['fr'].stylesheets.includes(`${this.uuid}/styles/main.css`)) {
                //     this.configs['fr'].stylesheets.push([`${this.uuid}/styles/main.css`]);
                // }
            });
            this.stateStore.save(stateSave as Save);
        } catch {
            Message.error(this.$t('editor.editMetadata.message.error.malformedProduct', this.uuid ?? ''));
            this.loadStatus = 'waiting';
            this.clearConfig();
            return;
        }

        if (this.loadExisting) {
            this.loadStatus = 'waiting';
            Message.success(this.$t('editor.editMetadata.message.successfulLoad'));
        } else {
            this.loadStatus = 'loaded';
        }

        // Load in project data.
        const configLang = this.productStore.configLang;
        if (this.productStore.configs[configLang]) {
            this.useConfig(this.productStore.configs[configLang] as StoryRampConfig);
            this.productStore.findSources(); // increments source counts for all panels

            // Update router path
            if (this.reloadExisting) {
                this.loadEditor = true;
                this.stateStore.isChanged = false;
                this.updateEditorPath();
            } else if (!this.loadExisting) {
                this.loadEditor = true;
                this.updateEditorPath();
            }
        }
    }

    useConfig(config: StoryRampConfig): void {
        this.metadata.title = config.title;
        this.metadata.introTitle = config.introSlide.title;
        this.metadata.introSubtitle = config.introSlide.subtitle;
        this.metadata.titleColour = config.introSlide.titleColour ?? '#1f2937';
        this.metadata.subtitleColour = config.introSlide.subtitleColour ?? '#6b7280';
        this.metadata.buttonColour = config.introSlide.buttonColour ?? '#00d2d3';
        this.metadata.contextLink = config.contextLink;
        this.metadata.contextLabel = config.contextLabel;
        this.metadata.tocOrientation = config.tocOrientation;
        this.metadata.returnTop = config.returnTop ?? true;
        this.metadata.sameConfig = config.sameConfig ?? true;
        this.metadata.dateModified = config.dateModified;
        this.metadata.schemaVersion = config.schemaVersion ?? '';

        // TODO: check schema version in the config, and if it doesn't match the current version in the schema (stored in
        // this.latestSchemaVersion), the product's local repo should be re-initialized

        this.loadSlides(this.productStore.configs);

        // Load product logo and the introduction slide background image (if provided).
        const logoAsset = config.introSlide.logo?.src;
        const introBgAsset = config.introSlide.backgroundImage;
        const logoName = logoAsset ? logoAsset.split('/')[logoAsset.split('/').length - 1] : '';
        const introBgName = introBgAsset ? introBgAsset.split('/')[introBgAsset.split('/').length - 1] : '';
        // Load in the data from the logo and intro slide background image. If one of these assets is missing, the promise will resolve with undefined.
        Promise.all([
            this.processAsset(logoAsset, logoName).then((logoData) => {
                if (logoData) {
                    this.metadata.logoAltText = config.introSlide.logo?.altText ? config.introSlide.logo.altText : '';
                    this.logoImage = logoData.file;
                    this.metadata.logoPreview = logoData.preview;
                    this.metadata.logoName = logoName;
                } else {
                    // If there's no logo, mark the product as loaded and remove any existing logos
                    this.metadata.logoName = '';
                    this.metadata.logoPreview = '';
                }
            }),

            this.processAsset(introBgAsset, introBgName).then((introBgData) => {
                if (introBgData) {
                    this.introBgImage = introBgData.file;
                    this.metadata.introBgPreview = introBgData.preview;
                    this.metadata.introBgName = introBgName;
                } else {
                    this.metadata.introBgName = '';
                    this.metadata.introBgPreview = '';
                }
            })
        ]).then(() => {
            // Once assets are loaded, set status to loaded.
            this.loadStatus = 'loaded';
        });

        // Load the temp copy of the metadata
        this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
    }

    exportProduct(): void {
        this.generateConfig(false);

        this.productStore.configFileStructure.zip.generateAsync({ type: 'blob' }).then(
            (blob) => {
                saveAs(blob, `${this.productStore.configFileStructure.uuid}.zip`);
                Message.success(this.$t('editor.export.success'));
            },
            (_err) => {
                Message.error(this.$t('editor.export.error'));
            }
        );
    }

    /**
     * Conducts various checks before saving.
     */
    onSave(): void {
        // Currently allowing undefined configs & handling them elsewhere
        // If that changes in the future, can detect for undefined configs and warn user here
        this.generateConfig();
    }

    /**
     * Called when `Save Changes` is pressed. Re-generates the Storylines configuration file
     * with the new changes, and if `publish` is set to true, generates and submits the product file to the server.
     */
    generateConfig(publish = true): ConfigFileStructure {
        this.lockStore.broadcast?.postMessage({ action: 'saving' });
        this.saving = true;

        // Clear any session timeouts, don't want the app to exit while saving, duh
        clearTimeout(this.lockStore.confirmationTimeout);
        clearTimeout(this.lockStore.endTimeout);

        // Prevent session from extending on activity while save is in progress
        document.onmousemove = () => undefined;
        document.onkeydown = () => undefined;

        // Update the configuration files, for both languages.
        const engFileName = `${this.uuid}_en.json`;
        const frFileName = `${this.uuid}_fr.json`;

        // Replace undefined slides with empty objects
        if (this.productStore.configs.en) {
            this.productStore.configs.en.slides = this.productStore.configs.en.slides.map((slide) => {
                return slide ?? {};
            });
        }

        if (this.productStore.configs.fr) {
            this.productStore.configs.fr.slides = this.productStore.configs.fr.slides.map((slide) => {
                return slide ?? {};
            });
        }

        this.loadSlides(this.productStore.configs);

        // TODO: Should we make stateStore save on every generateConfig activation, or just on pubish = true??
        this.stateStore.save({ en: this.productStore.configs.en, fr: this.productStore.configs.fr });

        const engFormattedConfigFile = JSON.stringify(this.productStore.configs.en, null, 4);
        const frFormattedConfigFile = JSON.stringify(this.productStore.configs.fr, null, 4);

        this.productStore.configFileStructure.zip.file(engFileName, engFormattedConfigFile);
        this.productStore.configFileStructure.zip.file(frFileName, frFormattedConfigFile);

        // Upload the ZIP file.
        if (publish) {
            this.productStore.configFileStructure?.zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
                const formData = new FormData();
                formData.append('data', content, `${this.uuid}.zip`);
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    user: this.user as any,
                    secret: this.lockStore.secret
                };
                Message.warning(this.$t('editor.editMetadata.message.wait'));

                axios
                    .post(this.apiUrl + `/upload/${this.uuid}`, formData, { headers })
                    .then((res: AxiosResponse) => {
                        const responseData = res.data;
                        responseData.files; // binary representation of the file
                        responseData.status; // HTTP status
                        const commitHash = responseData.commitHash; // commit hash of the git commit
                        this.loadExisting = true; // if editExisting was false, we can now set it to true

                        if (import.meta.env.VITE_APP_CURR_ENV) {
                            if (responseData.new) {
                                axios
                                    .post(import.meta.env.VITE_APP_NET_API_URL + '/api/user/register', {
                                        uuid: this.uuid,
                                        titleEn: this.productStore.configs['en']?.title ?? '',
                                        titleFr: this.productStore.configs['fr']?.title ?? ''
                                    })
                                    .then((_response: any) => {
                                        const userStore = useUserStore();
                                        userStore.fetchUserProfile();
                                        formData.append('uuid', this.uuid);
                                        formData.append('titleEn', this.productStore.configs['en']?.title ?? '');
                                        formData.append('titleFr', this.productStore.configs['fr']?.title ?? '');
                                        formData.append('commitHash', commitHash);
                                        formData.delete('data'); // Remove the data from the form so that we don't pass it into the .NET API
                                        axios
                                            .post(
                                                import.meta.env.VITE_APP_NET_API_URL + '/api/version/commit',
                                                formData
                                            )
                                            .then((_response: any) => {
                                                Message.success(this.$t('editor.editMetadata.message.successfulSave'));
                                            })
                                            .catch((error: any) => console.log(error.response || error))
                                            .finally(() => {
                                                this.onSaveFinish();
                                            });
                                    })
                                    .catch((error: any) => console.log(error.response || error));
                            } else {
                                fetch(this.apiUrl + `/retrieveMessages`)
                                    .then((res: any) => {
                                        if (res.ok) return res.json();
                                    })
                                    .then((data) => {
                                        axios
                                            .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                                                messages: data.messages
                                            })
                                            .catch((error: any) => console.log(error.response || error));
                                    })
                                    .catch((error: any) => console.log(error.response || error))
                                    .finally(() => {
                                        // Record version in the .NET API only if a commit actually occurred in the git repo
                                        if (responseData.committed) {
                                            formData.append('uuid', this.uuid);
                                            formData.append('titleEn', this.productStore.configs['en']?.title ?? '');
                                            formData.append('titleFr', this.productStore.configs['fr']?.title ?? '');
                                            formData.append('commitHash', commitHash);
                                            formData.delete('data'); // Remove the data from the form so that we don't pass it into the .NET API
                                            axios
                                                .post(
                                                    import.meta.env.VITE_APP_NET_API_URL + '/api/version/commit',
                                                    formData
                                                )
                                                .then((_response: any) => {
                                                    Message.success(
                                                        this.$t('editor.editMetadata.message.successfulSave')
                                                    );
                                                })
                                                .catch((error: any) => console.log(error.response || error))
                                                .finally(() => {
                                                    this.onSaveFinish();
                                                });
                                        } else {
                                            Message.warning(this.$t('editor.editMetadata.message.noSave'));
                                            this.onSaveFinish();
                                        }
                                    });
                            }
                        } else {
                            if (responseData.committed) {
                                Message.success(this.$t('editor.editMetadata.message.successfulSave'));
                            } else {
                                Message.warning(this.$t('editor.editMetadata.message.noSave'));
                            }
                            this.onSaveFinish();
                        }
                    })
                    .catch(() => {
                        Message.error(this.$t('editor.editMetadata.message.error.failedSave'));
                        this.handleSessionTimeout();
                        this.lockStore.broadcast?.postMessage({ action: 'saved' });
                    });
            });
        } else {
            this.handleSessionTimeout();
            this.lockStore.broadcast?.postMessage({ action: 'saved' });
            this.saving = false;
        }

        return this.productStore.configFileStructure as ConfigFileStructure;
    }

    onSaveFinish(): void {
        // Padding to prevent save button from being clicked rapidly
        setTimeout(() => {
            this.saving = false;
            // Extend the session on save if this is not the final save (after the session has expired).
            // Otherwise redirect to the home page.
            if (this.sessionExpired) {
                this.$router.push({ name: 'homeExpired' });
            } else {
                this.extendSession(true);
                this.lockStore.broadcast?.postMessage({ action: 'saved' });
            }

            // This may be necessary to allow for changes to be properly detected after saving.
            // Without it, even attempted changes (e.g. keypress in an input field) are no longer detected, and the potential change handlers
            // aren't even run.
            // There's likely a better solution, please add if you find it.
            this.loadConfig();
        }, 500);
    }

    updateMetadata<K extends keyof MetadataContent>(key: K, value: MetadataContent[K]): void {
        this.metadata[key] = value;
        this.productStore.updateSaveStatus(true, 'Update metadata');
    }

    discardMetadataUpdates(): void {
        this.metadata = JSON.parse(JSON.stringify(this.temporaryMetadataCopy));
        this.editingMetadata = false;
        this.unsavedChanges = false; // TODO: Does this cause false negatives? (maybe not if we don't have discarding for vfm)
    }

    /**
     * Called when `Save Changes` or `Next` (for existing products only) is pressed on metadata page, as well as when
     * `Done` is pressed in the metadata editor within editor-main. Save metadata content fields to config file. If
     * `publish` is set to true, publish to server as well.
     */
    async saveMetadata(publish = false, swapLang = false): Promise<void> {
        // update metadata content to existing config only if it has been successfully loaded
        const config = this.productStore.configs[this.productStore.configLang];
        if (config !== undefined) {
            config.title = this.metadata.title;
            config.introSlide.title = this.metadata.introTitle;
            config.introSlide.subtitle = this.metadata.introSubtitle;
            config.introSlide.titleColour = this.metadata.titleColour;
            config.introSlide.subtitleColour = this.metadata.subtitleColour;
            config.introSlide.buttonColour = this.metadata.buttonColour;
            config.contextLink = this.metadata.contextLink;
            config.contextLabel = this.metadata.contextLabel;
            config.tocOrientation = this.metadata.tocOrientation;
            config.returnTop = this.metadata.returnTop;
            config.sameConfig = this.metadata.sameConfig;
            config.dateModified = this.metadata.dateModified;

            // Changing TOC orientation and return-to-top navigation for one language also changes for other language.
            // Changes only if the 'Same across configurations' toggle is true.
            const otherLang = this.productStore.configLang === 'en' ? 'fr' : 'en';
            const otherConfig = this.productStore.configs[otherLang];
            if (otherConfig) {
                otherConfig.sameConfig = this.metadata.sameConfig;

                if (this.metadata.sameConfig) {
                    otherConfig.tocOrientation = this.metadata.tocOrientation;
                    otherConfig.returnTop = this.metadata.returnTop;
                }
            }

            // If the logo section is missing, create it here before overwriting values.
            if (config.introSlide.logo === undefined) {
                config.introSlide.logo = { src: '', altText: '' };
            }

            config.introSlide.logo.altText = this.metadata.logoAltText;

            // If the logo doesn't include HTTP, assume it's a local file.
            if (!this.metadata.logoName) {
                config.introSlide.logo.src = '';
            } else if (!this.metadata.logoName.includes('http')) {
                await this.uploadAsset(this.logoImage as File, config, 'logo');
            } else {
                config.introSlide.logo.src = this.metadata.logoName;
            }

            // If the introduction slide's background image doesn't include HTTP, assume it's a local file.
            if (!this.metadata.introBgName) {
                config.introSlide.backgroundImage = '';
            } else if (!this.metadata.introBgName.includes('http')) {
                await this.uploadAsset(this.introBgImage as File, config, 'backgroundImage');
            } else {
                config.introSlide.backgroundImage = this.metadata.introBgName;
            }

            if (publish) {
                this.generateConfig();
                this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
                this.editingMetadata = false;
            }

            if (!swapLang) {
                const userStore = useUserStore();
                userStore.fetchUserProfile();
            }

            this.productStore.updateSaveStatus(true, 'Save metadata');
        }
        if (!swapLang) {
            this.productStore.changeLang(this.currLang);
            this.$vfm.close('metadata-edit-modal');
        }
    }

    /**
     * Called when loading a nonexistant or invalid UUID. Clears all previously populated
     * metadata fields, configs, and slide content.
     */
    clearConfig(): void {
        this.metadata = {
            title: '',
            introTitle: '',
            introSubtitle: '',
            titleColour: '',
            subtitleColour: '',
            buttonColour: '',
            contextLink: '',
            contextLabel: '',
            dateModified: '',
            logoPreview: '',
            logoName: '',
            logoAltText: '',
            introBgName: '',
            introBgPreview: '',
            tocOrientation: '',
            returnTop: true,
            sameConfig: true,
            schemaVersion: ''
        };
        this.temporaryMetadataCopy = JSON.parse(JSON.stringify(this.metadata));
        this.productStore.configs = { en: undefined, fr: undefined };
        this.slides = [];
    }

    /**
     * Language toggle.
     */
    async swapLang(): Promise<void> {
        await this.saveMetadata(false, true);
        if (!this.productStore.configs[this.productStore.configLang]) {
            await this.generateNewConfig(false);
        }
        this.productStore.configLang = this.productStore.oppositeLang;
        this.loadConfig(this.productStore.configs[this.productStore.configLang]);
    }

    /**
     * Checks if the UUID is invalid due to being blank or containing illegal characters.
     */
    isUuidInvalid(rename: boolean): 'blank' | 'badChar' | null {
        if (!rename && !this.uuid && !this.loadExisting) {
            return 'blank';
        }

        // All reserved characters in URLs. The user can't use these for their UUID
        const illegalChars = [':', '/', '#', '?', '&', '@', '%', '+'];
        const illegalCharsContained = illegalChars.filter((badChar) =>
            (rename ? this.changeUuid : this.uuid).includes(badChar)
        );

        if (illegalCharsContained.length) {
            return 'badChar';
        }

        return null;
    }

    checkUuid(rename?: boolean): void {
        if (rename || !this.loadExisting) this.checkingUuid = true;

        if (!this.loadExisting || rename) {
            const errorType = this.isUuidInvalid(!!rename);
            if (errorType) {
                this.error = true;
                this.warning = errorType;
                this.checkingUuid = false;
                return;
            }

            this.fetchUuidCheck(!!rename);
        }
        this.warning = 'none';
        this.highlightedIndex = -1;
    }

    /**
     * Debounce the fetch call to help prevent console spamming.
     */
    fetchUuidCheck = debounce(600, (rename: boolean) => {
        if (this.isUuidInvalid(rename)) {
            return;
        }
        // If renaming, show the loading spinner while we check whether the UUID is taken.
        fetch(this.apiUrl + `/check/${rename ? this.changeUuid : this.uuid}`).then((res: Response) => {
            if (res.status !== 404) {
                this.warning = rename ? 'rename' : 'uuid';

                if (!this.loadExisting) {
                    this.error = true;
                }
            }

            if (rename || !this.loadExisting) this.checkingUuid = false;

            fetch(this.apiUrl + `/retrieveMessages`)
                .then((res: any) => {
                    if (res.ok) return res.json();
                })
                .then((data) => {
                    axios
                        .post(import.meta.env.VITE_APP_NET_API_URL + '/api/log/create', {
                            messages: data.messages
                        })
                        .catch((error: any) => console.log(error.response || error));
                })
                .catch((error: any) => console.log(error.response || error));
        });
    });

    /**
     * React to param changes in URL.
     */
    beforeRouteUpdate(to: RouteLocationNormalized, from: RouteLocationNormalized, next: () => void): void {
        this.uuid = to.params.uid as string;
        this.$i18n.locale = to.params.lang as string;
        document.onmousemove = () => undefined;
        document.onkeydown = () => undefined;
        if (to.name !== 'editor') {
            // Unlock the storyline for other users if we are exiting the product e.g. by navigating to a different route.
            this.lockStore.unlockStoryline();
            clearTimeout(this.lockStore.confirmationTimeout);
            clearTimeout(this.lockStore.endTimeout);
        }
        next();
    }

    onImageSourceInput(e: InputEvent, src: string): void {
        const isImgUrl = (url: string) => {
            const img = new Image();
            img.src = url;
            return new Promise((resolve) => {
                img.onerror = () => resolve(false);
                img.onload = () => resolve(true);
            });
        };

        switch (src) {
            case 'logo':
                this.metadata.logoName = (e.target as HTMLInputElement).value;

                isImgUrl(this.metadata.logoName).then((res) => {
                    if (res) {
                        this.metadata.logoPreview = this.metadata.logoName;
                        Message.success(this.$t('editor.editMetadata.message.imageSuccessfulLoad'));
                    } else {
                        this.metadata.logoPreview = 'error';
                        Message.error(this.$t('editor.editMetadata.message.error.imageFailedLoad'));
                    }
                });

                break;
            case 'introBg':
                this.metadata.introBgName = (e.target as HTMLInputElement).value;

                isImgUrl(this.metadata.introBgName).then((res) => {
                    if (res) {
                        this.metadata.introBgPreview = this.metadata.introBgName;
                        Message.success(this.$t('editor.editMetadata.message.imageSuccessfulLoad'));
                    } else {
                        this.metadata.introBgPreview = 'error';
                        Message.error(this.$t('editor.editMetadata.message.error.imageFailedLoad'));
                    }
                });
                break;
            default:
                console.error('onImageSourceInput received invalid source.');
        }
    }

    onFileChange(e: Event, src: string): void {
        // Retrieve the uploaded file.
        const uploadedFile = ((e.target as HTMLInputElement).files as ArrayLike<File>)[0];

        switch (src) {
            case 'logo':
                this.logoImage = uploadedFile;

                // Generate an image preview.
                this.metadata.logoPreview = URL.createObjectURL(uploadedFile);
                this.metadata.logoName = uploadedFile.name;
                (e.target as HTMLInputElement).value = '';
                break;
            case 'introBg':
                this.introBgImage = uploadedFile;

                // Generate an image preview.
                this.metadata.introBgPreview = URL.createObjectURL(uploadedFile);
                this.metadata.introBgName = uploadedFile.name;
                (e.target as HTMLInputElement).value = '';
                break;
            default:
                console.error('onFileChange received invalid source.');
        }
    }

    updateEditorPath(): void {
        if (this.$route.name !== 'editor') {
            this.$router.beforeEach((to: RouteLocationNormalized) => {
                if (to.name === 'editor') {
                    to.meta.data = {
                        configLang: this.productStore.configLang,
                        configs: this.productStore.configs,
                        configFileStructure: this.productStore.configFileStructure,
                        sourceCounts: this.productStore.sourceCounts,
                        metadata: this.metadata,
                        slides: this.slides,
                        existing: this.editExisting,
                        unsavedChanges: this.unsavedChanges
                    };
                }
            });

            this.$router.push({ name: 'editor', params: { uid: this.uuid } });
        }
    }

    checkRequiredFields(): boolean {
        // check if all required metadata fields are non-empty
        this.reqFields.uuid = !!this.uuid;
        if (Object.values(this.reqFields).some((field: boolean) => !field)) {
            Message.error(this.$t('editor.editMetadata.message.error.requiredFieldsNotFilled'));
            return false;
        }
        return true;
    }

    /**
     * Called when 'next' button is pressed on metadata page to continue to main editor.
     */
    continueToEditor(): void {
        this.loadingIntoEditor = true;

        // Needed in order to show the loading spinner at all
        // Although it shows, it's still frozen (since app's really just lagging until editor's in)
        setTimeout(() => {
            if (!this.checkRequiredFields()) {
                return;
            }
            if (this.loadExisting) {
                if (
                    this.productStore.configs[this.productStore.configLang] !== undefined &&
                    this.uuid === this.productStore.configFileStructure.uuid
                ) {
                    this.loadEditor = true;
                    this.saveMetadata(false).then(() => {
                        this.updateEditorPath();
                    });
                } else {
                    Message.error(this.$t('editor.editMetadata.message.error.noConfig'));
                }
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } else if (!this.uuid) {
                Message.error(this.$t('editor.warning.mustEnterUuid'));
                this.error = true;
            } else {
                // We have a new product that is going to the main editor route, so its UUID is now locked.
                // Therefore, we also lock it in the server so that another user does not create a new product
                // with the same UUID until the user's session is in progress.
                this.lockStore
                    .lockStoryline(this.uuid)
                    .then(() => {
                        // Only generate config if not already present or UUID mismatch
                        if (
                            !this.productStore.configs[this.productStore.configLang] ||
                            this.uuid !== this.productStore.configFileStructure?.uuid
                        ) {
                            this.generateNewConfig();
                        } else {
                            // Else config already exists and matches UUID, skip generation
                            // Update each zip file with their latest changes before loading
                            this.saveMetadata();

                            const writeConfigFile = (lang: 'en' | 'fr') => {
                                const configJson = JSON.stringify(this.productStore.configs[lang], null, 4);
                                this.productStore.configFileStructure.zip.file(`${this.uuid}_${lang}.json`, configJson);
                            };

                            (['en', 'fr'] as const).forEach((lang) => writeConfigFile(lang));

                            this.productStore.changeLang(this.currLang);
                            this.correctUuid();
                        }
                    })
                    .catch(() => {
                        this.error = true;
                        Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                    })
                    .finally(() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    });
            }
        }, 25);
    }

    refreshConfig(): void {
        // Re-fetch the product from the server.
        if (this.loadExisting) {
            this.reloadExisting = true;
            this.generateRemoteConfig();
        } else {
            this.reloadExisting = false;
            this.generateNewConfig();
        }
    }

    beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: (cont?: boolean) => void): void {
        const curEditor = this.$route.name === 'editor';
        const confirmationMessage = 'Leave the page? Changes made may not be saved.';
        const stay = !this.sessionExpired && this.unsavedChanges && curEditor && !window.confirm(confirmationMessage);
        const exitingProduct = to.name !== 'editor';
        // This component is going bye-bye, so we need to do some clean up so that timers cannot fire later.
        clearTimeout(this.lockStore.confirmationTimeout);
        clearTimeout(this.lockStore.endTimeout);
        document.onmousemove = () => undefined;
        document.onkeydown = () => undefined;
        if (exitingProduct) {
            // Unlock the storyline for other users if we are exiting the product e.g. by navigating to a different route.
            this.lockStore.unlockStoryline();
        }
        if (stay) {
            next(false);
        } else {
            next();
        }
    }

    async handleUuidEnter(): Promise<void> {
        if (this.editExisting) {
            this.handleUuidLoad();
        } else {
            // UUID is not taken and is not blank so we proceed to editor-main
            if (!this.error) {
                this.continueToEditor();
            } else if (this.warning !== 'none') {
                Message.error(this.$t(`editor.warning.${this.warning}`));
            }
        }
    }

    handleUuidLoad(): void {
        if (this.uuid) {
            this.generateRemoteConfig().then(this.fetchHistory);
        } else {
            this.error = true;
            this.warning = 'blank';
            Message.error(this.$t(`editor.warning.${this.warning}`));
        }
    }

    highlightNext(): void {
        if (this.highlightedIndex < this.getStorylines.length - 1) {
            this.highlightedIndex++;
            this.scrollIntoView();
        }
    }

    highlightPrevious(): void {
        if (this.highlightedIndex > 0) {
            this.highlightedIndex--;
            this.scrollIntoView();
        }
    }

    selectHighlighted(): void {
        if (this.highlightedIndex !== -1) {
            const selectedStoryline = this.getStorylines[this.highlightedIndex];
            this.selectUuid(selectedStoryline.uuid);
        }
    }

    scrollIntoView(): void {
        this.$nextTick(() => {
            const container = this.$el.querySelector('.overflow-y-auto');
            const activeItem = container.querySelector('li.bg-gray-300');
            if (activeItem) container.scrollTop = activeItem.offsetTop - container.offsetTop;
        });
    }

    get getStorylines() {
        const userStore = useUserStore();
        const userStorylines = userStore.userProfile?.storylines?.map((s) => ({ ...s, isUserStoryline: true })) || [];
        const allStorylines =
            userStore.userProfile?.allStorylines?.filter((s) => !userStorylines.some((u) => u.uuid === s.uuid)) || [];
        let combined = [...userStorylines, ...allStorylines];

        if (this.uuid) {
            combined = combined.filter(
                (storyline) =>
                    storyline.uuid.toLowerCase().includes(this.uuid.toLowerCase()) ||
                    (storyline.titleEN && storyline.titleEN.toLowerCase().includes(this.uuid.toLowerCase())) ||
                    (storyline.titleFR && storyline.titleFR.toLowerCase().includes(this.uuid.toLowerCase()))
            );
        }

        return combined;
    }

    getTitle(storyline: { titleEN: string; titleFR: string }): string {
        return this.productStore.configLang === 'en' ? storyline.titleEN : storyline.titleFR;
    }

    selectUuid(uuid: string): void {
        this.uuid = uuid;
        this.showDropdown = false;
    }

    /**
     * Opens the metadata editing modal for the currently selected slide language.
     */
    openMetadataModal() {
        this.loadConfig(this.productStore.configs[this.productStore.configLang]);
        this.$vfm.open('metadata-edit-modal');
    }
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', system-ui, ui-sans-serif, Tahoma, Geneva, Verdana, sans-serif;

.editor-mode {
    height: 100%;
    overflow: auto;
}

.storyramp-app,
.vfm {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: $font-list;
        line-height: 1.3;
        border-bottom: 0px;
    }

    .editor-container {
        margin: 0 auto;
    }

    .vfm__content {
        max-width: 80%;
        max-height: 90%;
        padding: 20px;
    }

    .vfm__content label {
        display: block;
    }

    .editor-container h3 {
        font-size: x-large;
    }

    .editor-container .input-error {
        border: 1px solid red;
        outline-color: red;
    }

    .image-preview {
        max-width: 150px;
        max-height: 150px;
        display: inline;
    }

    .sub-link {
        color: blue;
        margin: 0;
        padding: 0;
        text-decoration: underline;
        cursor: pointer;
        font-weight: normal;
        font-size: 0.875rem /* 14px */;
        line-height: 1.25rem /* 20px */;
        user-select: none;
    }

    .sub-link:hover {
        color: rgb(87, 176, 253);
    }

    .sub-link:active {
        color: rgb(87, 211, 253);
    }

    .input-success {
        border-color: rgb(0, 189, 0);
        outline-color: rgb(0, 189, 0);
    }

    .input-warning {
        border-color: #eab308;
        outline-color: #eab308;
    }
}

.edit-metadata-content {
    padding-top: 0 !important;
}
</style>

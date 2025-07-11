<template>
    <!-- If the configuration file is being fetched, display a spinner to indicate loading. -->
    <div class="editor-container">
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
                            ? { lang: currLang === 'en' ? 'fr' : 'en', uid: productStore.uuid }
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
                    <span v-if="editExisting && editorStore.loadStatus === 'loaded'" class="p-1">
                        <button
                            class="ml-10 sub-link inline-block select-none text-sm"
                            @click="
                                renameMode = !renameMode;
                                editorStore.changeUuid = '';
                                warning = editorStore.warning === 'rename' ? 'none' : editorStore.warning;
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
                                    editorStore.error = false;
                                    checkUuid(true);
                                "
                                v-model="editorStore.changeUuid"
                                @keyup.enter="!editorStore.error && editorStore.warning === 'none' && renameProduct()"
                                :class="{
                                    'input-error':
                                        editorStore.warning === 'rename' || editorStore.error || !reqFields.uuid
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
                                :class="{ 'input-error': editorStore.error }"
                                :disabled="
                                    editorStore.changeUuid.length === 0 ||
                                    checkingUuid ||
                                    processingRename ||
                                    editorStore.error ||
                                    editorStore.warning === 'rename'
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
                                        :disabled="editorStore.loadStatus === 'loading'"
                                        type="search"
                                        @input="
                                            editorStore.error = false;
                                            reqFields.uuid = true;
                                            checkUuid();
                                        "
                                        v-model.trim="productStore.uuid"
                                        v-on:keyup.enter="handleUuidEnter"
                                        @focus="showDropdown = true"
                                        @blur="showDropdown = false"
                                        @keydown.down.prevent="highlightNext"
                                        @keydown.up.prevent="highlightPrevious"
                                        @keydown.enter.prevent="selectHighlighted"
                                        :class="{
                                            'input-error': editorStore.error || !reqFields.uuid,
                                            'input-success': editorStore.loadStatus === 'loaded',
                                            'input-warning': editorStore.warning !== 'none'
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
                                <div class="inline-flex align-middle ml-1 mb-1" v-if="checkingUuid && !editExisting">
                                    <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                                </div>
                                <!-- Load UUID button -->
                                <!-- Load storyline with the given UUID, if it exists on the server, and also
                                         any history associated with the product that can be found -->
                                <button
                                    @click="handleUuidLoad"
                                    style="margin-left: 0.75rem"
                                    class="respected-standard-button respected-black-bg-button respected-form-button"
                                    :class="{ 'input-error': editorStore.error }"
                                    :disabled="editorStore.loadStatus === 'loading'"
                                    v-if="editExisting"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
                        <section class="flex flex-col gap-5 mt-10" v-if="editorStore.loadStatus === 'loading'">
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
                                <a class="sub-link text-left" @click="editorStore.controller.abort">{{
                                    $t('editor.editMetadata.load.cancel')
                                }}</a>
                            </div>
                        </section>

                        <div>
                            <!-- Display a warning if there is one. -->
                            <span
                                v-if="editorStore.warning !== 'none'"
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
                                        $t(
                                            `editor.warning.${editorStore.warning}`,
                                            editorStore.warning === 'uuidNotFound' ? { uuid } : {}
                                        )
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
                <section v-if="!editExisting || editorStore.loadStatus === 'loaded'">
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
                                <tr v-for="(historyItem, idx) in storylineHistory" :key="idx">
                                    <td
                                        style="background-color: #f9f9f9"
                                        class="border-b border-solid pl-4"
                                        :class="
                                            idx === storylineHistory.length - 1 ? 'border-black' : 'border-gray-200'
                                        "
                                    >
                                        {{ formatDate(historyItem.created) }}
                                    </td>
                                    <td
                                        style="background-color: #f9f9f9"
                                        class="border-b border-solid py-3 pr-3"
                                        :class="
                                            idx === storylineHistory.length - 1 ? 'border-black' : 'border-gray-200'
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
                        <a class="sub-link" @click="editorStore.swapConfigLang()" tabindex="0">
                            {{
                                editorStore.configLang === 'en' ? $t('editor.frenchConfig') : $t('editor.englishConfig')
                            }}
                        </a>
                        <!-- Metadata form -->
                        <div class="px-4 md:px-8 py-5 border rounded-md">
                            <!-- Edit form button (existing only) -->
                            <!-- Form defaults to view-only for existing projects, can edit only if this button pressed -->
                            <button
                                v-if="!editorStore.editingMetadata"
                                @click="editorStore.editingMetadata = !editorStore.editingMetadata"
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
                                    :createNew="true && !editExisting"
                                    :editing="editorStore.editingMetadata"
                                ></metadata-content>
                                <!-- Save/discard changes buttons (existing only) -->
                                <div v-if="editorStore.editingMetadata && editExisting" class="flex gap-3 mt-2">
                                    <!-- Save changes -->
                                    <!-- Saves to remote copy on server -->
                                    <!-- NOTE: Changes are saved to local copy automatically as you fill the form. To delete these changes, press the discard button -->
                                    <button
                                        @click="productStore.saveMetadata(true)"
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
        <div class="flex px-7 md:px-20 py-5 mt-8" :disabled="editorStore.loadStatus === 'loading'">
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
                    :class="{ hidden: editExisting && editorStore.loadStatus !== 'loaded' }"
                >
                    <!-- If config is loading, display a small spinner. -->
                    <div class="inline-flex align-middle ml-1 mb-1" v-if="loadingIntoEditor">
                        <spinner size="24px" color="#009cd1" class="mx-2 my-auto"></spinner>
                    </div>
                    <button
                        :disabled="
                            loadingIntoEditor ||
                            !productStore.uuid ||
                            editorStore.error ||
                            editorStore.loadStatus === 'loading' ||
                            checkingUuid
                        "
                        @click="
                            editorStore.warning === 'none' ? continueToEditor() : $vfm.open(`confirm-uuid-overwrite`)
                        "
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
                            uuid: productStore.uuid
                        })
                    "
                    @ok="continueToEditor()"
                />
            </div>
        </div>
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
            @ok="editorStore.extendSession(true)"
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
    SupportedLanguages,
    TextPanel
} from '@/definitions';
import { VueSpinnerOval } from 'vue3-spinners';
import { VueFinalModal } from 'vue-final-modal';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

import JSZip from 'jszip';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
import { useEditorStore } from '@/stores/editorStore';

interface RouteParams {
    uid: string;
    configLang: SupportedLanguages;
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
    checkingUuid = false;
    loadingIntoEditor = false;
    currLang = 'en'; // page language
    showDropdown = false;
    highlightedIndex = -1;

    lockStore = useLockStore();
    stateStore = useStateStore();
    productStore = useProductStore();
    editorStore = useEditorStore();

    storylineHistory: History[] = [];
    selectedHistory: History | null = null;
    showHistory = false;

    // Saving properties.
    saving = false;

    // Form properties.
    uuid = '';
    renameMode = false; // if currently in rename mode
    processingRename = false; // only true while we're waiting for the server to process a rename
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
    totalTime = import.meta.env.VITE_APP_CURR_ENV ? Number(import.meta.env.VITE_SESSION_END) : 30;

    mounted(): void {
        import('ramp-storylines_demo-scenarios-pcar/dist/StorylinesSchema.json').then((StorylinesSchema) => {
            this.productStore.latestSchemaVersion = StorylinesSchema.version;
        });
        this.currLang = (this.$route.params.lang as string) || 'en';
        this.editorStore.editingMetadata = !this.editExisting;
    }

    beforeDestroy(): void {
        document.body.classList.remove('editor-mode');
    }

    created(): void {
        // Ensure that all product and editor data is cleared beforehand, just in case
        this.productStore.clearData();
        this.editorStore.loadExisting = this.editExisting;
        // Generate UUID for new product
        this.productStore.uuid =
            (this.$route.params.uid as string) ?? (this.editorStore.loadExisting ? undefined : uuidv4());

        // Automatically load in the product data if the uuid is included in the url
        if (this.$route.params.uid as string) {
            this.handleUuidLoad();
        }

        // set any metadata default values for creating new product
        if (!this.editorStore.loadExisting) {
            // set current date as default
            const curDate = new Date();
            const year = curDate.getFullYear();
            const month = (curDate.getMonth() + 1).toString().padStart(2, '0');
            const day = curDate.getDate().toString().padStart(2, '0');
            this.productStore.metadata.dateModified = `${year}-${month}-${day}`;
            // set vertical as the default table of contents orientation
            this.productStore.metadata.tocOrientation = 'vertical';
            this.productStore.metadata.returnTop = true;
            this.productStore.metadata.sameConfig = true;
        }
    }

    /**
     * Open current editor config as a new Storylines product in new tab.
     * Note: Preview button on metadata editor will only show when editing an existing product, not when creating a new one
     * This is a design decision, can change if we decide that people would want to preview new products for some reason
     */
    preview(): void {
        // save current metadata final changes before previewing product
        this.productStore.saveMetadata(false);
        setTimeout(() => {
            const routeData = this.$router.resolve({
                name: 'preview',
                params: { lang: this.editorStore.configLang, uid: this.productStore.uuid }
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

    fetchHistory(): Promise<void> {
        // Note: This part probably doesn't need an manual abort() trigger to kill on load cancel,
        // as the history should be much smaller and quicker to fetch than the config

        if (this.productStore.uuid === undefined || this.productStore.uuid === '') {
            return;
        }
        this.editorStore.loadStatus = 'loading';
        const secret = this.lockStore.secret;
        return fetch(this.productStore.apiUrl + `/history/${this.productStore.uuid}`, {
            headers: { user: this.productStore.user, secret }
        }).then((res: Response) => {
            if (res.status === 404) {
                // Product not found.
                this.editorStore.loadStatus = 'waiting';
            } else {
                this.editorStore.loadStatus = 'loaded';
                res.json().then((json) => {
                    this.storylineHistory = json;
                });
            }
        });
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
            this.productStore.loadVersion(this.selectedHistory.hash);
        }
    }

    async renameProduct(): Promise<void> {
        console.log(' ');
        console.log('renameProduct()');
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
                this.productStore.renameSources(config, prevUuid, this.editorStore.changeUuid)
            );
            // Convert the two configuration files into string format.
            const convertedEnglish = JSON.stringify(englishConfig, null, 4);
            const convertedFrench = JSON.stringify(frenchConfig, null, 4);

            // First, hit the Express server `rename` endpoint to perform the `rename` syscall on the file system.
            // Before doing so, we transfer the existing lock to the new uuid
            this.lockStore
                .transferLock(this.editorStore.changeUuid)
                .then(async () => {
                    await axios
                        .post(this.productStore.apiUrl + `/rename`, {
                            user: this.productStore.user,
                            previousUuid: prevUuid,
                            newUuid: this.editorStore.changeUuid,
                            configs: { en: convertedEnglish, fr: convertedFrench }
                        })
                        .then(async (_res: AxiosResponse) => {
                            // Once the server has processed the renaming, update the UUID in the database if not in dev mode.
                            if (import.meta.env.VITE_APP_NET_API_URL) {
                                await axios.post(import.meta.env.VITE_APP_NET_API_URL + '/api/version/update', {
                                    uuid: prevUuid,
                                    changeUuid: this.editorStore.changeUuid
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
                                    `${this.editorStore.changeUuid}_en.json`,
                                    convertedEnglish
                                );
                                this.productStore.configFileStructure.zip.file(
                                    `${this.editorStore.changeUuid}_fr.json`,
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

                                this.uuid = this.editorStore.changeUuid;

                                // Reset source counts.
                                this.productStore.sourceCounts = {};

                                this.productStore
                                    .configFileStructureHelper(this.productStore.configFileStructure.zip)
                                    .then(() => {
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
                                this.productStore.uuid = prevUuid;
                                this.processingRename = false;
                                return;
                            }
                        });
                })
                .catch(() => {
                    Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                    this.productStore.uuid = prevUuid;
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
                    const newFile = oldPath.replace(`/${prevUuid}-map-`, `/${this.editorStore.changeUuid}-map-`);

                    // Re-add the config to the ZIP with the new name.
                    this.productStore.configFileStructure.zip.file(newFile, res);
                    resolve();
                });
        });
    }

    discardMetadataUpdates(): void {
        this.productStore.metadata = JSON.parse(JSON.stringify(this.productStore.temporaryMetadataCopy));
        this.editorStore.editingMetadata = false;
        this.stateStore.isChanged = false; // TODO: Does this cause false negatives? (maybe not if we don't have discarding for vfm)
    }

    /**
     * Checks if the UUID is invalid due to being blank or containing illegal characters.
     */
    isUuidInvalid(rename: boolean): 'blank' | 'badChar' | null {
        if (!rename && !this.productStore.uuid && !this.editorStore.loadExisting) {
            return 'blank';
        }

        // All reserved characters in URLs. The user can't use these for their UUID
        const illegalChars = [':', '/', '#', '?', '&', '@', '%', '+'];
        const illegalCharsContained = illegalChars.filter((badChar) =>
            (rename ? this.editorStore.changeUuid : this.productStore.uuid).includes(badChar)
        );

        if (illegalCharsContained.length) {
            return 'badChar';
        }

        return null;
    }

    checkUuid(rename?: boolean): void {
        if (rename || !this.editorStore.loadExisting) this.checkingUuid = true;

        if (!this.editorStore.loadExisting || rename) {
            const errorType = this.isUuidInvalid(!!rename);
            if (errorType) {
                this.editorStore.error = true;
                this.editorStore.warning = errorType;
                this.checkingUuid = false;
                return;
            }

            this.fetchUuidCheck(!!rename);
        }
        this.editorStore.warning = 'none';
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
        fetch(
            this.productStore.apiUrl + `/check/${rename ? this.editorStore.changeUuid : this.productStore.uuid}`
        ).then((res: Response) => {
            if (res.status !== 404) {
                this.editorStore.warning = rename ? 'rename' : 'uuid';

                if (!this.editorStore.loadExisting) {
                    this.error = true;
                }
            }

            if (rename || !this.editorStore.loadExisting) this.checkingUuid = false;

            fetch(this.productStore.apiUrl + `/retrieveMessages`)
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
        this.$i18n.locale = to.params.lang as string;
        document.onmousemove = () => undefined;
        document.onkeydown = () => undefined;

        const isProductLoaded = this.editorStore.loadStatus == 'loaded';
        const newUuidAdded =
            !from.params.uid && !!to.params.uid && isProductLoaded && to.params.uid != this.productStore.uuid;
        const uuidRemoved = !!from.params.uid && !to.params.uid;
        const uuidModified = !!from.params.uid && !!to.params.uid && to.params.uid !== from.params.uid;

        // Unlock the product in one of the three scenarios:
        // - if the `from` route contains a uuid, and the `to` route doesn't, we unlock only if there is a product
        //   already loaded in that is different
        // - if the `from` route doesn't contain a uuid, and the `to` route does, we unlock
        // - if the `from` route and the `to` route both contain uuids, we should unlock when they are different
        if (newUuidAdded || uuidRemoved || uuidModified) {
            this.lockStore.unlockStoryline();
            clearTimeout(this.lockStore.confirmationTimeout);
            clearTimeout(this.lockStore.endTimeout);
        }
        next();
    }

    checkRequiredFields(): boolean {
        // check if all required metadata fields are non-empty
        this.reqFields.uuid = !!this.productStore.uuid;
        if (Object.values(this.reqFields).some((field: boolean) => !field)) {
            Message.error(this.$t('editor.editMetadata.message.error.requiredFieldsNotFilled'));
            return false;
        }
        return true;
    }

    /**
     * Called when 'next' button is pressed on metadata page to continue to main editor.
     *
     */
    continueToEditor(): void {
        console.log(' ');
        console.log('continueToEditor()');
        this.loadingIntoEditor = true;

        // Needed in order to show the loading spinner at all
        // Although it shows, it's still frozen (since app's really just lagging until editor's in)
        setTimeout(() => {
            if (!this.checkRequiredFields()) {
                return;
            }
            if (this.editorStore.loadExisting) {
                if (
                    this.productStore.configs[this.editorStore.configLang] !== undefined &&
                    this.productStore.uuid === this.productStore.configFileStructure.uuid
                ) {
                    this.loadEditor = true;
                    this.productStore.saveMetadata(false).then(() => {
                        this.$router.push({ name: 'editor', params: { uid: this.productStore.uuid } });
                    });
                } else {
                    Message.error(this.$t('editor.editMetadata.message.error.noConfig'));
                }
            } else if (!this.productStore.uuid) {
                Message.error(this.$t('editor.warning.mustEnterUuid'));
                this.editorStore.error = true;
            } else {
                // We have a new product that is going to the main editor route, so its UUID is now locked.
                // Therefore, we also lock it in the server so that another user does not create a new product
                // with the same UUID until the user's session is in progress.
                this.lockStore
                    .lockStoryline(this.productStore.uuid)
                    .then(() => {
                        // Only generate config if not already present or UUID mismatch
                        if (
                            !this.productStore.configs[this.editorStore.configLang] ||
                            this.productStore.uuid !== this.productStore.configFileStructure?.uuid
                        ) {
                            this.productStore.generateNewConfig();
                        } else {
                            // Else config already exists and matches UUID, skip generation
                            // Update each zip file with their latest changes before loading
                            this.productStore.saveMetadata();

                            const writeConfigFile = (lang: 'en' | 'fr') => {
                                const configJson = JSON.stringify(this.productStore.configs[lang], null, 4);
                                this.productStore.configFileStructure.zip.file(
                                    `${this.productStore.uuid}_${lang}.json`,
                                    configJson
                                );
                            };

                            (['en', 'fr'] as const).forEach((lang) => writeConfigFile(lang));

                            this.editorStore.changeLang(this.currLang);
                            this.editorStore.correctUuid();
                        }
                    })
                    .catch(() => {
                        this.editorStore.error = true;
                        Message.error(this.$t('editor.editMetadata.message.error.unauthorized'));
                    })
                    .finally(() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    });
            }
        }, 25);
    }

    beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: (cont?: boolean) => void): void {
        console.log(' ');
        console.log('metadata - beforeRouteLeave()');
        const curEditor = this.$route.name === 'editor';
        const confirmationMessage = this.$t('editor.leaveWarning');
        const stay =
            !this.editorStore.sessionExpired &&
            this.stateStore.isChanged &&
            curEditor &&
            !window.confirm(confirmationMessage);
        const exitingProduct = to.name !== 'editor';
        const isProductLoaded = !!to.params.uid || this.editorStore.loadStatus == 'loaded';

        // This component is going bye-bye, so we need to do some clean up so that timers cannot fire later.
        clearTimeout(this.lockStore.confirmationTimeout);
        clearTimeout(this.lockStore.endTimeout);
        document.onmousemove = () => undefined;
        document.onkeydown = () => undefined;

        // Ensure that we are unlocking a product when a) we are going from the metadata-editor to the home page, and b)
        // there is a product currently loaded into the metadata-editor
        if (exitingProduct && isProductLoaded) {
            // Unlock the storyline for other users if we are exiting the product e.g. by navigating to a different route.
            this.lockStore.unlockStoryline();
            this.productStore.clearData();
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
            if (!this.editorStore.error) {
                this.continueToEditor();
            } else if (this.editorStore.warning !== 'none') {
                Message.error(this.$t(`editor.warning.${this.editorStore.warning}`));
            }
        }
    }

    handleUuidLoad(): void {
        if (this.productStore.uuid) {
            this.productStore
                .generateRemoteConfig()
                .then(this.fetchHistory)
                .then(() => {
                    Message.success(this.$t('editor.editMetadata.message.successfulLoad'));
                });
        } else {
            this.editorStore.error = true;
            this.editorStore.warning = 'blank';
            Message.error(this.$t(`editor.warning.${this.editorStore.warning}`));
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

        if (this.productStore.uuid) {
            combined = combined.filter(
                (storyline) =>
                    storyline.uuid.toLowerCase().includes(this.productStore.uuid.toLowerCase()) ||
                    (storyline.titleEN &&
                        storyline.titleEN.toLowerCase().includes(this.productStore.uuid.toLowerCase())) ||
                    (storyline.titleFR &&
                        storyline.titleFR.toLowerCase().includes(this.productStore.uuid.toLowerCase()))
            );
        }

        return combined;
    }

    getTitle(storyline: { titleEN: string; titleFR: string }): string {
        return this.editorStore.configLang === 'en' ? storyline.titleEN : storyline.titleFR;
    }

    selectUuid(uuid: string): void {
        this.productStore.uuid = uuid;
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

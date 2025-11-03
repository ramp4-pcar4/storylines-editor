<template>
    <div class="sticky top-0 bg-white pt-3 mb-2 border-b border-gray-300 z-50">
        <div class="flex justify-between items-center flex-wrap gap-y-1.5 gap-x-5 mb-2 mx-4">
            <h2 slot="header" class="text-xl font-semibold">
                {{ !!config ? $t('gallery.editor.item.edit') : $t('gallery.editor.item.header') }}
            </h2>
            <div class="flex flex-row gap-2">
                <button
                    class="respected-standard-button respected-gray-border-button respected-thin-button"
                    @click="onBack"
                    tabindex="0"
                >
                    {{ $t('dynamic.back') }}
                </button>
                <button
                    class="respected-standard-button respected-black-bg-button respected-thin-button"
                    @click="onOk"
                    :disabled="!itemSettings.source.name"
                >
                    {{ $t('editor.saveChanges') }}
                </button>
            </div>
        </div>
    </div>
    <div class="mx-4">
        <div class="mb-5">
            <div class="flex flex-col">
                <span class="respected-standard-label">{{ $t('gallery.editor.preview') }}</span>
                <span class="subcaption">{{ $t('gallery.editor.image.info') }}</span>
            </div>
            <div class="flex flex-wrap gap-3 mt-2 justify-center items-center">
                <div v-if="itemSettings.source.preview || itemSettings.source.name" class="flex flex-col items-center">
                    <!-- Pan Up -->
                    <span
                        class="pan-button flex w-full"
                        @mousedown="panHandler('up')"
                        @keydown.enter="panHandler('up')"
                        @keyup="panHandler('none')"
                        @mouseup="panHandler('none')"
                        @mouseleave="panHandler('none')"
                        tabindex="0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16px"
                            viewBox="0 -960 960 960"
                            width="16px"
                            fill="#000"
                        >
                            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                        </svg>
                    </span>
                    <div class="flex">
                        <!-- Pan Left -->
                        <div
                            class="w-full pan-button rotate-180"
                            @mousedown="panHandler('left')"
                            @keydown.enter="panHandler('left')"
                            @keyup="panHandler('none')"
                            @mouseup="panHandler('none')"
                            @mouseleave="panHandler('none')"
                            tabindex="0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="16px"
                                fill="#000"
                            >
                                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                            </svg>
                        </div>

                        <img
                            :src="itemSettings.source.preview || itemSettings.source.name"
                            class="item-preview select-none"
                            :alt="$t('gallery.editor.preview')"
                            @click="($event) => $event.preventDefault()"
                            :style="{
                                'object-position': `${itemSettings.position ? itemSettings.position.x : 50}% ${itemSettings.position ? itemSettings.position.y : 50}%`
                            }"
                        />

                        <!-- Pan Right -->
                        <span
                            class="pan-button"
                            @mousedown="panHandler('right')"
                            @keydown.enter="panHandler('right')"
                            @keyup="panHandler('none')"
                            @mouseup="panHandler('none')"
                            @mouseleave="panHandler('none')"
                            tabindex="0"
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="16px"
                                fill="#000"
                            >
                                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                            </svg>
                        </span>
                    </div>

                    <!-- Pan Down -->
                    <div
                        class="pan-button flex w-full rotate-180"
                        @mousedown="panHandler('down')"
                        @keydown.enter="panHandler('down')"
                        @keyup="panHandler('none')"
                        @mouseup="panHandler('none')"
                        @mouseleave="panHandler('none')"
                        tabindex="0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16px"
                            viewBox="0 -960 960 960"
                            width="16px"
                            fill="#000"
                        >
                            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                        </svg>
                    </div>

                    <div>
                        <button class="respected-standard-button mt-2" @click="panHandler('reset')">
                            {{ $t('gallery.editor.pan.reset') }}
                        </button>
                    </div>
                </div>

                <div class="item-upload" @click.stop="openFileSelector('imageUpload')" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 24 24">
                        <path
                            d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"
                        />
                    </svg>
                    <span>{{ $t('gallery.editor.image.upload') }}</span>
                </div>
            </div>

            <!-- hide the actual file input. Label prevents a WAVE error -->
            <label style="display: none" for="imageUpload">{{ $t('gallery.editor.image.upload') }}</label>
            <input
                type="file"
                id="imageUpload"
                @change="upload($event)"
                class="respected-standard-input w-1/4"
                style="display: none"
            />
        </div>
        <div class="mb-5">
            <label class="respected-standard-label" for="galleryItemCredit">{{ $t('gallery.editor.credit') }}</label>
            <div>
                <input
                    type="text"
                    name="title"
                    id="galleryItemCredit"
                    v-model="itemSettings.credit"
                    class="respected-standard-input"
                />
                <span class="subcaption">{{ $t('gallery.editor.credit.info') }}</span>
            </div>
        </div>
        <div class="mb-5">
            <label class="respected-standard-label" for="galleryItemAlt">{{ $t('gallery.editor.alt') }}</label>
            <div>
                <input
                    type="text"
                    name="title"
                    id="galleryItemAlt"
                    v-model="itemSettings.alt"
                    class="respected-standard-input"
                />
                <span class="subcaption">{{ $t('gallery.editor.alt.info') }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop } from 'vue-property-decorator';
import { Vue } from 'vue-class-component';
import { useProductStore } from '@/stores/productStore';
import { GalleryItem } from '@/definitions';

@Options({
    emits: ['return', 'save']
})
export default class GalleryItemEditorV extends Vue {
    @Prop() config?: GalleryItem;

    itemSettings: GalleryItem = {
        source: {
            name: '',
            preview: ''
        },
        alt: '',
        credit: '',
        position: {
            x: 50,
            y: 50
        }
    };

    panningInterval = undefined as NodeJS.Timeout | undefined;

    productStore = useProductStore();

    mounted(): void {
        // If a config was provided via prop, load it into the settings object.
        if (!!this.config) {
            this.itemSettings = Object.assign(this.itemSettings, this.config);
        }
    }

    onBack(): void {
        this.$emit('return');
    }

    onOk(): void {
        // Emits the 'save' event, which saves the item and returns to the main gallery editor.
        this.$emit('save', this.itemSettings);
    }

    openFileSelector(where: string): void {
        document.getElementById(where)?.click();
    }

    async upload(event: Event): Promise<void> {
        // Retrieve the uploaded file.
        const uploadedFile = ((event.target as HTMLInputElement).files as ArrayLike<File>)[0];
        const { inSharedAsset, newAssetName, uploadSource, oppositeSourceCount } =
            await this.productStore.addUploadedFile(uploadedFile, false);

        this.itemSettings.source.name = uploadSource;
        this.itemSettings.source.preview = URL.createObjectURL(uploadedFile);
    }

    /**
     * Handles panning the image left or right.
     * @param direction one of 'left', 'right', 'none', or 'reset'.
     */
    panHandler(direction: 'left' | 'right' | 'up' | 'down' | 'none' | 'reset'): void {
        switch (direction) {
            case 'reset':
                this.itemSettings.position = { x: 50, y: 50 };
                if (this.panningInterval) {
                    clearInterval(this.panningInterval);
                    this.panningInterval = undefined;
                }
                return;
            case 'none':
                clearInterval(this.panningInterval);
                this.panningInterval = undefined;
                return;
            case 'left':
                if (this.panningInterval) return;
                this.panningInterval = setInterval(() => {
                    let position = this.itemSettings.position!.x;
                    if (position > 0) {
                        this.itemSettings.position!.x--;
                    }
                }, 50);
                return;
            case 'right':
                if (this.panningInterval) return;
                this.panningInterval = setInterval(() => {
                    let position = this.itemSettings.position!.x;
                    if (position < 100) {
                        this.itemSettings.position!.x++;
                    }
                }, 50);
                return;
            case 'up':
                if (this.panningInterval) return;
                this.panningInterval = setInterval(() => {
                    let position = this.itemSettings.position!.y;
                    if (position > 0) {
                        this.itemSettings.position!.y--;
                    }
                }, 50);
                return;
            case 'down':
                if (this.panningInterval) return;
                this.panningInterval = setInterval(() => {
                    let position = this.itemSettings.position!.y;
                    if (position < 100) {
                        this.itemSettings.position!.y++;
                    }
                }, 50);
                return;
        }
    }
}
</script>

<style lang="scss" scoped>
.subcaption {
    color: rgb(106, 106, 106);
    font-size: small;
}
.item-preview {
    height: 300px;
    width: 300px;
    aspect-ratio: 1/1;
    object-fit: cover;
}
.item-upload {
    @apply flex flex-col items-center justify-center border border-gray-300 bg-gray-100 cursor-pointer;
    height: 300px;
    width: 300px;
    font-size: 24px;
}
.pan-button {
    @apply p-2 items-center content-center justify-center cursor-pointer;
}
.pan-button:hover {
    @apply bg-gray-200;
}
.rotate-180 {
    transform: rotate(180deg);
}
</style>

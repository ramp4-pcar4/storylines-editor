<template>
    <div class="sticky top-0 bg-white pt-3 mb-2 border-b border-gray-300 z-50">
        <div class="flex justify-between items-center flex-wrap gap-y-1.5 gap-x-5 mb-2 mx-4">
            <h2 slot="header" class="text-xl font-semibold">{{ $t('gallery.editor.header') }}</h2>
            <div class="flex flex-row gap-2">
                <button
                    class="respected-standard-button respected-gray-border-button respected-thin-button"
                    @click="onBack"
                    tabindex="0"
                >
                    {{ $t('dynamic.back') }}
                </button>
                <button class="respected-standard-button respected-black-bg-button respected-thin-button" @click="onOk">
                    {{ $t('editor.slideshow.label.add') }}
                </button>
            </div>
        </div>
    </div>
    <div class="mx-4">
        <div class="mb-5">
            <span class="respected-standard-label">{{ $t('gallery.editor.images') }}</span>
            <div class="image-previews flex flex-wrap gap-3 mt-2">
                <div
                    class="gallery-item border border-gray-300 rounded-md p-2 flex flex-col gap-2"
                    v-for="(item, index) in gallerySettings.items"
                    :key="index"
                >
                    <img
                        :src="item.source.preview || item.source.name"
                        class="gallery-item-image"
                        :style="{
                            'object-position': `${item.position ? item.position.x : 50}% ${item.position ? item.position.y : 50}%`
                        }"
                    />
                    <div class="flex gap-2">
                        <button class="edit-button" @click="editItem(index)">Edit</button>
                        <button
                            class="w-5"
                            @click="deleteItem(index)"
                            :content="$t('editor.image.delete')"
                            v-tippy="{ placement: 'top', hideOnClick: false, animateFill: true }"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88" width="18" height="18">
                                <path
                                    d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    class="add-item border-2 border-gray-300 rounded-md p-2 flex flex-col gap-2 items-center justify-center"
                    tabindex="0"
                    @click="editItem(-1)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
                        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                    </svg>
                    {{ $t('gallery.editor.add') }}
                </div>
            </div>
        </div>
        <div class="mb-5">
            <label class="respected-standard-label" for="galleryCaption">{{ $t('gallery.editor.caption') }}</label>
            <div>
                <input
                    type="text"
                    name="title"
                    id="galleryCaption"
                    v-model="gallerySettings.caption"
                    class="respected-standard-input"
                />
                <span class="subcaption">{{ $t('gallery.editor.caption.info') }}</span>
            </div>
        </div>

        <div class="flex flex-wrap mb-5 gap-5">
            <div class="flex-1">
                <label class="respected-standard-label" for="galleryPerRow">{{
                    $t('gallery.editor.itemsPerRow')
                }}</label>
                <div>
                    <input
                        type="number"
                        name="title"
                        id="galleryPerRow"
                        v-model="gallerySettings.itemsPerRow"
                        class="respected-standard-input"
                    />
                    <span class="subcaption">{{ $t('gallery.editor.itemsPerRow.info') }}</span>
                </div>
            </div>
            <div class="flex-1">
                <label class="respected-standard-label" for="galleryWidth">{{ $t('gallery.editor.width') }}</label>
                <div>
                    <input
                        type="text"
                        name="title"
                        id="galleryWidth"
                        v-model="gallerySettings.width"
                        class="respected-standard-input"
                    />
                    <span class="subcaption">{{ $t('gallery.editor.width.info') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop } from 'vue-property-decorator';
import { Vue } from 'vue-class-component';
import { useProductStore } from '@/stores/productStore';
import { GallerySettings } from '@/definitions';

@Options({
    emits: ['ok', 'back', 'edit']
})
export default class GalleryEditorV extends Vue {
    @Prop() gallerySettings!: GallerySettings;
    productStore = useProductStore();

    onOk(): void {
        // Emits the 'ok' event, which adds the audio widget to the text editor.
        this.$emit('ok');
    }

    onBack(): void {
        // Modal was closed, so reset the audio settings.
        this.$emit('back');
    }

    deleteItem(idx: number): void {
        this.gallerySettings.items.splice(idx, 1);
    }

    editItem(idx: number): void {
        this.$emit('edit', idx, idx >= 0 ? this.gallerySettings.items[idx] : undefined);
    }
}
</script>

<style lang="css" scoped>
.subcaption {
    color: rgb(106, 106, 106);
    font-size: small;
}

.gallery-item-image {
    height: 150px;
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
}
.edit-button {
    @apply flex-1 border border-black text-center;
    border-radius: 5px;
}
.image-previews {
    max-height: 420px;
    overflow-y: auto;
}
.add-item {
    @apply border-dashed;
    width: 168px;
    height: 202px;
    transition: background-color 0.2s;
}
.add-item:hover {
    @apply bg-gray-100 cursor-pointer;
}
</style>

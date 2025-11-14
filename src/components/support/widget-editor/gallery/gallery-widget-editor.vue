<template>
    <!-- The editor for an individual gallery item. -->
    <gallery-item-editor
        v-if="activeScreen === 'item'"
        @return="activeScreen = 'main'"
        @save="(config: GalleryItem) => saveItem(config)"
        :config="activeItemConfig"
    ></gallery-item-editor>

    <!-- This is the gallery widget screen. -->
    <gallery-editor
        @ok="onOk"
        @back="onBack"
        @edit="(idx: number, config: GalleryItem) => editItem(idx, config)"
        :gallerySettings="gallerySettings"
        v-else
    ></gallery-editor>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useProductStore } from '@/stores/productStore';
import GalleryEditorV from './gallery-editor.vue';
import GalleryItemEditorV from './gallery-item-editor.vue';
import { GalleryItem, GallerySettings } from '@/definitions';

@Options({
    components: {
        'gallery-editor': GalleryEditorV,
        'gallery-item-editor': GalleryItemEditorV
    },
    emits: ['ok', 'back']
})
export default class GalleryWidgetV extends Vue {
    productStore = useProductStore();

    gallerySettings: GallerySettings = {
        items: [],
        caption: '',
        itemsPerRow: 4,
        width: '100%'
    };

    activeScreen: 'main' | 'item' = 'main';
    editingItem: number = -1;
    activeItemConfig: GalleryItem | undefined = undefined;

    /**
     * Creates the Gallery widget and emits the `ok` event.
     */
    onOk(): void {
        // Build the widget HTML.
        const element = `<Gallery caption='${this.gallerySettings.caption}' itemsPerRow='${this.gallerySettings.itemsPerRow}' maxWidth='${this.gallerySettings.width}'>${this.gallerySettings.items.map((item) => `<GalleryItem src='${item.source.name}' alt='${item.alt}' credit='${item.credit}' position='${item.position ? item.position.x : 50}% ${item.position ? item.position.y : 50}%'></GalleryItem>`).join('')}</Gallery>\n`;

        // Emits the 'ok' event, which adds the widget to the text editor.
        this.$emit('ok', element);
    }

    onBack(): void {
        this.$emit('back');
    }

    editItem(idx: number, config: GalleryItem): void {
        this.activeScreen = 'item';
        this.editingItem = idx;
        this.activeItemConfig = config;
    }

    /**
     * Saves the config for an existing gallery item, or creates a new one.
     * @param config the gallery item configuration
     */
    saveItem(config: GalleryItem): void {
        if (this.editingItem >= 0) {
            this.gallerySettings.items[this.editingItem] = config;
        } else {
            this.gallerySettings.items.push(config);
        }

        // Switch back to the main screen.
        this.activeScreen = 'main';
        this.editingItem = -1;
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

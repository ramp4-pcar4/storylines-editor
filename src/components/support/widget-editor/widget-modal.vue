<template>
    <vue-final-modal
        @click="onCancel"
        modalId="widget-modal"
        content-class="widget-modal max-h-full overflow-y-auto max-w-xl w-full lg:w-2/5 bg-white border rounded-lg"
        class="flex justify-center items-center"
    >
        <div @click.stop class="flex flex-col space-y-2">
            <!-- Audio Widget -->
            <audio-widget
                v-if="selection === 'audio'"
                @ok="(payload: any) => onOk(payload)"
                @back="selection = 'none'"
            ></audio-widget>

            <!-- TODO: Popout Widget -->
            <gallery-widget
                v-else-if="selection === 'gallery'"
                @ok="(payload: any) => onOk(payload)"
                @back="selection = 'none'"
            ></gallery-widget>

            <!-- Default menu -->
            <div v-else>
                <widget-selection
                    @change="(selection: 'audio' | 'gallery' | 'none') => changeSelection(selection)"
                    @cancel="onCancel"
                ></widget-selection>
            </div>
        </div>
    </vue-final-modal>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { VueFinalModal } from 'vue-final-modal';
import AudioWidgetV from './audio-widget-editor.vue';
import GalleryWidgetV from './gallery/gallery-widget-editor.vue';
import WidgetSelectionV from './widget-selection.vue';

@Options({
    components: {
        'vue-final-modal': VueFinalModal,
        'audio-widget': AudioWidgetV,
        'gallery-widget': GalleryWidgetV,
        'widget-selection': WidgetSelectionV
    }
})
export default class WidgetModalV extends Vue {
    selection: 'audio' | 'gallery' | 'none' = 'none';

    changeSelection(newSelection: 'audio' | 'gallery' | 'none'): void {
        this.selection = newSelection;
    }

    onOk(payload?: any): void {
        // Emits the 'ok' event, which adds the audio widget to the text editor.
        this.$emit('ok', payload);

        this.selection = 'none';

        this.$vfm.close('widget-modal');
    }

    onCancel(): void {
        this.selection = 'none';

        this.$emit('cancel');
        this.$vfm.close('widget-modal');
    }
}
</script>

<style lang="scss">
.widget-modal {
    padding: 0px !important;
}
</style>

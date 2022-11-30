<template>
    <div class="flex-grow mx-5">
        <div v-if="currentSlide !== ''">
            <div class="flex">
                <div class="flex flex-col">
                    <label>Slide title:</label>
                    <input type="text" v-model="currentSlide.title" />
                </div>
                <span class="ml-auto"></span>
                <button>Previous Slide</button>
                <button>Next Slide</button>
            </div>
            <br />
            <div class="flex">
                <button @click="panelIndex = 0" :class="panelIndex == 0 ? 'font-extrabold' : ''">Left Panel</button>
                <button @click="panelIndex = 1" :class="panelIndex == 1 ? 'font-extrabold' : ''">Right Panel</button>
            </div>
            <br />
            <div>
                <div class="flex">
                    <span class="font-bold text-xl">Content:</span>
                    <span class="ml-auto flex-grow"></span>
                    <div v-if="panelIndex === 1" class="flex flex-col">
                        <label class="text-left text-xl">Content type:</label>
                        <select @change="currentSlide.panel[panelIndex].type = $event.target.value">
                            <option v-for="thing in Object.keys(editors)" :key="thing" :value="thing">
                                {{ thing }}
                            </option>
                        </select>
                    </div>
                </div>
                <component
                    :is="editors[currentSlide.panel[panelIndex].type]"
                    :key="panelIndex + currentSlide.panel[panelIndex].type"
                    :panel="currentSlide.panel[panelIndex]"
                ></component>
            </div>
        </div>
        <div v-else>
            <span>Please select a slide to edit.</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { StoryRampConfig } from '@/definitions';

import Circle2 from 'vue-loading-spinner/src/components/Circle2.vue';
import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';

@Component({
    components: {
        spinner: Circle2,
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV
    }
})
export default class SlideEditorV extends Vue {
    config: StoryRampConfig | undefined = undefined;
    @Prop() currentSlide!: any;

    panelIndex = 0;

    editors = {
        text: 'text-editor',
        image: 'image-editor',
        chart: 'chart-editor'
    };
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
}

.table-of-contents-slide button {
    padding: 0;
    border: none;
}
</style>

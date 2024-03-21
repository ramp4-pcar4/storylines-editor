<template>
    <div class="px-5">
        <div class="flex items-center">
            <label class="editor-label">{{ $t('editor.map.timeslider.range') }}</label>
            <input
                class="editor-input"
                type="number"
                :value="config.range[0]"
                @input="$emit('time-slider-changed', 'range', 0, $event.target.value)"
            />
            <span class="mx-3"> {{ $t('editor.map.timeslider.to') }} </span>
            <input
                class="editor-input"
                type="number"
                :value="config.range[1]"
                @input="$emit('time-slider-changed', 'range', 1, $event.target.value)"
            />
        </div>
        <br />
        <div class="flex items-center">
            <label class="editor-label">{{ $t('editor.map.timeslider.start') }}</label>
            <input
                class="editor-input ml-3"
                type="number"
                :value="config.start[0]"
                @input="$emit('time-slider-changed', 'start', 0, $event.target.value)"
            />
            <span class="mx-3"> {{ $t('editor.map.timeslider.to') }} </span>
            <input
                class="editor-input"
                type="number"
                :value="config.start[1]"
                @input="$emit('time-slider-changed', 'start', 1, $event.target.value)"
            />
        </div>
        <br />
        <div class="border-black border-2 p-3 w-2/3" v-if="error">
            <label class="editor-label w-full">{{ $t('editor.map.timeslider.warning') }}</label>
            <br />
            <ul class="list-disc my-2 ml-8">
                <li>{{ $t('editor.map.timeslider.warning.bullet1') }}</li>
                <li>{{ $t('editor.map.timeslider.warning.bullet2') }}</li>
            </ul>
            <span>{{ $t('editor.map.timeslider.warning.end') }}</span>
        </div>
        <br v-if="error" />
        <div>
            <label class="editor-label">{{ $t('editor.map.timeslider.attribute') }}</label>
            <input
                class="editor-input"
                :value="config.attribute"
                @input="$emit('time-slider-changed', 'attribute', undefined, $event.target.value)"
            />
        </div>
        <br />
        <div>
            <label class="editor-label">{{ $t('editor.map.timeslider.layers') }}</label>
            <br />
            <input
                class="editor-input w-full"
                :value="config.layers || ''"
                @input="$emit('time-slider-changed', 'layers', undefined, $event.target.value)"
            />
        </div>
        <br /><br />
    </div>
</template>

<script lang="ts">
import { TimeSliderConfig } from '@/definitions';
import { Prop, Vue } from 'vue-property-decorator';

export default class TimeSliderEditorV extends Vue {
    @Prop() config!: TimeSliderConfig;
    @Prop() error!: boolean;
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
    width: fit-content !important;
}
</style>

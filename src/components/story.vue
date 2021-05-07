<template>
    <div class="flex items-stretch">
        <ChapterMenuV :active-chapter-index="activeChapterIndex" :chapters="value.chapters" />

        <Scrollama
            class="relative story-scrollama"
            @step-enter="
                ({ element, index }) => {
                    activeChapterIndex = parseInt(element.dataset.chapterIndex);
                    initRamp(index);
                }
            "
        >
            <div
                v-for="(chapter, index) in value.chapters"
                :key="index"
                class="flex pt-24"
                :data-chapter-index="index"
                :id="chapter.title.toLowerCase().replaceAll(' ', '-')"
            >
                <ChapterV :value="chapter" :chapter-index="index" />

                <div class="sticky flex self-start justify-center flex-2 top-16">
                    <component
                        :is="chapter.graphic.type"
                        :payload="chapter.graphic.payload"
                        :chapter-index="index"
                    ></component>
                </div>
            </div>
        </Scrollama>
    </div>
</template>

<script lang="ts">
import 'intersection-observer';
import Scrollama from 'vue-scrollama';
import ChapterV from '@/components/chapter.vue';
import ChapterMenuV from '@/components/chapter-menu.vue';

import { Component, Vue, Prop } from 'vue-property-decorator';

import { GraphicKind, StoryConfig } from '@/story-config';

@Component({
    components: {
        Scrollama,
        ChapterV,
        ChapterMenuV
    }
})
export default class StoryV extends Vue {
    @Prop() value!: StoryConfig;

    activeChapterIndex = -1;

    ramps: string[] = [];

    initRamp(index: number): void {
        const rampId = `ramp-map-${index}`;

        if (this.value.chapters[index].graphic.type !== GraphicKind.Map) {
            return;
        }

        if (this.ramps.includes(rampId)) {
            return;
        }

        if (RAMP.mapById(rampId) !== undefined) {
            return;
        }

        new RAMP.Map(this.$el.querySelector(`#${rampId}`), 'config.json');
        this.ramps.push(rampId);
    }
}
</script>

<style lang="scss" scoped>
.story-scrollama {
    // bg-gray-50
    // background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
    // --tw-bg-opacity: 1;

    background: linear-gradient(to right, var(--sr-content-background) 33.3%, #fff 33.3%);
    // background: linear-gradient(to right, var(--sr-content-background) 40%, #fff 40%);

    border-style: solid none solid solid;
    border-width: 1px 0 1px 1px;

    // border-gray-200
    border-color: var(--sr-border-colour);

    // ref: shadow-md
    //--tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    // on the left
    &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 1px;
        left: 0;
        // modified tailwind shadow
        box-shadow: -3px 0px 6px 0px rgba(0, 0, 0, 0.1), -2px 0 4px 0px rgba(0, 0, 0, 0.06);
        //box-shadow: 0 -4px 6px grey;
    }

    // above
    > *:first-child::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        top: 0;
        // modified tailwind shadow
        box-shadow: 0 -3px 6px 0px rgba(0, 0, 0, 0.1), 0 -2px 4px 0px rgba(0, 0, 0, 0.06);
        //box-shadow: 0 -4px 6px grey;
    }

    // below
    > *:last-child::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        // box-shadow: 0 4px 6px grey;
        box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.1), 0 2px 4px 0px rgba(0, 0, 0, 0.06);
    }
}
</style>

<template>
    <div class="flex items-stretch">
        <ChapterMenuV :active-chapter-index="activeChapterIndex" :slides="config.slides" />

        <Scrollama class="relative story-scrollama" @step-enter="stepEnter">
            <div
                v-for="(slide, idx) in config.slides"
                class="flex pt-24"
                :key="idx"
                :data-chapter-index="idx"
                :id="slide.title.toLowerCase().replaceAll(' ', '-')"
            >
                <slide :config="slide" :slideIdx="idx"></slide>
            </div>
        </Scrollama>
    </div>
</template>

<script lang="ts">
import 'intersection-observer';
import Scrollama from 'vue-scrollama';
import { Component, Vue, Prop } from 'vue-property-decorator';

import ChapterMenuV from './chapter-menu.vue';
import SlideV from './slide.vue';
import { StoryRampConfig } from '@/definitions';

@Component({
    components: {
        Scrollama,
        ChapterMenuV,
        slide: SlideV
    }
})
export default class StoryV extends Vue {
    @Prop() config!: StoryRampConfig;

    activeChapterIndex = -1;

    stepEnter({ element }: { element: HTMLElement }): void {
        this.activeChapterIndex = parseInt(element.dataset.chapterIndex || '-1');
    }
}
</script>

<style lang="scss" scoped>
.story-scrollama {
    background: linear-gradient(to right, var(--sr-content-background) 33.3%, #fff 33.3%);
    // background: linear-gradient(to right, var(--sr-content-background) 40%, #fff 40%);

    border-style: solid none solid solid;
    border-width: 1px 0 1px 1px;

    // border-gray-200
    border-color: var(--sr-border-colour);

    // on the left
    &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 1px;
        left: 0;
        // modified tailwind shadow
        box-shadow: -3px 0px 6px 0px rgba(0, 0, 0, 0.1), -2px 0 4px 0px rgba(0, 0, 0, 0.06);
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
    }

    // below
    > *:last-child::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.1), 0 2px 4px 0px rgba(0, 0, 0, 0.06);
    }
}
</style>

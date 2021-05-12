<template>
    <Scrollama
        class="flex-1 prose max-w-none"
        :id="`chapter-${chapterIndex}`"
        @step-enter="({ element }) => (activeSceneIndex = parseInt(element.dataset.sceneIndex))"
    >
        <h2 class="sticky z-10 px-10 mb-0 chapter-title top-20">
            {{ value.title }}
        </h2>

        <div
            v-for="(scene, index) in value.scenes"
            :key="index"
            :data-scene-index="index"
            class="px-10"
            :class="{ 'is-active': activeSceneIndex === index }"
        >
            <h3>{{ scene.title }}</h3>

            <div v-html="md.render(scene.text)"></div>
        </div>
    </Scrollama>
</template>

<script lang="ts">
import 'intersection-observer';

import Scrollama from 'vue-scrollama';
import MarkdownIt from 'markdown-it';

import { Component, Prop, Vue } from 'vue-property-decorator';

import { ChapterConfig } from '@/story-config';

@Component({
    components: {
        Scrollama
    }
})
export default class Chapter extends Vue {
    @Prop() value!: ChapterConfig;
    @Prop() chapterIndex!: number;

    md = new MarkdownIt();

    activeSceneIndex = -1;
}
</script>

<style scoped lang="scss">
.chapter-title {
    &::before {
        position: absolute;
        content: '';
        top: -1rem;
        bottom: -1em;
        left: 2rem;
        right: 2rem;
        background-color: var(--sr-content-background);
        z-index: -1;

        border-bottom: 1px solid var(--sr-border-colour);
    }
}

.scene {
    &:not(.is-active) {
        color: #b9b9b9;
    }
}
</style>

<template>
    <Scrollama
        :id="`chapter-${index}`"
        @step-enter="({ element }) => (activeSceneIndex = parseInt(element.dataset.sceneIndex))"
    >
        <template v-slot:graphic>
            <component :is="value.graphic.type" :payload="value.graphic.payload"></component>
        </template>

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
    @Prop() index!: number;

    md = new MarkdownIt();

    activeSceneIndex = -1;

    mounted(): void {
        const els = this.$el.querySelectorAll('.chapter-title');

        els.forEach((el) => {
            const observer = new IntersectionObserver(
                ([e]) => e.target.classList.toggle('is-pinned', e.intersectionRatio < 1),
                { threshold: [1] }
            );

            observer.observe(el);
        });
    }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style scoped lang="scss">
.rv-map {
    height: 100%;
    width: 100%;
}

.scrollama-container ::v-deep {
    display: flex;

    > .scrollama-graphic {
        flex: 2;
        top: 4rem; // compensate for sticky header

        order: 1;

        align-self: flex-start;

        display: flex;
        justify-content: center;

        img {
            padding-left: 2.5rem;
            padding-right: 2.5rem;
            max-width: 100%;
            display: block;
        }
    }

    > .scrollama-steps {
        flex: 1;
    }
}

.scene {
    &:not(.is-active) {
        color: #b9b9b9;
    }
}
</style>

<template>
    <Scrollama
        :id="`chapter-${index}`"
        @step-enter="({ element }) => (activeSceneIndex = parseInt(element.dataset.sceneIndex))"
    >
        <template v-slot:graphic>
            <component :is="value.graphic.type" :payload="value.graphic.payload"></component>

            <!-- <div :id="`my-map-${stepIndex}`" class="rv-map" rv-config="config.json"></div> -->
            <!-- <img :src="stepImage" alt="" srcset="" /> -->

            <!--<div class="graphic-menu">

                 <h3>{{ stepTitle }}</h3>
                <ul class="menu">
                    <li
                        v-for="(step, index) in subSteps"
                        :key="index"
                        :class="{ 'is-active': currStepTitle == step.title }"
                    >
                        {{ step.title }}
                    </li>
                </ul> 
            </div>-->
        </template>

        <div
            v-for="(scene, index) in value.scenes"
            :key="index"
            :data-scene-index="index"
            class="scene"
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
        // height: 50vh;
        top: 4rem; // compensate for sticky header

        order: 1;

        // border: 1px solid grey;

        align-self: flex-start;

        display: flex;
        justify-content: center;

        img {
            // max-height: 100%;
            max-width: 100%;
            display: block;
        }
    }

    > .scrollama-steps {
        flex: 1;
    }
}

.scene {
    padding: 2rem;
    padding-top: 5vh;
    padding-bottom: 5vh;
    // margin-bottom: 5vh;

    line-height: 1.5em;

    &:not(.is-active) {
        color: #b9b9b9;
    }
}

.menu li {
    padding: 1rem 0;
    font-size: 0.8rem;
}

.menu li.is-active {
    font-weight: bold;
    color: tomato;
}
</style>

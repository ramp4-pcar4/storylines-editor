<template>
    <Scrollama
        id="story"
        @step-enter="
            ({ element, index }) => {
                activeChapterIndex = parseInt(element.dataset.chapterIndex);
                // initRamp(index);
            }
        "
    >
        <template v-slot:graphic>
            <ul class="menu">
                <li
                    v-for="(chapter, index) in story.chapters"
                    :key="index"
                    :class="{ 'is-active': activeChapterIndex === index }"
                >
                    ●
                </li>
            </ul>
        </template>

        <div v-for="(chapter, index) in story.chapters" :key="index" class="chapter" :data-chapter-index="index">
            <h2 class="chapter-title">{{ chapter.title }}</h2>

            <ChapterV :value="chapter" :index="index" />
        </div>
    </Scrollama>
</template>

<script lang="ts">
import 'intersection-observer';
import Scrollama from 'vue-scrollama';
import ChapterV from '@/components/chapter.vue';

import { Component, Vue } from 'vue-property-decorator';

import story, { StoryConfig } from '@/story-config';

@Component({
    components: {
        Scrollama,
        ChapterV
    }
})
export default class StoryV extends Vue {
    activeChapterIndex = -1;

    story: StoryConfig = story;

    initRamp(index: number): void {
        // new RAMP.Map(document.getElementById(`my-map-${index}`), 'config.json');
    }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss">
.chapter-title {
    padding: 0 2rem;

    position: sticky;
    top: 2rem;
}

#scrollama-container-story {
    display: flex;

    > .scrollama-graphic {
        align-self: flex-start;
        height: 100vh;
    }

    > .scrollama-steps {
        //background-color: #e4eef8;
        background: linear-gradient(to right, #e4eef8 33.3%, #fff 33.3%);
    }
}

.chapter {
    // padding: 2rem;
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-bottom: 5vh;
}

.menu {
    display: flex;
    justify-content: center;
    background-color: teal;
    color: white;

    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;

    height: 100%;
    width: 34px;
}

.menu li {
    list-style-type: none;
    // padding: 0.5rem;

    height: 30px;
    line-height: 30px;

    text-align: center;

    color: rgb(68, 68, 68);
}

.menu li.is-active {
    color: #fff !important;
    font-size: 28px;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>

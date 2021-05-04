<template>
    <Scrollama
        id="story"
        class="flex"
        @step-enter="
            ({ element, index }) => {
                activeChapterIndex = parseInt(element.dataset.chapterIndex);
                // initRamp(index);
            }
        "
    >
        <template v-slot:graphic>
            <div>
                <a href="#" class="flex items-center px-3 py-1 mt-3 mb-12">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="#707070"
                    >
                        <path d="m3.5 17h17m-17-5.0001h17m-17-4.9999h17" />
                    </svg>
                    <span class="flex-1 mt-px ml-4 leading-none overflow-ellipsis whitespace-nowrap">Chapters</span>
                </a>

                <ul class="overflow-hidden w-72 menu">
                    <li
                        v-for="(chapter, index) in value.chapters"
                        :key="index"
                        :class="{ 'is-active': activeChapterIndex === index }"
                    >
                        <a href="#" class="flex items-center px-3 py-1">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#fff"
                                stroke="#878787"
                            >
                                <path
                                    d="m19.325 16.229c-2.4415 1.4096-4.8829 2.8191-7.3244 4.2286-2.4415-1.4096-4.883-2.8192-7.3245-4.2288-3.55e-5 -2.8191-7.1e-5 -5.6383-1.066e-4 -8.4574 2.4415-1.4096 4.8829-2.8191 7.3244-4.2286 2.4415 1.4096 4.883 2.8192 7.3245 4.2288 3.7e-5 2.8191 7.4e-5 5.6383 1.1e-4 8.4574z"
                                    stroke-width=".93974"
                                />
                            </svg>
                            <span class="flex-1 mt-px ml-4 leading-none overflow-ellipsis whitespace-nowrap">{{
                                chapter.title
                            }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </template>

        <div
            v-for="(chapter, index) in value.chapters"
            :key="index"
            class="prose max-w-none chapter"
            :data-chapter-index="index"
        >
            <h2 class="chapter-title">{{ chapter.title }}</h2>

            <ChapterV :value="chapter" :index="index" />
        </div>
    </Scrollama>
</template>

<script lang="ts">
import 'intersection-observer';
import Scrollama from 'vue-scrollama';
import ChapterV from '@/components/chapter.vue';

import { Component, Vue, Prop } from 'vue-property-decorator';

import { StoryConfig } from '@/story-config';

@Component({
    components: {
        Scrollama,
        ChapterV
    }
})
export default class StoryV extends Vue {
    @Prop() value!: StoryConfig;

    activeChapterIndex = -1;

    initRamp(index: number): void {
        // new RAMP.Map(document.getElementById(`my-map-${index}`), 'config.json');
    }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss">
#scrollama-container-story {
    > .scrollama-graphic {
        align-self: flex-start;
        // height: 100vh;

        // width: 100px;

        top: 4rem; // compensate for sticky header

        // on the rigth; // TODO: need a better way
        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 1px;
            right: 0;
            // modified tailwind shadow
            box-shadow: -4px 0px 6px 0px rgba(0, 0, 0, 0.1), -2px 0 4px 0px rgba(0, 0, 0, 0.06);
            //box-shadow: 0 -4px 6px grey;
        }
    }

    > .scrollama-steps {
        // bg-gray-50
        // background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
        --tw-bg-opacity: 1;
        background: linear-gradient(to right, rgba(249, 250, 251, var(--tw-bg-opacity)) 33.3%, #fff 33.3%);

        border-style: solid none solid solid;
        border-width: 1px 0 1px 1px;

        // border-gray-200
        --tw-border-opacity: 1;
        border-color: rgba(229, 231, 235, var(--tw-border-opacity));

        // shadow-sm
        // --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        // box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

        --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        // above
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            top: 0;
            // modified tailwind shadow
            box-shadow: 0 -4px 6px 0px rgba(0, 0, 0, 0.1), 0 -2px 4px 0px rgba(0, 0, 0, 0.06);
            //box-shadow: 0 -4px 6px grey;
        }

        // below
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            // box-shadow: 0 4px 6px grey;
            box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.1), 0 2px 4px 0px rgba(0, 0, 0, 0.06);
        }
    }
}

.chapter-title {
    padding: 0 2rem;

    position: sticky;
    top: 2rem;
}

.chapter {
    // padding: 2rem;
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-bottom: 5vh;
}

.menu {
    // display: flex;
    // justify-content: center;
    // color: white;

    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;

    height: 100%;
    // width: 34px;

    // border: 1px solid grey;
}

.menu li.is-active {
    svg {
        fill: var(--sr-accent-colour);
        stroke: var(--sr-accent-colour);
    }

    span {
        font-weight: bold;
    }
}
</style>

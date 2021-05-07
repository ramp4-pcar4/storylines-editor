<template>
    <div
        :class="isMenuOpen ? 'w-72' : ''"
        class="sticky self-start w-12 duration-500 ease-in-out transition-width top-16"
    >
        <div class="flex items-center mt-4 mb-12">
            <tippy to="menu-button-tippy" placement="right" delay="200" v-if="!isMenuOpen">Chapters</tippy>
            <button name="menu-button-tippy" class="flex-shrink-0 px-2 py-1 mx-1" @click="isMenuOpen = !isMenuOpen">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#707070"
                >
                    <path class="transition-all duration-500 ease-in-out" :d="`m3.5 7h${isMenuOpen ? '17' : '8.5'}`" />
                    <path class="transition-all duration-500 ease-in-out" :d="`m3.5 12h${isMenuOpen ? '17' : '8.5'}`" />
                    <path d="m3.5 17h17" />
                </svg>
            </button>
            <span class="flex-1 mt-px ml-1 leading-none overflow-ellipsis whitespace-nowrap">Chapters</span>
        </div>

        <ul class="menu">
            <li
                v-for="(chapter, index) in chapters"
                :key="index"
                :class="{ 'is-active': activeChapterIndex === index }"
            >
                <tippy :to="`menu-options-tippy-${index}`" delay="200" placement="right" v-if="!isMenuOpen">{{
                    chapter.title
                }}</tippy>
                <a
                    :name="`menu-options-tippy-${index}`"
                    :href="`#${chapter.title.toLowerCase().replaceAll(' ', '-')}`"
                    class="flex items-center px-2 py-1 mx-1"
                    v-smooth-scroll
                >
                    <svg
                        class="flex-shrink-0"
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
                    <span class="flex-1 mt-px ml-4 overflow-hidden leading-none overflow-ellipsis whitespace-nowrap">{{
                        chapter.title
                    }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { ChapterConfig } from '@/story-config';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ChapterMenuV extends Vue {
    @Prop() chapters!: ChapterConfig[];
    @Prop() activeChapterIndex!: number;

    isMenuOpen = false;
}
</script>

<style lang="scss" scoped>
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

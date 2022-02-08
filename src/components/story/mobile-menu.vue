<template>
    <div class="sticky w-12 duration-500 ease-in-out transition-width">
        <div class="flex px-3 py-2">
            <button @click="isMenuOpen = !isMenuOpen">
                <svg
                    class="flex-shrink-0"
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
        </div>

        <ul v-show="isMenuOpen" class="dropdown-nav-content bg-white my-3 w-72 z-10 border-r border-gray-200">
            <div class="flex py-4">
                <span class="flex-2 pl-2 ml-4 leading-normal">{{ lang === 'en' ? 'Chapters' : 'Chapitres' }}</span>
                <button @click="isMenuOpen = !isMenuOpen">
                    <svg
                        class="flex-shrink-0 mr-4"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#c0c0c0"
                        stroke="#c0c0c0"
                    >
                        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                    </svg>
                </button>
            </div>
            <li>
                <router-link :to="{ hash: '#intro' }" class="flex py-1 px-3" target>
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
                    <span class="flex-1 ml-4 overflow-hidden leading-normal overflow-ellipsis whitespace-nowrap">{{
                        lang === 'en' ? 'Return to top' : 'Retournez en haut'
                    }}</span>
                </router-link>
            </li>
            <li v-for="(slide, idx) in slides" :key="idx" :class="{ 'is-active': activeChapterIndex === idx }">
                <router-link
                    :to="{ hash: `#${idx}-${slide.title.toLowerCase().replaceAll(' ', '-')}` }"
                    class="flex py-1 px-3"
                    target
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
                    <span class="flex-1 ml-4 overflow-hidden leading-normal overflow-ellipsis whitespace-nowrap">{{
                        slide.title
                    }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Slide } from '@/definitions';

@Component
export default class SideMenuV extends Vue {
    @Prop() slides!: Slide[];
    @Prop() activeChapterIndex!: number;
    @Prop() lang!: string;

    isMenuOpen = false;
}
</script>

<style lang="scss" scoped>
.dropdown-nav-content {
    overflow-y: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
}

.dropdown-nav-content::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}

.dropdown-nav-content li {
    a:hover {
        text-decoration: none;
        color: inherit;
    }

    a:focus {
        text-decoration: none;
        color: inherit;
    }

    a:hover svg {
        stroke: var(--sr-accent-colour);
    }

    a:visited {
        color: inherit;
    }

    &.is-active {
        svg {
            fill: var(--sr-accent-colour);
            stroke: var(--sr-accent-colour);
        }

        span {
            font-weight: bold;
        }
    }
}
</style>

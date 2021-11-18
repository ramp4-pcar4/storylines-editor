<template>
    <div class="py-24 mx-auto text-center max-w-9xl" id="intro">
        <img class="inline-block" :src="config.logo.src" :alt="config.logo.altText" />

        <h1 class="m-10 text-5xl font-bold text-gray-800">
            {{ config.title }}
        </h1>
        <p class="w-1/2 m-auto text-2xl font-semibold text-gray-500">
            {{ config.subtitle }}
        </p>

        <a href="#story" class="inline-block mt-10 scroll-arrow" title="scroll to story" v-smooth-scroll>
            <svg
                class="w-auto h-24 m-auto"
                width="90"
                height="104.84"
                viewBox="0 0 90 104.83"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m89.51 77.659-44.51 25.698-44.51-25.698 3.86e-4 -51.395 44.51-25.698 44.51 25.698z"
                    fill="#fff"
                    stroke="#00d2d3"
                    stroke-dasharray="4.8960465, 4.8960465"
                    stroke-dashoffset="2.7"
                    stroke-width=".5"
                />
                <path
                    d="m45 104.27-44.51-25.697v-10.646l44.51 25.697 44.51-25.697v10.646z"
                    fill="#00d2d3"
                    stroke="#00d2d3"
                    stroke-width=".97921"
                />
            </svg>
        </a>
    </div>
</template>

<script lang="ts">
import { Intro } from '@/definitions';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class IntroV extends Vue {
    @Prop() config!: Intro;
}
</script>

<style lang="scss"></style>

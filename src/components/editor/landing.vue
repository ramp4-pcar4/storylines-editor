<template>
    <div class="flex justify-center">
        <div class="home-btn-container border-4 border-gray-400 border-solid m-24">
            <router-link
                :to="{ name: 'metadata', params: { editExisting: false } }"
                class="flex justify-center h-full w-full"
                target
            >
                <button class="text-2xl font-bold">+ {{ $t('editor.createProduct') }}</button>
            </router-link>
        </div>
        <div class="home-btn-container border-4 border-gray-400 border-solid m-24">
            <router-link
                :to="{ name: 'metadata', params: { editExisting: true } }"
                class="flex justify-center h-full w-full"
                target
            >
                <button class="text-2xl font-bold">{{ $t('editor.editProduct') }}</button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class LandingV extends Vue {}
</script>

<style lang="scss">
.home-btn-container {
    height: 60vh;
    width: 40vh;
}
</style>

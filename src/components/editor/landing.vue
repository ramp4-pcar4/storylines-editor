<template>
    <div class="relative">
        <div class="absolute top-0 right-0 bg-white text-black p-2">
            {{ $t('editor.landing.greeting') }} {{ userName }}!
        </div>
        <div class="flex justify-center">
            <div class="home-btn-container border-4 border-gray-400 border-solid m-24">
                <router-link :to="{ name: 'metadataNew' }" class="flex justify-center h-full w-full" target>
                    <button class="text-2xl font-bold">+ {{ $t('editor.createProduct') }}</button>
                </router-link>
            </div>
            <div class="home-btn-container border-4 border-gray-400 border-solid m-24">
                <router-link :to="{ name: 'metadataExisting' }" class="flex justify-center h-full w-full" target>
                    <button class="text-2xl font-bold">{{ $t('editor.editProduct') }}</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import { useUserStore } from '../../stores/userStore';

export default class LandingV extends Vue {
    get userName() {
        const userStore = useUserStore();
        return userStore.userProfile.userName || 'Guest';
    }
}
</script>

<style lang="scss">
.home-btn-container {
    height: 60vh;
    width: 40vh;
}
</style>

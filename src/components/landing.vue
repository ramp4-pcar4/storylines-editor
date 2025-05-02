<template>
    <div class="relative mt-10">
        <div class="flex flex-col items-center">
            <!-- Editor title & icon -->
            <div class="flex flex-wrap flex-col items-center gap-y-3 mt-12 mx-8 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36">
                    <path
                        fill="#DD2E44"
                        d="M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5s-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292s1.542-10.5 1.086-10.698s-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125s-3.337-1.48-3.793-1.282s1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5s-3.125.312-3.125 1s8.438 5.235 9 5.771s-2.914 2.802-2.417 3.229c.576.496 3.839-.83 10.417-.957V35a1 1 0 1 0 2 0v-6.04c6.577.127 9.841 1.453 10.417.957c.496-.428-2.979-2.694-2.417-3.229s9-5.084 9-5.771"
                    />
                </svg>
                <div>
                    <!-- Editor EN title -->
                    <!-- NOTE: second t() param (1) is just a dummy -->
                    <h1 class="text-2xl font-bold text-center">
                        {{ $t('editor.respectTitle', 1, { locale: 'en' }) }}
                    </h1>
                    <!-- Editor FR title -->
                    <h1 style="padding-top: 2px" class="text-2xl font-bold text-center text-gray-400">
                        {{ $t('editor.respectTitle', 1, { locale: 'fr' }) }}
                    </h1>
                </div>
            </div>

            <!-- Greeting with username -->
            <p class="text-md font-semibold mt-2">
                {{ $t('editor.landing.greeting', 1, { locale: 'en' }) }}, {{ userName }}! /
                {{ $t('editor.landing.greeting', 1, { locale: 'fr' }) }}, {{ userName }}!
            </p>

            <!-- Language selection buttons -->
            <div class="flex flex-wrap gap-y-4 justify-center mt-12 mb-32">
                <!-- English button -->
                <div class="lang-selector">
                    <router-link
                        :to="{ name: 'home', params: { lang: 'en' } }"
                        class="flex justify-center h-full w-full"
                        target
                    >
                        <div class="text-2xl text-white font-semibold self-center">English</div>
                    </router-link>
                </div>
                <!-- French button -->
                <div class="lang-selector">
                    <router-link
                        :to="{ name: 'home', params: { lang: 'fr' } }"
                        class="flex justify-center h-full w-full"
                        target
                    >
                        <div class="text-2xl text-white font-semibold self-center">Français</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import { useUserStore } from '../stores/userStore';

export default class LandingV extends Vue {
    url = window.location.href;

    beforeCreate(): void {
        // Automatically choose lang and re-route when the user is using Canada.ca template
        if (this.url.includes('index-ca')) {
            const lang = this.url.includes('index-ca-en') ? 'en' : 'fr';
            this.$router.push({
                name: 'home',
                params: { lang }
            });
        }
    }

    get userName(): string {
        const userStore = useUserStore();
        return userStore.userProfile?.userName || 'Guest';
    }
}
</script>

<style lang="scss">
.lang-selector {
    height: 120px;
    width: 250px;
    max-width: 90%;
    background-color: #26374a;
    border-radius: 0.5rem /* rounded-lg 8px */;
    margin-left: 2rem /* 32px */;
    margin-right: 2rem /* 32px */;
}
.lang-selector:hover {
    background-color: #2572b4;
}
</style>

<template>
    <div id="app" class="storyramp-app bg-white">
        <router-view :key="$route.path"></router-view>
    </div>
</template>

<script lang="ts">
import { Vue, Watch } from 'vue-property-decorator';
import { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from './stores/userStore';

export default class App extends Vue {
    @Watch('$route', { immediate: true })
    onRouteUpdate(to: RouteLocationNormalized): void {
        this.$i18n.locale = (to.params.lang as string) ?? 'en';
        if (to.params.lang) {
            document.title = this.$t(to.meta.title);
        }
    }

    mounted() {
        const userStore = useUserStore(this.$pinia);
        // We can mock the user's profile for local development here if needed.
        if (process.env.VUE_APP_CURR_ENV !== '') {
            userStore.fetchUserProfile();
        }
    }
}
</script>

<style lang="scss">
$font-list: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.ovwContainer .layerTile {
    max-width: initial;
}

body {
    font-size: 16px;
}

#app {
    font-family: $font-list;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    --sr-accent-colour: #00d2d3;

    --sr-content-background: rgba(249, 250, 251, 1);

    --sr-border-colour: rgba(229, 231, 235, 1);
    // border-gray-200

    .scroll-arrow {
        animation: bounce-light 1s 4.5;

        &:hover {
            animation-iteration-count: infinite;
        }
    }

    @keyframes bounce-light {
        0%,
        100% {
            transform: translateY(-10%);
            animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: translateY(0);
            animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
        }
    }
}
</style>

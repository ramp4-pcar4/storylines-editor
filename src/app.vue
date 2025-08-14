<template>
    <div id="app" class="storyramp-app bg-white">
        <router-view :key="$route.path"></router-view>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from './stores/userStore';
import { useLockStore } from './stores/lockStore';
import { getCurrentInstance, onMounted, watch } from 'vue';

// =========================================
// Component props and emits
// (If any are missing, they don't exist)

// =========================================
// Definitions

const { $pinia, $route, $i18n } = getCurrentInstance()!.proxy!;

// =========================================
// Watchers

watch($route, () => {
    $i18n.locale = ($route.params.lang as string) ?? 'en';
    if ($route.params.lang) {
        document.title = $i18n.t($route.meta.title);
    }
});

// =========================================
// Lifecycle functions

onMounted(() => {
    const userStore = useUserStore($pinia);
    // We can mock the user's profile for local development here if needed.
    if (import.meta.env.VITE_APP_CURR_ENV) {
        userStore.fetchUserProfile();
    }
    const lockStore = useLockStore();
    lockStore.initConnection(); // start the handshake with the web socket server as soon as the app starts to save time
});

// =========================================
// Component functions

// =========================================
// Component exposes
</script>

<style lang="scss">
$font-list: 'Segoe UI', system-ui, ui-sans-serif, Tahoma, Geneva, Verdana, sans-serif;

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

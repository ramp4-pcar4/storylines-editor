<template>
    <div class="relative">
        <div class="absolute top-0 right-0 bg-white text-black p-2">
            {{ $t('editor.landing.greeting') }} {{ userName }}!
        </div>
        <div class="flex flex-col items-center">
            <h1 class="text-2xl font-bold mt-4">{{ title }}</h1>
            <div class="flex justify-center mt-12 mb-32">
                <div class="lang-selector border-4 border-gray-400 border-solid mx-8">
                    <router-link
                        :to="{ name: 'home', params: { lang: 'en' } }"
                        class="flex justify-center h-full w-full"
                        target
                    >
                        <button class="text-2xl text-white font-bold">English</button>
                    </router-link>
                </div>
                <div class="lang-selector border-4 border-gray-400 border-solid mx-8">
                    <router-link
                        :to="{ name: 'home', params: { lang: 'fr' } }"
                        class="flex justify-center h-full w-full"
                        target
                    >
                        <button class="text-2xl text-white font-bold">Français</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { Vue } from 'vue-property-decorator';
<<<<<<< HEAD
import { useUserStore } from '../stores/userStore';
=======

// import { useUserStore } from '../stores/userStore';
>>>>>>> 0ec84c8 (Changes the web socket server after local IIS debugging)

export default class LandingV extends Vue {
    title = document.title;

    mounted(): void {
        const socketUrl = `${
            import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040'
        }`;

        const socket = ref(null);

        socket.value = new WebSocket(socketUrl);

        socket.value.onopen = () => {
            console.log('Web socket connected');
        }

        socket.value.onmessage = (event) => {
            console.log(event.data);
            socket.value.send('Hello from the client!');
        }

        socket.value.onclose = () => {
            console.log('Web socket disconnected');
        }
    
        // // When the WebSocket connection is established
        // socket.onopen = function() {
        //     console.log("WebSocket connected.");
        //     // Send a message to the server
        //     socket.send("Hello from the client!");
        // };
        // // When a message is received from the server
        // socket.onmessage = function(event) {
        //     console.log("Received from server:", event.data);
        // };
        // // When the WebSocket connection is closed
        // socket.onclose = function() {
        //     console.log("WebSocket connection closed.");
        // };
        // // If there's an error with the WebSocket
        // socket.onerror = function(error) {
        //     console.log("WebSocket error:", error);
        // };
    }

    get userName(): string {
        const userStore = useUserStore();
        return userStore.userProfile?.userName || 'Guest';
    }
}
</script>

<style lang="scss">
.lang-selector {
    height: 18vh;
    width: 32vh;
    background-color: #26374a;
}
.lang-selector:hover {
    background-color: #2572b4;
}
</style>

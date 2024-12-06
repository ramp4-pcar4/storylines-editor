import { defineStore } from 'pinia';

interface Storyline {
    uuid: string;
    titleEN: string;
    titleFR: string;
    lastModified: string;
    isUserStoryline?: boolean;
}

interface UserProfile {
    userName?: string;
    role?: string;
    storylines?: Array<Storyline>;
    allStorylines?: Array<Storyline>;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userProfile: {} as UserProfile
    }),
    actions: {
        async fetchUserProfile() {
            const apiUrl = import.meta.env.VITE_APP_CURR_ENV
                ? import.meta.env.VITE_APP_NET_API_URL
                : 'https://localhost:6040';
            try {
                const response = await fetch(apiUrl + '/api/user/profile', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    this.userProfile = data;
                } else {
                    console.error('Failed to fetch the user profile.');
                }
            } catch (error) {
                console.error('Error fetching user profile: ', error);
            }
        }
    }
});

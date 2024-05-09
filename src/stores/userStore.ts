import { defineStore } from 'pinia';

interface Storyline {
    uuid: string;
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
            const apiUrl =
                process.env.VUE_APP_CURR_ENV !== '#{CURR_ENV}#'
                    ? process.env.VUE_APP_NET_API_URL
                    : 'https://localhost:44371';
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

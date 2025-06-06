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
                : 'http://localhost:6040';
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

                // Mock userProfile during dev
                this.userProfile = {
                    userName: 'Guest',
                    role: 'Editor',
                    storylines: [
                        {
                            uuid: '7d710e08-d8c2-4e47-bbe4-2585d9155dc7',
                            titleEN: 'Title 1',
                            titleFR: 'Titre 1',
                            lastModified: '2025-02-18T14:15:30.0505763'
                        },
                        {
                            uuid: '856b4b64-4df1-4fdf-9c17-67a2d4f92cf0',
                            titleEN: 'Title 2',
                            titleFR: 'Titre 2',
                            lastModified: '2025-06-06T08:49:30.9497418'
                        }
                    ],
                    allStorylines: [
                        {
                            uuid: '00000000-0000-0000-0000-000000000000',
                            titleEN: '',
                            titleFR: '',
                            lastModified: '2024-11-12T15:59:59.4366667'
                        }
                    ]
                };
            }
        }
    }
});

import { StoryRampConfig } from '@/definitions';
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('state', {
    state: () => ({
        configs: { en: undefined, fr: undefined } as {
            [key: string]: StoryRampConfig | undefined;
        }
    }),
    actions: {}
});

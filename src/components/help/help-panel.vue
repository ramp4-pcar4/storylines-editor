<template>
    <vue-final-modal
        modalId="help-panel"
        content-class="flex flex-col overflow-y-auto bg-white  w-full rounded-lg space-y-2"
        class="help-panel flex justify-center items-center w-full"
    >
        <h2 class="text-lg font-bold">
            {{ $t('help.title') }}
        </h2>
        <div>
            <div class="h-26 mb-8 mx-8">
                <input
                    type="search"
                    class="rv-help-search-bar border-b w-full text-base py-2 outline-none focus:shadow-outline border-gray-600 h-full min-w-0"
                    :placeholder="$t('help.search')"
                    v-model="searchTerm"
                    :aria-label="$t('help.search')"
                    @input="doSearch(searchTerm, helpSections)"
                    @keypress.enter.prevent
                    enterkeyhint="done"
                />
            </div>
            <div v-if="noResults">
                <p>{{ $t('help.noResults') }}</p>
            </div>
            <help-section
                v-for="(section, idx) in helpSections"
                :helpSection="section"
                :key="idx"
                @expand="toggleExpanded(section)"
            ></help-section>
        </div>
    </vue-final-modal>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { VueFinalModal } from 'vue-final-modal';
import { HelpSection } from '@/definitions';
import HelpSectionV from './help-section.vue';
@Options({
    components: {
        'vue-final-modal': VueFinalModal,
        'help-section': HelpSectionV
    }
})
export default class HelpPanelV extends Vue {
    @Prop() helpSections!: [
        {
            header: string;
            info: string;
            drawn: boolean;
            expanded: boolean;
        }
    ];
    @Prop() originalTextArray!: string[];
    searchTerm = '';
    noResults = false;
    numResults = 0;
    /**
     * Expand and collapse the respective help section.
     */
    toggleExpanded(section: HelpSection): void {
        section.expanded = !section.expanded;
    }
    /**
     * Find search term in info sections without impacting the HTML tags.
     */
    findInfo(searchTerm: string, section: HelpSection): boolean {
        const segments: string[] = section.info.split(/(<[^>]*>)/);
        for (const [i, segment] of segments.entries()) {
            if (i % 2 === 0) {
                if (segment.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * highlight the search term
     */
    highlightSearchTerm(searchTerm: string, idx: number): void {
        const originalText = this.originalTextArray[idx];
        // split text around <a> and <img> to preserve links
        const segments: string[] = originalText.split(/(<[^>]*>)/);
        let highlightedText = '';
        for (const [i, segment] of segments.entries()) {
            if (i % 2 === 0) {
                highlightedText += segment.replace(
                    new RegExp(searchTerm, 'gi'),
                    (match: string) => `<mark>${match}</mark>`
                );
            } else {
                highlightedText += segment;
            }
        }
        // text to display set with highlights
        this.helpSections[idx].info = highlightedText;
    }
    /**
     * Find the help sections which contain the search term.
     */
    doSearch(searchTerm: string, sections: HelpSection[]): void {
        this.numResults = 0;
        sections.forEach((section: HelpSection, index: number) => {
            //reset the text to original before looking for search term
            section.info = this.originalTextArray[index];
            //find the search term in each section
            section.drawn =
                this.findInfo(searchTerm, section) ||
                section.header.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            this.numResults = section.drawn ? this.numResults + 1 : this.numResults;
            section.expanded = section.drawn && searchTerm.length > 2;
            if (section.drawn && searchTerm.length > 2) {
                this.highlightSearchTerm(searchTerm, index);
            }
        });
        this.noResults = this.numResults === 0;
    }
}
</script>
<style lang="scss" scoped>
.storyramp-app .help-panel :not(table, td, img) {
    all: revert;
}

.storyramp-app .vfm__content,
.vfm .vfm__content {
    max-width: 80%;
    min-width: 70%;
    max-height: 80%;
    margin: 16px;
    padding: 4px;
}
</style>

<template>
    <div class="block">
        <!-- left and right panel buttons for dynamic panels -->
        <div class="flex">
            <button
                @click="() => changePanel('text')"
                class="border hover:bg-gray-100"
                :class="editingStatus === 'text' ? 'border-black' : 'border-gray-300'"
            >
                Text Section
            </button>
            <button
                @click="() => changePanel('panels')"
                class="border hover:bg-gray-100"
                :class="editingStatus !== 'text' ? 'border-black' : 'border-gray-300'"
            >
                Panel Collection
            </button>
        </div>
        <!-- Text Section -->
        <div v-if="editingStatus === 'text'">
            <component
                :is="'text-editor'"
                key="text"
                :panel="panel"
                :configFileStructure="configFileStructure"
                :lang="lang"
            ></component>
        </div>
        <div v-if="editingStatus === 'panels'">
            <table class="w-2/3 mt-5">
                <tr class="table-header">
                    <th>Panel ID</th>
                    <th>Panel Type</th>
                    <th>Panel Actions</th>
                </tr>
                <tr class="table-contents" v-for="(item, idx) in panel.children" :key="idx">
                    <td>{{ item.id }}</td>
                    <td>{{ item.panel.type }}</td>
                    <td>
                        <span @click="() => switchSlide(idx)">Edit</span> |
                        <span @click="() => removeSlide(idx)">Remove</span>
                    </td>
                </tr>
                <tr class="table-add-row">
                    <th><input type="text" placeholder="Enter Panel ID" v-model="newSlideName" /></th>
                    <th>
                        <select v-model="newSlideType">
                            <option
                                v-for="thing in Object.keys(editors).filter((editor) => editor !== 'image')"
                                :key="thing"
                            >
                                {{ thing }}
                            </option>
                        </select>
                    </th>
                    <th><button @click="createNewSlide">Add New</button></th>
                </tr>
            </table>

            <div v-if="editingSlide !== -1">
                <br />
                <hr />
                <br />
                <span class="font-bold text-xl">Panel Editor:</span><br />
                <component
                    ref="slide"
                    :is="
                        editors[
                            panel.children[editingSlide].panel.type === 'image'
                                ? 'slideshow'
                                : panel.children[editingSlide].panel.type
                        ]
                    "
                    :key="editingSlide + panel.children[editingSlide].panel.type"
                    :panel="panel.children[editingSlide].panel"
                    :configFileStructure="configFileStructure"
                    :lang="lang"
                ></component>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChartEditorV from './chart-editor.vue';
import ImageEditorV from './image-editor.vue';
import TextEditorV from './text-editor.vue';
import MapEditorV from './map-editor.vue';
import { DefaultConfigs, PanelType } from '@/definitions';

@Component({
    components: {
        'chart-editor': ChartEditorV,
        'image-editor': ImageEditorV,
        'text-editor': TextEditorV,
        'dynamic-editor': DynamicEditorV,
        'map-editor': MapEditorV
    }
})
export default class DynamicEditorV extends Vue {
    @Prop() panel!: any;
    @Prop() configFileStructure!: any;
    @Prop() lang!: string;

    editors = {
        text: 'text-editor',
        image: 'image-editor',
        slideshow: 'image-editor',
        chart: 'chart-editor',
        map: 'map-editor'
    };

    startingConfig: DefaultConfigs = {
        text: {
            type: PanelType.Text,
            title: '',
            content: ''
        },
        dynamic: {
            type: PanelType.Dynamic,
            title: '',
            titleTag: '',
            content: '',
            children: []
        },
        slideshow: {
            type: PanelType.Slideshow,
            images: []
        },
        chart: {
            type: PanelType.Chart,
            charts: []
        },
        map: {
            type: PanelType.Map,
            config: '',
            title: '',
            scrollguard: false
        }
    };

    editingStatus = 'text';
    editingSlide = -1;

    newSlideName = '';
    newSlideType = 'text';

    changePanel(target: string) {
        this.saveChanges();
        this.editingStatus = target;
    }

    switchSlide(idx: number) {
        // Save slide changes if neccessary and switch to the newly selected slide.
        this.saveChanges();
        this.editingSlide = idx;

        // Image Panel to Slideshow Panel Conversion
        if (this.panel.children[this.editingSlide].panel.type === 'image') {
            this.panel.children[this.editingSlide].panel = {
                type: 'slideshow',
                images: [this.panel.children[this.editingSlide].panel]
            };
        }
    }

    removeSlide(item: any) {
        this.panel.children = this.panel.children.filter((panel: any, idx: number) => idx !== item);

        // If the slide being removed is the currently selected slide, unselect it.
        if (this.editingSlide === item) {
            this.editingSlide = -1;
        }
    }

    createNewSlide() {
        if (!this.newSlideName) return;

        const newConfig = {
            id: this.newSlideName,
            panel: this.startingConfig[this.newSlideType as keyof DefaultConfigs]
        };

        this.newSlideName = '';
        this.panel.children.push(newConfig);
    }

    saveChanges() {
        if (this.$refs.slide !== undefined && typeof (this.$refs.slide as any).saveChanges === 'function') {
            (this.$refs.slide as any).saveChanges();
        }
    }
}
</script>

<style lang="scss">
.table-header th {
    text-align: center;
    background-color: #ddd;
    padding: 5px;
}
.table-contents td {
    text-align: center;
    padding: 5px;
}
.table-contents:hover {
    background-color: #eee;
    cursor: pointer;
}
.table-add-row th {
    text-align: center;
    border-top: 1px solid #ddd;
    padding: 5px;
}
.table-add-row input[type='text'],
.table-add-row select,
.table-add-row button {
    width: 150px !important;
    text-align: center;
    font-weight: normal;
    border: 1px solid black;
    padding: 2px !important;
}
</style>

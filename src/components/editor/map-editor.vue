<template>
    <div class="flex flex-col">
        <label class="text-left">Map title:</label>
        <input type="text" v-model="panel.title" />

        <div v-if="status === 'editing'">
            <label class="mt-2">Enable Scrollguard:</label>
            <input type="checkbox" @change="panel.scrollguard = $event.target.value" v-model="panel.scrollguard" />
            <span class="ml-6"></span>
            <label class="mt-2">Enable Time Slider:</label>
            <input type="checkbox" @change="usingTimeSlider = $event.target.value" v-model="usingTimeSlider" />
            <br />

            <div class="flex justify-between mb-4">
                <label class="mt-2">Map Editor:</label>
                <button
                    class="border border-black hover:bg-gray-100"
                    @click="
                        () => {
                            status = 'default';
                        }
                    "
                >
                    Cancel Editing
                </button>
            </div>
            <iframe
                src="scripts/ramp-editor/samples/fgpv-author.html"
                style="width: 70vw; height: 100vh"
                id="RAMPeditorframe"
            ></iframe>
        </div>
        <div v-if="status === 'creating'">
            <label class="text-left mt-2">Map config name*:</label>
            <div class="flex flex-row items-center"><input type="text" v-model="newFileName" />.json</div>

            <ul class="flex flex-wrap list-none justify-center" v-if="newFileName != ''">
                <li class="map-item items-center my-8 mx-5 overflow-hidden" @click="createNewConfig">
                    <div class="add-map"></div>
                    {{ $t('editor.map.label.create') }}
                </li>
            </ul>
        </div>
        <div v-if="status === 'default'">
            <label class="text-left mt-2">Map Editor:</label>
            <ul class="flex flex-wrap list-none justify-center">
                <li class="map-item items-center my-8 mx-5 overflow-hidden" @click="openEditor">
                    <div class="edit-map"></div>
                    {{ $t('editor.map.label.edit') }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import defaultConfig from '../../../public/scripts/ramp-editor/samples/config-default.json';

@Component({
    components: {}
})
export default class MapEditorV extends Vue {
    @Prop() panel!: any;
    @Prop() configFileStructure!: any;
    @Prop() lang!: string;
    @Prop() sourceCounts!: any;

    // For creating new files.
    newFileName = '';

    // TimeSlider
    usingTimeSlider = false;

    status = this.panel.config !== '' ? 'default' : 'creating';
    strippedFileName = this.panel.config !== '' ? this.panel.config.split('/')[3].split('.')[0] : '';

    mounted() {
        // If a message is received, it means the map save button was pressed.
        window.addEventListener('message', (event) => {
            if (event.data === 'mapSaved') {
                this.saveEditor();
            }
        });
    }

    createNewConfig() {
        // Update the path to the new file.
        // TODO: ensure that this is not a name already in use?
        this.panel.config = `${this.configFileStructure.uuid}/ramp-config/${this.lang}/${this.newFileName}.json`;
        this.strippedFileName = this.panel.config.split('/')[3].split('.')[0];

        if (this.sourceCounts[this.panel.config]) {
            this.sourceCounts[this.panel.config] += 1;
        } else {
            this.sourceCounts[this.panel.config] = 1;
        }

        // Create the new map configuration file in the ZIP folder. Copies the `config-default.json` file from the `ramp-editor` folder and renames it.
        this.configFileStructure.rampConfig[this.lang].file(
            `${this.strippedFileName}.json`,
            JSON.stringify(defaultConfig, null, 4)
        );

        // Display the normal edit page now.
        this.status = 'default';
    }

    openEditor() {
        if (this.panel.config === '') {
            return;
        }
        // Fetch the map configuration and load it into the editor.
        this.status = 'editing';

        if (this.panel.config) {
            // Check if the config file exists in the ZIP folder first.
            const assetSrc = `${this.panel.config.substring(this.panel.config.indexOf('/') + 1)}`;

            if (this.configFileStructure.config.file(assetSrc)) {
                this.configFileStructure.config
                    .file(assetSrc)
                    .async('string')
                    .then((res: any) => {
                        window.config = res;
                        (document.getElementById('RAMPeditorframe') as HTMLIFrameElement).contentWindow!.config = res;
                        (document.getElementById(
                            'RAMPeditorframe'
                        ) as HTMLIFrameElement).contentWindow!.configname = this.strippedFileName;
                    });
            } else {
                // If it does not exist in the ZIP folder, try and fetch from server.
                fetch(this.panel.config).then((data) => {
                    data.json().then((res) => {
                        let stringResponse = JSON.stringify(res);

                        window.config = stringResponse;
                        (document.getElementById(
                            'RAMPeditorframe'
                        ) as HTMLIFrameElement).contentWindow!.config = stringResponse;
                        (document.getElementById(
                            'RAMPeditorframe'
                        ) as HTMLIFrameElement).contentWindow!.configname = this.strippedFileName;
                    });
                });
            }
        }
    }

    saveEditor() {
        this.status = 'default';

        // Add chart config to ZIP file.
        this.configFileStructure.rampConfig[this.lang].file(
            `${this.strippedFileName}.json`,
            JSON.stringify(JSON.parse(localStorage.RAMPconfig), null, 4)
        );

        this.$parent.$emit('slide-edit');
    }
}
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
    width: fit-content !important;
}

select {
    border: 1px black solid;
    background: white;
    padding: 0.25rem 0.5rem;
}
.map-item {
    width: 300px;
    background: #eee;

    text-align: center;
    padding: 25px;
    cursor: pointer;

    button {
        padding: 0 !important;
    }
}
.edit-map {
    content: url('../../assets/edit-icon.svg');
    margin: 0 auto;
    margin-bottom: 20px;
}
.add-map {
    content: url('../../assets/add.svg');
    margin: 0 auto;
    margin-bottom: 20px;
}
</style>

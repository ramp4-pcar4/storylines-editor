<template>
    <div class="mt-4">
        <json-editor
            v-model="updatedConfig"
            :lang="lang"
            :mode="'text'"
            :show-btns="true"
            :expandedOnStart="true"
            @json-change="
                (json: any) => {
                    // library does not 2-way v-model binding so need to set manually
                    updatedConfig = json;
                    edited = true;
                    $emit('slide-edit');
                }
            "
            @json-save="onJsonSave"
        ></json-editor>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { Vue3JsonEditor } from 'vue3-json-editor';
import { Validator } from '@/definitions';

@Options({
    components: {
        'json-editor': Vue3JsonEditor
    }
})
export default class CustomEditorV extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Prop() config!: string;
    @Prop() lang!: string;
    @Prop() slideIndex!: number;

    schemaUrl = './StorylinesSlideSchema.json';
    updatedConfig = '';
    edited = false;

    jsonValidator = require('jsonschema').Validator;
    validator: Validator = new this.jsonValidator();
    storylinesSchema = '';

    mounted(): void {
        // add storylines config schema for validation purposes
        fetch(this.schemaUrl).then((schema) => {
            // parse JSON schema
            schema.json().then(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (res: any) => {
                    this.storylinesSchema = res;
                },
                (err) => {
                    console.error(err);
                }
            );
        });
        this.updatedConfig = this.config;
    }

    onJsonSave(): void {
        // TODO: add any missing properties in schema as required (e.g. chart options)
        const checkValidation = this.validator.validate(this.updatedConfig, this.storylinesSchema);
        if (checkValidation.valid) {
            this.$emit('config-edited', this.updatedConfig, true);
        } else {
            // TODO: add FR translation for alert message
            alert('Attempted to save a custom config that violates the Storylines schema.');
            console.error(checkValidation.errors);
        }
    }

    saveChanges(): void {
        this.$emit('config-edited', this.updatedConfig);
        this.edited = false;
    }
}
</script>

<style lang="scss" scoped>
:deep(.jsoneditor-vue) {
    height: 100vh;
}
</style>

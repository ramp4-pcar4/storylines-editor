<template>
    <div class="mt-4">
        <div
            class="w-full rounded-md bg-red-100 p-2 mb-3"
            :class="validatorErrors.length === 0 ? 'bg-green-200' : 'bg-red-100'"
        >
            <span class="flex flex-row items-center" v-if="validatorErrors.length === 0">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    style="color: rgb(23, 183, 126)"
                    class="w-10 h-10 pr-2"
                >
                    <path
                        fill="currentColor"
                        d="M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72L512,72z M758.9,374 c-48.5,48.6-81.2,76.9-172.3,186.8c-52.6,63.4-102.3,131.5-102.7,132L462.1,720c-4.6,6.1-13.5,6.8-19.1,1.6L267.9,558.9 c-17.8-16.5-18.8-44.4-2.3-62.2s44.4-18.8,62.2-2.3l104.9,97.5c5.5,5.1,14.1,4.5,18.9-1.3c16.2-20.1,38.4-44.5,62.4-68.6 c90.2-90.9,145.6-139.7,175.2-161.3c36-26.2,77.3-48.6,87.3-36.2C792,343.9,782.5,350.3,758.9,374L758.9,374z"
                    ></path>
                </svg>
                {{ $t('editor.slides.advanced.good') }}
            </span>

            <span class="flex flex-row items-center" v-else>
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    style="color: rgb(245, 108, 108)"
                    class="w-10 h-10 pr-2"
                >
                    <path
                        fill="currentColor"
                        d="M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M579.7,512l101.6-101.6 c18.7-18.7,18.7-49,0-67.7c-18.7-18.7-49-18.7-67.7,0l0,0L512,444.3L410.4,342.7c-18.7-18.7-49-18.7-67.7,0s-18.7,49,0,67.7 L444.3,512L342.7,613.6c-18.7,18.7-18.7,49,0,67.7c18.7,18.7,49,18.7,67.7,0L512,579.7l101.6,101.6c18.7,18.7,49,18.7,67.7,0 c18.7-18.7,18.7-49,0-67.7L579.7,512z"
                    ></path>
                </svg>
                {{ $t('editor.slides.advanced.broken') }}
                <button class="underline ml-1" @click="() => (showErrors = !showErrors)">
                    {{ $t('editor.slides.advanced.details') }}
                </button></span
            >

            <div v-if="showErrors">
                <ul class="list-disc ml-8">
                    <li v-for="(error, idx) in validatorErrors" :key="idx">{{ error }}</li>
                </ul>
            </div>
        </div>
        <json-editor
            v-model="updatedConfig"
            lang="en"
            :mode="'text'"
            :show-btns="false"
            :expandedOnStart="true"
            @has-error="(err: string) => { jsonError = err; this.validate()}"
            @json-change="
                (json: any) => {
                    // library does not 2-way v-model binding so need to set manually
                    updatedConfig = json;
                    edited = true;
                    jsonError = '';
                    this.validate();
                    $emit('slide-edit');
                }
            "
        ></json-editor>
    </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { Vue3JsonEditor } from 'vue3-json-editor';
import { Validator } from 'jsonschema';

@Options({
    components: {
        'json-editor': Vue3JsonEditor
    }
})
export default class CustomEditorV extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Prop() config!: string;
    @Prop() slideIndex!: number;

    schemaUrl = './StorylinesSlideSchema.json';
    updatedConfig = '';
    edited = false;

    jsonError = '';
    validator: Validator = new Validator();
    validatorErrors: any = [];
    showErrors = false;

    storylinesSchema = '';

    mounted(): void {
        // add storylines config schema for validation purposes
        fetch(this.schemaUrl).then((schema) => {
            // parse JSON schema
            schema.json().then(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (res: any) => {
                    this.storylinesSchema = res;
                    this.validate();
                },
                (err) => {
                    console.error(err);
                }
            );
        });
        this.updatedConfig = this.config;
    }

    validate(): void {
        // TODO: add any missing properties in schema as required (e.g. chart options)
        const checkValidation = this.validator.validate(this.updatedConfig, this.storylinesSchema as any);
        this.validatorErrors = checkValidation.errors;
        if (this.jsonError) {
            this.validatorErrors.push(this.jsonError);
        }
    }

    saveChanges(): void {
        this.$emit('config-edited', this.updatedConfig);
        this.edited = false;

        // If the user saves or leaves the advanced editor page with errors, give them a warning.
        if (this.validatorErrors.length !== 0) {
            alert(this.$t('editor.slides.advanced.error'));
        }
    }
}
</script>

<style lang="scss" scoped>
:deep(.jsoneditor-vue) {
    height: 100vh;
}
</style>

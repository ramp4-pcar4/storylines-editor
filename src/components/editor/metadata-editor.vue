<template>
    <div>
        <label class="mb-5">{{ $t('editor.title') }}:</label>
        <input
            type="text"
            name="title"
            :value="metadata.title"
            @change="$emit('metadata-changed', $event.target.name, $event.target.value)"
            class="w-1/3"
        />
        <br />
        <!-- only display an image preview if one is provided.-->
        <div v-if="!!metadata.logoPreview">
            <label>{{ $t('editor.logoPreview') }}:</label>
            <img
                :src="metadata.logoPreview"
                v-if="!!metadata.logoPreview && metadata.logoPreview != 'error'"
                class="image-preview"
            />
            <p v-if="metadata.logoPreview == 'error'" class="image-preview">
                An error occurred when trying to load image.
            </p>
        </div>
        <label class="mb-5">{{ $t('editor.logo') }}:</label>
        <input type="text" @change="$emit('logo-source-changed', $event)" :value="metadata.logoName" class="w-1/4" />
        <button @click.stop="openFileSelector" class="bg-black text-white hover:bg-gray-800">
            {{ $t('editor.browse') }}
        </button>
        <!-- hide the actual file input -->
        <input
            type="file"
            id="logoUpload"
            @change="$emit('logo-changed', $event)"
            class="w-1/4"
            style="display: none"
        />
        <br />
        <label>{{ $t('editor.contextLink') }}:</label>
        <input
            type="text"
            name="contextLink"
            :value="metadata.contextLink"
            @change="$emit('metadata-changed', $event.target.name, $event.target.value)"
            class="w-2/3"
        />
        <br />
        <label class="mb-5"></label>
        <p class="inline-block">
            <i>
                Context link shows up at the bottom of the page to provide additional resources for interested users
            </i>
        </p>
        <br />
        <label>{{ $t('editor.contextLabel') }}:</label>
        <input
            type="text"
            name="contextLabel"
            :value="metadata.contextLabel"
            @change="$emit('metadata-changed', $event.target.name, $event.target.value)"
            class="w-2/3"
        />
        <br />
        <label class="mb-5"></label>
        <p class="inline-block">
            <i> Context label shows up before the context link to explain what the link is for </i>
        </p>
        <br />
        <label class="mb-5">{{ $t('editor.dateModified') }}:</label>
        <input
            type="date"
            name="dateModified"
            :value="metadata.dateModified"
            @change="$emit('metadata-changed', $event.target.name, $event.target.value)"
        />
        <br /><br />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class MetadataEditorV extends Vue {
    @Prop() metadata!: {
        title: string;
        logoName: string;
        logoPreview: string;
        contextLink: string;
        contextLabel: string;
        dateModified: string;
    };

    openFileSelector(): void {
        document.getElementById('logoUpload')?.click();
    }
}
</script>

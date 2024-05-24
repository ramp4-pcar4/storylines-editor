<template>
    <div class="block py-20 align-middle text-center h-full" style="margin: 0 auto">
        <spinner size="120px" color="#009cd1" style="margin: 0 auto"></spinner>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import { VueSpinnerOval } from 'vue3-spinners';

@Options({
    components: {
        spinner: VueSpinnerOval
    }
})
export default class LoadingPageV extends Vue {}
</script>

<style scoped lang="scss"></style>

<template>
    <div class="sg" ref="scrollGuard">
        <p class="sg-label">
            {{ $t('scrollguard.desc') }}
        </p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Scrollguard extends Vue {
    @Prop() lang!: string;
}
</script>

<style lang="scss">
.sg {
    transition: opacity ease-in-out;
    background-color: rgba(0, 0, 0, 1);
    text-align: center;

    position: absolute;
    padding: 0px;
    margin: 0px;
    border-width: 0px;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;

    transition-duration: 0.8s;

    opacity: 1;
    pointer-events: none !important;
    z-index: 1000;

    &.sg-active {
        opacity: 1;
        transition-duration: 0.3s;
    }

    &.sg-scrolling {
        transition-duration: 0.3s;
    }

    .sg-label {
        font-size: 1em * 1.5;
        color: white;
        position: relative;
        margin: 0;
        top: 50% !important;
        transform: translateY(-50%);
    }
}
</style>

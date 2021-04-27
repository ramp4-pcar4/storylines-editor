<template>
    <Scrollama id="steps" @step-enter="({ element }) => (currStepTitle = element.dataset.stepTitle)">
        <div slot="graphic" class="graphic-menu">
            <ul class="menu">
                <li v-for="(step, index) in steps" :key="index" :class="{ 'is-active': currStepTitle == step.title }">
                    {{ step.title }}
                </li>
            </ul>
        </div>
        <div v-for="(step, index) in steps" :key="index" class="step" :data-step-title="step.title">
            <SubSteps :step-title="step.title" :step-index="index" />
        </div>
    </Scrollama>
</template>

<script>
import 'intersection-observer';
import Scrollama from 'vue-scrollama';
import SubSteps from '@/components/sub-steps.vue';

export default {
    components: {
        Scrollama,
        SubSteps
    },
    data() {
        return {
            currStepTitle: null,
            steps: [
                {
                    title: 'Step 1',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.'
                },
                {
                    title: 'Step 2',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.'
                },
                {
                    title: 'Step 3',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.'
                },
                {
                    title: 'Step 4',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.'
                }
            ]
        };
    }
};
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style>
#scrollama-container-steps > .scrollama-graphic {
    z-index: 1;
}
</style>

<style scoped>
.step {
    background-color: #eee;
    padding: 2rem;
    padding-top: 10vh;
    padding-bottom: 30vh;
    margin-bottom: 10vh;
}
.menu {
    display: flex;
    justify-content: center;
    background-color: teal;
    color: white;
}
.menu li {
    list-style-type: none;
    padding: 2rem;
}
.menu li.is-active {
    font-weight: bold;
    border-bottom: 4px solid white;
}
</style>

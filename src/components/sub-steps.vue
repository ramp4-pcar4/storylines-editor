<template>
    <Scrollama :id="`substeps-${stepIndex}`" @step-enter="({ element }) => (currStepTitle = element.dataset.stepTitle)">
        <div slot="graphic" class="graphic-menu">
            <h3>{{ stepTitle }}</h3>
            <ul class="menu">
                <li
                    v-for="(step, index) in subSteps"
                    :key="index"
                    :class="{ 'is-active': currStepTitle == step.title }"
                >
                    {{ step.title }}
                </li>
            </ul>
        </div>
        <div v-for="(step, index) in subSteps" :key="index" class="step" :data-step-title="step.title">
            <h2>{{ step.title }}</h2>
            <p>{{ step.text }}</p>
        </div>
    </Scrollama>
</template>

<script>
import 'intersection-observer';
import Scrollama from 'vue-scrollama';

export default {
    props: ['stepTitle', 'stepIndex'],
    components: {
        Scrollama
    },
    data() {
        return {
            currStepTitle: null,
            subSteps: [
                {
                    title: 'Sub Step A',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.'
                },
                {
                    title: 'Sub Step B',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.'
                },
                {
                    title: 'Sub Step C',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.'
                }
            ]
        };
    }
};
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss">
#scrollama-container-substeps {
    display: flex;
    > .scrollama-graphic {
        flex: 1;
        height: 50vh;
        top: 25vh;
    }
    > .scrollama-steps {
        flex: 2;
    }
}
</style>

<style scoped lang="scss">
.scrollama-container /deep/ {
    display: flex;
    > .scrollama-graphic {
        flex: 1;
        height: 50vh;
        top: 25vh;
    }
    > .scrollama-steps {
        flex: 2;
    }
}

.step {
    background-color: #eee;
    padding: 2rem;
    padding-top: 10vh;
    padding-bottom: 30vh;
    margin-bottom: 10vh;
}

.menu li {
    padding: 1rem 0;
    font-size: 0.8rem;
}

.menu li.is-active {
    font-weight: bold;
    color: tomato;
}
</style>

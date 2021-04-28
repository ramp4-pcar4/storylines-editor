<template>
    <Scrollama
        id="steps"
        @step-enter="
            ({ element, index }) => {
                currStepTitle = element.dataset.stepTitle;
                initRamp(index);
            }
        "
    >
        <template v-slot:graphic>
            <ul class="menu">
                <li v-for="(step, index) in steps" :key="index" :class="{ 'is-active': currStepTitle == step.title }">
                    ●
                </li>
            </ul>
        </template>

        <div v-for="(step, index) in steps" :key="index" class="step" :data-step-title="step.title">
            <SubSteps :step-title="step.title" :step-index="index" :step-image="step.img" />
        </div>
    </Scrollama>
</template>

<script lang="ts">
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
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.',
                    img:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/NPRIpictogramme-2016data-EN__1553797637582__w1430.jpg'
                },
                {
                    title: 'Step 2',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.',
                    img:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/GettyImages-187242601__1554821467033__w1920.jpg'
                },
                {
                    title: 'Step 3',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.',
                    img:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/slide%206%20-%20mining%20trends__1553275702559__w592.jpg'
                },
                {
                    title: 'Step 4',
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, itaque.',
                    img:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/NPRIdata__1598884946319__w1589.png'
                }
            ]
        };
    },
    methods: {
        initRamp(index: number): void {
            // new RAMP.Map(document.getElementById(`my-map-${index}`), 'config.json');
        }
    }
};
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss">
#scrollama-container-steps {
    display: flex;

    > .scrollama-graphic {
        align-self: flex-start;
        height: 100vh;
    }

    > .scrollama-steps {
        //background-color: #e4eef8;
        background: linear-gradient(to right, #e4eef8 33.3%, #fff 33.3%);
    }
}

.step {
    // padding: 2rem;
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-bottom: 5vh;
}

.menu {
    display: flex;
    justify-content: center;
    background-color: teal;
    color: white;

    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;

    height: 100%;
    width: 34px;
}

.menu li {
    list-style-type: none;
    // padding: 0.5rem;

    height: 30px;
    line-height: 30px;

    text-align: center;

    color: rgb(68, 68, 68);
}

.menu li.is-active {
    color: #fff !important;
    font-size: 28px;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>

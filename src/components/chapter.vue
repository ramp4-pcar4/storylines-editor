<template>
    <Scrollama
        :id="`chapter-${stepIndex}`"
        @step-enter="({ element }) => (currStepTitle = element.dataset.stepTitle)"
        @step-exit="currStepTitle = null"
    >
        <template v-slot:graphic>
            <!-- <div :id="`my-map-${stepIndex}`" class="rv-map" rv-config="config.json"></div> -->
            <img :src="stepImage" alt="" srcset="" />

            <!--<div class="graphic-menu">

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
            </div>-->
        </template>

        <div
            v-for="(step, index) in subSteps"
            :key="index"
            class="step"
            :data-step-title="step.title"
            :class="{ 'is-active': currStepTitle == step.title }"
        >
            <h3><!-- {{ stepTitle }} --  -->{{ step.title }}</h3>
            <div v-html="md.render(step.text)"></div>
        </div>
    </Scrollama>
</template>

<script lang="ts">
import 'intersection-observer';
import Scrollama from 'vue-scrollama';

import { Component, Vue, Prop } from 'vue-property-decorator';

import MarkdownIt from 'markdown-it';

@Component({
    components: {
        Scrollama
    }
})
export default class Chapter extends Vue {
    @Prop() stepTitle!: string;
    @Prop() stepIndex!: number;
    @Prop() stepImage!: string;

    md = new MarkdownIt();

    currStepTitle = null;
    subSteps = [
        {
            title: 'A',
            text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.

Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.

List:

- one
- two
- three

`
        },
        {
            title: 'B',
            text: `
Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.
`
        },
        {
            title: 'C',
            text: `
Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris.
Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet.
`
        }
    ];
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style scoped lang="scss">
.rv-map {
    height: 100%;
    width: 100%;
}

.scrollama-container ::v-deep {
    display: flex;

    > .scrollama-graphic {
        flex: 2;
        // height: 50vh;
        top: 5vh;
        order: 1;

        // border: 1px solid grey;

        align-self: flex-start;

        display: flex;
        justify-content: center;

        img {
            // max-height: 100%;
            max-width: 100%;
            display: block;
        }
    }

    > .scrollama-steps {
        flex: 1;
    }
}

.step {
    padding: 2rem;
    padding-top: 5vh;
    padding-bottom: 5vh;
    // margin-bottom: 5vh;

    line-height: 1.5em;
}

.step:not(.is-active) {
    color: #b9b9b9;
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

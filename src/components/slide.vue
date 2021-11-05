<template>
    <div class="w-full h-full flex flex-row">
        <panel v-for="(panel, idx) in config.panel" :key="idx" :config="panel" :index="idx"></panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PanelV from './panels/panel.vue';

@Component({
    components: {
        panel: PanelV
    }
})
export default class SlideV extends Vue {
    @Prop() config!: any; // TODO: replace with a proper TypeScript type

    // TODO: remove this. For demo purposes.
    beforeMount() {
        this.config = {
            panel: [
                {
                    type: 'text',
                    title: 'Hello World',
                    content: `There are three large oil sands deposits in Canada:

- The Athabasca;
- Peace River; and
- Cold Lake.

All three of the deposits are located in northern Alberta except for a small portion of the Cold Lake deposit, which extends into Saskatchewan. Together, these deposits cover [142,000 square kilometres](asdf) and are estimated to contain 166.3 billion barrels.

The oil sands extraction sector is a major contributor to Canada’s economy, with more than 528,000 people deriving direct, indirect and induced employment from the oil sands and its supporting sectors. To date, [$243 billion of capital expenditures has been invested in the oil sands industry](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/what-are-oil-sands/18089), and the sector produces [2.9 million barrels of oil per day](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/oil-supply-and-demand/18086).

This map shows the three oil sands areas. The actual geological deposits themselves cover larger areas.`
                },
                {
                    type: 'text',
                    title: 'Hello from the other side',
                    content: `Oil sands extraction facilities that report to the NPRI are located exclusively in northern Alberta, particularly around the municipality of Fort McMurray. Of the facilities that reported in 2017, 23 of them are in the Peace River deposit, 5 in the Cold Lake deposit and 35 in the Athabasca deposit. Also included in this map is an upgrader facility in Fort Saskatchewan, Alberta, that upgrades oil from the Canadian Natural Resources’ Muskeg River oil sands surface mining facility. Of the facilities that reported to the NPRI, seven of them are surface mining operations, one was an [upgrader facility](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/upgrading-oil-sands-and-heavy-oil/5875) and the remaining 56 were in-situ facilities. The category “Other” refers to facilities that do not use thermal methods for extraction.
| **Facility location** | **Thermal in-situ** | **Surface mining** | **Other** | **Total** |
| ----------------------| ------------------- | ------------------ | --------- | --------- |
| Athabasca             | 23                  | 7                  | 5         | **35**    |
| Peace River           | 4                   | 0                  | 19        | **23**    |
| Cold Lake             | 5                   | 0                  | 0         | **5**     |
| Total                 | 32                  | 7                  | 24        | **63**    |

**Oil sands facilities reporting to the NPRI - 2017**`
                }
            ]
        };
    }
}
</script>

<style lang="scss" scoped></style>

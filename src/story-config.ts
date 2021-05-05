export interface StoryConfig {
    title: string;
    subTitle: string;
    chapters: ChapterConfig[];
}

export interface ChapterConfig {
    title: string;
    graphic: ImageGraphic | MapGraphic;
    scenes: SceneConfig[];
}

export enum GraphicKind {
    Image = 'ImageGraphicV',
    Map = 'MapGraphicV'
}

export interface ImageGraphic {
    type: GraphicKind.Image;
    payload: {
        src: string;
        style?: string;
        class?: string;
    };
}

export interface MapGraphic {
    type: GraphicKind.Map;
    payload: number;
}

export interface SceneConfig {
    title?: string;
    text: string;
}

const story: StoryConfig = {
    title: 'NPRI Sector Overview: Oil Sands Extraction',
    subTitle: 'It also summarizes what steps facilities in this sector take to mitigate their environmental impacts',
    chapters: [
        {
            title: 'Overview',
            graphic: {
                type: GraphicKind.Image,
                payload: {
                    src:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/NPRIpictogramme-2016data-EN__1553797637582__w1430.jpg'
                }
            },
            scenes: [
                {
                    text: `
**Oil Sands Extraction** is part of the National Pollutant Release Inventory's (NPRI) Sector Overview series. This sector overview explores NPRI substances released, disposed, and transferred by this industry. It also summarizes what steps facilities in this sector take to mitigate their environmental impacts.

- a 
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a

Businesses, institutions and other facilities across Canada must report their releases, transfers and disposals of pollutants to air, water and land annually to the Government of Canada's NPRI. The information collected is public, helps governments set environmental priorities and monitor environmental performance, and provides Canadians with an opportunity to learn about pollution in their surroundings.`
                }
            ]
        },
        {
            title: 'Oil sands deposits',
            graphic: {
                type: GraphicKind.Image,
                payload: {
                    class: 'p-0 m-0',
                    src: 'https://i.imgur.com/8yvdGqF.jpg'
                }
            },
            scenes: [
                {
                    text: `
There are three large oil sands deposits in Canada:

- a 
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a

- The Athabasca;
- Peace River; and
- Cold Lake.

All three of the deposits are located in northern Alberta except for a small portion of the Cold Lake deposit, which extends into Saskatchewan. Together, these deposits cover 142,000 square kilometres and are estimated to contain 166.3 billion barrels.

The oil sands extraction sector is a major contributor to Canada’s economy, with more than 528,000 people deriving direct, indirect and induced employment from the oil sands and its supporting sectors. To date, [$243 billion of capital expenditures has been invested in the oil sands industry](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/what-are-oil-sands/18089), and the sector produces [2.9 million barrels of oil per day](https://www.nrcan.gc.ca/energy/energy-sources-distribution/crude-oil/oil-supply-and-demand/18086).
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a

This map shows the three oil sands areas. The actual geological deposits themselves cover larger areas.

`
                }
            ]
        },
        {
            title: 'Oil sands extraction',
            graphic: {
                type: GraphicKind.Image,
                payload: {
                    class: 'p-0 m-0',
                    src:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/GettyImages-187242601__1554821467033__w1920.jpg'
                }
            },
            scenes: [
                {
                    text: `
The oil found in oil sands deposits is primarily bitumen, a very heavy and viscous oil. Bitumen does not flow easily at room temperature and requires unconventional methods to extract. Bitumen is extracted either from surface mining or in-situ using a variety of methods.

The choice between surface mining and thermal in-situ is solely determined by the depth of the oil deposit. Surface mining is used to reach deposits to a maximum depth of 70 meters below the surface; thermal in-situ wells extract bitumen at greater depths.
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a
- a 
- a
- a
- a
- a
- a

Surface mining involves digging up large areas with large excavators. The resulting bitumen and sand mixture is mixed with hot water and sodium hydroxide (NaOH) to separate the bitumen. During this process, the bitumen rises to the top of large separation vessels as a froth. This froth bitumen is further processed in a froth treatment unit to extract the bitumen. Most of the material dug up in an oil sands surface mine is clay and sand. The bitumen extracted makes up about 10% of this material.
`
                }
            ]
        },
        {
            title: 'In-situ extraction',
            graphic: {
                type: GraphicKind.Image,
                payload: {
                    src:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/SurfaceExtractionEnglish__1563813765181__w791.png'
                }
            },
            scenes: [
                {
                    text: `
In-situ extraction generally involves pumping high-pressure steam deep underground. This heats the bitumen to the point that it flows and can be brought up to the surface. If the bitumen has a low enough viscosity that it can be extracted using conventional methods, the in-situ operations do not need to use thermal methods to promote extraction. This sector overview addresses only those sites using thermal extraction methods, as they are much more energy-intensive.

Thermal in-situ facilities have a much smaller physical footprint than surface mining operations, and they do not produce tailings that need to be stored on-site. They also use significantly less water as compared to surface mining facilities. Thermal in-situ facilities are more energy intensive than mines, due to the production of steam. However, new technologies and industry research are focused on [reducing in-situ energy intensity](https://www.cosia.ca/initiatives/greenhouse-gases).
`
                }
            ]
        },
        {
            title: 'Sample step #99 (🤯)',
            graphic: {
                type: GraphicKind.Image,
                payload: {
                    src: 'https://cdn2.bulbagarden.net/upload/3/3e/039Jigglypuff.png',
                    class: '',
                    style: ''
                }
            },
            scenes: [
                {
                    title: 'Scene A',
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
                    title: 'Scene B',
                    text: `
Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.
`
                },
                {
                    title: 'Scene C',
                    text: `
Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris.
Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet.
`
                }
            ]
        }
    ]
};

export default story;

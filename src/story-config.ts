export interface StoryConfig {
    title: string;
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
    title: 'Story RAMP',
    chapters: [
        {
            title: 'Step 1',
            graphic: {
                type: GraphicKind.Image,
                payload: {
                    src:
                        'https://www.arcgis.com/sharing/rest/content/items/703d9327d99d445eb4c1e94a47c1933e/resources/NPRIpictogramme-2016data-EN__1553797637582__w1430.jpg',
                    class: 'p-10 border-gray-600 border-solid border',
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
        },
        {
            title: 'Step 2',
            graphic: {
                type: GraphicKind.Image,
                payload: {
                    src: 'https://cli.vuejs.org/favicon.png'
                }
            },
            scenes: [
                {
                    title: 'Scene A',
                    text: `
                    
First Term - This is the definition of the first term.

Second Term - This is one definition of the second term.

`
                }
            ]
        }
    ]
};

export default story;

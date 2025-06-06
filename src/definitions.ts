import JSZip from 'jszip';

export type SupportedLanguages = 'en' | 'fr';

export interface StoryRampConfig {
    title: string;
    lang: string;
    introSlide: Intro;
    slides: (Slide | Record<string, never>)[];
    contextLink: string;
    contextLabel: string;
    tocOrientation: string;
    returnTop: boolean;
    sameConfig: boolean;
    stylesheets?: string[];
    dateModified: string;
}

export interface ConfigFileStructure {
    uuid: string;
    zip: JSZip;
    configs: { [key: string]: StoryRampConfig };
    assets: {
        [key: string]: JSZip;
    };
    charts: {
        [key: string]: JSZip;
    };
    rampConfig: JSZip;
}

export interface SourceCounts {
    [key: string]: number;
}

export interface MetadataContent {
    title: string;
    introTitle: string;
    introSubtitle: string;
    logoPreview: string;
    logoName: string;
    logoAltText: string;
    introBgName: string;
    introBgPreview: string;
    titleColour?: string;
    subtitleColour?: string;
    buttonColour?: string;
    contextLink: string;
    contextLabel: string;
    tocOrientation: string;
    returnTop: boolean;
    sameConfig: boolean;
    dateModified: string;
    schemaVersion: string;
}

export interface HelpSection {
    header: string;
    info: string;
    drawn: boolean;
    expanded: boolean;
}

// unofficial interface: add properties as needed (just to make TS warnings disappear)
export interface Highchart {
    toString(): string;
}

export interface DQVOptions {
    title: string;
    subtitle: string;
    xAxisLabel: string;
    yAxisLabel: string;
    width?: number;
    height?: number;
    export: boolean;
    colours?: string[];
    credits: boolean;
    type: string;
}

export interface PieSeriesData {
    name: string;
    data: PieDataRow[];
}

export interface PieDataRow {
    name: string;
    y?: number;
}

export interface LineSeriesData {
    name: string;
    data: number[];
}

export interface DQVChartConfig {
    chart: {
        type: string;
    };
    title: {
        text: string;
    };
    credits?: {
        enabled: boolean;
    };
    subtitle?: {
        text: string;
    };
    yAxis?: {
        title: {
            text: string;
        };
    };
    xAxis?: {
        title: {
            text: string;
        };
        categories: [];
    };
    data?: {
        csvURL: string;
        enablePolling: boolean;
        csv?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plotOptions?: any;
    exporting?: {
        buttons: {
            contextButton: {
                menuItems: string[];
            };
        };
        enabled: boolean;
    };
    series?: PieSeriesData | LineSeriesData[];
}

export interface Intro {
    logo: {
        src: string;
        altText?: string;
    };
    title: string;
    subtitle: string;
    blurb?: string;
    backgroundImage?: string;
    backgroundImage: string;
    titleColour?: string;
    subtitleColour?: string;
    buttonColour?: string;
}

export interface Slide {
    title: string;
    // tuple definition to restrict array size
    // panel: [BasePanel, BasePanel | undefined];
    panel: BasePanel[];
    includeInToc?: boolean;
    backgroundImage: string;
}

export interface MultiLanguageSlide {
    en: Slide | undefined;
    fr: Slide | undefined;
}

export enum PanelType {
    Text = 'text',
    Image = 'image',
    Map = 'map',
    Chart = 'chart',
    Video = 'video',
    Audio = 'audio',
    Slideshow = 'slideshow',
    SlideshowImage = 'slideshowImage',
    SlideshowChart = 'slideshowChart',
    Dynamic = 'dynamic',
    Loading = 'loading'
}

export interface BasePanel {
    type: string;
    width?: number;
    customStyles?: string;
    cssClasses?: string;
}

export interface TextPanel extends BasePanel {
    type: PanelType.Text;
    title: string;
    titleTag?: string;
    content: string; // in md format
}

export interface MapPanel extends BasePanel {
    type: PanelType.Map;
    config: string;
    fullscreen?: boolean;
    timeSlider?: TimeSliderConfig;
    title: string;
    scrollguard: boolean;
    caption?: string;
    shared?: boolean; // Potentially needed for shared map configs later
}
export interface TimeSliderConfig {
    range: number[];
    start: number[];
    attribute: string;
    layers?: string[];
}

export interface DynamicPanel extends BasePanel {
    type: PanelType.Dynamic;
    title: string;
    titleTag?: string;
    content: string;
    children: DynamicChildItem[];
}

export interface DynamicChildItem {
    id: string;
    panel: BasePanel;
}

export interface ImagePanel extends BasePanel {
    type: PanelType.Image;
    src: string;
    width?: number;
    height?: number;
    fullscreen?: boolean;
    altText?: string;
    caption?: string;
}

export interface VideoPanel extends BasePanel {
    type: PanelType.Video;
    title: string;
    width?: number;
    height?: number;
    src: string;
    videoType: string;
    caption?: string;
    transcript?: string;
}

export interface AudioPanel extends BasePanel {
    type: PanelType.Audio;
    src: string;
    caption?: string;
}

export interface SlideshowPanel extends BasePanel {
    type: PanelType.Slideshow;
    items: Array<ChartPanel | TextPanel | ImagePanel | MapPanel>;
    loop?: boolean;
    caption?: string;
}

export interface SlideshowImagePanel extends BasePanel {
    type: PanelType.SlideshowImage;
    items: Array<ImagePanel>;
    loop?: boolean;
    caption?: string;
}

export interface SlideshowChartPanel extends BasePanel {
    type: PanelType.SlideshowChart;
    items: Array<ChartPanel>;
    loop?: boolean;
    caption?: string;
}

export interface ChartPanel extends BasePanel {
    type: PanelType.Chart;
    src: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any;
    name?: string;
    options?: DQVOptions;
    caption?: string;
}

export interface ChartConfig {
    src: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any;
    name?: string;
    options?: DQVOptions;
    caption?: string;
}

export interface ImageFile {
    id: string;
    src: string;
    altText: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface VideoFile {
    id: string;
    title: string;
    src: string;
    videoType: 'local' | 'external' | 'YouTube';
    caption?: string;
    transcript?: string;
    width?: number;
    height?: number;
}

export interface DefaultConfigs {
    text: TextPanel;
    slideshow: SlideshowPanel;
    chart: ChartPanel;
    dynamic: DynamicPanel;
    map: MapPanel;
    video: VideoPanel;
    image: ImagePanel;
}

export const BaseStartingConfig: DefaultConfigs = {
    text: {
        type: PanelType.Text,
        title: '',
        content: ''
    },
    dynamic: {
        type: PanelType.Dynamic,
        title: '',
        titleTag: '',
        content: '',
        children: []
    },
    slideshow: {
        type: PanelType.Slideshow,
        items: [],
        caption: '',
        userCreated: true
    },
    image: {
        type: PanelType.Image,
        src: ''
    },
    chart: {
        type: PanelType.Chart,
        src: ''
    },
    map: {
        type: PanelType.Map,
        config: '',
        title: '',
        scrollguard: false
    },
    video: {
        type: PanelType.Video,
        title: '',
        videoType: '',
        src: ''
    }
};

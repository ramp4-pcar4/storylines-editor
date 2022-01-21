export interface StoryRampConfig {
    title: string;
    lang: string;
    introSlide: Intro;
    slides: Slide[];
    contextLink: string;
    contextLabel: string;
}

export interface DQVOptions {
    title: string;
    subtitle: string;
    xAxisLabel: string;
    yAxisLabel: string;
    credits: boolean;
    type: string;
}

export interface SeriesData {
    name: string;
    y?: number;
    data?: number[];
    type?: string;
    color?: string;
}

export interface DQVChartConfig {
    chart: {
        type: string;
    };
    title: {
        text: string;
    };
    credits: {
        enabled: boolean;
    };
    subtitle: {
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
    plotOptions?: any;
    series: SeriesData[] | { data: SeriesData[] };
}

export interface Intro {
    logo: {
        src: string;
        altText?: string;
    };
    title: string;
    subtitle?: string;
    blurb?: string;
}

export interface Slide {
    title: string;
    // tuple definition to restrict array size
    // panel: [BasePanel, BasePanel | undefined];
    panel: BasePanel[];
}

export enum PanelType {
    Text = 'text',
    Image = 'image',
    Map = 'map',
    Chart = 'chart',
    Video = 'video',
    Audio = 'audio',
    Slideshow = 'slideshow',
    Dynamic = 'dynamic'
}

export interface BasePanel {
    type: string;
    width?: number;
}

export interface TextPanel extends BasePanel {
    type: PanelType.Text;
    title: string;
    content: string; // in md format
}

export interface MapPanel extends BasePanel {
    type: PanelType.Map;
    config: string;
    expandable?: boolean;
}

export interface DynamicPanel extends BasePanel {
    type: PanelType.Dynamic;
    title: string;
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
    class?: string;
    altText?: string;
    caption?: string;
    tooltip?: string;
}

export interface VideoPanel extends BasePanel {
    type: PanelType.Video;
    width?: number;
    height?: number;
    src: string;
    caption?: string;
}

export interface AudioPanel extends BasePanel {
    type: PanelType.Audio;
    src: string;
    caption?: string;
}

export interface SlideshowPanel extends BasePanel {
    type: PanelType.Slideshow;
    images: ImagePanel[];
    loop?: boolean;
    caption?: string;
}

export interface ChartPanel extends BasePanel {
    type: PanelType.Chart;
    src: string;
    expandable?: boolean;
    options?: DQVOptions;
}

// TODO: add more definitions here as needed

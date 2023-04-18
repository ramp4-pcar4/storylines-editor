export interface StoryRampConfig {
    title: string;
    lang: string;
    introSlide: Intro;
    slides: Slide[];
    contextLink: string;
    contextLabel: string;
    dateModified: string;
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
    Dynamic = 'dynamic',
    Loading = 'loading'
}

export interface BasePanel {
    type: string;
    width?: number;
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
}
export interface TimeSliderConfig {
    range: number[];
    start: number[];
    attribute: string;
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
    temp?: string;
    class?: string;
    fullscreen?: boolean;
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
    fullscreen?: boolean;
    loop?: boolean;
    caption?: string;
}

export interface ChartPanel extends BasePanel {
    type: PanelType.Chart;
    charts: ChartConfig[];
    fullscreen?: boolean;
}

export interface ChartConfig {
    src: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any;
    name?: string;
    options?: DQVOptions;
}

export interface ImageFile {
    id: string;
    src: string;
    altText: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface DefaultConfigs {
    text: TextPanel;
    slideshow: SlideshowPanel;
    chart: ChartPanel;
    dynamic: DynamicPanel;
    map: MapPanel;
}

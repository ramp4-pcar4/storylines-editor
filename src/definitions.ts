export interface StoryRampConfig {
    lang: string;
    introSlide: Intro;
    slides: Slide[];
    contextLink: string;
    contextLabel: string;
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
    panel: BasePanel[];
}

export enum PanelType {
    Text = 'text',
    Image = 'image',
    Map = 'map',
    Chart = 'dqv',
    Video = 'video',
    Audio = 'audio',
    Slideshow = 'slideshow'
}

export interface BasePanel {
    type: string;
}

export interface TextPanel extends BasePanel {
    type: PanelType.Text;
    title: string;
    content: string; // in md format
}

export interface MapPanel extends BasePanel {
    type: PanelType.Map;
    config: any; // TODO: replace with proper Typescript type
    expandable?: boolean;
}

export interface ImagePanel extends BasePanel {
    type: PanelType.Image;
    src: string;
    width?: number;
    height?: number;
    class?: string;
    altText?: string;
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
    json: string;
    width?: number;
    height?: number;
    expandable?: boolean;
}

// TODO: add more definitions here as needed

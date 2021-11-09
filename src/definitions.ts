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
    subtitle: string;
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
    title?: string;
    type: PanelType.Text;
    content: string; // in md format
}

export interface MapPanel extends BasePanel {
    config: any; // TODO: replace with proper Typescript type
    expandable?: boolean;
    type: PanelType.Map;
}

export interface ImagePanel extends BasePanel {
    width?: number;
    height?: number;
    src: string;
    altText?: string;
    tooltip?: string;
    type: PanelType.Image;
}

export interface VideoPanel extends BasePanel {
    width?: number;
    height?: number;
    src: string;
    caption?: string;
    type: PanelType.Video;
}

export interface AudioPanel extends BasePanel {
    src: string;
    caption?: string;
    type: PanelType.Audio;
}

export interface SlideshowPanel extends BasePanel {
    images: ImagePanel[];
    loop?: boolean;
    caption?: string;
    type: PanelType.Slideshow;
}

export interface ChartPanel extends BasePanel {
    json: string;
    width?: number;
    height?: number;
    expandable?: boolean;
    type: PanelType.Chart;
}

// TODO: add more definitions here as needed

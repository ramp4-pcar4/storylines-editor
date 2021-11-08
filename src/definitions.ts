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
        altText: string;
    };
    title: string;
    subtitle: string;
    blurb: string;
}

export interface Slide {
    // TODO: fix this as more panels are created
    panel: TextPanel[];
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
    title: string;
    type: PanelType.Text;
    content: string; // in md format
}

// TODO: add more definitions here as needed

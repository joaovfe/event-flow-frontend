export interface ImageData {
    id?: string;
    file?: File;
    preview: string;
    isThumbnail?: boolean;
    isSelected?: boolean;
    isRemote?: boolean;
    sourceUrl?: string;
}
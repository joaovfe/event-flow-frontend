import { EImageType } from '@shared/domain/enums';
import { ImageData } from '../domain/interfaces/image-data';
import { UUID } from 'crypto';

export const DEFAULT_ACCEPTED_TYPES = [
    EImageType.JPEG,
    EImageType.PNG,
    EImageType.WEBP
];

export const DEFAULT_MAX_FILE_SIZE = 5;
export const DEFAULT_MAX_IMAGES = 10;

export const convertImagesToFormData = (images: ImageData[], category?: string): FormData => {
    const formData = new FormData();

    images.forEach((image, index) => {
        if (!image.file) return; // skip remote images without File
        formData.append(`images[${index}].file`, image.file);

        if (category) {
            formData.append(`images[${index}].category`, category);
        }

        if (image.isThumbnail) {
            formData.append(`images[${index}].isThumbnail`, 'true');
        }
    });

    return formData;
};

export const extractFilesFromImages = (images: ImageData[]): File[] => {
    return images
        .map(image => image.file)
        .filter((f): f is File => !!f);
};

export const consolidateImagesByCategory = (formData: any, categories: string[]): Record<string, ImageData[]> => {
    const result: Record<string, ImageData[]> = {};

    categories.forEach(category => {
        if (formData[category] && Array.isArray(formData[category])) {
            result[category] = formData[category];
        }
    });

    return result;
};

export const moveImagesBetweenSections = (
    fromSection: ImageData[],
    toSection: ImageData[],
    imageIds: UUID[]
): { fromSection: ImageData[], toSection: ImageData[] } => {
    const imagesToMove = fromSection.filter(img => imageIds.includes(img.id as UUID));
    const remainingImages = fromSection.filter(img => !imageIds.includes(img.id as UUID));

    const movedImages = imagesToMove.map(img => ({ ...img, isSelected: false }));

    return {
        fromSection: remainingImages,
        toSection: [...toSection, ...movedImages]
    };
};

export const validateFile = (file: File, acceptedTypes: string[], maxFileSize: number): boolean => {
    if (!acceptedTypes.includes(file.type)) {
        console.warn(`Tipo de arquivo não suportado: ${file.type}`);
        return false;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
        console.warn(`Arquivo muito grande: ${file.name}`);
        return false;
    }

    return true;
};

export const cleanupImagePreviews = (images: ImageData[]): void => {
    images.forEach(image => {
        if (!image.isRemote && image.preview.startsWith('blob:')) {
            URL.revokeObjectURL(image.preview);
        }
    });
};

export const createRemoteImageData = (fileOrUrl: File | string, url?: string, options?: { isThumbnail?: boolean }): ImageData => {
    if (typeof fileOrUrl === 'string') {
        return {
            id: crypto.randomUUID(),
            preview: fileOrUrl,
            isThumbnail: !!options?.isThumbnail,
            isSelected: false,
            isRemote: true,
            sourceUrl: fileOrUrl
        };
    }

    return {
        id: crypto.randomUUID(),
        preview: url || URL.createObjectURL(fileOrUrl),
        file: fileOrUrl,
        isThumbnail: !!options?.isThumbnail,
        isSelected: false,
        isRemote: false,
        sourceUrl: url || URL.createObjectURL(fileOrUrl)
    };
};
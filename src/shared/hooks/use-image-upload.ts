import { useCallback, useState } from 'react';
import { EUploadAction } from '@shared/domain/enums';
import {
    validateFile,
    cleanupImagePreviews,
    DEFAULT_ACCEPTED_TYPES,
    DEFAULT_MAX_FILE_SIZE,
    createRemoteImageData
} from '@shared/utils';
import { ImageData } from '@shared/domain/interfaces/image-data';

interface UseImageUploadProps {
    images: ImageData[];
    onImagesChange: (images: ImageData[]) => void;
    maxImages?: number;
    acceptedTypes?: string[];
    maxFileSize?: number;
    showThumbnail?: boolean;
    allowMultiSelect?: boolean;
    disabled?: boolean;
}

export const useImageUpload = ({
    images,
    onImagesChange,
    maxImages = 10,
    acceptedTypes = DEFAULT_ACCEPTED_TYPES,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    showThumbnail = false,
    allowMultiSelect = true,
    disabled = false
}: UseImageUploadProps) => {
    const [previewImage, setPreviewImage] = useState<ImageData | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFileSelect = useCallback((files: FileList | null) => {
        if (!files || disabled) return;

        const newImages: ImageData[] = [];
        const currentCount = images.length;

        Array.from(files).forEach((file) => {
            if (currentCount + newImages.length >= maxImages) return;

            if (!validateFile(file, acceptedTypes, maxFileSize)) return;

            const imageData = createRemoteImageData(file, URL.createObjectURL(file));
            newImages.push(imageData);
        });

        if (newImages.length > 0) {
            onImagesChange([...images, ...newImages]);
        }
    }, [images, maxImages, acceptedTypes, maxFileSize, onImagesChange, disabled]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    const executeAction = useCallback((action: EUploadAction, id?: string) => {
        if (disabled) return;

        switch (action) {
            case EUploadAction.REMOVE_IMAGE:
                if (!id) return;
                const imageToRemove = images.find(img => img.id === id);
                if (imageToRemove) {
                    URL.revokeObjectURL(imageToRemove.preview);
                }
                onImagesChange(images.filter(img => img.id !== id));
                break;

            case EUploadAction.TOGGLE_THUMBNAIL:
                if (!id || !showThumbnail) return;
                const clickedImage = images.find(img => img.id === id);
                const updatedImages = images.map(img => ({
                    ...img,
                    isThumbnail: clickedImage?.isThumbnail ? false : img.id === id
                }));
                onImagesChange(updatedImages);
                break;

            case EUploadAction.TOGGLE_SELECTION:
                if (!id || !allowMultiSelect) return;
                const selectionUpdatedImages = images.map(img =>
                    img.id === id ? { ...img, isSelected: !img.isSelected } : img
                );
                onImagesChange(selectionUpdatedImages);
                break;

            case EUploadAction.SELECT_ALL:
                if (!allowMultiSelect) return;
                const allSelectedImages = images.map(img => ({ ...img, isSelected: true }));
                onImagesChange(allSelectedImages);
                break;

            case EUploadAction.DESELECT_ALL:
                if (!allowMultiSelect) return;
                const allDeselectedImages = images.map(img => ({ ...img, isSelected: false }));
                onImagesChange(allDeselectedImages);
                break;

            case EUploadAction.REMOVE_SELECTED:
                const selectedImages = images.filter(img => img.isSelected);
                cleanupImagePreviews(selectedImages);
                const remainingImages = images.filter(img => !img.isSelected);
                onImagesChange(remainingImages);
                break;
        }
    }, [images, onImagesChange, showThumbnail, allowMultiSelect, disabled]);

    const selectedCount = images.filter(img => img.isSelected).length;
    const canAddMore = images.length < maxImages && !disabled;

    return {
        previewImage,
        setPreviewImage,
        dragOver,
        handleFileSelect,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        executeAction,
        selectedCount,
        canAddMore
    };
};


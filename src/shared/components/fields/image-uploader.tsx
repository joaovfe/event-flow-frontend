import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { DEFAULT_ACCEPTED_TYPES, DEFAULT_MAX_FILE_SIZE } from '@shared/utils';
import { useImageUpload } from '@shared/hooks';
import { UploadArea } from './image-uploader/upload-area';
import { SelectionBar } from './image-uploader/selection-bar';
import { ImageCard } from './image-uploader/image-card';
import { PreviewDialog } from './image-uploader/preview-dialog';
import { ImageData } from '@/shared/domain/interfaces/image-data';

interface ImageUploaderProps {
    images: ImageData[];
    onImagesChange: (images: ImageData[]) => void;
    onAction?: (action: any, id?: string) => void;
    multiple?: boolean;
    showThumbnail?: boolean;
    maxImages?: number;
    acceptedTypes?: string[];
    maxFileSize?: number;
    disabled?: boolean;
    label?: string;
    helperText?: string;
    error?: boolean;
    allowMultiSelect?: boolean;
    id?: string;
}

export function ImageUploader({
    images = [],
    onImagesChange,
    onAction,
    multiple = true,
    showThumbnail = false,
    maxImages = 10,
    acceptedTypes = DEFAULT_ACCEPTED_TYPES,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    disabled = false,
    label,
    helperText,
    error = false,
    allowMultiSelect = true,
    id = 'image-upload-input'
}: ImageUploaderProps) {
    const {
        previewImage,
        setPreviewImage,
        dragOver,
        handleFileSelect,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        executeAction: defaultExecuteAction,
        selectedCount,
        canAddMore
    } = useImageUpload({
        images,
        onImagesChange,
        maxImages,
        acceptedTypes,
        maxFileSize,
        showThumbnail,
        allowMultiSelect,
        disabled
    });

    const executeAction = onAction || defaultExecuteAction;

    return (
        <Box>
            {label && (
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    {label}
                </Typography>
            )}

            {allowMultiSelect && images.length > 0 && (
                <SelectionBar
                    selectedCount={selectedCount}
                    onAction={executeAction}
                    disabled={disabled}
                />
            )}

            <Grid container spacing={2}>
                {canAddMore && (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <UploadArea
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => document.getElementById(id)?.click()}
                            dragOver={dragOver}
                            multiple={multiple}
                            acceptedTypes={acceptedTypes}
                            maxFileSize={maxFileSize}
                        />
                    </Grid>
                )}

                {images.map((image) => (
                    <Grid key={image.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <ImageCard
                            image={image}
                            onAction={executeAction}
                            onPreview={setPreviewImage}
                            showThumbnail={showThumbnail}
                            allowMultiSelect={allowMultiSelect}
                            disabled={disabled}
                        />
                    </Grid>
                ))}
            </Grid>

            <input
                id={id}
                type="file"
                accept={acceptedTypes.join(',')}
                multiple={multiple}
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files)}
            />

            {helperText && (
                <Typography
                    variant="caption"
                    color={error ? 'error' : 'text.secondary'}
                    sx={{ mt: 1, display: 'block' }}
                >
                    {helperText}
                </Typography>
            )}

            <PreviewDialog
                image={previewImage}
                onClose={() => setPreviewImage(null)}
            />
        </Box>
    );
}

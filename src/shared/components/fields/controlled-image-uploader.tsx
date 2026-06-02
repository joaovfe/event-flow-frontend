import { useController, UseControllerProps } from 'react-hook-form';
import { ImageUploader } from './image-uploader';
import { ImageData } from '@/shared/domain/interfaces/image-data';

interface ControlledImageUploaderProps extends UseControllerProps<any> {
    multiple?: boolean;
    showThumbnail?: boolean;
    maxImages?: number;
    acceptedTypes?: string[];
    maxFileSize?: number;
    disabled?: boolean;
    label?: string;
    helperText?: string;
    allowMultiSelect?: boolean;
}

export function ControlledImageUploader({
    multiple = true,
    showThumbnail = false,
    maxImages = 10,
    acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSize = 5,
    disabled = false,
    label,
    helperText,
    allowMultiSelect = true,
    ...props
}: ControlledImageUploaderProps) {
    const {
        field,
        fieldState: { error }
    } = useController(props);

    const handleImagesChange = (images: ImageData[]) => {
        field.onChange(images);
    };

    const uniqueId = `image-upload-${field.name}`;

    return (
        <ImageUploader
            images={field.value || []}
            onImagesChange={handleImagesChange}
            multiple={multiple}
            showThumbnail={showThumbnail}
            maxImages={maxImages}
            acceptedTypes={acceptedTypes}
            maxFileSize={maxFileSize}
            disabled={disabled}
            label={label}
            helperText={helperText || error?.message}
            error={!!error}
            allowMultiSelect={allowMultiSelect}
            id={uniqueId}
        />
    );
}

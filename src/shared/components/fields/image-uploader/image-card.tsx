import React from 'react';
import { Box, Card, CardMedia, Chip, IconButton, useTheme } from '@mui/material';
import {
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    Visibility as VisibilityIcon,
    Delete as DeleteIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon
} from '@mui/icons-material';
import { EUploadAction } from '@shared/domain/enums';
import { ImageData } from '@/shared/domain/interfaces/image-data';

interface ImageCardProps {
    image: ImageData;
    onAction: (action: EUploadAction, id?: string) => void;
    onPreview: (image: ImageData) => void;
    showThumbnail?: boolean;
    allowMultiSelect?: boolean;
    disabled?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
    image,
    onAction,
    onPreview,
    showThumbnail = false,
    allowMultiSelect = true,
    disabled = false
}) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                position: 'relative',
                height: 200,
                border: image.isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
                boxShadow: image.isSelected ? theme.shadows[4] : theme.shadows[1]
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={image.preview}
                alt="Preview"
                sx={{ objectFit: 'cover' }}
            />

            {allowMultiSelect && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 2
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => onAction(EUploadAction.TOGGLE_SELECTION, image.id)}
                        disabled={disabled}
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            color: image.isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
                            '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                        }}
                    >
                        {image.isSelected ? <CheckBoxIcon fontSize="small" /> : <CheckBoxOutlineBlankIcon fontSize="small" />}
                    </IconButton>
                </Box>
            )}

            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 0.5
                }}
            >
                <IconButton
                    size="small"
                    onClick={() => onPreview(image)}
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                    }}
                >
                    <VisibilityIcon fontSize="small" />
                </IconButton>

                {showThumbnail && (
                    <IconButton
                        size="small"
                        onClick={() => onAction(EUploadAction.TOGGLE_THUMBNAIL, image.id)}
                        sx={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: image.isThumbnail ? theme.palette.warning.main : 'white',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                        }}
                    >
                        {image.isThumbnail ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                    </IconButton>
                )}

                <IconButton
                    size="small"
                    onClick={() => onAction(EUploadAction.REMOVE_IMAGE, image.id)}
                    disabled={disabled}
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>

            {showThumbnail && image.isThumbnail && (
                <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                    <Chip
                        icon={<StarIcon />}
                        label="Thumbnail"
                        size="small"
                        color="warning"
                        variant="filled"
                    />
                </Box>
            )}
        </Card>
    );
};


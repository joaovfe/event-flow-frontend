import React from 'react';
import { Card, Stack, Typography, useTheme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface UploadAreaProps {
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onClick: () => void;
    dragOver: boolean;
    multiple: boolean;
    acceptedTypes: string[];
    maxFileSize: number;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
    onDrop,
    onDragOver,
    onDragLeave,
    onClick,
    dragOver,
    multiple,
    acceptedTypes,
    maxFileSize
}) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: 200,
                border: `2px dashed ${dragOver ? theme.palette.primary.main : theme.palette.divider}`,
                backgroundColor: dragOver ? theme.palette.action.hover : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.action.hover
                }
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={onClick}
        >
            <Stack alignItems="center" spacing={1}>
                <AddIcon sx={{ fontSize: 40, color: theme.palette.text.secondary }} />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    {multiple ? 'Adicionar Imagens' : 'Adicionar Imagem'}
                </Typography>
                <Typography variant="caption" color="text.secondary" textAlign="center">
                    {acceptedTypes.map(type => type.split('/')[1]).join(', ')} • Max {maxFileSize}MB
                </Typography>
            </Stack>
        </Card>
    );
};



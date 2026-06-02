import React from 'react';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
import { Close as CloseIcon, Star as StarIcon } from '@mui/icons-material';
import { ImageData } from '@/shared/domain/interfaces/image-data';

interface PreviewDialogProps {
    image: ImageData | null;
    onClose: () => void;
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({ image, onClose }) => {
    return (
        <Dialog
            open={!!image}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            {image && (
                <>
                    <DialogTitle>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="h6">
                                    Visualização da Imagem
                                </Typography>
                                {image.isThumbnail && (
                                    <Chip
                                        icon={<StarIcon />}
                                        label="Thumbnail"
                                        size="small"
                                        color="warning"
                                        variant="filled"
                                    />
                                )}
                            </Stack>
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                                src={image.preview}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '70vh',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>
                            Fechar
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};



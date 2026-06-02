import { Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { EUploadAction } from '@shared/domain/enums';
import React from 'react';

interface SelectionBarProps {
    selectedCount: number;
    onAction: (action: EUploadAction) => void;
    disabled?: boolean;
}

export const SelectionBar: React.FC<SelectionBarProps> = ({
    selectedCount,
    onAction,
    disabled = false
}) => {
    return (
        <Box sx={{ mb: 2, p: 2, borderRadius: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    {selectedCount > 0 ? `${selectedCount} imagem(ns) selecionada(s)` : 'Nenhuma imagem selecionada'}
                </Typography>
                <Stack direction="row" spacing={1}>
                    {selectedCount === 0 ? (
                        <Button
                            size="small"
                            variant="outlined"
                            color="inherit"
                            onClick={() => onAction(EUploadAction.SELECT_ALL)}
                            disabled={disabled}
                        >
                            Selecionar Todas
                        </Button>
                    ) : (
                        <>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => onAction(EUploadAction.DESELECT_ALL)}
                                disabled={disabled}
                                color="inherit"
                            >
                                Desmarcar Todas
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={() => onAction(EUploadAction.REMOVE_SELECTED)}
                                disabled={disabled}
                                startIcon={<DeleteIcon />}
                            >
                                Excluir Selecionadas
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

import { useMemo, useState } from 'react';
import { Box, IconButton, InputAdornment, Popover, TextField, TextFieldProps } from '@mui/material';
import { Palette } from '@mui/icons-material';
import { useController, UseControllerProps } from 'react-hook-form';
import { HexColorInput, HexColorPicker } from 'react-colorful';

interface IControlledColorProps
    extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name' | 'onChange' | 'value'> {
    swatchSize?: number;
}

export function ControlledColor({
    fullWidth = true,
    size = 'small',
    swatchSize = 20,
    ...props
}: IControlledColorProps) {
    const {
        field,
        fieldState: { error },
    } = useController(props);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const open = Boolean(anchorEl);

    function handleOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const color = useMemo(() => (typeof field.value === 'string' ? field.value : ''), [field.value]);

    return (
        <>
            <TextField
                {...props}
                {...field}
                fullWidth={fullWidth}
                size={size}
                value={color}
                error={props.error ?? !!error}
                helperText={props.helperText ?? (!!error ? error.message : undefined)}
                slotProps={{
                    ...props.slotProps,
                    input: {
                        ...props.slotProps?.input,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Box
                                    onClick={handleOpen}
                                    sx={{
                                        width: swatchSize,
                                        height: swatchSize,
                                        bgcolor: color || 'transparent',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 0.5,
                                        cursor: 'pointer',
                                    }}
                                />
                                <IconButton aria-label="picker" onClick={handleOpen} edge="end" size="small">
                                    <Palette fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box p={2} display="flex" flexDirection="column" gap={1}>
                    <HexColorPicker color={color || '#000000'} onChange={field.onChange} />
                    <HexColorInput
                        color={color || '#000000'}
                        onChange={field.onChange}
                        prefixed
                        style={{
                            height: 36,
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: '1px solid rgba(0,0,0,0.23)',
                        }}
                    />
                </Box>
            </Popover>
        </>
    );
}

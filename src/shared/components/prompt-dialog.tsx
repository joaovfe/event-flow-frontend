import {
    PropsWithChildren,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

type PromptDialogParams = {
    title: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    submitLabel?: string;
    cancelLabel?: string;
    helperText?: string;
    icon?: ReactNode;
    validate?: (value: string) => string | undefined;
};

type PromptDialogState = PromptDialogParams & {
    open: boolean;
    value: string;
    error?: string;
    resolve?: (value: string | null) => void;
};

const initialState: PromptDialogState = {
    open: false,
    title: '',
    value: '',
};

type PromptDialogContextProps = {
    openPromptDialog: (params: PromptDialogParams) => Promise<string | null>;
};

const PromptDialogContext = createContext<PromptDialogContextProps>({
    openPromptDialog: async () => null,
});

export function PromptDialog({ children }: PropsWithChildren) {
    const [state, setState] = useState<PromptDialogState>(initialState);

    function closeWith(value: string | null) {
        const resolver = state.resolve;
        setState(initialState);
        if (resolver) resolver(value);
    }

    function handleSubmit() {
        const validator = state.validate;
        if (validator) {
            const message = validator(state.value);
            if (message) return setState((prev) => ({ ...prev, error: message }));
        }

        if (!state.value || state.value.trim().length === 0) {
            return setState((prev) => ({ ...prev, error: 'Campo obrigatório' }));
        }

        closeWith(state.value.trim());
    }

    function handleCancel() {
        closeWith(null);
    }

    async function openPromptDialog(params: PromptDialogParams) {
        return new Promise<string | null>((resolve) => {
            setState({
                ...initialState,
                ...params,
                open: true,
                value: params.defaultValue ?? '',
                resolve,
            });
        });
    }

    return (
        <PromptDialogContext.Provider value={{ openPromptDialog }}>
            {children}

            <Dialog open={state.open} onClose={handleCancel} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ px: 3, py: 2 }}>
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap="12px"
                    >
                        <Stack flexDirection="row" alignItems="center" gap={1}>
                            {state.icon}

                            <Typography fontWeight="bold" color="secondary.light" variant="h5">
                                {state.title}
                            </Typography>
                        </Stack>

                        <IconButton color="primary" onClick={handleCancel}>
                            <Close />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent sx={{ paddingY: 2, paddingX: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        autoFocus
                        value={state.value}
                        onChange={(e) => setState((prev) => ({ ...prev, value: e.target.value, error: undefined }))}
                        label={state.label ?? 'Justificativa'}
                        placeholder={state.placeholder ?? 'Descreva o motivo...'}
                        error={!!state.error}
                        helperText={state.error ?? state.helperText}
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions sx={{ paddingY: 2, paddingX: 3 }}>
                    <Stack
                        width="100%"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap="12px"
                    >
                        <Button onClick={handleCancel} color="error" variant="text" size="large" fullWidth>
                            {state.cancelLabel ?? 'Cancelar'}
                        </Button>

                        <Button onClick={handleSubmit} color="primary" variant="contained" size="large" fullWidth>
                            {state.submitLabel ?? 'Salvar'}
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </PromptDialogContext.Provider>
    );
}

export function usePromptDialog() {
    const context = useContext(PromptDialogContext);
    if (!context)
        throw new Error('usePromptDialog deve ser usado dentro de um PromptDialog');
    return context;
}



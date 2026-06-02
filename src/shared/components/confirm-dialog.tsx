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
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default interface IConfirmDialog {
  open: boolean;
  title: string;
  description: string | ReactNode;
  icon?: ReactNode;
  cancelLabel?: string;
  continueLabel?: string;
  onlyCancel?: boolean;
  cancel?: (reason: any) => void;
  continue?: (value: boolean) => void;
}

const initialConfirmContext: IConfirmDialog = {
  open: false,
  title: '',
  description: '',
};

export interface IConfirmDialogContext {
  openConfirmDialog: (_value: Omit<IConfirmDialog, 'open'>) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<IConfirmDialogContext>({
  openConfirmDialog: async (_value: Omit<IConfirmDialog, 'open'>) => false,
});

export function ConfirmDialog({ children }: PropsWithChildren) {
  const [state, setState] = useState<IConfirmDialog>(initialConfirmContext);

  async function openConfirmDialog(params: Omit<IConfirmDialog, 'open'>) {
    const value: IConfirmDialog = {
      ...params,
      open: true,
    };

    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      value.continue = resolve;
      value.cancel = reject;
    });

    setState(value);

    return promise;
  }

  function resolveConfirmDialog(propagate: boolean) {
    setState({
      ...state,
      open: false,
    });

    if (state.continue) state.continue(propagate);
  }

  function cancelConfirmDialog() {
    setState({
      ...state,
      open: false,
    });

    if (state.cancel) state.cancel('Confirmação cancelada.');
  }

  const {
    open,
    title,
    description,
    icon,
    continueLabel,
    cancelLabel,
    onlyCancel,
  } = state;

  return (
    <ConfirmDialogContext.Provider value={{ openConfirmDialog }}>
      {children}

      <Dialog open={open} onClose={cancelConfirmDialog} maxWidth="xs">
        <DialogTitle>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap="12px"
          >
            <Stack flexDirection="row" alignItems="center" gap={1}>
              {icon}

              <Typography fontWeight="bold" color="primary.main" variant="h5">
                {title}
              </Typography>
            </Stack>

            <IconButton color="primary" onClick={cancelConfirmDialog}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ paddingY: 2, paddingX: 3 }}>
          {typeof description === 'string' ? (
            <Typography
              variant="h6"
              component="p"
              fontWeight="normal"
              color="text.secondary"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {description}
            </Typography>
          ) : (
            description
          )}
        </DialogContent>

        <DialogActions sx={{ paddingY: 2, paddingX: 3 }}>
          <Stack
            width="100%"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap="12px"
          >
            <Button
              onClick={() => resolveConfirmDialog(false)}
              color="error"
              variant="text"
              size="large"
              fullWidth
            >
              {cancelLabel ?? 'Cancelar'}
            </Button>

            {!onlyCancel && (
              <Button
                onClick={() => resolveConfirmDialog(true)}
                color="primary"
                variant="contained"
                size="large"
                fullWidth
              >
                {continueLabel ?? 'Continuar'}
              </Button>
            )}
          </Stack>
        </DialogActions>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);

  if (!context)
    throw new Error(
      'useConfirmDialog deve ser usado dentro de um ConfirmDialog',
    );

  return context;
}

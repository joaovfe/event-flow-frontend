import { Clear } from '@mui/icons-material';
import { Alert, Box, Collapse, IconButton } from '@mui/material';

export interface IUnauthenticatedContentAlert {
  message: string;
  type: 'success' | 'error' | 'warning';
}

type UnauthenticatedContentAlertProps = {
  alert: IUnauthenticatedContentAlert;
  clear: () => void;
};

export function UnauthenticatedContentAlert({
  alert,
  clear,
}: UnauthenticatedContentAlertProps) {
  return (
    <Collapse in={!!alert.message}>
      <Alert
        severity={alert.type}
        variant="outlined"
        action={
          alert.type !== 'success' && (
            <IconButton color={alert.type} size="small" onClick={clear}>
              <Clear fontSize="inherit" />
            </IconButton>
          )
        }
        sx={{ borderRadius: 2 }}
      >
        {alert.message.split('\n').map((msg, idx) => (
          <Box key={idx} display="block">
            {msg}
          </Box>
        ))}
      </Alert>
    </Collapse>
  );
}

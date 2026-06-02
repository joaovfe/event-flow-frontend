import { Paper, PaperProps } from '@mui/material';

type PageCardProps = PaperProps & {};

export function PageCard({ children, ...props }: PageCardProps) {
  return (
    <Paper
      elevation={3}
      {...props}
      sx={{
        gap: 3,
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        justifyContent: 'start',
        padding: { sm: 3, xs: 2 },
        ...props.sx,
      }}
    >
      {children}
    </Paper>
  );
}

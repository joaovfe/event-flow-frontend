import { Stack, StackProps } from '@mui/material';

type PageHeaderProps = StackProps & {};

export function PageHeader({ children, ...props }: PageHeaderProps) {
  return (
    <Stack
      gap={3}
      flexWrap="wrap"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      {children}
    </Stack>
  );
}

import { Stack, StackProps, useMediaQuery } from '@mui/material';

type PageButtonsProps = StackProps & {};

export function PageButtons({ children, ...props }: PageButtonsProps) {
  const lessThanTablet: boolean = useMediaQuery((theme: any) =>
    theme.breakpoints.down('md'),
  );

  const lessThanMobile: boolean = useMediaQuery((theme: any) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <Stack
      flexWrap={lessThanTablet ? 'wrap' : 'nowrap'}
      justifyContent="end"
      direction="row"
      flexGrow={1}
      gap={2}
      {...props}
      sx={{
        '& .MuiButton-root': {
          minWidth: !lessThanTablet ? '180px' : undefined,
          flexGrow: !lessThanMobile ? 0 : 1,
        },
        ...props.sx,
      }}
    >
      {children}
    </Stack>
  );
}

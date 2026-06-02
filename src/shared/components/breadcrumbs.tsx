import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import { IBreadcrumb } from '@shared/domain/interfaces';
import { HomeOutlined } from '@mui/icons-material';

type BreadcrumbsProps = {
  breadcrumbs: IBreadcrumb[];
  title: string;
};

export function Breadcrumbs({ breadcrumbs = [], title }: BreadcrumbsProps) {
  var middleBreadcrumbs: React.ReactNode[] = [];

  breadcrumbs.forEach((breadcrumb, index) => {
    middleBreadcrumbs.push(
      <Link
        key={'bread-' + index}
        underline="hover"
        color="inherit"
        to={breadcrumb.path}
        component={RouterLink}
      >
        <Typography fontSize={'12px'}>{breadcrumb.label}</Typography>
      </Link>,
    );
  });

  return (
    <MUIBreadcrumbs color="text.disabled">
      <Link
        underline="hover"
        color="inherit"
        to="/pagina-inicial"
        component={RouterLink}
        gap={1}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <HomeOutlined sx={{ fontSize: '16px' }} />
        <Typography fontSize={'12px'}>Página Inicial</Typography>
      </Link>

      {middleBreadcrumbs}

      <Typography color="text.primary" fontSize={'12px'} fontWeight={600}>
        {title}
      </Typography>
    </MUIBreadcrumbs>
  );
}

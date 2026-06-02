import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Badge,
} from '@mui/material';
import { Search as SearchIcon, ShoppingCartOutlined } from '@mui/icons-material';

import { Logo } from '@/shared/components/logo';
import { EPublicPath } from '@/core/router/domain/enums/public-path.enum';
import { useCart } from '@/modules/cart/contexts';
import { LoginOrProfileButton } from './login-or-profile-button';

type PublicTopBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function PublicTopBar({ searchValue, onSearchChange }: PublicTopBarProps) {
  const { count } = useCart();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="primary"
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar disableGutters>
        <Container sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
          <RouterLink to="/" style={{ display: 'inline-flex' }}>
            <Logo maxWidth="140px" />
          </RouterLink>

          <Box sx={{ flexGrow: 1 }} />

          <TextField
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            placeholder="Procurar eventos"
            sx={{ maxWidth: 520, flex: 1, display: { xs: 'none', sm: 'inline-flex' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ width: 8 }} />

          <IconButton component={RouterLink} to={EPublicPath.CART} color="inherit" title="Carrinho">
            <Badge badgeContent={count} color="success">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>

          <Box sx={{ width: 4 }} />

          <LoginOrProfileButton />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

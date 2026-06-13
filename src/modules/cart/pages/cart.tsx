import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Add, DeleteOutline, Remove, ShoppingCartOutlined } from '@mui/icons-material';

import { EPublicPath } from '@/core/router/domain/enums/public-path.enum';
import { useAuthModal } from '@/modules/auth/contexts/auth-modal.context';
import { formatCurrency } from '@/shared/utils';

import { useCart } from '../contexts';

export function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { isAuth } = useAuthModal();

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCartOutlined sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Seu carrinho está vazio
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Explore os eventos disponíveis e garanta seus ingressos.
        </Typography>
        <Button component={RouterLink} to={EPublicPath.HOME} variant="contained" color="success">
          Ver eventos
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Carrinho
      </Typography>

      <Stack spacing={2} mt={2}>
        {items.map((item) => (
          <Card key={item.ticketTypeId} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', sm: 'center' }}
                spacing={2}
              >
                <Box>
                  <Typography variant="subtitle1">{item.ticketTypeName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.eventTitle}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    {formatCurrency(item.price)}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Stack direction="row" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.ticketTypeId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography minWidth={24} textAlign="center">
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.ticketTypeId, item.quantity + 1)}
                      disabled={item.maxAvailable > 0 && item.quantity >= item.maxAvailable}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Stack>

                  <Typography variant="subtitle1" minWidth={96} textAlign="right">
                    {formatCurrency(item.price * item.quantity)}
                  </Typography>

                  <IconButton color="error" onClick={() => removeItem(item.ticketTypeId)}>
                    <DeleteOutline />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h6">Total: {formatCurrency(total)}</Typography>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => isAuth(() => navigate(EPublicPath.CHECKOUT))}
        >
          Ir para o checkout
        </Button>
      </Stack>
    </Container>
  );
}

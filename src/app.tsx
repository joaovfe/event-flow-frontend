import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider, AuthModalProvider } from '@modules/auth/contexts';
import { CartProvider } from '@modules/cart/contexts';
import { ThemeProvider } from '@core/theme';
import { Router } from '@core/router';

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <AuthModalProvider>
              <CartProvider>
                <Router />
              </CartProvider>
            </AuthModalProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

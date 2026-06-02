import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { useAuth } from '@/modules/auth/hooks';

export enum EAuthModalType {
  LOGIN = 'login',
  REGISTER = 'register',
}

type PendingAction = () => void;

interface IAuthModalContext {
  open: boolean;
  type: EAuthModalType | null;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeModal: () => void;
  isAuth: (action?: PendingAction) => void;
}

const AuthModalContext = createContext<IAuthModalContext>({} as IAuthModalContext);

export function AuthModalProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<EAuthModalType | null>(null);
  const pendingRef = useRef<PendingAction[]>([]);

  const openLoginModal = useCallback(() => {
    setType(EAuthModalType.LOGIN);
    setOpen(true);
  }, []);

  const openRegisterModal = useCallback(() => {
    setType(EAuthModalType.REGISTER);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setType(null);
  }, []);

  const isAuth = useCallback((action?: PendingAction) => {
    if (!user) {
      if (action) pendingRef.current.push(action);
      openLoginModal();
      return;
    }
    action?.();
  }, [user, openLoginModal]);

  useEffect(() => {
    if (user && open) {
      closeModal();
      const actions = [...pendingRef.current];
      pendingRef.current = [];
      actions.forEach(a => {
        a();
      });
    }
  }, [user, open, closeModal]);

  return (
    <AuthModalContext.Provider
      value={{
        open,
        type,
        openLoginModal,
        openRegisterModal,
        closeModal,
        isAuth,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    return {
      open: false,
      type: null,
      openLoginModal: () => { },
      openRegisterModal: () => { },
      closeModal: () => { },
      isAuth: () => { },
    };
  }
  return context;
}


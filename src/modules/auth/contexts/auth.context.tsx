import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { EUnauthenticatedPath } from '@/core/router';
import { isPublicRoute } from '@/shared/utils';

import {
  IAuth,
  IUseAuth,
  IAuthAction,
  EAuthAction,
  ILoginResponseDTO,
  ILoginRequestDTO,
  IRecoverRequestDTO,
  IResetRequestDTO,
} from '../domain';
import { AuthRepository } from '../repositories';
import { LOCAL_STORAGE_KEY } from '@/shared/domain/constants/localStorageKey.constant';

export const AuthContext = createContext<IUseAuth>({} as IUseAuth);

function authReducer(state: IAuth, action: IAuthAction) {
  const { type, user } = action;

  const states = {
    [EAuthAction.LOGIN]: {
      ...state,
      authenticated: true,
      user: user,
    },
    [EAuthAction.LOGOUT]: {
      ...state,
      authenticated: false,
      user: null,
    },
  };

  return states[type] as IAuth;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const repository = new AuthRepository();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);

  const [_auth, setLocalStorage, clearLocalStorage] =
    useLocalStorage<ILoginResponseDTO>(LOCAL_STORAGE_KEY.AUTH, {
      token: '',
      refreshToken: '',
    });

  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    user: null,
  } as IAuth);

  async function checkAuthentication() {
    if (state.authenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const user = await repository.check();

      dispatch({ type: EAuthAction.LOGIN, user });

      navigate(location ?? '/');
    } catch {
      dispatch({ type: EAuthAction.LOGOUT });
      clearLocalStorage();
    } finally {
      setLoading(false);
    }
  }

  async function login(data: ILoginRequestDTO) {
    try {
      setLoading(true);

      const { token, refreshToken, resetPassword } =
        await repository.login(data);

      if (resetPassword) {
        return navigate({
          pathname: EUnauthenticatedPath.RESET,
          search: `token=${token}`,
        });
      }

      setLocalStorage({
        token,
        refreshToken: data.remember ? refreshToken : '',
      });

      const user = await repository.check();

      dispatch({ type: EAuthAction.LOGIN, user });

      const isPublicPage = isPublicRoute(location.pathname);
      if (!isPublicPage) {
        navigate(location ?? '/', {
          state: {
            origin: 'login',
            loggedIn: true,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    dispatch({ type: EAuthAction.LOGOUT });
    clearLocalStorage();

    const isPublicPage = isPublicRoute(location.pathname);
    if (!isPublicPage) {
      navigate(EUnauthenticatedPath.LOGIN);
    }

    setLoading(false);
  }

  async function recover(data: IRecoverRequestDTO) {
    try {
      setLoading(true);

      const { message } = await repository.recover(data);

      return message;
    } finally {
      setLoading(false);
    }
  }

  async function reset(data: IResetRequestDTO) {
    try {
      setLoading(true);

      const { message } = await repository.reset(data);

      return message;
    } finally {
      setLoading(false);
    }
  }

  async function refreshUser() {
    const user = await repository.check();

    dispatch({ type: EAuthAction.LOGIN, user });
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (state.authenticated) {
      setLoading(false);
    }
  }, [state]);

  const value = useMemo(
    () => ({
      login,
      logout,
      recover,
      reset,
      loading,
      refreshUser,
      confirm,
      ...state,
    }),
    [loading, state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import { ILoginResponseDTO } from '@/modules/auth/domain';
import { EUnauthenticatedPath } from '../router';
import { Client } from './client';
import { LOCAL_STORAGE_KEY } from '@/shared/domain/constants/localStorageKey.constant';
import { EPublicPath } from '../router/domain/enums/public-path.enum';

export function getToken(): string | undefined {
  const item: string | null = localStorage.getItem(LOCAL_STORAGE_KEY.AUTH);
  const token: string | undefined = item
    ? JSON.parse(item)['token']
    : undefined;

  return token;
}

export async function refreshToken() {
  const item: string | null = localStorage.getItem(LOCAL_STORAGE_KEY.AUTH);
  const refreshToken: string | undefined = item
    ? JSON.parse(item)['refreshToken']
    : undefined;

  if (!refreshToken) {
    return localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH);
  }

  const { status, data } = await Client.post<ILoginResponseDTO>(
    '/auth/refresh',
    {
      refresh: refreshToken,
    },
  );

  if (status >= 200 && status < 300) {
    return localStorage.setItem(LOCAL_STORAGE_KEY.AUTH, JSON.stringify(data));
  }

  return localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH);
}

export function redirect(message?: string) {
  const dontRedirectPaths = [
    EUnauthenticatedPath.LOGIN,
    EUnauthenticatedPath.RECOVER,
    EUnauthenticatedPath.RESET,
    EUnauthenticatedPath.REGISTER,
    EPublicPath.HOME,
  ];

  if (
    !window.location.pathname
      .split('/')
      .some((path) =>
        dontRedirectPaths.includes(('/' + path) as EUnauthenticatedPath),
      )
  ) {
    window.location.href = EPublicPath.HOME;

    throw new Error(message || 'Login necessário!');
  }
}

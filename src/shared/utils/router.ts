import { matchPath } from 'react-router-dom';
import { EPublicPath } from '@/core/router';

export function isPublicRoute(pathname: string): boolean {
  const publicPaths = Object.values(EPublicPath);
  
  return publicPaths.some((path) => {
    return matchPath({ path, end: true }, pathname) !== null;
  });
}


import { useEffect, useState } from 'react';
import { getRouteFromHash, type AppRoute } from './routes';

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash(window.location.hash));

  useEffect(() => {
    const ensureHash = () => {
      if (!window.location.hash) {
        window.location.hash = '#/';
      }
      setRoute(getRouteFromHash(window.location.hash));
    };

    ensureHash();
    window.addEventListener('hashchange', ensureHash);
    return () => window.removeEventListener('hashchange', ensureHash);
  }, []);

  return route;
}

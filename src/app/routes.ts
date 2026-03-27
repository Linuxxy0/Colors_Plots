export type AppRoute = 'home' | 'palettes' | 'charts' | 'playground';

export const routeConfig: Record<AppRoute, { label: string; href: string; description: string }> = {
  home: { label: 'Home', href: '#/', description: '入口页' },
  palettes: { label: 'Palettes', href: '#/palettes', description: '科研配色库' },
  charts: { label: 'Charts', href: '#/charts', description: '图表预览库' },
  playground: { label: 'Playground', href: '#/playground', description: '数据实验台' },
};

export function getRouteFromHash(hash: string): AppRoute {
  const cleanHash = hash.replace(/^#/, '') || '/';
  if (cleanHash.startsWith('/palettes')) return 'palettes';
  if (cleanHash.startsWith('/charts')) return 'charts';
  if (cleanHash.startsWith('/playground')) return 'playground';
  return 'home';
}

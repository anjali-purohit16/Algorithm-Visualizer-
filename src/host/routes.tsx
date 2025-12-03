import Index from './pages/index.page';
import { createBrowserRouter } from 'react-router-dom';
import { pathFinderRoutes } from '@pathFinder/routes';
import { sortingVisualizerRoutes } from '@/apps/sorting-visualizer/routes';

export const router = createBrowserRouter([
  ...sortingVisualizerRoutes,
  ...pathFinderRoutes,
  {
    path: '/',
    element: <Index />,
  },
]);

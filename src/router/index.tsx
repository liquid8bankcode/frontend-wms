import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import ProtectRoutes from './ProtectRoutes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element:
            route.layout === 'blank' ? (
                <BlankLayout>{route.element}</BlankLayout>
            ) : (
                <ProtectRoutes>
                    <DefaultLayout>{route.element}</DefaultLayout>
                </ProtectRoutes>
            ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;

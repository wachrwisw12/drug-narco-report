
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/Appbar';

export default function MainLayout() {
  return (
    <>
     <ResponsiveAppBar />

      <Outlet />
    </>
  );
}

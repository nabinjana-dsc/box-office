import { Outlet } from 'react-router-dom';
import AppTitle from "./AppTitle";
import Navs from './Navs';

const MainLayout = ({ children }) => {
  return (
    <div>
      <AppTitle 
        title= "Box Office"
        subtitle="Are you looking for a movie or an actor?"
      />
      <Navs />

      <Outlet />
      {children}
    </div>
  );
};

export default MainLayout;

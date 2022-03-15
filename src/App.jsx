import React from 'react';
import './static/css-files/App.css';
import 'primereact/calendar/calendar.min.css';
import 'primereact/dropdown/dropdown.min.css';
import 'primereact/inputtext/inputtext.min.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import PrimeReact from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Navbar from './views/navbar/navbar';
import ComponentRoutes from './ComponentRoutes';
import { useAppSelector } from './store';

PrimeReact.ripple = true;

function App() {
  const isLightMode = useAppSelector((state) => state.admin.isLightMode);
  return (
    <div>
      <Navbar />
      <div className={`${isLightMode ? '' : 'dark'} main-component-div`}>
        <ComponentRoutes />
      </div>
    </div>
  );
}

export default App;

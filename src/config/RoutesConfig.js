// React
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import OrderPage from '../page/Order';
import SettingsPage from '../page/Settings';
import WhatsappPage from '../page/Whatsapp';
import MenuPage from '../page/Menu';
import DeliveryPage from '../page/Delivery';
import EmployeesPage from '../page/Employees';
import AuthPage from '../page/Auth';

// components
import Sidebar from '../component/Sidebar';

// hooks
import useAppContext from './../hook/useAppContext';
import InvoicePage from '../page/Invoice';

const RoutesConfig = () => {
  const { authenticated } = useAppContext();

  return authenticated ?
    (
      <BrowserRouter >
        <Sidebar />
        <Routes>
          <Route path='/' element={<OrderPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/whatsapp' element={<WhatsappPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/delivery' element={<DeliveryPage />} />
          <Route path='/employees' element={<EmployeesPage />} />
          <Route path='/invoice' element={<InvoicePage />} />
        </Routes>
      </BrowserRouter>
    ) : (<AuthPage />)

}

export default RoutesConfig
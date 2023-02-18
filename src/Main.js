import 'react-notifications/lib/notifications.css';
import './Main.css';

import { NotificationContainer } from 'react-notifications';

// Context
import { AppContextProvider } from './context/AppContext';

// Routes
import RoutesConfig from './config/RoutesConfig';

const Main = () => {
  return (
    <AppContextProvider>
      <RoutesConfig />
      <NotificationContainer />
    </AppContextProvider>
  )
}

export default Main;
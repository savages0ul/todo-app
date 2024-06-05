import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import RootStoreProvider from './control/provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RootStoreProvider>
        <App />
    </RootStoreProvider>
);

import React from 'react';

import StoreContext from './context';
import { rootStoreInstance } from './ioc';

interface IProps {
    children: React.ReactNode;
    mockStore?: any;
}

function RootStoreProvider({ children, mockStore }: IProps) {
    const root = mockStore ?? rootStoreInstance;

    return (
        <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
    );
}

export default RootStoreProvider;

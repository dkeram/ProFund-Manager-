import { createContext, useContext, useState } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [clientId, setClientId] = useState(null);

    return (
        <ClientContext.Provider value={{ clientId, setClientId }}>
            {children}
        </ClientContext.Provider>
    );
}


export const useClient = () => useContext(ClientContext);
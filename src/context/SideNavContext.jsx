import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SideNavContext = createContext(null);

export const SideNavProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openSideNav = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeSideNav = useCallback(() => {
        setIsOpen(false);
    }, []);

    const value = useMemo(() => ({
        isOpen,
        openSideNav,
        closeSideNav,
    }), [isOpen, openSideNav, closeSideNav]);

    return (
        <SideNavContext.Provider value={value}>
            {children}
        </SideNavContext.Provider>
    );
};

export const useSideNav = () => {
    const context = useContext(SideNavContext);

    if (context === null) {
        throw new Error('useSideNav must be used inside a SideNavProvider');
    }

    return context;
};

import { useAuth } from '@hooks/use-auth';
import React, { lazy, Suspense } from 'react';
import { PortalHost, PortalProvider } from '@gorhom/portal';
// Nested navigators
const ClientNavigator = lazy( () => import("../client-navigator/client-navigator") );
const TechnicianNavigator = lazy( () => import("../technician-navigator/technician-navigator") )
const AuthNavigator   = lazy( () => import("../auth-navigator/auth-navigator") );

const AppNavigator = () => {
    const { user, isGuest } = useAuth();
    return (
        <PortalProvider> 
            <Suspense fallback = {null}>
                {(() => {
                    if( user?.type === "client" || isGuest ){
                        return <ClientNavigator/>
                    }

                    if( user?.type === "technician" ){
                        return <TechnicianNavigator/>
                    }

                    return <AuthNavigator/>;
                })()}
            </Suspense>
            <PortalHost name="custom_host" />
        </PortalProvider>
    )
}

export default AppNavigator;
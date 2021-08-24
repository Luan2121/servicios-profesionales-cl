import { useAuth } from '@hooks/use-auth';
import React, { lazy, Suspense } from 'react';

// Nested navigators
const ClientNavigator = lazy( () => import("../client-navigator/client-navigator") );
const TechnicianNavigator = lazy( () => import("../technician-navigator/technician-navigator") )
const AuthNavigator   = lazy( () => import("../auth-navigator/auth-navigator") );

const AppNavigator = () => {
    const { user } = useAuth();
    return (
        <Suspense fallback = {null}>
            {(() => {
                if( user?.type === "client" ){
                    return <ClientNavigator/>
                }

                if( user?.type === "technician" ){
                    return <TechnicianNavigator/>
                }

                return <AuthNavigator/>;
            })()}
        </Suspense>
    )
}

export default AppNavigator;
import React, { Fragment, ReactNode } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useTheme } from 'bumbag';
import { Spinner } from 'bumbag-native';
import { Assets } from '@assets';

type StateObject = {
    label?: string,
    action?: ReactNode,
    secondaryLabel?: string,
    show?: boolean
}

type LoaderManagerProps = {
    children: ReactNode,
    isLoading: boolean,
    error?: StateObject | undefined,
    success?: StateObject | undefined; 
}

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ErrorIcon = Assets.icons.error;
const SuccessIcon = Assets.icons.success;

const LoaderManager = ({
    children,
    isLoading,
    error,
    success
} : LoaderManagerProps) => {
    const { theme } = useTheme();
    return (
        <Fragment>
            {(() => {
                if(success && success.show){
                    return (
                        <Fragment>
                            <View style = {{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style = {{
                                    alignItems: 'center'
                                }}>
                                    <View style = {{
                                        width: 140,
                                        height: 140,
                                        marginBottom: 48
                                    }}>
                                        <SuccessIcon/>
                                    </View>
                                    <Text style = {{
                                        fontSize: 20,
                                        color: '#000000'
                                    }}>
                                        {success.label}
                                    </Text>
                                    {!!success.secondaryLabel && (
                                        <Text style = {{
                                            fontSize: 14,
                                            color: theme.palette.muted,
                                            marginTop: theme.spacing.small
                                        }}>
                                            {success.secondaryLabel}
                                        </Text>
                                    )}
                                    {!!success.action && (
                                        <View style = {{
                                            marginTop: theme.spacing.medium
                                        }}>
                                            {success.action}
                                        </View>
                                    )}
                                </View>
                            </View>
                        </Fragment>
                    );
                }

                if(error && error.show){
                    return (
                        <Fragment>
                            <View style = {{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style = {{
                                    alignItems: 'center'
                                }}>
                                    <View style = {{
                                        width: 140,
                                        height: 140,
                                        marginBottom: 48
                                    }}>
                                        <ErrorIcon/>
                                    </View>
                                    <Text style = {{
                                        fontSize: 20,
                                        color: '#000000'
                                    }}>
                                        {error.label}
                                    </Text>
                                    {!!error.secondaryLabel && (
                                        <Text style = {{
                                            fontSize: 14,
                                            color: theme.palette.muted,
                                            marginTop: theme.spacing.small
                                        }}>
                                            {error.secondaryLabel}
                                        </Text>
                                    )}
                                    {!!error.action && (
                                        <View style = {{
                                            marginTop: theme.spacing.medium
                                        }}>
                                            {error.action}
                                        </View>
                                    )}
                                </View>
                            </View>
                        </Fragment>
                    );
                }

                return (
                    <Fragment>
                        {children}
                        {isLoading && (
                            <View style = {{
                                flex: 1,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 100,
                                width,
                                height,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#000000',
                                opacity: 0.72
                            }}>
                                <View style = {{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Spinner color = "primary" size = "medium" />
                                    <Text style = {{
                                        color: theme.palette.body,
                                        marginLeft: theme.spacing.small
                                    }}>
                                        Espere
                                    </Text>
                                </View>
                            </View>
                        )}
                    </Fragment>
                )
            })()}
        </Fragment>
    );
}   

export { LoaderManager };
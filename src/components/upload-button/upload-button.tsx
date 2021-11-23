import React, { useState, Fragment, useRef, useMemo } from 'react';
import { View, Text, Image, Platform, Dimensions } from 'react-native';
import { useTheme } from 'bumbag';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Portal, PortalProvider, PortalHost } from '@gorhom/portal';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Spinner } from 'bumbag-native';

type UploadButtonProps = {
    onUpload: (image : ImagePicker.ImagePickerResult | CameraCapturedPicture ) => void,
    isLoading: boolean
}

const UploadButton = ({ onUpload, isLoading } : UploadButtonProps ) => {
    const { theme } = useTheme();
    const snapPoints = useMemo(() => ['30%'], []);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [openCamera,setOpenCamera] = useState<boolean>(false)

    const [ pickImage , setPickImage ] = useState<ImagePicker.ImagePickerResult | CameraCapturedPicture>();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const cameraRef = useRef<Camera>(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Se requiere permiso para acceder  a la camara");
          return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if(!pickerResult.cancelled){
            setPickImage( pickerResult );
            onUpload(pickerResult);
        }
    }

    const handleOpenCamera = async () => {
        let status;
        if(!hasPermission){
            let result = await Camera.requestCameraPermissionsAsync();
            status = result.status;
            setHasPermission( status === "granted" );
            if( status === "granted" ){
                setOpenCamera(true);
            }
        }else {
            setOpenCamera(true);
        }
    }

    return (
        <Fragment> 
            <TouchableWithoutFeedback onPress = {() => {
                 bottomSheetRef.current?.present();
            }} style = {{
                width: '100%'
            }}>
                <View style = {{
                    width: '100%',
                    height: 180,
                    backgroundColor: theme.palette.mutedLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    {!pickImage ? (
                        <Fragment>
                            <View style = {{
                                width: 90,
                                height: 90,
                                borderRadius: 45,
                                backgroundColor: theme.palette.muted,
                                opacity: .15,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Entypo name="images" size={36} color={theme.palette.muted} />
                            </View>
                            <View style = {{
                                marginTop: theme.spacing.small
                            }}>
                                <Text>
                                    Cargar foto
                                </Text>
                            </View>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {isLoading && (
                                <View style = {{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: '#000',
                                    opacity: 0.4,
                                    height: 180,
                                    width: Dimensions.get('screen').width,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 2
                                }}>
                                    <Spinner color = "white" size = "large" />
                                </View>
                            )}
                            <Image 
                                style = {{
                                    width: '100%',
                                    height: 180
                                }}
                                source = {{
                                    uri: (pickImage as ImageInfo)?.uri
                                }}
                            />
                        </Fragment>
                    )}
                </View>  
            </TouchableWithoutFeedback>
            <Portal name = "custom_host">
                <BottomSheetModalProvider>
                    <BottomSheetModal ref={bottomSheetRef} snapPoints = {snapPoints}>
                        <View style = {{
                            flex: 1
                        }}>
                            <TouchableWithoutFeedback style = {{
                                width: '100%'
                            }} onPress = {() => {
                                openImagePickerAsync();
                            }}>
                                <View style = {{
                                    padding: theme.spacing.medium,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text style = {{
                                        fontSize: 18
                                    }}>
                                        Galeria
                                    </Text>
                                    <Entypo name="chevron-right" size={24} color={theme.palette.primary} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress = {handleOpenCamera} style = {{
                                width: '100%'
                            }}>
                                <View style = {{
                                    padding: theme.spacing.medium,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text style = {{
                                        fontSize: 18
                                    }}>
                                        Camara
                                    </Text>
                                    <Entypo name="chevron-right" size={24} color={theme.palette.primary} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </Portal>
            {openCamera && (
                <Portal name = "custom_host"> 
                    <View style = {{
                        flex: 1,
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%'
                    }}>
                        <Camera ref = {cameraRef} style={{
                            flex: 1,
                            height: Dimensions.get('screen').height,
                            position: 'relative'
                        }} type={type}>
                            <View style = {{
                                position: 'absolute',
                                top: 50,
                                left: 30,
                                height: 36,
                                width: 36,
                                backgroundColor: theme.palette.primary,
                                borderRadius: 14,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <TouchableWithoutFeedback onPress = {() => {
                                    setOpenCamera(false);
                                }}>
                                    <AntDesign name="close" size={24} color="#FFF" />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style = {{
                                position: 'absolute',
                                bottom: 50,
                                right: 30,
                                height: 36,
                                width: 36,
                                backgroundColor: theme.palette.primary,
                                borderRadius: 14,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    );
                                }}>
                                    <MaterialIcons name="flip-camera-android" size={24} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                            <View style = {{
                                position: 'absolute',
                                bottom: 35,
                                left: (Dimensions.get('screen').width / 2) - 30,
                                height: 60,
                                width: 60,
                                backgroundColor: "#FFF",
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 3,
                                borderStyle: 'solid',
                                borderColor: theme.palette.primary
                            }}>
                                <TouchableOpacity
                                    onPress={async () => {
                                        try{
                                            const photo = await cameraRef.current?.takePictureAsync();
                                            setOpenCamera(false);
                                            setPickImage(photo);
                                            if(photo){
                                                onUpload(photo);
                                            }
                                            bottomSheetRef.current?.dismiss();
                                        }catch( err ){
                                            console.log(err);
                                        }

                                    }}
                                >
                                    <MaterialIcons name="flip-camera-android" size={24} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                </Portal>
            )}
        </Fragment>
    );
}

export { UploadButton };
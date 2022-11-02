import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RNCamera } from 'react-native-camera';
import store from "@stores/store";
import { StoreImage, StoreNominal } from "@actions"
import { connect } from "react-redux";
import { useEffect } from "react";
import { ScrollView } from "native-base";
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";  
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import TextInputMask from 'react-native-text-input-mask';
import { LocalNotification } from "../../service/LocalPushController";
import numeral from "numeral";

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

function UserCamera ({ navigation, image }){
    
    const [box, setBox] = useState(null);
    const [detection, setDetection] = useState(false);
    const [imagePic, setImagePic] = useState("");
    const [login,setLogin] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(0);
    const [total, setTotal] = useState("");
    
    const storage = AsyncStorage

    const handleRecognition = async (camera) => {

        // if (camera) {
        //     const options = { quality: 0.5, base64: true }
        //     const data = await camera.takePictureAsync(options);
        //     setImage(data.uri)
        // }
        
        if (detection == false) {
            alert('Wajah Tidak Terdeteksi')
        }
        else {
           if (camera) {
                const options = { quality: 0.5, base64: true }
                const data = await camera.takePictureAsync(options);
                setImagePic(data.uri)
                store.dispatch(StoreImage(imagePic))
            }
        }
    }

    const dataLogin = async () => {

        let login =  await storage.getItem("login")
        setLogin(JSON.parse(login))
    }
    
    useEffect(() => {
        dataLogin()
        TotalPrice()
    }, 1000)

    const handleFaceDetection = async ({faces}) => {

        if (faces[0]) {
            setDetection(true)
            setBox({
                boxs: {
                    width: faces[0].bounds.size.width,
                    height: faces[0].bounds.size.height,
                    x: faces[0].bounds.origin.x,
                    y: faces[0].bounds.origin.y,
                    yawAngle: faces[0].yawAngle,
                    rollAngle: faces[0].rollAngle,
                    },
                rightEyePosition: faces[0].rightEyePosition,
                leftEyePosition: faces[0].leftEyePosition,
                bottomMounthPosition: faces[0].bottomMounthPosition,
            });
        } else {
            setBox(null)
            setDetection(false)
        }
    }
    
    const handleLogOut = () => {
        storage.clear()
        navigation.navigate('dashboard')
    }

    const handleSell = () => {
        if (imagePic !== "" && total > 0) {
            navigation.navigate('formatUsd')
            LocalNotification()
        }
        else {
            if (imagePic == "") {
                alert('tambah gambar')
            }
            else {
                alert('tambah harga')
            }
        }
    }
    
    const handleChangeValue = (val) => {

        if (val == 0) {
            if (value > 0) {
                const values = value - 1
                setValue(values)
                TotalPrice(values)
            }
            
        }
        else {
            
            if (parseFloat(inputValue.values) > 0) {
                const values = value + 1
                setValue(values)
                TotalPrice(values)
            }
            else {
                alert('masukkan harga')
                setValue(0)
            }
        }
    }

    const TotalPrice = async (values) => {
        var input = numeral(inputValue.values).format('0,0.00')
        const totalPrice = parseFloat(input.replace(/[^0-9.-]+/g,"")) * values
        setTotal(totalPrice)
        store.dispatch(StoreNominal(totalPrice))
    }

    const handleChangeInputValue = (val, values) => {
        setInputValue({
            ...inputValue,
            [values] : val
        })
        
    }

    const USDCurrencyFormat = (x) => {
        if (x !== undefined) {
            let num1;
            let num2;
            if (x.includes('.')) {
                const a = x.split('.');
                num1 = a[0];
                num2 = a[1]?.slice(0,2);
            }
            else {
                num1 = x
            }

            if (num1 || num1 === 0) {
                const num = Math.round(num1).toString();
                let result = '';
                let cons = 0;
                for (let i = num.length - 1; i >= 0; i--) {
                    cons += 1
                    result = num[i] + result
                    if (cons % 3 === 0 && cons < num.length) {
                        result = `,${result}`
                    }
                }
                if (x.includes('.')) {
                    return `${result}.${num2}`
                }
                return result
            }
            return 0
        }
    }

    return (
        <>
        <View style={{paddingHorizontal: RFValue(20), marginTop: RFValue(20)}}>
            <Text style={[style.textProfile, {marginTop: RFValue(30)}]}>Hello {login.email}</Text>
            <Text style={style.textSellPhoto}>Jual Fotomu</Text>
        </View>
        <ScrollView>        
        <View style={style.container}>    
            <View style={[style.preview, ,{marginTop: RFValue(30)}]}>
                <RNCamera
                    style={style.preview}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onFacesDetected={handleFaceDetection}
                    faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
                    faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                    faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                >
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                        <>
                            <TouchableOpacity style={style.btnPhoto} onPress={() => handleRecognition(camera)}>
                                {imagePic == "" ?
                                <Text style={style.textPicture}>Foto</Text>
                                :
                                <Text style={style.textPicture}>Ulang</Text>
                                }
                            </TouchableOpacity>
                            {imagePic !== "" &&
                            <View style={style.imagePreview}>
                                <Image source={{uri: imagePic}} style={style.img}/>
                            </View>
                            }
                        </>
                        );
                    }}
                </RNCamera>
            </View>
            {box && 
            <>
            <View
                style={style.bound({
                width: box.boxs.width,
                height: box.boxs.height + RFValue(100),
                x: box.boxs.x,
                y: box.boxs.y,
            })}
            />
            </>
            }
            <View style={[{marginTop: RFValue(420)}]}>
                <Text style={[style.textPrice, {marginBottom: RFValue(10)}]}>Harga</Text>
                <TextInput
                    value={USDCurrencyFormat(inputValue.values?.replace(/,/g, ''))}
                    onChangeText={(val) => handleChangeInputValue(val, "values")}
                    style={style.input}
                />
                {/* <TextInputMask
                    mask={"[000],[000],[000].[00]"}
                    placeholder="0.00"
                    placeholderTextColor={"#FFFFFF"}
                    onChangeText={(formatted, extracted) => {
                        if (extracted > 9999999999) {
                            alert('123')
                        }
                        else {
                            setInputValue(formatted)
                        }
                    }}
                    style={style.input}
                    rightToLeft={true}
                    maxLength={10}
                /> */}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={[style.input, {width: '40%'}]} onPress={() => handleChangeValue(0)}>
                    <Text style={[style.textProfile, {color: '#FFFFFF'}]}>Kurang</Text>
                </TouchableOpacity>
                {value > 0 ?
                <Text style={style.textProfile}>{value}</Text>
                :
                <Text style={style.textProfile}>0</Text>
                }
                <TouchableOpacity style={[style.input, {width: '40%'}]} onPress={() => handleChangeValue(1)}>
                    <Text style={[style.textProfile, {color: '#FFFFFF'}]}>Tambah</Text>
                </TouchableOpacity>
            </View>
            {total > 0 ?
            <Text style={[style.textProfile, {color: '#252525'}]}>{numeral(total).format('0,0.00')}</Text>
            :
            <Text style={[style.textProfile, {color: '#252525'}]}>0</Text>
            }
            <View>
                <TouchableOpacity style={style.btn} onPress={() => handleSell()}>
                    <Text style={[style.textProfile, {color: '#FFFFFF'}]}>Jual</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </>
    )

}

const mapStateToProps = function (state) {
    const { image, nominal } = state;
    return { image, nominal }
}

export default connect (mapStateToProps)(UserCamera);

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RFValue(20),
        marginBottom: RFValue(80)
    },  
    input: {
        width: '100%',
        height: RFValue(40),
        backgroundColor: '#252525',
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(10),
        marginBottom: RFValue(15),
        fontFamily: 'Futura-Medium',
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: '100%',
        height: RFValue(60),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252525',
        borderRadius: RFValue(10),
        alignSelf: 'center',
        marginTop: RFValue(30)
    },
    preview: {
        width: '100%',
        height: RFValue(50),
        marginTop: RFValue(200)
    },
    bound: ({width, height, x, y}) => {
        return {
            position: 'absolute',
            top: y + RFValue(150),
            left: x - RFValue(0),
            height,
            width,
            borderWidth: 5,
            borderColor: 'green',
            zIndex: 3000,
            };
    },
    img: {
        width: RFValue(90),
        height: RFValue(90),
        borderRadius: RFValue(10),
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        top: RFValue(130),
        // bottom: RFValue(10),
        left: RFValue(10)
    },
    textProfile: {
        fontFamily: 'Futura-Bold',
        fontSize: RFValue(20),
        color: '#252525',
    },
    textSellPhoto: {
        fontFamily: 'Futura-Bold',
        fontSize: RFValue(18),
        color: '#252525'
    },
    btnPhoto: {
        position: 'absolute',
        alignSelf: 'center',
        top: RFValue(150),
        width: RFValue(60),
        height: RFValue(60),
        borderRadius: RFValue(50),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPicture: {
        fontFamily: 'Futura-Bold',
        fontSize: RFValue(16),
        color: '#252525'
    },
    viewAbs: {
        position: 'relative',
        fontFamily: 'Futura-Medium',
        fontSize: RFValue(14),
        color: 'white',
        backgroundColor: '#252525',
        alignSelf: 'center',
        bottom: RFValue(10)
    },
    textPrice: {
        fontFamily: 'Futura-Medium',
        fontSize: RFValue(14),
        color: '#252525',
    }
})
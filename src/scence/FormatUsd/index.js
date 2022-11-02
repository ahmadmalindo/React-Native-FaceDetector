import React, {useState} from "react";
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import numeral, { Numeral } from 'numeral';
import { connect } from "react-redux";

function FormatUsd({ navigation, image }) {

    const handleSellPhoto = () => {
        alert('fotomu berhasil terjual')
        setTimeout(() => {
            navigation.navigate('userCamera')
        }, 1000)
    }

    return (
        <View style={style.container}>
            {image.img !== "" &&
            <Image source={{uri: image.img}} style={style.img}/>
            }
            <Text style={style.text}>$ {numeral(image.nominal).format('0,0.00')}</Text>
            <TouchableOpacity style={style.btn} onPress={() => handleSellPhoto()}>
                <Text style={[style.text, {color: 'white'}]}>Jual</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn2} onPress={() => navigation.navigate('userCamera')}>
                <Text style={[style.text, {color: '#252525'}]}>Kembali</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = function (state) {
    const { image, nominal } = state;
    return { image, nominal }
}

export default connect (mapStateToProps)(FormatUsd);

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RFValue(20),
        justifyContent: 'center'
    },
    img: {
        width: '80%',
        height: '40%',
        transform: [{
            rotateZ: "-90deg"
            
        }],
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Futura-Bold',
        fontSize: RFValue(20),
        color: '#252525',
        alignSelf: 'center'
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
    btn2: {
        width: '100%',
        height: RFValue(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#252525',
        borderRadius: RFValue(10),
        alignSelf: 'center',
        marginTop: RFValue(30),
        borderStyle: 'dashed'
    }
})
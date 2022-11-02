import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "native-base";

function Dashboard({ navigation }){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);

    const storage = AsyncStorage

    const handleSign = async () => {

        let token = "124456hdfgdsf1246gsfghs"

        const data = {email: email, password:password} 

        if (email !== "" && password !== "" ) {
            await storage.setItem("token", token)
            await storage.setItem('login', JSON.stringify(data))
            await storage.setItem('isLogin', JSON.stringify(true))
            setTimeout(() => {
                navigation.navigate('userCamera')
            }, 1000)
        }
        else {
            if (email == "") {
                alert('masukkan email')
            }
            else {
                alert('masukkan password')
            }
        }
    }

    return (
        <ScrollView>
            <View style={style.container}>
                <Text style={[style.text, {marginTop: RFValue(190)}]}>JUAL FOTO</Text>
                <View style={[style.input, {marginTop: RFValue(50)}]}>
                    <TextInput
                        placeholder="email"
                        placeholderTextColor={"#FFFFFF"}
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                        style={style.input}
                    />
                </View>
                <View style={style.input}>
                    <TextInput
                        placeholder="password"
                        placeholderTextColor={"#FFFFFF"}
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                        secureTextEntry={show}
                        style={style.input}
                    />
                    {show == true ?
                    <Text style={style.textShow} onPress={() => setShow(false)}>show</Text>
                    :
                    <Text style={style.textShow} onPress={() => setShow(true)}>hide</Text>
                    }
                </View>
                <TouchableOpacity style={style.btn} onPress={() => handleSign()}>
                    <Text style={style.textBtn}>Login</Text>
                </TouchableOpacity>
                <Text></Text>
            </View>
        </ScrollView>
    )

}

export default Dashboard;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RFValue(20),
        justifyContent: 'center',
        alignItems: 'center'
    },  
    input: {
        width: '100%',
        height: RFValue(40),
        backgroundColor: '#252525',
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(10),
        marginBottom: RFValue(15),
        fontFamily: 'Futura-Medium',
        color: '#FFFFFF'
    },
    btn: {
        width: '100%',
        height: RFValue(60),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252525',
        borderRadius: RFValue(10)
    },
    text: {
        fontFamily: 'Futura-Bold',
        fontSize: RFValue(40),
        color: '#252525'
    },
    textBtn: {
        fontFamily: 'Futura-Bold',
        fontSize: RFValue(20),
        color: '#FFFFFF'
    },
    textShow: {
        position: 'absolute',
        right: RFValue(15),
        bottom: RFValue(13),
        fontFamily: 'Futura-Bold',
        fontSize: RFValue(14),
        color: '#FFFFFF'
    }
})
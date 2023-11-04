import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SuccessModal = ({ modalVisible, setModalVisible, newOrDetail}) => {

    const navigator = useNavigation();

    return (
        <Modal transparent={true} visible={modalVisible}>
            <View style={{backgroundColor: '#000000aa', flex: 1, justifyContent: 'center'}}>
                <View style={styles.modal}>
                    {
                        newOrDetail == "Detail" ? (
                            <Text style={{fontSize: 20}}>Tu $cerveza se agrego correctamente!</Text>
                        ) : (
                            <Text style={{fontSize: 20}}>Tu pedido fue registrado correctamente</Text>
                        )
                    }
                    <View style={{marginTop: 30}}>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(false);
                            navigator.goBack();
                        }}>
                            <Text style={{fontSize: 20, color: '#BF7648', fontWeight: 'bold'}}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 60,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    } 
});

import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import CustomHeader from '../components/CustomHeader';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'NewOrderScreen'>{};

export const NewOrderScreen = ({route, navigation}: Props) => {
    
    const movie = route.params;

    const leftAux = (
        <TouchableOpacity
           testID="autoBack"
           accessibilityLabel="autoBack"
           style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 50,
              marginLeft: 5
           }}
           onPress={() => {
              navigation.goBack();
           }}
        >
           <Text>boton</Text>
        </TouchableOpacity>
     );
    
    return (
        <View style={{flex: 1}}>
            <CustomHeader title='Nuevo pedido' leftComponent={leftAux}/>

            <ScrollView style={{marginTop: 10}}>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
                <Text style={{fontSize: 50}}>CARDS</Text>
            </ScrollView>
            <View style={styles.scroll}/>

            <View style={styles.resumeContainer}>
                <CustomText style={{fontWeight: '700', marginBottom: 10}}>Resumen del pedido</CustomText>

                <View style={{marginBottom: 15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical: 5}}>
                        <CustomText>Juli</CustomText>
                        <CustomText>$1700</CustomText>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5}}>
                        <CustomText>Mica</CustomText>
                        <CustomText>$1300</CustomText>
                    </View>
                </View>

                <View style={{backgroundColor: 'grey', width: '100%', height: 1, alignSelf: 'center'}}/>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}>
                    <CustomText>Total a pagar</CustomText>
                    <CustomText>$3000</CustomText>
                </View>

                <View style={{width: 300, alignSelf: 'center', marginBottom: 20}}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles.buttonContainer}>
                            <CustomText style={{fontSize: 18, color: 'white'}}>Confirmar pedido</CustomText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    resumeContainer: {
        margin: 15
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 50,
        backgroundColor: '#C67C4E',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 23,
        elevation: 3,
    },
    scroll: {
        borderBottomWidth: 4, 
        borderBottomColor: '#E3E3E3'
    }
});

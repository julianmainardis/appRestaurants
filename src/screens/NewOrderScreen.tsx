import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import CustomText from '../components/CustomText';
import CustomHeader from '../components/CustomHeader';
import { NewOrderCard } from '../components/NewOrderCard';
import { useMovies } from '../hooks/useMovies';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'NewOrderScreen'>{};

export const NewOrderScreen = ({route, navigation}: Props) => {
    
    const { topRated } = useMovies();

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
           <MaterialCommunityIcons
                name='arrow-left-thick'
                size={40}
                color='#A3A2A2'
            />
        </TouchableOpacity>
     );
    
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <CustomHeader title='Nuevo pedido' leftComponent={leftAux}/>

            <FlatList
                data={topRated}
                style={{marginTop: 10}}
                renderItem={ ({item}: any) => <NewOrderCard movie={item}/>}
            />
            <View style={styles.scroll}/>

            <View style={styles.resumeContainer}>
                <CustomText style={{fontWeight: '700', marginBottom: 10}}>Resumen del pedido</CustomText>

                <View style={{marginBottom: 15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical: 5}}>
                        <CustomText>Juli</CustomText>
                        <CustomText style={{fontWeight: 'bold'}}>$1700</CustomText>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5}}>
                        <CustomText>Mica</CustomText>
                        <CustomText style={{fontWeight: 'bold'}}>$1300</CustomText>
                    </View>
                </View>

                <View style={{backgroundColor: 'grey', width: '100%', height: 1, alignSelf: 'center'}}/>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}>
                    <CustomText>Total a pagar</CustomText>
                    <CustomText style={{fontWeight: 'bold'}}>$3000</CustomText>
                </View>

                <TouchableOpacity activeOpacity={0.7} style={{width: 300, alignSelf: 'center', marginBottom: 20}}>
                    <View style={styles.buttonContainer}>
                        <CustomText style={{fontSize: 18, color: 'white'}}>Confirmar pedido</CustomText>
                    </View>
                </TouchableOpacity>
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
        backgroundColor: '#BF7648',
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

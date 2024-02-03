import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import CustomHeader from '../components/CustomHeader';
import { SuccessModal } from '../components/SuccessModal';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({route, navigation}: Props) => {
    
    const product = route.params;
    const uri = `https://picsum.photos/200/300`;

    const { isLoading, products } = useProducts();
    const [heartClicked, setHeartClicked] = useState(false);
    const {categories} = useCategories();
    const [modalVisible, setModalVisible] = useState(false);    
    const [sizeBig, setSizeBig] = useState(false);

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

    const rightAux = (
        <TouchableOpacity
            testID="autoBack"
            accessibilityLabel="autoBack"
            style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: 50,
                marginRight: 5
            }}
            onPress={() => {
                setHeartClicked((prevHeartClicked) => !prevHeartClicked);
            }}
        >
            {
                heartClicked 
                ? ( <FontAwesome name='heart' color="#A3A2A2" size={32}/> )
                : ( <FontAwesome name='heart-o' color="#A3A2A2" size={32}/> )
            }
        </TouchableOpacity>
    );


    
    return (
        <>
            <CustomHeader title='Detalle' leftComponent={leftAux} rightComponent={rightAux}/>

            <ScrollView>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBorder}> 
                        <Image
                            source={{uri}}
                            style={styles.posterImage}
                        />
                    </View>
                </View>

                <View style={styles.marginContainer}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.subTitle}>{product.shortDescription}</Text>
                </View>

                <View style={{backgroundColor: '#D8D8D8', width: '100%', height: 1, alignSelf: 'center', marginTop: 20}}/>

                {
                    isLoading
                        ? <ActivityIndicator size={35} color="grey" style={{marginTop: 20}}/>
                        : (
                        <View style={{marginHorizontal: 20}}>

                            <Text style={{fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>
                                Descripcion
                            </Text>
                            <Text style={{fontSize: 16, marginTop: 10}}>
                                {product.description}
                            </Text>

                            <Text style={{fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>
                                Tamaño
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 15}}>
                                <TouchableOpacity style={{flex: 1}} onPress={() => setSizeBig(false)}>
                                    <View
                                        style={{
                                            ...styles.sizeButton,
                                            borderColor: !sizeBig ? '#BF7648' : '#D0D0D0',
                                            backgroundColor: !sizeBig ? '#F9EAE2' : '#F7F7F7'
                                        }}
                                    >
                                        <Text style={{fontSize: 20, color: !sizeBig ? '#BF7648' : 'black'}}>{product.size[0].size}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{flex: 1}} onPress={() => setSizeBig(true)}>
                                    <View
                                        style={{
                                            ...styles.sizeButton,
                                            borderColor: sizeBig ? '#BF7648' : '#D0D0D0',
                                            backgroundColor: sizeBig ? '#F9EAE2' : '#F7F7F7'
                                        }}
                                    >    
                                        <Text style={{fontSize: 20, color: sizeBig ? '#BF7648' : 'black'}}>{product.size[1].size}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }

                <View style={{justifyContent:'space-around', flexDirection: 'row', marginVertical: 30, alignItems: 'flex-end'}}>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 20, marginLeft: 5}}>Precio</Text>
                        <Text style={{fontSize: 25, marginTop: 10, color: '#BF7648'}}>${sizeBig ? product.size[1].price : product.size[0].price}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)}>
                        <View style={styles.buttonContainer}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Sumar al pedido</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <SuccessModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newOrDetail={'Detail'}
            />
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '70%',
        height: screenHeight * 0.3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        alignSelf: 'center',
        marginTop: 30,
        elevation: 9,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 25
    },
    posterImage: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
        marginBottom: 5
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 5
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BF7648',
        borderRadius: 15,
        width: 250,
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 23,
        elevation: 3,
    },
    sizeButton: {
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../components/CustomHeader';
import { SuccessModal } from '../components/SuccessModal';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({route, navigation}: Props) => {
    
    const movie = route.params;
    const uri = `https://picsum.photos/200/300`;

    const { isLoading, cast, movieFull } = useMovieDetails(movie.id);
    const [modalVisible, setModalVisible] = useState(false);    

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
            <Icon name='star' color="#A3A2A2" size={20}/>
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
            //   navigation.goBack();
           }}
        >
            <Icon name='star-outline' color="#A3A2A2" size={20}/>
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
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.subTitle}>{movie.original_title}</Text>
                </View>
                {
                    isLoading
                        ? <ActivityIndicator size={35} color="grey" style={{marginTop: 20}}/>
                        // : <MovieDetails movieFull={movieFull!} cast={cast}/>
                        : (
                        <View style={{marginHorizontal: 20}}>
                            <View style={{flexDirection: 'row'}}>
                                {/* <Icon
                                    name='star-outline'
                                    color="grey"
                                    size={16}
                                />
                                <Text style={{marginLeft: 5}}>ddd</Text> */}
                                {/* <Text style={{marginLeft: 5}}>
                                    - {movieFull.genres.map(g => g.name).join(', ')}
                                </Text> */}
                            </View>

                            <View style={{backgroundColor: '#D8D8D8', width: '100%', height: 1, alignSelf: 'center', marginTop: 20}}/>

                            <Text style={{fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>
                                Descripcion
                            </Text>

                            <Text style={{fontSize: 16, marginTop: 10}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur est quod culpa laboriosam officia harum debitis quaerat, qui tenetur natus, quae repellendus mollitia ea, porro ut blanditiis nesciunt tempora consequatur.
                            </Text>
                        </View>
                    )
                }

                {/* <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.pop()}
                >
                    <Icon
                        color="white"
                        name='arrow-back-outline'
                        size={60}
                    />
                </TouchableOpacity>  */}

                <View style={{justifyContent:'space-around', flexDirection: 'row', marginVertical: 30, alignItems: 'flex-end'}}>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 20, marginLeft: 5}}>Precio</Text>
                        <Text style={{fontSize: 25, marginTop: 10, color: '#BF7648'}}>$1700</Text>
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
});

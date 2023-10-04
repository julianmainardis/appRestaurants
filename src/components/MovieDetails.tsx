import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditsInterface';
import currencyFormatter from 'currency-formatter';
import { MovieFull } from '../interfaces/movieInterface';
import { CastItem } from './CastItem';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
    return (
        <>
            <View style={{marginHorizontal: 20}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon
                        name='star-outline'
                        color="grey"
                        size={16}
                    />
                    <Text style={{marginLeft: 5}}>{movieFull.vote_average}</Text>
                    {/* <Text style={{marginLeft: 5}}>
                        - {movieFull.genres.map(g => g.name).join(', ')}
                    </Text> */}
                </View>

                <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
                    Descripcion
                </Text>

                <Text style={{fontSize: 16}}>
                    {movieFull.overview}
                </Text>

                <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold'}}>
                    Precio
                </Text>

                <Text style={{fontSize: 16, marginBottom: 10}}>
                    {currencyFormatter.format(movieFull.budget, {code: 'USD'}) }
                </Text>
            </View>
            <View style={{marginTop: 10, marginBottom: 100}}>
                <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}>
                    Actores
                </Text>
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CastItem actor={item}/>}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 10, height: 70}}
                />
                <View style={{width: 200, height: 100, alignSelf: 'center'}}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles.buttonContainer}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>Agregar al pedido</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 23,
        elevation: 3,
    }
});

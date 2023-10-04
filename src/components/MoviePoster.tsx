import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/Navigation';

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

export const MoviePoster = ({movie, height = 120}: Props) => {
    
    const uri = `https://picsum.photos/200/300`;
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', movie)}
            activeOpacity={0.8}
            style={{
                height,
                marginRight: 20,
                marginLeft: 20
            }}
        >
            <View style={styles.container}>
                <View style={{margin: 5}}>
                    <Image source={{ uri }} style={styles.image} />
                </View>
                <View style={{flex:1}}>
                    <View style={{marginLeft: 10, marginTop: 4, marginRight: 5, marginBottom: 5}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{movie.original_title}</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{opacity: 0.7}}>{movie.overview}</Text>
                        <View style={{alignItems: 'flex-end', marginTop: 10, marginRight: 5}}>
                            <Text>${movie.id}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
    },
    image: {
        width: 70,
        height: '100%',
        borderRadius: 10,
    },
});

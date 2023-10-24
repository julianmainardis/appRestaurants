import React, { useContext } from 'react'
import { ActivityIndicator, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useMovies } from '../hooks/useMovies';
import ImageColors from 'react-native-image-colors';
import Carousel from 'react-native-snap-carousel';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { getImageColors } from '../helpers/getColors';
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import CustomHeader from '../components/CustomHeader';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

const {width: windowWitdth, height: windowHeight} =Dimensions.get('window');

type NewOrderScreenNavigationProp = StackNavigationProp<RootStackParams, 'NewOrderScreen'>;

export const HomeScreen = () => {
    
    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NewOrderScreenNavigationProp>();

    const leftAux = (
        <TouchableOpacity
            style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: 50,
                marginLeft: 5
            }}
        >
            {/* <FontAwesome5Icon name="file-pdf" size={25} solid /> */}
            <Text>FOTITO</Text>
        </TouchableOpacity>
    );

    const rightAux = (
        <TouchableOpacity
            onPress={() => navigation.navigate('NewOrderScreen')}
            style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: 50,
                marginRight: 5
            }}
        >
            {/* <FontAwesome5Icon name="file-pdf" size={25} solid /> */}
            <Text>PRESIONA</Text>
        </TouchableOpacity>
    );

    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="red" size={100} />
            </View>
        )
    }

    return (
        <>
        <View>

            <CustomHeader title='APP' rightComponent={rightAux} leftComponent={leftAux}/>

            <FlatList
                data={topRated}
                style={{marginVertical: 20}}
                renderItem={ ({item}: any) => <MoviePoster movie={item}/>}
            />
            {/* <HorizontalSlider title='Popular' movies={popular}/>
            <HorizontalSlider title='Top Rated' movies={topRated}/>
            <HorizontalSlider title='Upcoming' movies={upcoming}/> */}

        </View>
        </>
    )
}

import React, { useContext } from 'react'
import { ActivityIndicator, View, ScrollView, Text } from 'react-native'
import { useMovies } from '../hooks/useMovies';
import ImageColors from 'react-native-image-colors';
import Carousel from 'react-native-snap-carousel';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

const {width: windowWitdth, height: windowHeight} =Dimensions.get('window');

export const HomeScreen = () => {
    
    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const {setMainColors} = useContext(GradientContext)

    const getPosterColors = async(index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        
        const [ primary = 'green', secondary = 'orange' ] = await getImageColors(uri);
        setMainColors({primary, secondary});
    }

    useEffect(() => {
        if(nowPlaying.length > 0) {
            getPosterColors(0);
        }
    }, [nowPlaying])
    

    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="red" size={100} />
            </View>
        )
    }

    return (
        <GradientBackground>
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{fontSize: 30, color: 'white'}}>Productos</Text>
            </View>

            <FlatList
                data={topRated}
                style={{marginVertical: 20}}
                renderItem={ ({item}: any) => <MoviePoster movie={item}/>}
            />
            {/* <HorizontalSlider title='Popular' movies={popular}/>
            <HorizontalSlider title='Top Rated' movies={topRated}/>
            <HorizontalSlider title='Upcoming' movies={upcoming}/> */}
        </GradientBackground>
    )
}

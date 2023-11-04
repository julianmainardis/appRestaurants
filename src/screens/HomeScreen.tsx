import React, { useContext, useRef, useState } from 'react'
import { ActivityIndicator, View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useMovies } from '../hooks/useMovies';
import ImageColors from 'react-native-image-colors';
import Carousel from 'react-native-snap-carousel';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { useEffect } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {width: windowWitdth, height: windowHeight} =Dimensions.get('window');

type NewOrderScreenNavigationProp = StackNavigationProp<RootStackParams, 'NewOrderScreen'>;

export const HomeScreen = () => {
    
    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NewOrderScreenNavigationProp>();
    const [selectedItem, setSelectedItem] = useState(null);
    const flatListRef = useRef(null);

    const data = ['Botón 1', 'Botón 2', 'Botóasdasdasdasdn 3', 'asdasdasdasd 3', 'asadasdasdasd 3', 'ds 3'];

    const renderItem = ({ item }) => (
        <TouchableOpacity
        style={[
            styles.button,
            { backgroundColor: selectedItem === item ? '#BF7648' : 'white' },
        ]}
        onPress={() => setSelectedItem(item)}
        >
            <Text style={{textAlign: 'center', color: selectedItem === item ? 'white' : '#BF7648' }}>{item}</Text>
        </TouchableOpacity>
    );

    const scrollToSelectedItem = () => {
        const index = data.indexOf(selectedItem);
        if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };

    // Llama a scrollToSelectedItem cada vez que selectedItem cambia
    useEffect(() => {
        scrollToSelectedItem();
    }, [selectedItem]);

    const leftAux = (
        <TouchableOpacity
            style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: 50,
                marginLeft: 5
            }}
        >
            <Text style={{color:'#A3A2A2'}}>FOTITO</Text>
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
            <Text style={{color:'#A3A2A2'}}>PRESIONA</Text>
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
        <View style={{backgroundColor: '#F7F7F7'}}>
            <CustomHeader title='APP' rightComponent={rightAux} leftComponent={leftAux}/>

            <View style={styles.searcher}>
                <View style={{alignSelf: 'center', justifyContent: 'flex-start', marginLeft: 20}}>
                    <Text style={{color: '#F7F7F7'}}>LUPA</Text>
                </View>
                <View style={{marginLeft: 20, alignSelf: 'center', justifyContent: 'flex-start', flex: 1}}>
                    <TextInput placeholder='Buscar'/>
                </View>
                {/* <View style={{height: 40, width: 50, backgroundColor: '#BF7648', alignSelf: 'center', borderRadius: 15, justifyContent: 'flex-end'}}>
                    <TouchableOpacity>

                    </TouchableOpacity>
                </View> */}
            </View>

            <FlatList 
                horizontal={true}
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                data={data}
                style={{marginHorizontal: 15}}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedItem}
                contentContainerStyle={{
                    paddingLeft: selectedItem ? windowWitdth / 2 : 0,
                    paddingRight: windowWitdth / 2,
                }}
            />

            <FlatList
                data={topRated}
                style={{marginVertical: 20}}
                renderItem={ ({item}: any) => <MoviePoster movie={item}/>}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    searcher: {
        height: 55,
        backgroundColor: '#EDEDED',
        margin: 20,
        borderRadius: 15,
        flexDirection: 'row',
    },
    category: {
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    button: {
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
});    

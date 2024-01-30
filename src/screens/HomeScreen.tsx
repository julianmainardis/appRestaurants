import React, { useRef, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProductPoster } from '../components/ProductPoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { useEffect } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const {width: windowWitdth, height: windowHeight} =Dimensions.get('window');

type NewOrderScreenNavigationProp = StackNavigationProp<RootStackParams, 'NewOrderScreen'>;

export const HomeScreen = () => {
    
    //const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const {isLoading, products} = useProducts();
    const {categories} = useCategories();
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NewOrderScreenNavigationProp>();
    const [selectedItem, setSelectedItem] = useState(null);
    const flatListRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
        style={[
            styles.button,
            { backgroundColor: selectedItem === item ? '#BF7648' : 'white' },
        ]}
        onPress={() => setSelectedItem(item)}
        >
            <Text style={{textAlign: 'center', color: selectedItem === item ? 'white' : '#BF7648' }}>{item.categoryName}</Text>
        </TouchableOpacity>
    );

    const scrollToSelectedItem = () => {
        const index = categories.indexOf(selectedItem);
        if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };

    useEffect(() => {
        scrollToSelectedItem();
    }, [selectedItem]);

    const onSearchTermChange = (text) => {
        setSearchTerm(text);
        setSelectedItem(null); // Limpiar el ítem seleccionado cuando cambia el término de búsqueda
    };

    const leftAux = (
        <TouchableOpacity
            style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: 50,
                marginLeft: 5
            }}
        >
            <MaterialCommunityIcons
                name='calendar-remove'
                size={50}
                color='#A3A2A2'
            />
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
            <MaterialCommunityIcons
                name='camera'
                size={40}
                color='#A3A2A2'
            />
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
                    <MaterialCommunityIcons
                        name='camera'
                        size={40}
                        color='#F7F7F7'
                    />
                </View>
                <View style={{marginLeft: 20, alignSelf: 'center', justifyContent: 'flex-start', flex: 1}}>
                    <TextInput
                        placeholder='Buscar'
                        value={searchTerm}
                        onChangeText={onSearchTermChange}
                    />
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
                data={categories}
                style={{marginHorizontal: 15}}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedItem}
                contentContainerStyle={{
                    paddingLeft: selectedItem ? windowWitdth / 2 : 0,
                    paddingRight: windowWitdth / 2,
                }}
            />

            {/* <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <TouchableOpacity 
                    style={{borderWidth: 1, padding: 5}}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{borderWidth: 1, padding: 5}}
                    onPress={() => navigation.navigate('KitchenHomeScreen')} 
                >
                    <Text>COCINA</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{borderWidth: 1, padding: 5}}
                    onPress={() => navigation.navigate('ManagerHomeScreen')}    
                >
                    <Text>CAJERO</Text>
                </TouchableOpacity>
            </View> */}

            <FlatList
                data={filteredProducts}
                style={{marginVertical: 15}}
                renderItem={ ({item}: any) => <ProductPoster product={item}/>}
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

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/Navigation';
import { Product } from '../interfaces/productsInterface';

interface Props {
    product: Product;
    height?: number;
    width?: number;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

export const ProductPoster = ({product, height = 120}: Props) => {
    
    const uri = `https://picsum.photos/200/300`;
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [amount, setAmount] = useState(0);

    const decrement = () => {
        if(amount - 1 >= 0)
        {
            setAmount(amount - 1);
        }
    };

    const increment = () => {
        setAmount(amount + 1);
    };

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', product)}
            activeOpacity={0.8}
            style={{
                height,
                marginHorizontal: 20
            }}
        >
            <View style={styles.container}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{marginLeft: 10, marginTop: 4, marginRight: 5, marginBottom: 5}}>
                        <Text numberOfLines={1} style={{fontSize: 18, fontWeight: 'bold', marginVertical: 5}}>{product.name}</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{opacity: 0.7}}>{product.description}</Text>
                        <View style={{marginVertical: 5, marginRight: 5}}>
                            {/* <Text>$ {product.size.length > 1 ? product.size[1].price : product.size[0].price}</Text> */}
                            <Text>$ {product.size[0].price}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    { amount > 0  && (
                        <View>
                            <TouchableOpacity activeOpacity={0.7} onPress={decrement} style={styles.button}>
                                <Text style={{fontSize: 30}}>-</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18}}>{amount}</Text>
                        </View>
                    )}
                    <TouchableOpacity activeOpacity={0.7} onPress={increment} style={styles.button}>
                        <Text style={{fontSize: 30}}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={{margin: 5}}>
                    <Image source={{ uri }} style={styles.image} />
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
        shadowRadius: 23,
        elevation: 3,
    },
    image: {
        width: 70,
        height: '100%',
        borderRadius: 10,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#BF7648',
        borderRadius: 20,
    }
});

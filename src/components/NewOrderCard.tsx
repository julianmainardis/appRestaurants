import { StyleSheet, View } from "react-native"
import { Image, Text } from "react-native-elements";
import { Movie } from "../interfaces/movieInterface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

export const NewOrderCard = ({movie, height = 120}: Props) => {

    const uri = `https://picsum.photos/200/300`;
    
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
        <View style={styles.container}>
            <View style={{margin: 5, justifyContent: 'center'}}>
                <Image source={{ uri }} style={styles.image} />
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
                <View style={{marginLeft: 10, marginTop: 4, marginRight: 5, marginBottom: 5}}>
                    <Text numberOfLines={1} style={{fontSize: 18, fontWeight: 'bold'}}>{movie.original_title}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{opacity: 0.7}}>{movie.overview}</Text>
                    {/* <View style={{alignItems: 'flex-end', marginTop: 10, marginRight: 5}}>
                        <Text>$ {movie.id}</Text>
                    </View> */}
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={decrement} style={{marginRight: 10}}>
                    <Text style={{fontSize: 30}}>-</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 18}}>{amount}</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={increment} style={{marginLeft: 10}}>
                    <Text style={{fontSize: 30}}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row',
        flex: 1,
        marginVertical: 10
    },
    image: {
        width: 60,
        marginLeft: 10,
        height: 60,
        borderRadius: 10,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        flexDirection: 'row'
    }
});

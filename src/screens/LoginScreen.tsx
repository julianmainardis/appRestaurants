import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const LoginScreen = ({route, navigation}: Props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleForgotPassword = () => {
        // Implementa la lógica para restablecer la contraseña aquí
        console.log('Olvidaste la contraseña');
    };

    const handleLogin = () => {
        // Implementa la lógica de autenticación aquí
        console.log(`Usuario: ${username}, Contraseña: ${password}`);
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity activeOpacity={0.7} style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordLink}>¿Olvidaste la contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿No tenes una cuenta?</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.registerLink}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 16,
        color: '#000',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#BF7648',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    forgotPasswordLink: {
        color: '#000',
        textDecorationLine: 'underline',
        marginTop: 16,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    registerText: {
        color: '#000',
        marginRight: 8,
    },
    registerLink: {
        color: '#000',
        textDecorationLine: 'underline',
    },
});

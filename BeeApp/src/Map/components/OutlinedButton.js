import React from 'react';
import { Pressable, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function OutlinedButton({ onPress, icon, children, image, imageStyle }) {
    return (
        <Pressable 
            style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
            onPress={onPress}
        >
            {image ? (
                <Image source={image} style={[styles.iconImage, imageStyle]} />
            ) : (
                <Ionicons name={icon} size={18} color={'white'} />
            )}
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        backgroundColor: '#EBBC4E',
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    iconImage: {
        width: 18,
        height: 18,
        marginRight: 6,
    },
    text: {
        color: '#ffffff',
    },
});

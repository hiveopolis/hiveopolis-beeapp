import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'


function OutlinedButton ({ onPress, icon, children}) {
    return (
        <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
        onPress={onPress}
        >
            <Ionicons style={styles.icon} name={icon} size={18} color={'white'} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBBC4E',
    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: '#ffffff'
    }
});
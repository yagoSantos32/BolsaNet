import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './button.style.js';

function Button(props) {
    return <View style={styles.boxBtn}>
        <TouchableOpacity style={[styles.btn, props.custom]} onPress={props.onPress}>

            <Text style={styles.text}>{props.txt}</Text>

        </TouchableOpacity>

    </View>


}

export default Button;

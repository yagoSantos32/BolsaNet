import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './button.style.js';

function Button(props) {
    return <View style={styles.boxBtn}>
        <TouchableOpacity style={[styles.btn, props.isLoading ? styles.loading : "", props.custom ? styles.custom : ""]}
            disabled={props.isLoading}
            onPress={props.onPress}>
                {
                    props.isLoading?<ActivityIndicator color={"#f9f9f9"} size={42}/>:<Text style={styles.text}>{props.txt}</Text>
                }

            

        </TouchableOpacity>

    </View>


}

export default Button;

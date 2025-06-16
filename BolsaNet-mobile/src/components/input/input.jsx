import { Text, TextInput } from "react-native";
import { styles } from './input.style.js'

function Input(props) {
    return <>

        {props.label && <Text style={styles.label}>{props.label}</Text>}
        <TextInput style={styles.input}
            secureTextEntry={props.password}
            onChangeText={(text) => props.onChangeText(text)}
            value={props.value}
        />

    </>
}

export default Input;
import { Text, TextInput } from 'react-native';
import { styles } from './input.style.js'




function Input(props) {

    return <>

        {props.label && <Text style={styles.label}>{props.label}</Text>}
        <TextInput style={styles.input}
            showSoftInputOnFocus={props.showKeyboard}
            secureTextEntry={props.isPassword}
            onChangeText={(text) => props.onChangeText(text)}
            value={props.value}
            placeholder={props.placeholder}
            multiline={props.multiline}
            autoFocus={props.autoFocus}
            onPress={props.onPress}


        />

    </>
}

export default Input;
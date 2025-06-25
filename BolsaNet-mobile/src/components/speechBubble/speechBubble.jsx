import { View, Text } from "react-native";
import { styles } from "./speechBubble.style.js";
import Logo from "../logo/logo.jsx";

function Bubble(props) {
    return <View style={styles.container(props.sent)}>

        <View style={styles.box(props.sent)}>

            <Text numberOfLines={props.lines} style={styles.text}>{props.message}</Text>
            <View >
                <Logo small='true' />
            </View>

        </View>


    </View>

}



export default Bubble;
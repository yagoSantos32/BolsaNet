import { ScrollView, View } from "react-native";
import Bubble from "../../components/speechBubble/speechBubble.jsx";
import sharedStyles from '../../constants/sharedStyles.js';
import { styles } from "./support.style.js";

function Support() {

    return (
        <View style={[sharedStyles.container, styles.container]}>
            <ScrollView>


                <Bubble sent={0} message="diga-me como posso te ajudar" />
                <Bubble sent={1} message="minha internet esta com problema de conexão..." />


            </ScrollView>
        </View>
    )
}

export default Support;
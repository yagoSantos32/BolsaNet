import { View, Text } from "react-native";
import { styles } from "./bubble.style.js";
import Logo from "../logo/logo.jsx";

function Bubble() {
    return <View style={[styles.container, { borderTopRightRadius: 0, }]}>
        <View style={styles.box}>
            <View style={styles.ProfileIcon}>
                <Logo small='true' />
            </View>

            <Text numberOfLines={1} style={styles.text}>A data para renovar BolsaNet está proxima!!!</Text>

        </View>

    </View>

}

export default Bubble;
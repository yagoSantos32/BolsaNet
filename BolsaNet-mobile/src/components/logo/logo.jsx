import { Image, Text, View } from 'react-native';
import icons from '../../Constants/icons.js';
import { styles } from './logo.style.js';


function Logo(props) {
    return <View style={styles.container(props.direction)}>
        <Image style={styles.logo(props.small)} source={icons.logo} />
        {
            props.description && <Text style={styles.title}>{props.description}</Text>
        }

        {/* se tiver description, renderiza o texto,
        se props.small for = True, renderiza o estilo logosm caso contrario, renderiza o estilo logo */}

    </View>
}

export default Logo;
import { View, Text, Image } from 'react-native';
import { styles } from './speechBubble.style.js';
import icons from '../../Constants/icons.js';
import Logo from '../Logo/Logo.jsx';

function getIconForAverage(avg) {
    if (avg >= 7) return (icons.goodAverageIcon);
    else if (avg >= 6) return (icons.neutralAverageIcon);
    else return (icons.badAverageIcon);
}

function SpeechBubble(props) {
    const renderBubble = (msg, avg) => (
        <View style={[styles.box(props.sent),{margin:6}]}>

            <Text numberOfLines={props.lines} style={styles.text}>{msg}</Text>
            <View >
                <Image
                    source={getIconForAverage(avg)}
                    style={{
                        width: 20,
                        height:20,

                    }}


                />
            </View>

        </View>

    );
    if (props.isGradeAverage) {
        return (
            <View style={styles.container(props.sent)}>
                {renderBubble(props.recentMessage, props.recentAverage)}
                {renderBubble(props.previousMessage, props.previousAverage)}
            </View>
        );
    }
    return <View style={styles.container(props.sent)}>
        <View style={styles.box(props.sent)}>
            <Text numberOfLines={props.lines} style={styles.text}>
                {props.message}
            </Text>
            {props.sent != 1 &&  <View>
                <Logo small='true' />
            </View>}
           
        </View>
    </View>

}



export default SpeechBubble;
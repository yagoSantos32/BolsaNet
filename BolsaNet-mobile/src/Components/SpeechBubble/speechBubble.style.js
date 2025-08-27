
import { colors, font_size } from '../../Constants/theme'

export const styles = {
    container: (sent) => ({
        alignSelf: sent ? 'flex-end' : 'flex-start',
        maxWidth: '90%',
        padding: 20,
        margin: 5,
        borderRadius: 30,
        backgroundColor: sent ? colors.bubbleSent : colors.bubbleReceived,
        overflow: 'hidden',
        ...(sent ? { borderTopRightRadius: 0 } : { borderTopLeftRadius: 0 }

        )

    }),
    box: (sent) => ({

        justifyContent: 'center',
        flexDirection: sent ? 'row' : 'row-reverse',
    }),



    text: {
        overflow: 'hidden',
        margin: 5,
        fontSize: font_size.xsm,

  
    }






}
import { colors, font_size } from "../../constants/theme.js";

export const styles = {
    container: (dir) => ({
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: dir,




    }),
    logo: (small) => ({
        ...(small ? {
          
            width: 35,
            height: 40,
        } : {
            width: 110,
            height: 130,
        })


    }),
    title: {
        color: colors.text_base,
        fontSize: font_size.md,
        margin: 15,
        textAlign: 'center',
    }
}
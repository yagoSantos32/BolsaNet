import { colors, font_size } from "../../constants/theme.js";

export const styles = {
    container: (dir) => ({
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: dir,




    }),
    logo: {
        width: 110,
        height: 130,

    },
    logoSm: {
        width: 35,
        height: 40,

    },
    title: {
        color: colors.text_base,
        fontSize: font_size.md,
        margin: 20,
        textAlign: 'center',
    }
}
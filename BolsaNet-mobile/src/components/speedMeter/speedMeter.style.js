import { colors, font_size } from '../../Constants/theme';


export const styles = {
  text: {
    fontSize: font_size.lg,
    yOffset: 100, // quanto o texto sobe
    color: colors.black,
  },
  arc: {
    backgroundColor: colors.second, // cor do fundo do arco
    progressColor: colors.primary,    // cor da parte preenchida
    pointerColor: colors.text_base,
  }
};


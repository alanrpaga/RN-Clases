import { StyleSheet } from "react-native";
import { sizes } from "../features/theme/theme";

const sharedStyles = StyleSheet.create({
  //SECCIÓN NAVEGACIÓN
  drawer: {
    marginBottom: "24%",
    marginTop: "12%",
    width: "60%",
  },

  tabBar: {
    borderTopWidth: 0,
  },
  ////

  //SECCIÓN BUTONES
  buttonBorderless: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: sizes.ul,
    height: 48,
    justifyContent: "center",
    marginBottom: sizes.md,
    marginTop: sizes.xs,
    width: "40%",
  },

  buttonBorderlessTiny: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: sizes.ul,
    height: 24,
    justifyContent: "center",
    width: "10%",
  },

  buttonBorder: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: sizes.ul,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    marginBottom: sizes.md,
    marginTop: sizes.xs,
    width: "40%",
  },

  buttonBorderTiny: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: sizes.ul,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    width: "20%",
    marginRight: sizes.xs,
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: sizes.md,
    textAlign: "center",
  },

  buttonBigText: {
    fontWeight: "bold",
    fontSize: sizes.ul,
    textAlign: "center",
  },

  buttonThemeBorder: {
    alignSelf: "flex-end",
    alignItems: "center",
    borderRadius: sizes.ul,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    margin: sizes.xs,
    width: 48,
  },

  buttonThemeText: {
    fontWeight: "bold",
    fontSize: sizes.lg,
    textAlign: "center",
  },
  ////

  //SECCIÓN INPUTS
  inputCard: {
    borderRadius: sizes.md,
    gap: sizes.xs,
    padding: sizes.xs,
  },

  inputPicker: {
    borderRadius: sizes.md,
    gap: sizes.xs,
    padding: sizes.xs,
  },

  inputText: {
    alignSelf: "center",
    borderRadius: sizes.xs,
    borderWidth: 1,
    fontSize: sizes.md,
    height: 48,
    paddingHorizontal: sizes.sm,
    width: "60%",
  },

  picker: {
    borderRadius: sizes.sm,
    borderWidth: 1,
    overflow: "hidden", // Clave para evitar bordes raros
    justifyContent: "center",
    height: 48,
  },
  ////

  //SECCIÓN DE ITEMS
  itemBody: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    gap: sizes.sm,
    padding: sizes.md,
    width: "90%",
  },

  itemText: {
    fontSize: sizes.md,
  },

  itemIcon: {
    fontSize: sizes.lg,
  },

  itemSubTitle: {
    fontSize: sizes.md,
    fontWeight: "bold",
  },

  itemTitle: {
    fontSize: sizes.lg,
    fontWeight: "bold",
  },

  itemTextDone: {
    textDecorationLine: "line-through",
  },

  itemContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: sizes.sm,
  },
  ////

  //SECCIÓN PARA CUERPOS VARIOS

  fullSize: {
    height: "100%",
    width: "100%",
  },

  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: sizes.md,
  },

  wrapper: {
    maxWidth: 400,
    width: "100%",
  },

  buttons: {
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: sizes.md,
    marginTop: sizes.md,
  },

  flexed: {
    flex: 1,
  },

  flexedGrow: {
    flexGrow: 1,
  },

  padded: {
    padding: sizes.sm,
  },
  ////

  //SECCIÓN PARA TEXTOS VARIOS
  logo: {
    fontSize: sizes.logo,
    fontWeight: "bold",
    marginTop: sizes.ul,
    textAlign: "center",
    textShadowRadius: sizes.md,
  },

  title: {
    fontSize: sizes.sl,
    fontWeight: "bold",
    marginBottom: sizes.xs,
    textAlign: "center",
  },

  subtitle: {
    fontSize: sizes.xl,
    marginBottom: sizes.xs,
    textAlign: "center",
  },

  bodyTitle: {
    fontSize: sizes.lg,
    marginBottom: sizes.xs,
    textAlign: "center",
  },

  bodyText: {
    fontSize: sizes.md,
  },

  secretText: {
    fontSize: sizes.xs,
  },

  bodyCentredText: {
    fontSize: sizes.md,
    textAlign: "center",
  },

  ////

  //SECCIÓN
  //OFFLINE o ERROR FIREBASE
  fbOfflineText: {
    fontSize: sizes.md,
    textAlign: "center",
  },

  fbErrorText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  ////
});

export default sharedStyles;

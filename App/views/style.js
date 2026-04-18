import { StyleSheet } from "react-native";

const Root = StyleSheet.create({
    colors: {
        backgroundColor: '',
        RecipeItems: '',
        tittle: '',
        subtittle: '',
    },
    fontsize: {
        small: '5',
        medium: '15',
        large: '25',
    },
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    fontSize: Root.fontsize.medium,
    gap: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default styles;
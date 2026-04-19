import { StyleSheet } from "react-native";

const Root = StyleSheet.create({
    colors: {
        backgroundColor: '#ffa',
        topMenu: '#606D76',
        RecipeItems: '#A9B4BC',
        tittle: 'black',
        subtittle: 'grey',
    },
    fontsize: {
        small: '5vw',
        medium: '15vw',
        large: '25vw',
    },
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Root.colors.backgroundColor,
    alignItems: 'baseline',
  },
  menu: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    
    backgroundColor: Root.colors.RecipeItems,
    
    fontSize: Root.fontsize.medium,
    
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuContext: {
    flexDirection: 'row',
    gap: 10,
  },
  groupName: {
    fontSize: Root.fontsize.small,
  }

});

export default styles;
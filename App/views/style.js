import { StyleSheet } from "react-native";

const Root = StyleSheet.create({
    colors: {
        backgroundColor: '#FFF8F0',
        topMenu: '#606D76',
        RecipeItems: '#A9B4BC',
        tittle: 'orange',
        subtittle: 'grey',
        cards:'white',
        text:'#8B5E3C',
        button:'#E67E22',
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
import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/categories"; 



function CategoriesScreen({ navigation }) 
{
    function renderCategoryItem(itemData) {
        function pressHandler() {
            navigation.navigate('WeatherScreen', {
                categoryId: itemData.item.id,
            });
        }
    
        return (
          <CategoryGridTile title={itemData.item.title} color={itemData.item.color} icon={itemData.item.icon} onPress={pressHandler}/>
        );
    }
    return (
      <FlatList data={CATEGORIES} keyExtractor={(item) => item.id} renderItem={renderCategoryItem} numColumns={2} />
    );
}

export default CategoriesScreen;
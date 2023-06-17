import PlaceForm from "../components/PlaceForm";
import { insertPlace } from "../database";

function AddPlace({navigation}) {
    async function createPlaceHandler(place) {
        await insertPlace(place);
        navigation.navigate('AllPlaces')
    }
    return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
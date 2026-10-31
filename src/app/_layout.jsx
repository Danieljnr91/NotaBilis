import { Slot } from "expo-router";
import { View } from 'react-native';
import BottomNavigation from "../components/BottomNav";

const RootLayout = () => {
    return(
        <View style={{flex:1}}>
            <Slot />
            <BottomNavigation />

        </View>
    )

}

export default RootLayout;
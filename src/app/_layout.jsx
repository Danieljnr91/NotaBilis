import { Slot, usePathname } from "expo-router";
import { View } from 'react-native';
import BottomNavigation from "../components/BottomNav";
import SideNav from "../components/SideNav";
import { NotesProvider } from "../context/NotesContext";
import { SideNavProvider } from "../context/SideNavContext";
import { TodoProvider } from "../context/TodoContext";

const RootLayout = () => {
    const pathname = usePathname();
    const showBottomNav = pathname !== '/newNote';

    return (
        <NotesProvider>
            <TodoProvider>
                <SideNavProvider>
                    <View style={{ flex: 1 }}>
                        <Slot />
                        {showBottomNav && <BottomNavigation />}
                        <SideNav />
                    </View>
                </SideNavProvider>
            </TodoProvider>
        </NotesProvider>
    )
}

export default RootLayout;

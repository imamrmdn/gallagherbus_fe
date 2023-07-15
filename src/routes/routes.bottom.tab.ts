import { HomeScreen } from "../screens/home/home_screen";
import { InfoScreen } from "../screens/info/info_screen";
import { ProfileScreen } from "../screens/profile/profile_screen";

//
export const routesBottomTabs = [
    {
        id: 0,
        name: "Home",
        component: HomeScreen,
        tabBarLabel: 'home',
        iconName: 'home'
    },
    {
        id: 1,
        name: "Info/Berita Umum",
        component: InfoScreen,
        tabBarLabel: 'info',
        iconName: 'book'
    },
    {
        id: 2,
        name: "Profile",
        component: ProfileScreen,
        tabBarLabel: 'profile',
        iconName: 'account'
    }
]
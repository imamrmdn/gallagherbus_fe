import { SignInScreen } from "../screens/sign_in/sign_in_screen";
import { SignUpScreen } from "../screens/sign_up/sign_up_screen";

//
export const routesAuth = [
    {
        id: 0,
        name: "SignIn",
        component: SignInScreen
    },
    {
        id: 1,
        name: "SignUp",
        component: SignUpScreen
    }
]
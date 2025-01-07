// Pages
import Home from "@pages/Home/Home";
import Menu from "@pages/Menu/Menu";
import Services from "@pages/Services/Services";
import About from "@pages/About/About";
import Reservations from "@pages/Reservations/Reservations";
import Partners from "@pages/Partners/Partners";

export type NavItem = {
    name?: string;
    icon?: string;
    target: string;
    component: JSX.Element;
    isNewTab?: boolean;
    isActive?: boolean;
}

const navbar: NavItem[] = [
    {
        name: 'Home',
        target: '/',
        component: <Home />
    },
    {
        name: 'Menu',
        target: '/menu',
        component: <Menu />
    },
    {
        name: 'Services',
        target: '/services',
        component: <Services />
    },
    {
        name: 'About',
        target: '/about',
        component: <About />
    },
    {
        name: 'Partners',
        target: '/partners',
        component: <Partners />
    },
    {
        name: 'Reservations',
        target: '/reservations',
        component: <Reservations />
    },
]

export default navbar;
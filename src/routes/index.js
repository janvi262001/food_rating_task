import Login from "../pages/LoginForm";
import Poll from "../pages/Poll";
import Results from "../pages/Results";
import AdminPanel from "../pages/AdminPanel";

const routes = [
    {
        path : '/login',
        component: Login ,
        isProtected: false,
    },
    {
        path: "/",
        component: Poll,
        isProtected:true
    },
    {
        path:"/results",
        component: Results,
        isProtected:true
    },
    {
        path:"/admin",
        component: AdminPanel,
        isProtected:true
    }
]

export default routes;
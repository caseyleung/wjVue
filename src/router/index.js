import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from "@/components/Home";
import Registration from "@/components/Registration";
import AdminIndex from "@/components/admin/AdminIndex";
import Dashboard from "@/components/admin/dashboard/admin/Dashboard";
import LibraryIndex from "@/components/library/LibraryIndex";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Default',
            redirect: '/home',
            component: Home
        },
        {
            path: '/register',
            name: 'Register',
            component: Registration
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminIndex,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/admin/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: AppIndex,
                },
                {
                    path: '/library',
                    name: 'Library',
                    component: LibraryIndex,
                },
            ]
        }
    ]
})

// 用于创建默认路由
// export const createRouter = () => new Router({
//     mode: 'history',
//     routes: [
//         {
//             path: '/',
//             name: 'Default',
//             redirect: '/home',
//             component: Home
//         },
//         {
//             path: '/home',
//             name: 'Home',
//             component: Home,
//             redirect: '/index',
//             children: [
//                 {
//                     path: '/index',
//                     name: 'AppIndex',
//                     component: AppIndex
//                 },
//                 {
//                     path: '/library',
//                     name: 'Library',
//                     component: LibraryIndex
//                 }
//             ]
//         },
//         {
//             path: '/login',
//             name: 'Login',
//             component: Login
//         },
//         {
//             path: '/register',
//             name: 'Register',
//             component: Registration
//         },
//         {
//             path: '/admin',
//             name: 'Admin',
//             component: AdminIndex,
//             meta: {
//                 requireAuth: true
//             },
//             children: [
//                 {
//                     path: '/admin/dashboard',
//                     name: 'dashboard',
//                     component: Dashboard,
//                     meta: {
//                         requireAuth: true
//                     }
//                 }
//             ]
//         }
//     ]
// })



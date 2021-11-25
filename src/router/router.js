import Main from "../pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostId from "@/pages/PostId";
import PostPageWithStore from "../pages/PostPageWithStore";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/contacts',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostId
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})


export default router
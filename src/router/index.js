import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Rank from '../components/rank/Rank.vue'
import Singer from '../components/singer/Singer.vue'
import Recommend from '../components/recommend/Recommend.vue'
import Search from '../components/search/Search.vue'
import SingerDetail from '../components/singer-detail/SingerDetail.vue'

const routes = [
    {path:'/',redirect:'/recommend'},
    {path:'/recommend',component:Recommend},
    {path:'/rank',component:Rank},
    {path:'/singer',
    component:Singer,
    children:[
        {
            path:':id',
            component:()=>import('../components/singer-detail/SingerDetail.vue')
        }
    ]
},
    {path:'/search',component:Search},

]

export default new VueRouter({
    routes
})
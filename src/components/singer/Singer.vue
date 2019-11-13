<template>
    <div class="singer">
        <Listview @select="selectSinger" :list='singers' v-if="singers.length"></Listview>
       <router-view></router-view>
    </div>
</template>

<script>

import Listview from '../../base/listview/Listview'
import {url,params,callback,ERR_OK} from '../../api/getSingerList'
import Singer from '../../common/js/singer'
import {mapMutations} from 'vuex'

const HOT_NAME = "热门"

const HOT_LENGTH = 10

export default {
    name:'Singer',
    data(){
        return{
            singers:[]
        }
    },
    methods:{
        getSingerList(){
            this.$http.jsonp(url,{
                params,
                'jsonp':callback
            }).then((res)=>{
                // console.log(res.data);
                this.singers = this._normallizeSinger(res.data.data.list)
                // console.log(this.singers);
                
            })
        },
        _normallizeSinger(list){
            let map = {
                hot:{
                    title:HOT_NAME,
                    items:[]
                },
                // X:{
                //     title:'X',
                //     items:[
                //         {
                //             id,
                //             name,
                //             avatar
                //         }
                //     ]
                // }
            }

            list.forEach((item,index)=>{
                if(index<HOT_LENGTH){
                    map.hot.items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }))
                }

                const key = item.Findex
                if(!map[key]){
                     map[key]= {
                         title:key,
                         items:[]
                     }
                }
                map[key].items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                }))
            })
            let hot = [];
            let ret = [];
            for(var key in map){
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
                }else if(val.title == HOT_NAME){
                    hot.push(val )
                }
            }
            //排序
            ret.sort((a,b)=>{
                return a.title.charCodeAt(0)-b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        selectSinger(singer){
            this.$router.push({
                path:`/singer/${singer.id}`
            })
            this.setsinger(singer)
            console.log(this.$store.state.singer);
            
        },
        ...mapMutations({'setsinger':'SET_SINGER'})
    },
    created(){
        this.getSingerList()
    },
    components:{
        Listview
    }
}
</script>

<style lang='stylus'>
   .singer
        position: fixed
        top:88px
        bottom:0
        width:100%


</style>
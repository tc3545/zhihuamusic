<template>
    <div class="recommend">
        <Scroll class="recommend-content" :data='dissList'>
            <div>
            <div class="slider-warpper">
                <Slider v-if='recommends.length' :loop='true' :autoplay='true'>
                  <div v-for='item in recommends' :key='item.id'>
                     <a :href="item.linkUrl">
                        <img :src="item.picUrl" alt="">
                     </a>
                  </div>
                </Slider>
            </div>
            <div class="recommend-list"> 
            <h1 class="list-title">热门歌单列表</h1>
              <ul>
                <li v-for="item in dissList" :key="item.id" class="item" >
                    <div class="icon">
                        <img v-lazy="item.imgurl" width="60" height="60" alt="">
                    </div>
                    <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                    </div>
                </li>
              </ul>
            </div>
            </div>
            <div class="loadingcontainer" v-show="!dissList.length">
            <Loading></Loading>
            </div>
        </Scroll>
        
        
    </div>
</template> 

<script>
import axios from 'axios'
import Slider from '../../base/slider/Slider'
import Scroll from '../../base/scroll/Scroll'
import Loading from '../../base/loading/Loading'
import {url,params,callback,ERR_OK} from '../../api/getrecommend'
import {url as dissListUrl} from '../../api/getDissList'
export default {
    name:'Recommend',
    data(){
        return{
            recommends:[],
            dissList:[]
        }
    },
    methods:{
        getRecommends(){
        //   console.log(this.$http);
        this.$http.jsonp(url,{
            params:params,
            "jsonp":callback,

        }).then(res=>{
            if(res.body.code ==ERR_OK){
               this.recommends = res.body.data.slider
            }
            this.getDissList();
        })
            
        },
        //获取歌单列表数据
            getDissList(){
                axios(dissListUrl).then(res=>{
                    this.dissList = res.data.data.list
                    // console.log(this.dissList);
                    
                })
            },
           
    },
    created(){
        this.getRecommends();
        
        
    },
    components:{
        Slider,
        Scroll,
        Loading
    }
}
</script>

<style lang='stylus'>
@import "~@/common/stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loadingcontainer
                position :absolute
                width: 100%
                top: 50%;
                transform: translateY(-50%)
    

</style>
<template>
    <transition name="slide">
        <MusicList v-if="songs" :songs='songs' :title="title" :bgImage="bgImage"></MusicList>
    </transition>
</template>

<script>
import MusicList from '../music-list/MusicList'
import {url,params,ERR_OK,callback} from '../../api/getSingerDetail'
import createSong from '../../common/js/song'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            songs:[]
        }
    },
    name:'SingerDetail',
    computed:{
        ...mapGetters(['getSinger']),
        title(){
            return this.getSinger.name
        },
        bgImage(){
            return this.getSinger.avatar
        }
    },
    methods:{
          _getDetail(){
              let singermid = this.getSinger.id
            //  let singermid = this.$route.params.id;
            if(!singermid){
                this.$router.push('/singer')
            }
             this.$http.jsonp(url,{
                 params:{...params,singermid},
                 "jsonp":callback,

             }).then(res=>{
                 if(res.data.code == ERR_OK){
                    this.songs = this._normalizeSongs(res.data.data.list)
                 }
                 
                 
                 
             })
          },
          _normalizeSongs(list){
              let ret = []
              list.forEach(item=>{
                  let {musicData} = item
                if(musicData.songmid&&musicData.albummid){
                    ret.push(createSong(musicData))
                }

              })
              return ret
          }
    },
    created(){
         this._getDetail()
    },
    

    components:{
        MusicList
    }
}
</script>

<style scoped lang='stylus'>
@import '../../common/stylus/variable'
.slide-enter-active,.slide-leave-active
   transition:all .3s
.slide-enter,.slide-leave-to
   transform:translate3d(100%,0,0)  

   
</style>
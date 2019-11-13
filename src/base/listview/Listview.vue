<template>
    <Scroll class="listview" 
    :listenScroll='true'
    @scroll='scroll'
    ref="listview">
        <ul>
            <li ref="listGroup" v-for="group in list" class="list-group" :key="group.id">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" :key="item.id">
                        <img v-lazy="item.avatar" alt="" class="avatar">
                        <span class="name" v-html="item.name"></span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
              <ul>
                  <li 
                  :class="['item',{'current':index==currentIndex}]" 
                  v-for="(item,index) in shortcutList" 
                  :key="index"
                  @touchstart='onshortcutTouchStart'
                  @touchmove.stop.prevent='onshortcutTouchMove'
                  :data-index='index'>
                      {{item}}
                  </li>
              </ul>
        </div>
        <div class="list-fixed" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
    </Scroll>
</template>

<script>
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT =30
import Scroll from '../scroll/Scroll'
export default {
    name:'Listview',
    data(){
        return{
            scrollY:0,
            currentIndex:0,
            diff:0
        }
    },
    props:{
        list:{
            type:Array,
            default:null
        }
    },
    computed:{
        shortcutList(){
            return this.list.map((group)=>{
                return group.title.substr(0,1)
            })
        },
        fixedTitle(){
            if(this.scrollY>0){
                return ''
            }
            return this.list[this.currentIndex]?this.list[this.currentIndex].title : ''
        }

    },
    methods:{
         scroll(pos){
             this.scrollY = pos.y
             
         },
         _calculateHeight(){
             this.listHeight=[];
                const list = this.$refs.listGroup;//所有区间的dom集合
                let height = 0;//当前第一个集合的高度为0
                this.listHeight.push(height);
                for(let i=0;i<list.length;i++){
                    let item = list[i];
                    height+= item.clientHeight;
                    this.listHeight.push(height)
                }
                // console.log(this.listHeight);
                
                
         },
        //  scrollTo(){
        //      this.scroll&&this.scroll.scrollTo.apply(this.scroll.arguments)
        //  },
        //  scrollToElemnt(){
        //      this.scroll&&this.scroll.scrollToElemnt.apply(this.scroll.arguments)
        //  },
         onshortcutTouchStart(e){
             let anchorIndex = e.target.getAttribute("data-index");
                this.touch.y1 = e.touches[0].pageY;//一开始点击的y坐标
                this.touch.anchorIndex = anchorIndex//初始点击元素的索引
                this._scrollTo(anchorIndex)
         },
         onshortcutTouchMove(e){
             
                this.touch.y2 = e.touches[0].pageY
                let delta = Math.floor((this.touch.y2 - this.touch.y1)/ANCHOR_HEIGHT)
                let anchorIndex = +this.touch.anchorIndex + delta
                
                
                this._scrollTo(anchorIndex)
         },
         _scrollTo(index){
             if(!index && index != 0){
                 return;
             }
             if(index<0){
                 index = 0;
             }else if(index>this.listHeight.length - 2){
                 index = this.listHeight.length - 2
             }

             this.currentIndex = index;
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
         },
         selectItem(singer){
            this.$emit('select',singer)
         }
    },
    mounted(){
        this._calculateHeight();
    },
    created(){
        this.touch = {}
    },
    watch:{
        scrollY(newY){
            const listHeight = this.listHeight
             if(newY>0){
                 this.currentIndex = 0;
                 return;
             }

             for(let i =0;i<listHeight.length;i++){
                 let startHeight = listHeight[i];
                 let endHeight = listHeight[i+1];
                 if(-newY>=startHeight&&-newY<endHeight){
                      this.currentIndex = i;
                      //this.diff 下一个分组
                      this.diff = endHeight + newY
                      return
                 }
             }
             
             this.currentIndex = listHeight.length - 2


        },
        diff(newDiff){
            let fixTop = (newDiff > 0 && newDiff<TITLE_HEIGHT)?newDiff - TITLE_HEIGHT:0;
            this.fixTop = fixTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixTop}px,0)`
            this.$refs.fixed.style.webkitTransform = `translate3d(0,${fixTop}px,0)`
        }
    },
    components:{
        Scroll
    }
}
</script>

<style lang='stylus'>
   @import "../../common/stylus/variable"
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)

</style>
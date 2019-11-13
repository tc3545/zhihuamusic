<template>
    <div class="slider" ref='slider'>
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span :class="['dot',{'active':index==currentPageIndex}]" v-for="(item,index) in dots" :key="index"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
        data(){
            return{
                dots:[],
                currentPageIndex:0
            }
        },
        props:{
          loop:{
              type:Boolean,
              default:true
          },
           autoplay:{
              type:Boolean,
               default:true
           },
            interval:{
              type:Number,
                default:2000
            }
        },
        methods:{
            _setSliderWidth(){
                this.children = this.$refs.sliderGroup.children;
                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.classList.add('slider-item');
                    child.style.width = sliderWidth +"px";
                    width += sliderWidth;
                }
                this.dots = new Array(this.children.length);
                width+=2*sliderWidth;
                this.$refs.sliderGroup.style.width = width+"px";
            },
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    snap:{
                        loop:this.loop
                    },
                    momentum:false,
                    click:true
                });
                this.slider.on('scrollEnd',()=>{
                    this.currentPageIndex = this.slider.getCurrentPage().pageX;
                    if(this.autoplay){
                        clearTimeout(this.timer);
                        this._play();
                    }
                });
                this.slider.on('scrollStart',()=>{
                        clearTimeout(this.timer);
                })
            },
            _play(){
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    this.slider.next()
                },this.interval)
            },

        },
        //挂载时
        mounted(){
            this._setSliderWidth();
            this._initSlider();
            if(this.autoplay){
                clearTimeout(this.timer);
                this._play();
            }
            // window.addEventListener("resize",()=>{
            //     if(!this.slider){
            //         return;//未初始化时
            //     }
            //     this._setSliderWidth(true);//修改后才调用传值
            //     this.slider.refresh();//原本自带的刷新
            // })
        },
        destroyed(){
            clearTimeout(this.timer)
        }
    }
</script>

<style lang='stylus'>

  @import "../../common/stylus/variable"
    .slider
        min-height: 1px
        position: relative
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>
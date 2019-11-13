<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
        return{

        }
    },
    props:{
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        },
        listenScroll:{
            type:Boolean,
            default:false
        },
        probeType:{
            type:Number,
            default:3
        }
    },
    methods:{
        _initScroll(){
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:this.click,
                probeType:this.probeType
            })
            if(this.listenScroll){
                this.scroll.on('scroll',(pos)=>{
                    this.$emit('scroll',pos)
                    
                })
            }
        },
        scrollTo(){
			    this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
            },
            scrollToElement(){
                this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
            }
    },
    mounted(){
        this._initScroll();
    },
    watch:{
        data(){
            this.$nextTick(()=>{
                this.scroll.refresh()
            })
        }
    }
}
</script>

<style lang='stylus'>
</style>
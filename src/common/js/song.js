class Song{
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
} 

let filterSinger = function(singer){
    let ret =[];
    if(!singer){
        return""
    }

    singer.forEach(s=>{
        ret.push(s.name)
    })

    return ret.join('-')
}

export default function createSong(musicData){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.data),
        name:musicData.songname,
        album:musicData.albumname,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url:`http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=7338569670&amp;vkey=02370F52CD6B28E43CD6D456519630E5038063B75911BF8C7D5E1691DE276DC2CC0755FCB52EC6DC3810878A75AC61596AB6596539E2CCBE&amp;uin=0&amp;fromtag=38`
    })
}

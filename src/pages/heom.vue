<template>
  <div class="heom">
    <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark bgco">
    <el-button class="but-t" type="info" @click="logout">退出</el-button>
  </div>
  </el-col>
</el-row>


  <div class="block">
    <span class="demonstration"></span>
    <el-carousel height="600px" >
      <el-carousel-item v-for="item in list" :key="item">  
         <img :src="item" height="100%" width="100%" />
      </el-carousel-item>
    </el-carousel>
  </div>


<!-- 搜索框 -->

<div class="slecet">

<div class="slecet-int">
<input type="text" placeholder="搜索" >
 <el-button class="acc" icon="el-icon-search" circle></el-button>
</div>

</div>

<!-- ------------------------- -->



<div class="synopsis">


<!-- 动漫评分 -->
<div class="synopsis-box" v-for="item in list2" :key="item.ano">
<img v-bind:src="item.aurl" alt="">
<div></div>
<el-tooltip placement="top">
  <div slot="content">
  <h3>标题:{{item.aname}}</h3>
  类型: <el-tag   size="mini">{{item.alx}}</el-tag><br/><br/>
  主角: {{item.anoe}}<br/><br/>
  简介: {{item.atexts}}<br/><br/>
  时间: {{item.adata | moment}}<br/>
  <br/>
  评分:  {{item.apf}}
  <el-rate
  v-model="item.apf"
  disabled
  show-score
  text-color="#ff9900"
  score-template="">
  
</el-rate>
  </div>
  <el-button><span>详细信息</span></el-button>
</el-tooltip>
</div>





</div>



  </div>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      list:["http://pic1.win4000.com/wallpaper/c/50ac9acd05557.jpg",
            "http://photocdn.sohu.com/pvrs/background/61/9d/755c3d3cd2777094cf7a4a68588dbc780d6f.jpg",
            "http://pic1.win4000.com/wallpaper/f/53d8bddcc0d89.jpg",
            "http://images2.alphacoders.com/264/thumb-1920-264120.jpg",
            "http://tp.ecysj.net/wp-content/uploads/2019/07/66-1ZF5162340Q9.png",
            "http://pic1.win4000.com/wallpaper/a/58e4514305001.jpg"]
            ,
      value: 4,
      list2: []
    }
  },


//时间过滤器
filters:{
moment: function (value) {
    value = value || 'YYYY-MM-DD';
    return moment(value).format(value); // value可以是普通日期 20170723
    // 这是时间戳转时间
}
}
,


mounted() {
    this.$axios
      .get('http://localhost:4000/api/anime/Aall')
      .then(res => {
        //请求成功
        //  console.log(res)
        if (res.status == '200') {
          if (res.data && res.data.length) {
            this.list2 = res.data
            
            // console.log(this.list2)
            
          }
        }

        // console.log(res);
      })
      .catch(err => {
        //请求失败

        window.console.log(err)
      })
  },

methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
},

}
</script>>
<style scoped>


.heom{
height: auto;
background: linear-gradient(180deg,rgba(176, 58, 223, 0.541),rgb(8, 23, 87),rgb(0, 18, 41),rgb(157, 65, 218));

}



.slecet{
float: left;
position: absolute;
top: 580px;
right:   100px;
z-index: 100;
}

.acc{

width: 60px;
height: 60px;
background: radial-gradient(rgb(17, 135, 204),rgba(237, 65, 243, 0.174),#2A3F78);

}

 input,select,option,textarea{outline: none;}
.slecet-int input{


width: 600px;
height: 50px;
border-radius: 20px;
border: 2px solid #ffffff;
background: rgba(0, 0, 0, 0.382);
color: #ffffff;
font-size: 20px;
}





.el-tooltip > div{

  background: #0094ff;
}


.synopsis{

position: relative;
display: flex;
width: 96%;
height: auto;
margin: 2%;

border-radius: 20px;
justify-content: flex-start;
flex-direction: row;
flex-wrap:wrap;

}

.synopsis-box{
position: relative;
width: 400px;
height: 300px;
text-align: center;

}


.synopsis-box img{

width: 200px;
height: 200px;
border-radius: 50%;
object-fit: cover;
margin: 20px;
transition: .5s;
cursor:pointer;
}


.synopsis-box img:hover{

width: 210px;
height: 210px;
box-shadow: 0 0 20px #ffffff;
transition: .5s;

}




.synopsis-box span{

font-size: 20px;
font-weight: bold;
color: #000;
text-align: center;
transition: .5s;
cursor:pointer;

}

.bgco{
  background: linear-gradient(135deg,#0094ff,rgb(0, 255, 242),rgb(119, 202, 240)) ;
  height: 60px;
}
.but-t{
position: absolute;
width: 50px;
height: 50px;
float: left;
border-radius: 50%;
background: radial-gradient(rgba(12, 240, 229, 0.753),rgb(22, 75, 190));
padding: 4px;
margin: 4px auto;
font-size: 14px;
font-weight: bold;
transform: 1s;
right: 10px;
}
.but-t:hover{
width: 55px;
height: 55px;
background: radial-gradient(rgba(7, 130, 212, 0.753),rgb(22, 156, 190));;
transform: 1s;
}


</style>
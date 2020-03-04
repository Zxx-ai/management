<template>
 
 <el-container class="scens">
   <!-- 头部区域 -->
  <el-header>
     <img src="../../assets/tb.png" alt=""> 
    <span>蓝漫后台管理系统</span>
    <el-button class="but-t" type="info" @click="logouts">退出</el-button>
    </el-header>
  <!-- 页面主体区 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
<!-- 侧边栏菜单 -->
 <el-menu
      default-active="2"
      background-color="#1C8ECF"
      text-color="#fff"
      active-text-color="#ffd04b">



   <!--el-submenu  一级菜单 -->
      <el-submenu index="1">

        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>

      </el-submenu>

      <!--el-submenu  一级菜单 -->
      <el-submenu index="2">

        <template slot="title">
          <i class="el-icon-video-camera"></i>
          <span>动漫管理</span>
        </template>

        <!-- 二级菜单 -->
         <el-menu-item index="1-4-1">

        <template slot="title">
          <i class="el-icon-video-camera-solid"></i>
          <router-link class="scenes-data" to="/movie"><span>数据管理</span></router-link>
        </template>

         </el-menu-item>

  <!-- 三级菜单 -->
         <el-menu-item index="1-4-2">

        <template slot="title">
          <i class="el-icon-circle-plus"></i>
          <router-link class="scenes-data" to="/insetm"><span>新增数据</span></router-link>
        </template>

         </el-menu-item>

      </el-submenu>
  


    </el-menu>

    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
 <el-button type="primary">😀新增动漫</el-button>


<div class="form-for">

  <el-form
        label-width="0px"
        class="register box"
        :model="ruleFome"
        ref="ruleFomeinset"
        :rules="rules"
      >
        <!-- 动漫图URL -->
        <el-form-item     prop="aurl">
          <el-input
            type="text"          
            prefix-icon="el-icon-picture-outline-round"
            placeholder="请输入动漫图片url"
            v-model="ruleFome.aurl"
          ></el-input>
        </el-form-item>

        <!-- 动漫名 -->
        <el-form-item prop="aname">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            placeholder="请输入动漫名"
            v-model="ruleFome.aname"
          ></el-input>
        </el-form-item>




     <!-- 类型 -->

   <el-form-item prop="alx">
          <el-select
           
            prefix-icon="el-icon-user"
            placeholder="请输入动漫类型"
            v-model="ruleFome.alx"
          >
       <el-option label="热血" value="热血"></el-option>
      <el-option label="剧情" value="剧情"></el-option>
      <el-option label="情感" value="情感"></el-option>
      <el-option label="悬疑" value="悬疑"></el-option>
      <el-option label="奇幻" value="奇幻"></el-option>
      <el-option label="动作" value="动作"></el-option>
          </el-select>
        </el-form-item>



        
<!-- 主角名 -->
   <el-form-item prop="anoe">
          <el-input
            type="text"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入动漫主角名"
            v-model="ruleFome.anoe"
          ></el-input>
        </el-form-item>


<!-- 简介 -->


<el-form-item prop="atexts">
          <el-input
            type="textarea"
            prefix-icon="el-icon-alarm-clock"
            placeholder="请输入简介"
            v-model="ruleFome.atexts"
          ></el-input>
        </el-form-item>
  




<!-- 时间-->
  <el-form-item prop="adata">


 <el-date-picker
     v-model="ruleFome.adata"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  
        



<!-- 评分  number-->
<el-form-item prop="apf">
          <el-input
            type="number"
            prefix-icon="el-icon-star-off"
            placeholder="请评分"
            v-model="ruleFome.apf"
            max="5"
            min="0"
          ></el-input>
        </el-form-item>
  


        <!-- 按钮  -->
       <el-form-item>
         
  
          <el-button class="ass"   @click="inset()" round>新增</el-button>
          <el-button type="primary" @click="inreset()" round>重置</el-button>
          
        </el-form-item> 
      </el-form>

</div>


    </el-main>
  </el-container>



</el-container>



</template>
<script>
export default {
  data() {
    return {
      ruleFome: {
       aurl: '',
       aname: '',
       alx: '',
       anoe: '',
       atexts: '',
       adata: '',
       apf: ''
      },
       rules: {
               aurl: [
          { required: true, message: '请输入url地址', trigger: 'blur' },
          { min: 6, max: 1000, message: '长度在 6 个字符以上', trigger: 'blur' }
        ],
        aname: [
          { required: true, message: '请输入动漫名', trigger: 'blur' },
          { min: 1, max: 1000, message: '不能为空', trigger: 'blur' }
        ],
        alx: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          { min: 1, max: 1000, message: '不能为空', trigger: 'blur' }
        ],
        anoe: [
          { required: true, message: '请输入动漫主角', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度不能为空', trigger: 'blur' }
        ],
        atexts: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度不能为空', trigger: 'blur' }
        ],
       apf: [
          { required: true, message: '请输入评分', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度不能为空', trigger: 'blur' }
        ]
      }

    }
  },

// inset(){

// this.$refs.reFrom.validate(valid => {

//   console.log(valid)
// })

// },

  

methods:{

inset(){ this.$refs.ruleFomeinset.validate(valid => {
        window.console.log(valid)

        if (valid == false) {
          this.$message.error('新增失败！！！')
        }

        if (valid == true) {
          var aurl = this.ruleFome.aurl
          var aname = this.ruleFome.aname             
          var alx= this.ruleFome.alx
          var anoe= this.ruleFome.anoe
          var atexts= this.ruleFome.atexts
         var adata= this.ruleFome.adata
         var apf= this.ruleFome.apf

           this.$axios
            .post('http://localhost:4000/api/animeadd/Aadd', {
              aurl: aurl,
              aname: aname,
              alx: alx,
              anoe: anoe,
              atexts: atexts,
              adata: adata,
              apf: apf
            })
            .then(res => {
              // window.console.log('新增成功');
              //新增成功之后
              if (res.status == '200') {
                window.console.log(res)
                this.$message.success('恭喜新增成功~')
              }else{
                 this.$message.error('新增失败，请重新新增！')
              }
            })
            .catch(err => {
              window.console.log(err)
            })

       

         
        }
      })
    },

  
 logouts() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },

    // 点击重置    ，  重置表单
    inreset() {
      //window.console.log(this)
      this.$refs.ruleFomeinset.resetFields()
    }


}



}
</script>
<style scoped>
 
.box{
width: 500px;
margin: 0 50px;
}

.form-for{

width: 600px;
height: 800px;
border: 1px solid #0094ff;
border-radius: 20px;
margin-top: 50px;
padding-top: 20px;

  box-shadow: -0.2rem 0 0.5rem #0094ff, /*左边阴影*/ 
               0 -0.2rem 0.5rem rgb(66, 195, 228),/*上边阴影*/
               0.2rem 0 0.5rem rgb(119, 202, 240),/*右边阴影*/
               0 0.2rem 0.5rem rgb(0, 255, 242) inset; /*下边阴影*/



}



.el-header{

background: linear-gradient(135deg,#0094ff,rgb(0, 255, 242),rgb(119, 202, 240)) ;;
align-items: center;
display: flex;
font-weight: bold;
font-size: 18px;
align-items: center;
color: #fff;

}

.el-header  span{
margin-left: 10px;
font-size: 20px;
}



.el-aside{

background:linear-gradient(45deg,rgb(6, 191, 216),rgb(0, 143, 238));

}

.el-main{

  background: #fff;
}
.scenes{

height: 100%;

}


.scens{

height: 100vh;

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

a{
   text-decoration: none;
}
.scenes-data  span{
color: #fff;

}
</style>>
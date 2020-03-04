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
         <router-link class="scenes-data" to="/scenes"><span>用户管理</span></router-link>
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
<el-button type="primary">😀动漫管理</el-button>
<el-table
    :data="tableData.filter(data => !search || data.aname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    
    >

    <el-table-column
      label="ID"
      prop="ano">
    </el-table-column>

    <el-table-column
      label="图片"
      prop="aurl">
     
    </el-table-column>

    <el-table-column
      label="动漫名"
      prop="aname">
    </el-table-column>

  <el-table-column
      label="类型"
      prop="alx">
    </el-table-column>

    <el-table-column
      label="主角"
      prop="anoe">
    </el-table-column>


 <el-table-column
      label="简介"
      prop="atexts">
    </el-table-column>


 <el-table-column
      label="时间"
      prop="adata">
    </el-table-column>

 <el-table-column
      label="评分"
      prop="apf">
    </el-table-column>


    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
       


           <el-button
          size="mini"
          @click="dialogFormVisible = true,handleEdit(scope.$index, scope.row)">编辑</el-button>


        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>

 <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
  </el-table>





<!-- 编辑 -->
<el-dialog title="动漫数据修改" :visible.sync="dialogFormVisible">
  <el-form :model="form"  ref="scenesfrom">

 <el-form-item label="ID:"  :label-width="formLabelWidth">
      <el-input :disabled="true"  v-model="form.ano" autocomplete="off"></el-input>
    </el-form-item>


     
    <el-form-item label="图片url:" :label-width="formLabelWidth">
      <el-input v-model="form.aurl" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="动漫名:" :label-width="formLabelWidth">
      <el-input v-model="form.aname" autocomplete="off"></el-input>
    </el-form-item>


   <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select          
            prefix-icon="el-icon-user"
            placeholder="请输入动漫类型"
            v-model="form.alx"
          >
      <el-option label="热血" value="热血"></el-option>
      <el-option label="剧情" value="剧情"></el-option>
      <el-option label="情感" value="情感"></el-option>
      <el-option label="悬疑" value="悬疑"></el-option>
      <el-option label="奇幻" value="奇幻"></el-option>
      <el-option label="动作" value="动作"></el-option>
          </el-select>
        </el-form-item>

<el-form-item label="动漫主角:" :label-width="formLabelWidth">
      <el-input v-model="form.anoe" autocomplete="off"></el-input>
    </el-form-item>



    <el-form-item label="动漫简介:" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="form.atexts" autocomplete="off"></el-input>
    </el-form-item>

 <el-form-item label="发布时间:" :label-width="formLabelWidth">
   <el-date-picker
      v-model="form.adata"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
 </el-form-item>



         <el-form-item  label="评分:" :label-width="formLabelWidth">
          <el-input
            type="number"
            prefix-icon="el-icon-star-off"
            placeholder="请评分"
            v-model="form.apf"
            max="5"
            min="0"
          ></el-input>
        </el-form-item>
      

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,animeshow(),openFullScreen2()">确 定</el-button>
  </div>
</el-dialog>





    </el-main>
  </el-container>

</el-container>



</template>
<script>
export default {
   inject:['reload'],
  data() {
    return {
     tableData: [],
        search: '',
  dialogFormVisible: false,
        form: {
          ano: '',
          aurl: '',
          aname: '',
          alx: '',
          anoes: '',
          atexts: '',
          adata: '',
          apf: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    }
  },

mounted() {
    this.$axios
      .get('http://localhost:4000/api/anime/Aall')
      .then(res => {
        //请求成功
        // console.log(res)
        if (res.status == '200') {
          if (res.data && res.data.length) {
            this.tableData = res.data
            
            
          }
        }

        // console.log(res);
      })
      .catch(err => {
        //请求失败

        window.console.log(err)
      })
  },

  

methods:{

animeshow(){
          var ano = this.form.ano
          var aurl = this.form.aurl
          var aname = this.form.aname             
          var alx= this.form.alx
          var anoe= this.form.anoe
          var atexts= this.form.atexts
         var adata= this.form.adata
         var apf= this.form.apf


this.$axios.post('http://localhost:4000/api/updanime/Aupdanime',{aurl:aurl,aname:aname,alx:alx,anoe:anoe,atexts:atexts,adata:adata,apf:apf,ano:ano}).then(res=>{
               
               if(res.status == '200'){
                  
                  // this.$message.success('修改成功~')
                  
               }else{
                 this.$message.error('修改失败！')
               }
                

}).catch(err=>{

 window.console.log(err)

})



},
  
      handleDelete(index, row) {

        // row.id拿取当前数据的id值
        //  console.log(index,row.ano);
      
           this.$axios.post('http://localhost:4000/api/animedel/Adelete?ano=index',{ano:row.ano}).then(
             res=>{
            if(res.status == '200'){
              // 实现删除后操作
            
                  this.tableData.splice(index,1)
                // window.console.log(res)
                this.$message.success('恭喜删除成功~')

            }

             }
             
           ).catch()

        
      }
    ,

 handleEdit(index, row) {
        console.log(index, row);
    //  将数据绑定在input中
          this.form.ano=row.ano
          this.form.aurl=row.aurl
         this.form.aname=row.aname             
           this.form.alx=row.alx
        this.form.anoe=row.anoe
         this.form.atexts=row.atexts
         this.form.adata=row.adata
        this.form.apf=row.apf
     
      console.log(this.form.anoe)

      },
    

 openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          // 刷新问题
        //  location.reload();
         //不出现闪烁问题  this.reload();
       this.reload();
          loading.close();
           this.$message.success('修改成功~')
        }, 3000);
      }


,


 logouts() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },

}



}
</script>
<style scoped>
 

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
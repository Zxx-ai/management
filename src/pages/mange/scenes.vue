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
 <el-button type="primary">😀用户管理</el-button>
<el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)&&tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 70%"
    
    >
    <el-table-column
      label="Pwss"
      prop="pwss">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
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
          
      <!-- @click="handleEdit(scope.$index, scope.row)" -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 分页 -->


  <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"                         
                            :page-sizes="[5, 10, 20, 40]"  
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData.length">   
                    </el-pagination>

<!-- 编辑 -->
<el-dialog title="用户修改" :visible.sync="dialogFormVisible">
  <el-form :model="form"  ref="scenesfrom">

 <el-form-item label="ID:"  :label-width="formLabelWidth">
      <el-input :disabled="true"  v-model="form.id" autocomplete="off"></el-input>
    </el-form-item>


     
    <el-form-item label="账号:" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码:" :label-width="formLabelWidth">
      <el-input v-model="form.pwss" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,show(),openFullScreen2()">确 定</el-button>
  </div>
</el-dialog>


    </el-main>
  </el-container>

</el-container>



</template>
<script>
export default {
   inject:['reload'],                                 //注入App里的reload方法
  data() {
    return {
     tableData: [],
        search: '',
         currentPage:1, //初始页
                pagesize:10,    //    每页的数据
        dialogFormVisible: false,
        form: {
         id: '',
         name: '',
         pwss: '',
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
      .get('http://localhost:4000/api/user/all')
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



   // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },

show(){

   var id=this.form.id
   var name=this.form.name
   var pwss=this.form.pwss


this.$axios.post('http://localhost:4000/api/upduser/Aupdate',{name:name,pwss:pwss,id:id}).then(res=>{
               
               if(res.status == '200'){
                  
                  this.$message.success('修改成功~')
                  
               }else{
                 this.$message.error('修改失败！')
               }
                

}).catch(err=>{

 window.console.log(err)

})


// 刷新当前页面
// location.reload();


},

 handleEdit(index, row) {
        // console.log(index, row);
      //  var id=this.form.id
      //  var name=this.form.name
      //  var pwss=this.form.pwss

       this.form.id=row.id;
       this.form.name=row.name;
       this.form.pwss=row.pwss;
      // console.log(this.form.name)

      },
  
      handleDelete(index, row) {

        // row.id拿取当前数据的id值
        // console.log(index,row.id);
           this.$axios.post('http://localhost:4000/api/userdel/delete?id=index',{id:row.id}).then(
             res=>{
            if(res.status == '200'){
              // 实现删除后操作
                  this.tableData.splice(index,1)
                // window.console.log(res)
                this.$message.success('恭喜删除成功~')

            }

             }
             
           ).catch(err=>{
                 window.console.log(err)
               
           })

        
      }
    ,

 openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          // 强制刷新会出现闪烁问题
        //  location.reload();
      //不出现闪烁问题  this.reload();
      this.reload();
          loading.close();
         
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
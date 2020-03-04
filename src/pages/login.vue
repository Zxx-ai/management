<template>
  <div class="login">

    <div class="login-box">


 <router-link class="log" to="/"><p>登录</p></router-link>
 <router-link class="log2" to="/register"><p>注册</p></router-link>


      <el-form
        label-width="0px"
        class="register box"
        :model="ruleFome"
        ref="ruleFomelogin"
        :rules="rules"
      >
        <!-- 账号 -->
        <el-form-item prop="name">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            placeholder="请输入账号"
            v-model="ruleFome.name"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="pwss">
          <el-input
            type="password"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入密码"
            v-model="ruleFome.pwss"
          ></el-input>
        </el-form-item>


        <!-- 按钮  -->
        <el-form-item>
         
           <el-checkbox v-model="ruleFome.isadmin"  false-label='false'  true-label='true' >管理员</el-checkbox>
          <el-button class="ass"   @click="login()" round>登录</el-button>
          <el-button type="primary" @click="loginreset()" round>重置</el-button>
          
        </el-form-item>
      </el-form>
    </div>
</div>
 
</template>
<script>

export default {
  data() {
   

  
    return {
         ruleFome: {
        name: 'aime',
        pwss: '123456',  
        isadmin: ''
      },
      rules: {
               name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pwss: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

login(){
// var name = this.ruleFome.name

// var pwss = this.ruleFome.pwss
// if(name=="aime"&&pwss=="123456"){
// this.$router.push('/heom')
// }

      this.$refs.ruleFomelogin.validate(valid=> {
      window.console.log(valid)

        if (valid == true) {

          var name = this.ruleFome.name

          var pwss = this.ruleFome.pwss
           
          var isadmin = this.ruleFome.isadmin


            

       this.$axios
            .post('http://localhost:4000/api/userverify/verify', {
              name: name,
              pwss: pwss,
              isadmin: isadmin
            })
            .then(res => {

             

                if(res.status == '200'&&res.data[0].isadmin == isadmin){
                    
               window.sessionStorage.setItem('token', res.data.token)
              
                 this.$router.push('/scenes')
                    this.$message.success('恭喜管理员登录成功~')
                 }else{

                    this.$message.error('登录失败，请重新登录')
                 }
                  




              // window.console.log('注册成功');
              // this.$message('这是一条消息提示');
              if (res.status == '200'&&res.data[0].isadmin == null) {
               
               //登录成功
                this.$message.success('恭喜登录成功~')
           
                window.console.log(res)
                //this.$store.name=res.name;
                //将登陆后的值token，保到客户端sessionStorage中
                //token只在网站打开后生效
                window.sessionStorage.setItem('token', res.data.token)
                this.$router.push('/heom')
              



              } 

            })
            .catch(err => {
              window.console.log(err)
            })
        } else{
         this.$message.error('登录失败，请重新登录')
        }
      })
    }



,
  
    // 点击重置    ，  重置表单
    loginreset() {
      //window.console.log(this)
      this.$refs.ruleFomelogin.resetFields()
    }

  }


}
</script>
<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgb(76, 127, 236),
    rgb(122, 212, 248),
    rgb(75, 93, 255)
  );
  align-items: center;
}

.login-box {
  position: absolute;
  width: 620px;
  height: 400px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  overflow: auto;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.box {
width: 500px;
margin: 20px;
 margin-top: 120px;
}
.log{
 float: left;
width: 60px;
height: 60px;
background: linear-gradient(rgba(122, 212, 248, 0.568),rgba(64, 127, 243, 0.582),rgb(49, 219, 224)) ;
border-radius: 50%;
transition: .5s;
margin-left: 10px;
}


.log2{
 float: left;
width: 60px;
height: 60px;
background: linear-gradient(rgba(122, 212, 248, 0.568),rgba(64, 127, 243, 0.582)) ;
border-radius: 50%;
transition: .5s;
margin-left: 10px;
}



.log:hover{

width: 80px;
height: 80px;
transition: .5s;

}
.log2:hover{

width: 80px;
height: 80px;
transition: .5s;

}

  a {
    text-decoration: none;
  }
 p{
font-size: 18px;
text-decoration:none ;
font-weight: bold;
text-align: center;
color: #fff;
}
.ass{
background: #40D1E5;
color: #fff;
}

</style>
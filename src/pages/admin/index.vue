<template>
  <div class="admin">
    <canvas id="canvas"></canvas>
    <el-container style>
      <el-header>
        <div class="container">
          <img src="../../assets/images/logo.png">
        </div>
      </el-header>
      <el-main>
        <div class="container">
           <div class="imgBg">
            <img :src="loginImgBg" alt="">
          </div>
          <el-form>
            <h2>登录</h2>
            <i class="iconfont user">&#xe638;</i>
            <i class="iconfont pass">&#xe6c5;</i>
            <span class="wrongTips">{{wringTips}}</span>
            <el-input
              type="text"
              placeholder="请输入用户名"
              v-model="user"
              inputPattern="/^[\u4e00-\u9fa5]{1,6}$/"
            ></el-input>
            <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
            <el-button type="primary" @click="login">登 录</el-button>
          </el-form>
        </div>
      </el-main>
      <Footer/>
    </el-container>
  </div>
</template>
<script>
/*eslint-disable */
import Vue from "vue";
import { Base64 } from 'js-base64';
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import Footer from "../common/footer.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Footer
  },
  name: "admin",
  data() {
    return {
      userToken: "",
      userName: "",
      sex: "",
      user: "",
      password: "",
      userToken: "",
      wringTips: "",
      loginImgBg:require('../../assets/images/loginbg.png')
    };
  },
  methods: {
    ...mapMutations(["USERINFO", "USERNAME", "USERIMG"]),
    login() {
      this.$http
        .post(
          this.global.userlogin,
          { userLoginname: this.user, userPwd: Base64.encode(this.password) },
          { emulateJSON: true }
        )
        .then(
          res => {
            if (res.data.status === 200) {
              if(res.data.resultObject.systembId != 3){
                   this.$message({
                      showClose: true,
                      message: '不是此平台管理员',
                      type: 'warning'
                    });
                 return;
              }
              this.USERINFO(res.data.resultObject);
              this.USERNAME(res.data.resultObject.userName);
              this.USERIMG(res.data.resultObject.userPhoto);
              setCookie(
                "userToken",
                res.data.resultObject.userToken,
                1000 * 60
              );
              this.userToken = res.data.resultObject.userToken;
              this.userName = res.data.resultObject.userName;
              this.sex = res.data.resultObject.userSex;
              localStorage.setItem("userNameHse", res.data.resultObject.userName);
              localStorage.setItem(
                "systemNameHse",
                res.data.resultObject.userLoginname
              );
              localStorage.setItem("userIdHse", res.data.resultObject.userId);
              localStorage.setItem("systembIdHse", Number(res.data.resultObject.systembId));
              localStorage.setItem("sexHse", this.sex);
              localStorage.setItem("userTypeHse", res.data.resultObject.userType);
              if (res.data.resultObject.userType == "2") {
                this.$router.push({
                  path: "/manageAdmin",
                  query: { userToken: getCookie("userToken") }
                });
              }
            } else if (res.data.status == 512) {
              this.wringTips = res.data.errorMessage;
            }
            //this.$router.push({path:'/superAdmin'})
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  computed: {
    ...mapState(["userdata", "username"])
  },
  mounted() {
    
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/common.less";
.el-input__inner {
  padding-left: 30px;
}
.el-footer{
  background: #0d42ba !important;
  border-top: 1px solid #0A3390 !important;
}
.admin {
  height: 100%;
  position: relative;
  overflow-y: hidden;
  .el-container {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .el-header {
      line-height: 60px;
      height: 60px;
      text-align: left;
      background: -webkit-linear-gradient(to top, #0090ff , #0d42ba); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(to top, #0090ff , #0d42ba); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(to top, #0090ff , #0d42ba); /* Firefox 3.6 - 15 */
      background: linear-gradient( to top, #0090ff , #0d42ba); /* 标准的语法 */
      img {
        margin-right: 15px;
      }
      span {
        font-size: 16px;
        color: #fff;
        position: relative;
        margin-left: 15px;
      }
      span:before {
        content: "";
        position: absolute;
        top: -5px;
        left: -15px;
        width: 2px;
        height: 25px;
        background-color: #fff;
      }
    }
    .el-main {
      background: #0d42ba;
      .container {
        position: relative;
        height: 100%;
         display: flex;
        align-items: center;
        justify-content: center;
      }
      .imgBg{
        height: 613px;
        width: 685px;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .el-form {
        position: relative;
        width: 320px;
        height: 260px;
        // box-shadow: 0 0 18px #b4b4b4;
        padding: 30px;
        border-radius: 2px;
        background-color: #fff;
        .wrongTips {
          position: absolute;
          text-align: left;
          color: #f56c6c;
          width: 100%;
          font-size: 16px;
        }
        h2{
          margin-bottom: 20px;
        }
        .el-input {
          margin-top: 30px;
        }
        .user {
          position: absolute;
          left: 40px;
          z-index: 9;
          top: 120px;
          color: rgb(170, 170, 170);
        }
        .pass {
          position: absolute;
          left: 40px;
          z-index: 9;
          top: 190px;
          color: rgb(170, 170, 170);
        }
        .el-button {
          width: 100%;
          margin-top: 30px;
          text-align: center;
        }
      }
    }
  }
}
</style>

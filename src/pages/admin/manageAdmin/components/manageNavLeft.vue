<template>
  <div class="nav-left">
    <el-row class="tac">
      <el-col :span="24">
        <div class="head">
          <img class="head-icon" :src="userImgs == 'undefined' || !userImgs? userHeadSrc :  userImgs" alt>
          <h2>
            {{this.userName}}
            <i class="iconfont boy" v-show="this.sex == '男'">&#xe648;</i>
            <i class="iconfont gril" v-show="this.sex == '女'">&#xe757;</i>
          </h2>
          <p>平台管理员</p>
        </div>
        <el-menu :default-active="routerPath" class="el-menu-vertical-demo">
          <router-link :to="{path: '/manageAdmin/manageList' }">
            <el-menu-item index="2" class="list">
              <!--  <i class="el-icon-menu"></i> -->
              <span slot="title">机构管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/schoolList' }">
            <el-menu-item index="3" class="list">
              <!-- <i class="el-icon-document"></i> -->
              <span slot="title">学员管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/administratorsList' }">
            <el-menu-item index="4" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">管理员管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/achievement' }">
            <el-menu-item index="1" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">成绩管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/iboxList' }">
            <el-menu-item index="5" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">IBOX管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/entryrecord' }">
            <el-menu-item index="7" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">进场记录</span>
            </el-menu-item>
          </router-link>
          <!-- <router-link :to="{path: '/manageAdmin/iboxList' }">
            <el-menu-item index="5" class="list">
              <span slot="title">IBOX管理</span>
            </el-menu-item>
          </router-link> -->
          <!-- <router-link :to="{path: '/manageAdmin/courseList' }">
            <el-menu-item index="6" class="list last-list">
              <span slot="title">课程管理</span>
            </el-menu-item>
          </router-link>-->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState,mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userNames","userImgs"]),
    routerPath() {
      if (this.$route.path === "/manageAdmin/achievement" || this.$route.path === "/manageAdmin/scoreAll") {
        return "1";
      }
      if (this.$route.path === "/manageAdmin/manageList") {
        return "2";
      }
      if (this.$route.path === "/manageAdmin/schoolList") {
        return "3";
      }
      if (this.$route.path === "/manageAdmin/administratorsList") {
        return "4";
      }
      if (this.$route.path === "/manageAdmin/iboxList") {
        return "5";
      }
      if (this.$route.path === "/manageAdmin/courseList" ) {
        return "6";
      }
      if (this.$route.path === "/manageAdmin/entryrecord") {
        return "7";
      }
    }
  },
  data() {
    return {
      userName: "",
      sex: "",
      userHeadSrc:require('../../../../assets/images/head.png'),
    };
  },
  created() {
    this.userName = localStorage.getItem("userNameHse");
    this.sex = localStorage.getItem("sexHse");
  }
};
</script>
<style scoped lang="less">
.el-menu {
  border-right: 0;
}
.nav-left {
  border: 1px solid #e5e5e4;
  margin-left: 2px;
  height: 100%;
  .head {
    height: 208px;
    background: #f5f5f5;
    padding-top: 15px;
    box-sizing: border-box;
    .head-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto;
      border: 7px solid rgba(229, 229, 229, 1);
    }
    h2 {
      font-size: 18px;
      margin-top: 20px;
      font-weight: 400;
      margin-left: 10px;
      color: #434343;
      i {
        color: rgb(255, 212, 219);
        position: relative;
        left: 7px;
        top: -2px;
      }
    }
    p {
      font-size: 12px;
      margin-top: 12px;
    }
  }
  .list {
    position: relative;
    border-top: 1px solid rgb(220, 220, 220);
  }
  .last-list {
    position: relative;
    border-bottom: 1px solid rgb(220, 220, 220);
  }
  .el-menu-item.is-active {
    color: #fff;
    background: #0090ff;
  }
  .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
}
</style>

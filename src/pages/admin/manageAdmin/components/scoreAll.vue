<template>
  <div class="adminList">
    <ul class="title-icon">
      <li class="left"><span  @click="$router.go(-1)" style="cursor:pointer">成绩管理</span><i class="el-icon-caret-right"></i> 学员成绩汇总</li>
    </ul>
    <div class="userBox">
       <img :src="userData.userPhoto == '' || userData.userPhoto == 'undefind' ? staticHead:userData.userPhoto" alt="">
       <h3>{{userData.userName}}考评成绩汇总</h3>
    </div>
    <div class="outerBox">
       <div class="right" @click="outer">导出</div>
    </div>
    <!-- 表单信息 -->
    <el-table :data="pageData" highlight-current-row :header-cell-style="headerClassFn"  style="width: 100%;border:1px solid rgba(229, 229, 228, 1)" v-loading="loading">
      <el-table-column type="index" label="序号" width="80">
        <template slot-scope="scope">{{scope.$index + 1 + (currentPage-1)*10}}</template>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="trainingScore" label="操作分"></el-table-column>
      <el-table-column prop="hierarchy" label="层级"></el-table-column>
      <el-table-column prop="expandScore" label="拓展分" width="120"></el-table-column>
      <el-table-column prop="timeCost" label="考试用时" width="120">
         <template slot-scope="scope">
              <span>{{scope.row.timeCost | settimems}}</span>
            </template>
      </el-table-column>
      <el-table-column prop="iboxName" label="考试地点" width="120"></el-table-column>
      <el-table-column prop="finishTime" label="完成时间" width="180"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
    <!-- 新增机构 -->
  </div>
</template>
<script>
/*eslint-disable */
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
import {getScoreManagementListByUserId,generateSheetForScoreByUserId,getCustomUserById} from "../../../common/api.js";
export default {
  name: "AdminList",
  data() {
    return {
      staticHead:require('../../../../assets/images/userhead.png'),
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageData: [],
      userData:[],
      loading: false
    };
  },
  methods: {
    outer(){
      generateSheetForScoreByUserId({
        userId:this.$route.query.userId,
        userName:this.userData.userName
      }).then(res => {
         if(res.data.status == 200){
              window.open(res.data.resultObject);
          }
      })
    },
    // 处理页号改变
    headerClassFn(row, column, rowIndex, columnIndex){
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;"
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
    // 加载分页数据
    loadData() {
      this.loading = true;
      getScoreManagementListByUserId({
        userId:this.$route.query.userId
      }).then(res => {
        this.pageData = res.data.resultObject.data
        this.loading = false;
      })
    },
  },
  created() {
    this.loadData();
    getCustomUserById(this.$route.query.userId).then(res => {
      this.userData = res.data.resultObject.data ;
    })
  }
};
</script>
<style scoped lang="less">
.adminList {
  padding-bottom: 80px;
  .outerBox{
    display: flex;
    flex-direction:row-reverse;
  }
.right {
      width: 120px;
      font-size: 16px;
      color: #fff;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: rgba(0, 144, 255, 1);
      border-radius: 2px;
      cursor: pointer;
    }
  .el-table {
    margin-top: 15px;
    border-radius: 5px;
  }
  .demo-ruleForm {
    padding-right: 50px;
  }
  .creatTime {
    width: 80px;
    height: 16px;
    display: inline-block;
    overflow: hidden;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  .identity {
    text-align: left;
  }
  .wrongTips {
    display: inline-block;
    text-align: left;
    color: #f56c6c;
    width: 100%;
  }
  .must {
    color: red;
    position: absolute;
    left: -77px;
    top: 0;
  }
  .must2 {
    color: red;
    position: absolute;
    left: -62px;
    top: 0;
  }
  .level {
    .el-radio + .el-radio {
      margin-left: 0;
    }
    .el-radio {
      width: 100px !important;
      margin-top: 15px;
    }
  }
  .dialogInfo {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: -20px;
      padding: 0 10px;
    }
    li {
      flex-basis: 50%;
      text-align: left;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-indent: 40px;
      span {
        color: #409eff;
        font-weight: bolder;
        margin-left: 20px;
      }
    }
  }
  .userBox{
    display: flex;
    justify-content: center;
    flex-direction: column ;
    font-size: 18px;
    img{
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin: 10px auto;
    }
    h3{
      margin: 30px;
    }
  }
  .area {
    text-align: center !important;
    .el-select {
      width: 160px;
      margin-right: 20px;
    }
  }
  .green {
    color: #30B44F;
  }
  .el-table{
    font-size: 12px;
  }
  .iconfont-color-blue{
    font-size: 12px;
  }
  }
  .title-icon {
    display: flex;
    justify-content: space-between;
    margin-bottom:15px;
    li {
      flex-basis: 200px;
      font-size: 14px;
    }
    li:first-child {
      padding-top: 10px;
      text-align: left;
      font-weight: bolder;
    }
  }
</style>

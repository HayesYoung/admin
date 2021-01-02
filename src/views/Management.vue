<template>
  <div class="y_top">

    <el-tabs v-model="activeName" class="y_cen">
    <el-tab-pane label="添加博客" name="first" class="y_h1"> <Sub/> </el-tab-pane>
    <el-tab-pane label="博客管理" name="third" class="y_h1"> <t1manage/> </el-tab-pane>
  </el-tabs>


  </div>
</template>

<script>
import Sub from './Management/PageSubmit'
import t1manage from './Management/PageAccount'

export default {
  data() {
    return {
      activeName: 'third'
    };
  },
  components: {
    Sub,
    t1manage
  }
};
</script>


<style scoped>
.y_top {
  width: 98%;
  margin: 50px auto;
  /* border: 1px solid #409EFF; */
  border-radius: 9px;
   background-color:  #ffffff;
    /* #fa8072 */
}
.y_cen {
  width: 96%;
  margin: 50px auto;
  text-align: center;
}

</style>

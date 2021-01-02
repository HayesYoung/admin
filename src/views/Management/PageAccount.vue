/* eslint-disable no-unused-vars */
<template>
  <div>
    <el-table :data="tableData" border style="width: 96%">
      <el-table-column fixed prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="tap" label="专栏" width="150"></el-table-column>
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      
      <el-table-column prop="createdate" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="updatedate" label="修改时间" width="200"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 页码 -->
    <el-pagination
      background
      layout= "prev, pager, next"
      :page-size= "pageSize"
      :total= "total"
      @current-change= "page"
      class="y_page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: null,
      total: null,
      tableData: [
        {
          id: 1,
          title: "测试",
          tap: 'vue',
          createdate: "2020",
          updatedate: "2020"
        },
        {
          id: 2,
          title: "测试",
          createdate: "2017",
          updatedate: "2020"
        },
        {
          id: 3,
          title: "人间失格",
          createdate: "2019",
          updatedate: "2020"
        },
      ],
    };
  },

  methods: {
    deleteBook(row) {
      const _this = this;
      
      _this.$axios
        // .delete("http://120.77.211.147:8181/textOne/deleteById/" + row.id)
        .delete("http://localhost:8182/textOne/deleteById/" + row.id)
        // eslint-disable-next-line no-unused-vars
        .then(function (resp) {
          _this.$alert("《" + row.title + "》删除成功！", "消息", {
            confirmButtonText: "确定",
            // eslint-disable-next-line no-unused-vars
            callback: (action) => {
              window.location.reload();
            },
          });
        });
    },

    // id跳转
    edit(row) {
      this.$router.push({
        path: "/pageUpdate",
        query: {
          id: row.id,
        },
      });
    },
    
    // 页码
    page(pageNumber) {
      const _this = this;
      _this.$axios
        .get(`http://120.77.211.147:8181/textOne/findAll/${pageNumber}/7`)
        // .get("http://localhost:8181/textOne/findAll/" + (pageNumber) + "/7")
        .then(function (resp) {
          _this.tableData = resp.data.content;
          _this.pageSize = resp.data.size;
          _this.total = resp.data.totalElements;
        });
    },
  },

  created() {
    const _this = this;
    _this.$axios
      .get("http://120.77.211.147:8181/textOne/findAll/1/7")
      .then(function (resp) {
        _this.tableData = resp.data.content;
        _this.pageSize = resp.data.size;
        _this.total = resp.data.totalElements;
      });
  },
};
</script>

<style scoped>
.y_page{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
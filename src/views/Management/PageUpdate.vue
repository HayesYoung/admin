<!-- 添加内容 -->
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm y_form"
    >
      <el-form-item label="编号">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="专栏" prop="tap" class="y_title">
        <el-select v-model="ruleForm.tap" placeholder="请选择专栏">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- md插件 -->
      <div class="y_md">
        <mavon-editor v-model="content" ref="md" @change="change" style="min-height: 600px" />
      </div>

      <el-form-item class="y_get">
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入 md 组件 及 组件样式
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  data() {
    return {
      content: "", // 输入的markdown
      datapath: "",
      HTML: "",
      ruleForm: {
        id: "",
        title: "",
        soundCode: "",
        md_code: "",
        tap: "",
        createdate: "",
        updatedate: "",
      },
      options: [
        { value: "Main", label: "Main" },
        { value: "Js", label: "Js" },
        { value: "Vue", label: "Vue" },
        { value: "React", label: "React" },
        { value: "Java", label: "Java" },
        { value: "Springboot", label: "Springboot" },
        { value: "Mysql", label: "Mysql" },
        { value: "Nosql", label: "Nosql" },
        { value: "MQ", label: "MQ" },
        { value: "K8s", label: "K8s" },
        { value: "Go", label: "Go" },
        { value: "Linux", label: "Linux" },
        { value: "Nginx", label: "Nginx" },
        
      ],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        tap: [{ required: true, message: "请选择专栏", trigger: "change" }],
      },
    };
  },

  components: {
    mavonEditor,
  },

  methods: {
    // MD
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.HTML = render;
      this.ruleForm.md_code = value;
    },
    // MD/

    // 表单验证, 提交
    submitForm(formName) {
      const _this = this;
      // 获取当前系统时间
      Date.prototype.Format = function (fmt) {
        // author: meizz
        var o = {
          "M+": this.getMonth() + 1, // 月份
          "d+": this.getDate(), // 日
          "h+": this.getHours(), // 小时
          "m+": this.getMinutes(), // 分
          "s+": this.getSeconds(), // 秒
          "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
          S: this.getMilliseconds(), // 毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      const dateTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
      // new Date().Format("yyyy-MM-dd");   只要年月日方法

      this.ruleForm.updatedate = dateTime;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$axios
            .post("http://localhost:8182/textOne/update", this.ruleForm)
            .then(function (resp) {
              if (resp.data == 200) {
                _this.$alert(
                  "《" + _this.ruleForm.title + "》修改成功！",
                  "消息",
                  {
                    confirmButtonText: "确定",
                    // eslint-disable-next-line no-unused-vars
                    callback: (action) => {
                      _this.$refs[formName].resetFields(); // 重置表单
                      _this.$router.push("/");
                    },
                  }
                );
              }
            });
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },

    // 验证 form 表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 表单验证/
  },

  created() {
    const _this = this;
    this.$axios
      .get(
        "http://localhost:8182/textOne/findById/" + this.$route.query.id
      )
      .then(function (resp) {
        _this.ruleForm = resp.data;
        _this.content = resp.data.md_code;
      });
  },
};
</script>

<style scoped>
.y_form {
  /* width: 98%; */
  margin: 0 auto;
}
.y_title {
  width: 80%;
  margin: 0 0 5px 0;
  font-size: 900;
  padding: 30px 0;
  text-align: left;
}
.y_select {
  margin: 10px 0px 50px 50px;
}
.y_md {
  margin: 5px 5px;
  border: 1px solid #909399;
  border-radius: 10px;
}
.y_get {
  text-align: center;
}
</style>
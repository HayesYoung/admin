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
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      ruleForm: {
        title: "",
        soundCode: "",
        md_code: "",
        tap: "",
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
      this.ruleForm.soundCode = render;
      this.ruleForm.md_code = value;
    },
    // MD/

    // 表单验证, 提交
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete _this.ruleForm.createdate;
          delete _this.ruleForm.updatedate;
          _this.$axios
            // .post("http://120.77.211.147:8181/textOne/addText", this.ruleForm)
            .post("http://localhost:8182/textOne/addText", this.ruleForm)
            .then(function (resp) {
              if (resp.data == 200) {
                _this.$alert(
                  "《" + _this.ruleForm.title + "》提交成功！",
                  "消息",
                  {
                    confirmButtonText: "确定",
                    // eslint-disable-next-line no-unused-vars
                    callback: (action) => {
                      _this.$refs[formName].resetFields();
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 表单验证/
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
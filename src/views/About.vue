<template>
  <div class="about">
    <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="年龄" prop="age">
            <el-input ref="age" v-model.number="ruleForm.age"></el-input>
            <!-- 数字tooltip -->
            <!-- <el-tooltip placement="top">
              <div slot="content">
                {{ errorInfo("age").text }}
              </div>
              <span
                ><el-tag v-if="errorInfo('age').type">{{
                  errorInfo("age").index
                }}</el-tag></span
              >
            </el-tooltip> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class About extends Vue {
  FormData: any;
  ruleForm = {
    age: ""
  }
  checkAge = (rule: any, value: any, callback: any): any => {
    console.log(value);
    if (!value) {
      // 新增错误
      // useErrPush(this.errorList, {
      //   number: this.errorList.length,
      //   type: "age",
      //   text: "年龄不能为空",
      // });
      return callback(new Error("年龄不能为空"));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        // 新增错误
        // useErrPush(this.errorList, {
        //   number: this.errorList.length,
        //   type: "age",
        //   text: "请输入数字值",
        // });
        callback(new Error("请输入数字值"));
      } else {
        if (value < 18) {
          // 新增错误
          // useErrPush(this.errorList, {
          //   number: this.errorList.length,
          //   type: "age",
          //   text: "必须年满18岁",
          // });
          callback(new Error("必须年满18岁"));
        } else {
          // 校验通过，移除错误
          // useErrDel(this.errorList, "age");
          callback();
        }
      }
    }, 1000);
  };
  submitForm (name: string): void {
    this.FormData = this.$refs[name]
    this.FormData.validate((valid: boolean): void => {
      if (valid) {
        console.log("==ruleForm==",this.ruleForm)
        alert("submit!");
      }
    })
  }
  rules = {
    age: [{ validator: this.checkAge, trigger: "blur" }],
  }
}
</script>
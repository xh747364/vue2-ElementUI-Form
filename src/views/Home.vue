<template>
  <div id="app">
    <div class="container">
      <div class="form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              ref="pass"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>

            <!-- 数字tooltip -->
            <el-tooltip placement="top" v-if="errorInfo('pass').type">
              <div slot="content">
                {{ errorInfo("pass").text }}
              </div>
              <span
                ><el-tag >{{
                  errorInfo("pass").index
                }}</el-tag></span
              >
            </el-tooltip>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              ref="pass2"
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>

            <!-- 数字tooltip -->
            <el-tooltip placement="top" v-if="errorInfo('pass2').type">
              <div slot="content">
                {{ errorInfo("pass2").text }}
              </div>
              <span
                ><el-tag >{{
                  errorInfo("pass2").index
                }}</el-tag></span
              >
            </el-tooltip>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input ref="age" v-model.number="ruleForm.age"></el-input>
            <!-- 数字tooltip -->
            <el-tooltip placement="top" v-if="errorInfo('age').type">
              <div slot="content">
                {{ errorInfo("age").text }}
              </div>
              <span
                ><el-tag >{{
                  errorInfo("age").index
                }}</el-tag></span
              >
            </el-tooltip>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select
              ref="region"
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>

            <!-- 数字tooltip -->
            <el-tooltip placement="top" v-if="errorInfo('region').type">
              <div slot="content">
                {{ errorInfo("region").text }}
              </div>
              <span
                ><el-tag >{{
                  errorInfo("region").index
                }}</el-tag></span
              >
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="error-wrap">
        <div
          class="error-item"
          v-for="(item, index) in errorList"
          :key="index"
          @click="focusErrInput(item)"
        >
          <el-alert
            :title="'错误' + item.number"
            type="error"
            :description="item.text"
            show-icon
            :closable="false"
          >
          </el-alert>
        </div>
        <el-empty
          v-if="errorList.length == 0"
          description="暂无数据"
        ></el-empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { useErrPush, useErrDel } from "@/hooks/useErrorManage";
import { ErrorItem, RuleFormItem } from "@/interface/Home";

@Component
export default class Home extends Vue {
  errorList: ErrorItem[] = [];
  ruleForm: RuleFormItem = {
    pass: "",
    checkPass: "",
    age: "",
    region: "",
  };
  checkAge = (rule: any, value: any, callback: any): any => {
    if (!value) {
      // 新增错误
      useErrPush(this.errorList, {
        number: this.errorList.length,
        type: "age",
        text: "年龄不能为空",
      });
      return callback(new Error("年龄不能为空"));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        // 新增错误
        useErrPush(this.errorList, {
          number: this.errorList.length,
          type: "age",
          text: "请输入数字值",
        });
        callback(new Error("请输入数字值"));
      } else {
        if (value < 18) {
          // 新增错误
          useErrPush(this.errorList, {
            number: this.errorList.length,
            type: "age",
            text: "必须年满18岁",
          });
          callback(new Error("必须年满18岁"));
        } else {
          // 校验通过，移除错误
          useErrDel(this.errorList, "age");
          callback();
        }
      }
    }, 1000);
  };
  validatePass = (rule: any, value: any, callback: any): any => {
    if (value === "") {
      // 新增错误
      useErrPush(this.errorList, {
        number: this.errorList.length,
        type: "pass",
        text: "请输入密码",
      });
      callback(new Error("请输入密码"));
    } else {
      if (this.ruleForm.checkPass !== "") {
        // this.$refs.ruleForm.validateField("checkPass");
      }
      // 校验通过，移除错误
      useErrDel(this.errorList, "pass");
      callback();
    }
  };
  validatePass2 = (rule: any, value: any, callback: any): any => {
    if (value === "") {
      // 新增错误
      useErrPush(this.errorList, {
        number: this.errorList.length,
        type: "pass2",
        text: "请再次输入密码",
      });
      callback(new Error("请再次输入密码"));
    } else if (value !== this.ruleForm.pass) {
      // 新增错误
      useErrPush(this.errorList, {
        number: this.errorList.length,
        type: "pass2",
        text: "两次输入密码不一致",
      });
      callback(new Error("两次输入密码不一致!"));
    } else {
      // 校验通过，移除错误
      useErrDel(this.errorList, "pass2");
      callback();
    }
  };
  checkRegion = (rule: any, value: any, callback: any): any => {
    if (!value) {
      useErrPush(this.errorList, {
        number: this.errorList.length,
        type: "region",
        text: "地区不能为空",
      });
      return callback(new Error("地区不能为空"));
    } else {
      // 校验通过，移除错误
      useErrDel(this.errorList, "region");
      callback();
    }
  };
  rules = {
    pass: [{ validator: this.validatePass, trigger: "blur" }],
    checkPass: [{ validator: this.validatePass2, trigger: "blur" }],
    age: [{ validator: this.checkAge, trigger: "blur" }],
    region: [{ validator: this.checkRegion, trigger: "change" }],
  };
  // 数字提示
  errorInfo = (value: string): ErrorItem => {
    let errorInfos: any | ErrorItem = {};
    this.errorList.forEach((x: ErrorItem, k: number) => {
      if (x.type == value) {
        Object.assign(errorInfos, { ...x, index: k });
      }
    });
    // console.log("++++++", value, errorInfos);
    return errorInfos;
  };
  // 获取错误input焦点
  focusErrInput(item: ErrorItem): void {
    (this.$refs[item.type] as HTMLElement).focus();
    // this.$refs[item.type].focus();
  }
  FormData: any;
  // 提交
  submitForm = (formName: string): void => {
    // (this.$refs[formName] as Vue & {validate: any}).validate();
    this.FormData = this.$refs[formName];
    this.FormData.validate((valid: boolean) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!", formName, valid);
        return false;
      }
    });
  };
  // 重置
  resetForm = (formName: string): void => {
    this.FormData = this.$refs[formName];
    this.FormData.resetFields();
    // this.$refs[formName].resetFields();
  };
}
</script>
<style>
.el-form-item__error{
  display: none;
}
.error-item {
  margin-bottom: 20px;
  cursor: pointer;
}
.error-wrap {
  width: 35%;
  background: white;
  text-align: left;
  padding: 30px;
  box-sizing: border-box;
}
.form {
  width: 60%;
  background: white;
  padding: 30px;
  box-sizing: border-box;
  text-align: left;
}
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 40px;
}
html,
body {
  background: #f5f5f5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

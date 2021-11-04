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
            <el-tooltip placement="top">
              <div slot="content">
               {{errorInfo("pass").text}}
              </div>
              <span><el-tag v-if="errorInfo('pass').type">{{errorInfo("pass").index}}</el-tag></span>
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
            <el-tooltip placement="top">
              <div slot="content">
               {{errorInfo("pass2").text}}
              </div>
              <span><el-tag v-if="errorInfo('pass2').type">{{errorInfo("pass2").index}}</el-tag></span>
            </el-tooltip>

          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input ref="age" v-model.number="ruleForm.age"></el-input>
             <!-- 数字tooltip -->
            <el-tooltip placement="top">
              <div slot="content">
               {{errorInfo("age").text}}
              </div>
              <span><el-tag v-if="errorInfo('age').type">{{errorInfo("age").index}}</el-tag></span>
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
            <el-tooltip placement="top">
              <div slot="content">
               {{errorInfo("region").text}}
              </div>
              <span><el-tag v-if="errorInfo('region').type">{{errorInfo("region").index}}</el-tag></span>
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

<script>
/**
 * 新增错误
 * @param arr Array
 * @description 错误列表
 * 
 * @param newArr Object
 * @description 新增错误 标识 type，内容 text
 * 
 * @description 注：type判断唯一标识 需要给元素指定 ref=type，如果text修改也会触发更新
 */
const useArrPush = (arr, newArr) => {
  let flag = false;
  arr.forEach((x) => {
    if(x.type == newArr.type){
      flag = true;
      if(x.text != newArr.text){
        x.text = newArr.text
      }
    }
  });
  return flag ? arr : arr.push(newArr) && arr;
};
/**
 * 移除错误
 * @param arr Array
 * @description 错误列表
 * 
 * @param type String
 * @description 要移除的 type
 */
const useArrDel = (arr, type) => {
  let flag = -1;
  arr.forEach((x, k) => {
    x.type == type ? (flag = k) : false;
  });
  flag == -1 ? arr : arr.splice(flag, 1);
  return arr;
};
export default {
  name: "App",
  data() {
    var checkAge = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        // 新增错误
        useArrPush(this.errorList, {
          number: this.errorList.length,
          type: "age",
          text: "年龄不能为空",
        });
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          // 新增错误
          useArrPush(this.errorList, {
            number: this.errorList.length,
            type: "age",
            text: "请输入数字值",
          });
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            // 新增错误
            useArrPush(this.errorList, {
              number: this.errorList.length,
              type: "age",
              text: "必须年满18岁",
            });
            callback(new Error("必须年满18岁"));
          } else {
            // 校验通过，移除错误
            useArrDel(this.errorList, "age");
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      
      if (value === "") {
        // 新增错误
        useArrPush(this.errorList, {
          number: this.errorList.length,
          type: "pass",
          text: "请输入密码",
        });
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        // 校验通过，移除错误
        useArrDel(this.errorList, "pass");
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        // 新增错误
        useArrPush(this.errorList, {
          number: this.errorList.length,
          type: "pass2",
          text: "请再次输入密码",
        });
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        // 新增错误
        useArrPush(this.errorList, {
          number: this.errorList.length,
          type: "pass2",
          text: "两次输入密码不一致",
        });
        callback(new Error("两次输入密码不一致!"));
      } else {
        // 校验通过，移除错误
        useArrDel(this.errorList, "pass2");
        callback();
      }
    };
    const checkRegion = (rule, value, callback) => {
      
      if (!value) {
        useArrPush(this.errorList, {
          number: this.errorList.length,
          type: "region",
          text: "地区不能为空",
        });
        return callback(new Error("地区不能为空"));
      } else {
        // 校验通过，移除错误
        useArrDel(this.errorList, "region");
        callback();
      }
    };
    return {
      errorList: [],
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        region: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        region: [{ validator: checkRegion, trigger: "change" }],
      },
    };
  },
  methods: {
    // 数字提示
    errorInfo(value){
      let errorInfos = {}
      this.errorList.forEach((x, k)=> {
        if(x.type == value){
          Object.assign(errorInfos,{ ...x, index: k})
        }
      })
      console.log("++++++",value, errorInfos)
      return errorInfos
    },
    // 获取错误input焦点
    focusErrInput(item) {
      this.$refs[item.type].focus();
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!", formName, valid);
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
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

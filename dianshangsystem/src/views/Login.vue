<template>
  <div class="login">
    <div class="login-background">
      <div class="loginForm p-l-20 p-r-20">
        <div class="img">
          <img src="../assets/logo.png" />
        </div>
        <el-form ref="loginForm" :model="loginForm">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="login-button m-b-20">
              <el-button type="primary" @click="Login">登录</el-button>
              <el-button>重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    async Login() {
      const res = await this.$http.post("login", this.loginForm);
      console.log(res);
      if (res.meta.status == 200) {
        sessionStorage.token = res.data.token;
        this.$router.push({ path: "home" });
      }
      this.$message({
        message:
          res.meta.status == 200
            ? "恭喜您！登陆成功！"
            : "登陆失败！请检查用户名或密码！",
        type: res.meta.status == 200 ? "success" : "error",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-background {
  background: #2b4b6b;
  height: 100vh;
}
.loginForm {
  width: 400px;
  background-color: white;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding-top: 140px;
  border-radius: 5px;
  //   padding-bottom: 100px; ++++++++++
  .img {
    position: absolute;
    left: 50%;
    top: -25%;
    transform: translateX(-50%);
    background: #e3e3e3;
    border: 10px solid #fff;
    border-radius: 100%;
    box-shadow: 0 0 5px #e3e3e3;
    overflow: hidden;
    img {
      width: 130px;
    }
  }
}
.login-button {
  float: right;
}
</style>
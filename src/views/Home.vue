<template>
  <div class="home" v-loading.fullscreen.lock="loading">
    <el-container>
      <el-header>
        <div class="left">
          <img class="img m-r-20" src="../assets/logo.png" />
          <span class="title">商城后台管理系统</span>
        </div>
        <div class="right">
          <el-button type="danger" @click="Quit">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="isCollapse" @click="Collapse">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            router
            :collapse="isCollapse"
            unique-opened
            :collapse-transition="false"
            :default-active="href"
          >
            <el-submenu
              v-for="item in menus"
              :key="item.id"
              :index="'/' + item.path"
            >
              <template slot="title">
                <i :class="'el-icon-s-' + icon[item.id]"></i>
                <span class="m-r-50">{{ item.authName }}</span>
              </template>
              <el-menu-item
                v-for="i in item.children"
                :key="i.id"
                :index="'/' + i.path"
              >
                <template>
                  <i class="el-icon-s-operation"></i>
                  <span>{{ i.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      //菜单栏
      menus: [],
      icon: {
        125: "custom",
        103: "order",
        101: "goods",
        102: "tools",
        145: "marketing",
      },
      //折叠开关
      isCollapse: false,
      href: "",
    };
  },
  created() {
    this.Home();
    this.href = window.location.href.split("#")[1];
  },
  methods: {
    async Home() {
      this.loading = true;
      if (!sessionStorage.menus) {
        const res = await this.$http.get("menus");
        if (res.meta.status == 200) {
          sessionStorage.menus = JSON.stringify(res.data);
          this.menus = res.data;
        }
      }
      this.menus = JSON.parse(sessionStorage.menus);
      this.loading = false;
    },
    Collapse() {
      this.isCollapse = !this.isCollapse;
    },
    Quit() {
      this.$message({
        type: "success",
        message: "登出成功！",
      });
      window.sessionStorage.token = "";
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang="less">
.el-header {
  background-color: #666;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  background-color: #333744;
  text-align: center;
  height: calc(100vh - 60px);
}
.el-menu {
  border: none;
}

.el-main {
  background-color: #e9eef3;
  height: calc(100vh - 60px);
}
.left {
  display: flex;
  .img {
    width: 60px;
  }
  .title {
    color: #fff;
  }
}

.isCollapse {
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  background-color: rgb(30, 155, 123);
}
</style>
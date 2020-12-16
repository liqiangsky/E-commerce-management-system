<template>
  <div class="users">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20">
      <el-form :inline="true" :model="queryinfo">
        <el-form-item>
          <el-input
            v-model="queryinfo.query"
            placeholder="请输入内容"
            class="search"
            clearable
            @clear="Clear"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="Search"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="m-l-10" @click="Add"
            >添加用户</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" width="50" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state" width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="SwitchState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button
              @click="Edit(scope.row)"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="Delete(scope.row)"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <el-button
              @click="Edit(scope.row)"
              type="warning"
              icon="el-icon-s-tools"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="m-t-20"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      :title="title ? '添加用户' : '修改用户'"
      :visible.sync="dialogVisible"
      width="50%"
      :destroy-on-close="true"
    >
      <el-form
        ref="UserForm"
        :rules="rules"
        :model="UserForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username" v-if="title"
          ><el-input v-model="UserForm.username"></el-input
        ></el-form-item>
        <el-form-item label="密码" prop="password" v-if="title"
          ><el-input v-model="UserForm.password"></el-input
        ></el-form-item>
        <el-form-item label="用户名" v-if="!title"
          ><el-input disabled v-model="UserForm.username"></el-input
        ></el-form-item>
        <el-form-item label="邮箱" prop="email"
          ><el-input v-model="UserForm.email"></el-input
        ></el-form-item>
        <el-form-item label="手机号" prop="mobile"
          ><el-input v-model="UserForm.mobile"></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitForm('UserForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //用户列表
      queryinfo: {
        //关键字
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      tableData: [],
      //总数
      total: 0,
      dialogVisible: false,
      //用户编辑
      UserForm: {
        id: "",
        username: "",
        email: "",
        mobile: "",
      },
      title: false,
      type: "success",
      message: "获取用户数据成功！",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  created() {
    this.queryinfo.pagenum = 1;
    this.queryinfo.pagesize = 5;
    this.Users();
  },
  methods: {
    async Users() {
      const res = await this.$http.get("users", {
        params: this.queryinfo,
      });
      if (res.meta.status == 200) {
        this.$message({
          type: this.type,
          message: this.message,
        });
        this.tableData = res.data.users;
        this.total = res.data.total;
      }
    },
    Search() {
      this.queryinfo.pagenum = 1;
      this.type = "success";
      this.message = "获取用户数据成功！";
      this.Users();
    },
    Clear() {
      this.queryinfo.pagenum = 1;
      this.type = "success";
      this.message = "获取用户数据成功！";
      this.Users();
    },
    Add() {
      this.title = true;
      this.dialogVisible = true;
    },
    Edit(row) {
      this.title = false;
      this.dialogVisible = true;
      this.UserForm = {
        id: row.id,
        username: row.username,
        email: row.email,
        mobile: row.mobile,
      };
    },
    Delete(row) {
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${row.id}`);
          if (res.meta.status == 200) {
            this.tableData.length === 1
              ? (this.queryinfo.pagenum = this.queryinfo.pagenum - 1)
              : "";
            this.queryinfo.pagenum < 1 ? (this.queryinfo.pagenum = 1) : "";
            this.type = "success";
            this.message = "删除用户成功！";
            this.Users();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    SubmitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          switch (this.title) {
            case false:
              var res = await this.$http.put(`users/${this.UserForm.id}`, {
                email: this.UserForm.email,
                mobile: this.UserForm.mobile,
              });
              if (res.meta.status == 200) {
                this.type = "success";
                this.message = "修改用户信息成功！";
                this.Users();
                this.dialogVisible = false;
              }
              break;
            case true:
              var res = await this.$http.post("users", {
                username: this.UserForm.username,
                password: this.UserForm.password,
                email: this.UserForm.email,
                mobile: this.UserForm.mobile,
              });
              if (res.meta.status == 201) {
                this.type = "success";
                this.message = "添加用户信息成功！";
                this.Users();
                this.dialogVisible = false;
              } else {
                this.type = "error";
                this.message = "用户已存在！";
                this.Users();
              }
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async SwitchState(row) {
      const res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`);
      if (res.meta.status == 200) {
        this.type = "success";
        this.message = "更新用户状态成功！";
        this.Users();
      }
    },
    handleSizeChange(val) {
      this.type = "success";
      this.message = "获取用户数据成功！";
      this.queryinfo.pagesize = val;
      this.Users();
    },
    handleCurrentChange(val) {
      this.type = "success";
      this.message = "获取用户数据成功！";
      this.queryinfo.pagenum = val;
      this.Users();
    },
  },
};
</script>
<style lang="less" scoped>
.search {
  width: 500px;
}
</style>
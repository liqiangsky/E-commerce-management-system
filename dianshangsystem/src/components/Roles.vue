<template>
  <div class="roles">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20">
      <el-button type="primary" @click="Operation('Add')">添加角色</el-button>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
        class="m-t-20"
      >
        <el-table-column width="50" type="expand">
          <template slot-scope="scope">
            <el-row
              class="center"
              v-for="(i, index) in scope.row.children"
              :key="i.id + i.authName"
              :class="['border-bottom', index === 0 ? 'border-top' : '']"
            >
              <!-- 一级权限 -->
              <el-col :span="4">
                <el-tag
                  type="danger"
                  closable
                  @close="CloseTag(scope.row, i, scope.row.children)"
                  class="m-10"
                  >{{ i.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限 -->
              <el-col :span="20">
                <el-row
                  v-for="(j, index) in i.children"
                  :key="j.id + j.authName"
                  :class="[index !== 0 ? 'border-top' : '']"
                >
                  <el-col :span="4">
                    <el-tag
                      type="success"
                      closable
                      @close="CloseTag(scope.row, j, i.children)"
                      class="m-10"
                      >{{ j.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="20">
                    <el-tag
                      type="warning"
                      closable
                      @close="CloseTag(scope.row, k, j.children)"
                      class="m-10"
                      v-for="k in j.children"
                      :key="k.id + k.authName"
                      >{{ k.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" width="50" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="Operation('Edit', scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="Delete(scope.row)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="small"
              @click="Operation('Setting', scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="true"
      >
        <el-form
          ref="RoleForm"
          :model="RoleForm"
          :rules="rules"
          label-width="80px"
          v-show="title !== '分配权限'"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="RoleForm.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              v-model="RoleForm.roleDesc"
              placeholder="请输入角色描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-tree
          ref="RoleTree"
          :data="data"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          :default-checked-keys="GetCheck"
          default-expand-all
          v-show="title === '分配权限'"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="SubmitForm(FormName)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      data: [],
      dialogVisible: false,
      title: "",
      FormName: "",
      type: "success",
      message: "获取角色列表成功！",
      GetCheck: [],
      RoleForm: {
        id: "",
        roleName: "",
        roleDesc: "",
      },
      defaultProps: {
        children: "children",
        label: "authName",
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.Roles();
  },
  methods: {
    async Roles() {
      this.loading = true;
      const res = await this.$http.get("roles");
      if (res.meta.status == 200) {
        this.$message({
          type: this.type,
          message: this.message,
        });
        this.tableData = res.data;
        this.loading = false;
      }
    },
    async Operation(type, row) {
      switch (type) {
        case "Add":
          this.title = "添加角色";
          this.FormName = "RoleForm";
          break;
        case "Edit":
          this.title = "修改角色";
          this.FormName = "RoleForm";
          this.RoleForm.id = row.id;
          this.RoleForm.roleName = row.roleName;
          this.RoleForm.roleDesc = row.roleDesc;
          break;
        case "Setting":
          this.title = "分配权限";
          this.RoleForm.id = row.id;
          this.FormName = "RoleTree";
          this.GetCheck = [];
          this.GetCheckList(row, this.GetCheck);
          var res = await this.$http.get("rights/tree");
          this.data = res.data;
      }
      this.dialogVisible = true;
    },
    //三级权限所有id,递归函数
    GetCheckList(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.GetCheckList(item, arr));
    },
    CloseTag(row, right, arr) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(
            `roles/${row.id}/rights/${right.id}`
          );
          if (res.meta.status == 200) {
            arr.splice(arr.indexOf(right), 1);
            this.$message({
              type: "success",
              message: "取消分配权限成功！",
            });
            this.dialogVisible = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async SubmitForm(formName) {
      if (formName === "RoleTree") {
        const arr = [
          ...this.$refs[formName].getCheckedKeys(),
          ...this.$refs[formName].getHalfCheckedKeys(),
        ];
        const res = await this.$http.post(`roles/${this.RoleForm.id}/rights`, {
          rids: arr.join(","),
        });
        if (res.meta.status == 200) {
          this.type = "success";
          this.message = "分配权限成功！";
          this.dialogVisible = false;
          this.Roles();
        } else {
          this.type = "error";
          this.message = "error";
        }
      } else {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            switch (this.title) {
              case "添加角色":
                var res = await this.$http.post("roles", this.RoleForm);
                if (res.meta.status == 201) {
                  this.type = "success";
                  this.message = "添加角色信息成功！";
                  this.Roles();
                  this.dialogVisible = false;
                } else {
                  this.type = "error";
                  this.message = "error";
                }
                break;
              case "修改角色":
                var res = await this.$http.put(`roles/${this.RoleForm.id}`, {
                  roleName: this.RoleForm.roleName,
                  roleDesc: this.RoleForm.roleDesc,
                });
                if (res.meta.status == 200) {
                  this.type = "success";
                  this.message = "修改角色成功!";
                  this.Roles();
                  this.dialogVisible = false;
                } else {
                  this.type = "error";
                  this.message = "error";
                }
                break;
            }
          } else {
            this.$message.error("请先按要求填写信息！");
            return false;
          }
        });
      }
    },
    Delete(row) {
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`roles/${row.id}`);
          if (res.meta.status == 200) {
            this.type = "success";
            this.message = "删除用户成功！";
            this.Roles();
            this.dialogVisible = false;
          } else {
            this.type = "error";
            this.message = "error";
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="less">
.border-top {
  border-top: 1px solid #e3e3e3;
}
.border-bottom {
  border-bottom: 1px solid #e3e3e3;
}
.center {
  display: flex;
  align-items: center;
}
</style>
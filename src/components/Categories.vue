<template>
  <div class="categories">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20">
      <el-button type="primary" @click="Operation('', 'Add')"
        >添加分类</el-button
      >
      <el-table
        class="m-t-20"
        :data="tableData"
        border
        row-key="cat_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column label="分类名称" prop="cat_name"> </el-table-column>
        <el-table-column label="是否有效">
          <i class="el-icon-success" style="color: lightgreen"></i>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.cat_level === 0" type="danger"
              >一级</el-tag
            >
            <el-tag v-show="scope.row.cat_level === 1" type="success"
              >二级</el-tag
            >
            <el-tag v-show="scope.row.cat_level === 2" type="warning"
              >三级</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="Operation(scope.row, 'Edit')"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="Operation(scope.row, 'Delete')"
              >删除</el-button
            >
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
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"
        @closed="handelClose"
      >
        <el-form
          ref="categoriesForm"
          :model="categoriesForm"
          :rules="rules"
          label-width="80px"
        >
          <div v-show="title === '添加分类'">
            <el-form-item label="分类名称" prop="cat_name">
              <el-input v-model="categoriesForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
              <el-cascader
                v-model="selectedKeys"
                expand-trigger="hover"
                :options="options"
                :props="props"
                clearable
                style="width: 100%"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </div>
          <el-form-item label="分类名称" v-show="title === '编辑分类'">
            <el-input v-model="categoriesForm.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="SubmitForm('categoriesForm')"
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
      dialogVisible: false,
      queryinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      tableData: [],
      total: 0,
      type: "",
      message: "",
      title: "",
      selectedKeys: [],
      categoriesForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      cat_id: "",
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      options: [],
      props: {
        checkStrictly: true,
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      mode: "",
    };
  },
  created() {
    this.Categories();
  },
  methods: {
    async Categories() {
      const res = await this.$http.get(`categories`, {
        params: this.queryinfo,
      });
      if (res.meta.status == 200) {
        this.type = "success";
        this.message = "获取商品分类成功！";
        this.tableData = res.data.result;
        this.total = res.data.total;
      } else {
        this.type = "error";
        this.message = "获取商品分类失败！";
      }
      this.$message({
        type: this.type,
        message: this.message,
      });
    },
    async Operation(row, type) {
      switch (type) {
        case "Add":
          this.title = "添加分类";
          this.mode = type;
          const res = await this.$http.get("categories", {
            params: {
              type: 2,
            },
          });
          if (res.meta.status == 200) {
            this.options = res.data;
          }
          this.dialogVisible = true;
          break;
        case "Edit":
          this.title = "编辑分类";
          this.mode = type;
          this.categoriesForm.cat_name = row.cat_name;
          this.cat_id = row.cat_id;
          this.dialogVisible = true;
          break;
        case "Delete":
          this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              const res = await this.$http.delete(`categories/${row.cat_id}`);
              if (res.meta.status == 200) {
                this.type = "success";
                this.message = "删除成功！";
                if (this.tableData.length === 1) {
                  this.queryinfo.pagenum = this.queryinfo.pagenum - 1;
                }
                this.Categories();
              } else {
                this.type = "error";
                this.message = "error";
              }
              this.$message({
                type: this.type,
                message: this.message,
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
          break;
      }
    },
    handleChange(val) {
      if (this.selectedKeys.length > 0) {
        this.categoriesForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ];
        this.categoriesForm.cat_level = this.selectedKeys.length;
        return;
      } else {
        this.categoriesForm.cat_pid = 0;
        this.categoriesForm.cat_level = 0;
      }
    },
    SubmitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          switch (this.mode) {
            case "Add":
              const res = await this.$http.post(
                `categories`,
                this.categoriesForm
              );
              if (res.meta.status == 201) {
                this.type = "success";
                this.message = "添加分类成功！";
                this.Categories();
                this.dialogVisible = false;
              } else {
                this.type = "error";
                this.message = "添加分类失败！";
              }
              break;
            case "Edit":
              const res1 = await this.$http.put(`categories/${this.cat_id}`, {
                cat_name: this.categoriesForm.cat_name,
              });
              if (res1.meta.status == 200) {
                this.type = "success";
                this.message = "更新分类名称成功！";
                this.Categories();
                this.dialogVisible = false;
              } else {
                this.type = "error";
                this.message = "更新分类名称失败！";
              }
              break;
          }
        } else {
          this.type = "error";
          this.message = "请先按要求填写信息！";
        }
        this.$message({
          type: this.type,
          message: this.message,
        });
      });
    },
    handleSizeChange(val) {
      this.queryinfo.pagesize = val;
      this.Categories();
    },
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val;
      this.Categories();
    },
    handelClose() {
      this.categoriesForm.cat_name = "";
    },
  },
};
</script>
<style lang="less" scoped>
</style>
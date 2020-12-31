<template>
  <div class="params">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
      >
      </el-alert>
      <el-form ref="ParamsForm" :model="ParamsForm" class="m-t-20">
        <el-form-item label="选择商品分类:">
          <el-cascader
            v-model="ParamsForm.goods_cat"
            :options="options"
            :props="props"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <el-tabs v-model="active" :before-leave="handleLeave">
        <el-tab-pane label="动态参数" name="0">
          <el-button
            type="primary"
            size="mini"
            :disabled="Goods_cat.length !== 3"
            @click="Add('many')"
            >添加参数</el-button
          >
          <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width: 100%"
            class="m-t-20"
          >
            <el-table-column width="50" type="expand">
              <template slot-scope="scope">
                <el-tag
                  class="m-10"
                  v-for="(tag, index) in scope.row.attr_vals"
                  :key="tag + index + Math.random()"
                  closable
                  :disable-transitions="true"
                  @close="handleClose(scope.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              label="#"
              width="50"
              type="index"
            ></el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="Edit(scope.row, sel)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="Delete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="1">
          <el-button
            type="primary"
            size="mini"
            :disabled="Goods_cat.length !== 3"
            @click="Add('only')"
            >添加参数</el-button
          >
          <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width: 100%"
            class="m-t-20"
          >
            <el-table-column width="50" type="expand">
              <template slot-scope="scope">
                <el-tag
                  class="m-10"
                  v-for="(tag, index) in scope.row.attr_vals"
                  :key="tag + index + Math.random()"
                  closable
                  :disable-transitions="true"
                  @close="handleClose(scope.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              label="#"
              width="50"
              type="index"
            ></el-table-column>
            <el-table-column label="属性名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="Edit(scope.row, sel)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="Delete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="true"
      >
        <el-form
          ref="ParameterForm"
          :model="ParameterForm"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item :label="label" prop="attr_name">
            <el-input v-model="ParameterForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="SubmitForm('ParameterForm')"
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
      title: "",
      label: "",
      ParameterForm: {
        attr_name: "",
        attr_sel: "",
        attr_vals: "",
      },
      attr_id: 0,
      ParamsForm: {
        goods_cat: [],
      },
      type: "",
      message: "",
      options: [],
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      Goods_cat: [],
      active: "0",
      loading: false,
      tableData: [],
      sel: "many",
      rules: {
        attr_name: [
          { required: true, message: "此选项不能为空！", trigger: "blur" },
        ],
      },
      mode: "",
    };
  },
  created() {
    this.Goods();
  },
  methods: {
    //所有商品分类
    async Goods() {
      const res = await this.$http.get("categories");
      if (res.meta.status == 200) {
        this.options = res.data;
        this.type = "success";
        this.message = "获取商品分类成功！";
      } else {
        this.type = "error";
        this.message = "获取商品分类失败！";
      }
      this.$message({
        type: this.type,
        message: this.message,
      });
    },
    //切换分类
    handleChange(value) {
      this.Goods_cat = value;
      this.attr_vals();
    },
    //切换静态动态参数类型
    handleLeave(activeName, oldActiveName) {
      switch (+activeName) {
        case 0:
          this.sel = "many";
          break;
        case 1:
          this.sel = "only";
          break;
      }
      if (this.Goods_cat.length === 3) {
        this.attr_vals();
      }
    },
    //参数列表
    async attr_vals() {
      const res = await this.$http.get(`categories/${this.cateid}/attributes`, {
        params: {
          sel: this.sel,
        },
      });
      if (res.meta.status == 200) {
        res.data.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals =
            item.attr_vals !== "" ? item.attr_vals.split(" ") : [];
        });
        this.tableData = res.data;
        this.type = "success";
        this.message = "获取参数列表成功！";
      } else {
        this.type = "error";
        this.message = "获取参数列表失败！";
      }
      this.$message({
        type: this.type,
        message: this.message,
      });
    },
    //新增
    Add(sel) {
      this.dialogVisible = true;
      this.ParameterForm.attr_name = "";
      this.mode = "post";
      switch (sel) {
        case "many":
          this.title = "添加动态参数";
          this.label = "动态参数";
          break;
        case "only":
          this.title = "添加静态属性";
          this.label = "静态属性";
          break;
      }
    },
    //编辑
    Edit(row, sel) {
      this.dialogVisible = true;
      this.mode = "put";
      switch (sel) {
        case "many":
          this.title = "修改动态参数";
          this.label = "动态参数";
          this.sel = sel;
          break;
        case "only":
          this.title = "修改静态属性";
          this.label = "静态属性";
          this.sel = sel;
          break;
      }
      this.attr_id = row.attr_id;
      this.ParameterForm.attr_sel = sel;
      this.ParameterForm.attr_vals = row.attr_vals;
      this.ParameterForm.attr_name = row.attr_name;
    },
    //提交
    SubmitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          switch (this.mode) {
            case "put":
              const res = await this.$http.put(
                `categories/${this.cateid}/attributes/${this.attr_id}`,
                this.ParameterForm
              );
              if (res.meta.status == 200) {
                this.type = "success";
                switch (this.sel) {
                  case "many":
                    this.message = "修改动态参数成功！";
                    break;
                  case "only":
                    this.message = "修改静态参数成功！";
                    break;
                }
                const i = this.tableData.find((item) => {
                  return item.attr_id === res.data.attr_id;
                });
                i.attr_name = res.data.attr_name;
                this.dialogVisible = false;
              } else {
                this.type = "error";
                switch (this.sel) {
                  case "many":
                    this.message = "修改动态参数失败！";
                    break;
                  case "only":
                    this.message = "修改静态参数失败！";
                    break;
                }
              }
              break;
            case "post":
              const res1 = await this.$http.post(
                `categories/${this.cateid}/attributes`,
                {
                  attr_name: this.ParameterForm.attr_name,
                  attr_sel: this.sel,
                }
              );
              if (res1.meta.status == 201) {
                this.type = "success";
                switch (this.sel) {
                  case "many":
                    this.message = "添加动态参数成功！";
                    break;
                  case "only":
                    this.message = "添加静态参数成功！";
                    break;
                }
                this.tableData.push(res1.data);
                this.dialogVisible = false;
              } else {
                this.type = "error";
                switch (this.sel) {
                  case "many":
                    this.message = "添加动态参数失败！";
                    break;
                  case "only":
                    this.message = "添加静态参数失败！";
                    break;
                }
              }
          }
        } else {
          this.type = "error";
          this.message = "error";
        }
        this.$message({
          type: this.type,
          message: this.message,
        });
      });
    },
    //参数删除
    Delete(row) {
      this.$confirm("此操作将永久删除该参/属性, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(
            `categories/${row.cat_id}/attributes/${row.attr_id}`
          );
          if (res.meta.status == 200) {
            this.type = "success";
            this.message = res.meta.msg;
            const i = this.tableData.findIndex((item) => {
              return item.attr_id === row.attr_id;
            });
            this.tableData.splice(i, 1);
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
    },
    //tag关闭
    handleClose(row, tag) {
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1);
      this.Vals(row);
    },
    //new tag input /自动获取焦点
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //更新参数vals
    async Vals(row) {
      const res = await this.$http.put(
        `categories/${row.cat_id}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: this.sel,
          attr_vals: row.attr_vals.join(" "),
        }
      );
      if (res.meta.status == 200) {
        this.type = "success";
        this.message = "修改参数项成功！";
      } else {
        this.type = "success";
        this.message = "修改参数项失败！";
      }
      this.$message({
        type: this.type,
        message: this.message,
      });
    },
    //new tag 与 输入框切换
    async handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (inputValue.trim().length !== 0) {
        row.attr_vals.push(inputValue.trim());
        this.Vals(row);
      }
      row.inputVisible = false;
      row.inputValue = "";
    },
  },
  //计算属性分类id
  computed: {
    cateid() {
      if (this.Goods_cat.length === 3) {
        return this.Goods_cat[2];
      }
    },
  },
};
</script>
<style lang="less">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 150px !important;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<template>
  <div class="goods_add">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20">
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <el-steps
        :active="+active"
        align-center
        finish-status="success"
        space="150px"
        class="m-30"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <el-form
        ref="InformationForm"
        :model="InformationForm"
        :rules="rules"
        label-position="top"
      >
        <el-tabs
          v-loading="loading"
          v-model="active"
          tab-position="left"
          :before-leave="BeforeLeaveTab"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="InformationForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input
                type="number"
                v-model="InformationForm.goods_price"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                type="number"
                v-model="InformationForm.goods_weight"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                type="number"
                v-model="InformationForm.goods_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="InformationForm.goods_cat"
                :options="options"
                :props="props"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="item in Manyattrs"
              :key="item.attr_id + item.attr_name"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="i in item.attr_vals"
                  :key="i + Math.random()"
                  :label="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="item in Onlyattrs"
              :key="item.attr_id + item.attr_name"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="i in item.attr_vals"
                  :key="i + Math.random()"
                  :label="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="UpUrl"
              list-type="picture"
              class="upload-demo"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="OnSuccess"
              :headers="headers"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              class="quill-editor"
              v-model="InformationForm.goods_introduce"
            >
            </quill-editor>
            <el-button type="primary" class="m-t-20" @click="SubmitForm"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
        <el-image style="width: 100%; height: 100%" :src="url"> </el-image>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      UpUrl: "http://timemeetyou.com:8889/api/private/v1/upload",
      url: "",
      headers: {
        Authorization: window.sessionStorage.token,
      },
      active: "0",
      type: "",
      message: "",
      InformationForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      Manyattrs: [],
      Onlyattrs: [],
      Goods_cat: [],
      options: [],
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.Goods();
  },
  methods: {
    async Goods() {
      const res = await this.$http.get("categories");
      if (res.meta.status == 200) {
        this.options = res.data;
      }
    },
    async Categories(active) {
      this.loading = true;
      switch (active) {
        case "1":
          var res = await this.$http.get(
            `categories/${this.cateid}/attributes`,
            {
              params: {
                sel: "many",
              },
            }
          );
          break;
        case "2":
          var res = await this.$http.get(
            `categories/${this.cateid}/attributes`,
            {
              params: {
                sel: "only",
              },
            }
          );
          break;
      }
      if (res.meta.status == 200) {
        res.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ");
        });
        switch (active) {
          case "1":
            this.Manyattrs = [];
            this.Manyattrs = res.data;
            this.type = "success";
            this.message = "获取动态参数成功！";
            break;
          case "2":
            this.Onlyattrs = [];
            this.Onlyattrs = res.data;
            this.type = "success";
            this.message = "获取静态参数成功！";
            break;
        }
      } else {
        this.type = "error";
        this.message = "error";
      }
      this.$message({
        type: this.type,
        message: this.message,
      });
      this.loading = false;
    },
    Attr(attrs, arr) {
      attrs.forEach((element) => {
        const obj = {
          attr_id: element.attr_id,
          attr_value: element.attr_vals.join(" "),
        };
        arr.push(obj);
      });
    },
    async SubmitForm() {
      this.InformationForm.attrs = [];
      this.InformationForm.goods_cat = this.Goods_cat.join(",");
      this.Attr(this.Manyattrs, this.InformationForm.attrs);
      this.Attr(this.Onlyattrs, this.InformationForm.attrs);
      const res = await this.$http.post("goods", this.InformationForm);
      if (res.meta.status == 201) {
        this.$router.push("/goods");
        this.type = "success";
        this.message = res.meta.msg;
      } else {
        this.type = "error";
        this.message = res.meta.msg;
      }
      this.$message({
        type: this.type,
        message: this.message,
      });
    },
    BeforeLeaveTab(activename, oldactivename) {
      if (oldactivename === "0") {
        this.$refs.InformationForm.validate((valid) => {
          if (!valid) {
            this.$message.error("请先按要求填写信息！");
          }
        });
      }
      if (
        (oldactivename === "0" && this.Goods_cat.length !== 3) ||
        this.InformationForm.goods_name === ""
      ) {
        return false;
      }
      if (+activename === 1 || +activename === 2) this.Categories(activename);
    },
    OnSuccess(response, file, fileList) {
      if (response.meta.status == 200) {
        this.$message({
          type: "success",
          message: "图片暂存成功！",
        });
        this.InformationForm.pics.push(response.data.tmp_path);
      }
    },
    handleRemove(file, fileList) {
      const index = this.InformationForm.pics.findIndex((item) => {
        return file.response.data.tmp_path === item;
      });
      this.InformationForm.pics.splice(index, 1);
    },
    handlePreview(file) {
      this.dialogVisible = true;
      this.url = file.response.data.url;
    },
    handleChange(value) {
      this.Goods_cat = value;
    },
  },
  computed: {
    cateid() {
      if (this.Goods_cat.length === 3) {
        return this.Goods_cat[2];
      }
      return null;
    },
  },
};
</script>
<style lang="less">
.ql-editor {
  min-height: 300px;
}
</style>
<template>
  <div class="goods">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20" v-loading="loading">
      <el-form ref="queryinfo" :model="queryinfo" :inline="true">
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
          <el-button type="primary" class="m-l-10" @click="Operation('add')"
            >添加商品</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          label="商品名称"
          prop="goods_name"
          width="900"
        ></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
        ></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间" prop="add_time">
          <template slot-scope="scope">
            {{ scope.row.add_time | FormatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="Delete(scope.row)"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      type: "success",
      message: "获取商品列表成功！",
    };
  },
  created() {
    this.Goods();
  },
  methods: {
    async Goods() {
      this.loading = true;
      const res = await this.$http.get("goods", {
        params: this.queryinfo,
      });
      if (res.meta.status == 200) {
        this.$message({
          type: this.type,
          message: this.message,
        });
        this.tableData = res.data.goods;
        this.total = res.data.total;
        this.loading = false;
      }
    },
    Operation(type, row) {
      switch (type) {
        case "add":
          this.$router.push({
            path: `/goods/${type}`,
          });
          break;
      }
    },
    Search() {
      this.queryinfo.pagenum = 1;
      this.type = "success";
      this.message = "获取商品列表成功！";
      this.Goods();
    },
    Clear() {
      this.queryinfo.pagenum = 1;
      this.type = "success";
      this.message = "获取商品列表成功！";
      this.Goods();
    },
    Delete(row) {
      this.$confirm("此操作将永久删除该商品信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`goods/${row.goods_id}`);
          if (res.meta.status == 200) {
            this.type = "success";
            this.message = "删除商品信息成功！";
            this.Goods();
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
    handleSizeChange(val) {
      this.queryinfo.pagesize = val;
      this.Goods();
    },
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val;
      this.Goods();
    },
  },
};
</script>
<style lang="less" scoped>
.search {
  width: 500px;
}
</style>
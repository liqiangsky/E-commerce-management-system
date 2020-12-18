<template>
  <div class="rights">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag
              v-show="scope.row.level === '0'"
              :type="scope.row.level === '0' ? 'danger' : ''"
              >一级权限</el-tag
            >
            <el-tag
              v-show="scope.row.level === '1'"
              :type="scope.row.level === '1' ? 'success' : ''"
              >二级权限</el-tag
            >
            <el-tag
              v-show="scope.row.level === '2'"
              :type="scope.row.level === '2' ? 'warning' : ''"
              >三级权限</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      loading: false,
    };
  },
  created() {
    this.Rights();
  },
  methods: {
    async Rights() {
      this.loading = true;
      const res = await this.$http.get("rights/list");
      if (res.meta.status == 200) {
        this.tableData = res.data;
        this.$message({
          type: "success",
          message: "获取权限列表成功！",
        });
        this.loading = false;
      } else {
        this.$message({
          type: "error",
          message: "error",
        });
      }
    },
  },
};
</script>
<template>
  <div class="reports">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20">
      <div id="main" style="width: 100%; height: 700px"></div>
    </el-card>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      type: "",
      message: "",
      result: "",
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var echarts = require("echarts");
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    const res = await this.$http.get("reports/type/1");
    if (res.meta.status == 200) {
      this.type = "success";
      this.message = "获取报表数据成功！";
      this.result = _.merge(res.data, this.options);
    } else {
      this.type = "error";
      this.message = "获取报表数据失败！";
    }
    this.$message({
      type: this.type,
      message: this.message,
    });
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.result);
  },
};
</script>
<style lang="less" scoped>
</style>
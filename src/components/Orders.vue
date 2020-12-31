<template>
  <div class="orders">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="m-t-20">
      <el-input v-model="queryinfo.query" placeholder="请输入内容">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="Orders"
        ></el-button>
      </el-input>
      <el-table :data="tableData" border class="m-t-20">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_number"
          width="980"
        ></el-table-column>
        <el-table-column
          label="订单价格"
          prop="order_price"
          width="100"
        ></el-table-column>
        <el-table-column label="是否付款" prop="order_pay" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.pay_status === '0' ? 'danger' : 'success'"
              >{{ scope.row.pay_status === "0" ? "未付款" : "已付款" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          label="是否发货"
          prop="is_send"
          width="100"
        ></el-table-column>
        <el-table-column label="下单时间" width="170">
          <template slot-scope="scope">{{
            scope.row.create_time | FormatDate
          }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="Operation(scope.row, 'Edit')"
            ></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location"
              @click="Operation(scope.row, 'Location')"
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
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"
        @close="handleClose"
      >
        <el-form
          ref="informationalForm"
          :model="informationalForm"
          :rules="rules"
          v-if="title === '修改地址'"
        >
          <el-form-item label="省市区/县" prop="location" label-width="90px">
            <el-cascader
              style="width: 100%"
              v-model="informationalForm.citys"
              :options="cityOptions"
              :props="props"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address" label-width="90px">
            <el-input
              v-model="informationalForm.address"
              placeholder="请输入详细地址"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-timeline :reverse="reverse" v-else>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.time"
            :type="activity.type"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
        <span slot="footer" class="dialog-footer" v-show="title === '修改地址'">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import cityOptions from "../assets/js/city_data2017_element";
export default {
  data() {
    return {
      dialogVisible: false,
      title: "",
      tableData: [],
      total: 0,
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "",
      },
      cityOptions: cityOptions,
      props: {
        label: "label",
        value: "value",
        children: "children",
        expandTrigger: "hover",
      },
      type: "",
      message: "",
      informationalForm: {
        citys: [],
        address: "",
      },
      rules: {
        location: [
          { required: true, message: "请选择具体城市", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      reverse: false,
      activities: [
        {
          time: "2018-05-10 09:39:00",
          ftime: "2018-05-10 09:39:00",
          context: "已签收,感谢使用顺丰,期待再次为您服务",
          location: "",
          type:'success'
        },
        {
          time: "2018-05-10 08:23:00",
          ftime: "2018-05-10 08:23:00",
          context:
            "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
          location: "",
        },
        {
          time: "2018-05-10 07:32:00",
          ftime: "2018-05-10 07:32:00",
          context: "快件到达 [北京海淀育新小区营业点]",
          location: "",
        },
        {
          time: "2018-05-10 02:03:00",
          ftime: "2018-05-10 02:03:00",
          context:
            "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
          location: "",
        },
        {
          time: "2018-05-09 23:05:00",
          ftime: "2018-05-09 23:05:00",
          context: "快件到达 [北京顺义集散中心]",
          location: "",
        },
        {
          time: "2018-05-09 21:21:00",
          ftime: "2018-05-09 21:21:00",
          context: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
          location: "",
        },
        {
          time: "2018-05-09 13:07:00",
          ftime: "2018-05-09 13:07:00",
          context: "顺丰速运 已收取快件",
          location: "",
        },
        {
          time: "2018-05-09 12:25:03",
          ftime: "2018-05-09 12:25:03",
          context: "卖家发货",
          location: "",
        },
        {
          time: "2018-05-09 12:22:24",
          ftime: "2018-05-09 12:22:24",
          context: "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
          location: "",
        },
        {
          time: "2018-05-08 21:36:04",
          ftime: "2018-05-08 21:36:04",
          context: "商品已经下单",
          location: "",
        },
      ],
    };
  },
  created() {
    this.Orders();
  },
  methods: {
    async Orders() {
      const res = await this.$http.get("orders", {
        params: this.queryinfo,
      });
      if (res.meta.status == 200) {
        this.tableData = [];
        this.total = 0;
        this.tableData = res.data.goods;
        this.total = res.data.total;
        this.type = "success";
        this.message = "获取订单列表成功！";
      } else {
        this.type = "error";
        this.message = "获取订单列表失败！";
      }
      this.$message({
        type: this.type,
        message: this.message,
      });
    },
    async Operation(row, type) {
      this.dialogVisible = true;
      switch (type) {
        case "Edit":
          this.title = "修改地址";
          break;
        case "Location":
          this.title = "物流进度";
          const res = await this.$http.get(`/kuaidi/${1106975712662}`);
          break;
      }
    },
    handleSizeChange(val) {
      this.queryinfo.pagesize = val;
      this.Orders();
    },
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val;
      this.Orders();
    },
    handleClose() {
      this.informationalForm.citys = [];
      this.$refs.informationalForm.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.el-input {
  width: 550px;
}
</style>
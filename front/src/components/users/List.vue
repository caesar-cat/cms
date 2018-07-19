<template>
    <el-card>
        <el-row>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="toggleModal">新增用户</el-button>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="username"
                    label="用户名"
                >
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="用户等级"
                >
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="修改时间">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="toggleModal">修改密码</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
                <el-dialog title="新增职位" :visible.sync="dialogVisible">
                <el-form :model="form">
                    <el-form-item label="用户名" :label-width="labelWidth">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="labelWidth">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="labelWidth">
                        <el-input type="password" v-model="form.confirm_password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户等级" :label-width="labelWidth">
                        <el-select v-model="form.level" placeholder="请选择用户等级">
                            <el-option label="普通管理员" value="1"></el-option>
                            <el-option label="超级管理员" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="toggleModal">取 消</el-button>
                    <el-button type="primary" @click="toggleModal">确 定</el-button>
                </div>
        </el-dialog>
    </el-card>

</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          username: "王小虎",
          level: "普通管理员"
        },
        {
          date: "2016-05-04",
          username: "王小虎",
          level: "超级管理员"
        },
        {
          date: "2016-05-01",
          username: "王小虎",
          level: "普通管理员"
        },
        {
          date: "2016-05-03",
          username: "王小虎",
          level: "普通管理员"
        }
      ],
      dialogVisible: false,
      form: {
          username: '',
          password: '',
          confirm_password: '',
          level: ''
      },
      labelWidth: "120px"
    };
  },
  methods: {
       //删除
    handleDelete(i, row) {
      this.$confirm("确定删除此行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //TODO 调用删除接口
        this.tableData = this.tableData.filter((item, index) => {
          return index !== i;
        });
      });
    },
    toggleModal() {
        this.dialogVisible = !this.dialogVisible
    }
  }
};
</script>
<style lang="less" scoped>
    .el-card {
        text-align: left
    }
</style>


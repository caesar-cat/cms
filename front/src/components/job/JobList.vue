<template>
    <el-card style="text-align: left">
        <el-row :gutter="20" style="margin-left: 0">
            <el-input
                size="small"
                placeholder="请输入职位名称"
                style="width: 200px"
            >
            </el-input>
            <el-select placeholder="请选择分类" size="small">
                <el-option
                    v-for="item in second_type"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            <el-select placeholder="请选择工作地点" size="small">
                <el-option
                    v-for="item in address"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
                <el-button icon="el-icon-search" size="small">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" size="small" @click="toggleModal">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                border
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="职位名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="second_type"
                    label="所属二级分类"
                    >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                 <el-table-column label="操作" align="left">
                     <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="toggleModal(scope.row)">
                            编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                     </template>
                 </el-table-column>
            </el-table>
        </el-row>
        <el-pagination
            layout="prev, pager, next"
            :total="100">
        </el-pagination>
        <el-dialog title="新增职位" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="所属二级分类" :label-width="labelWidth">
                    <el-select v-model="form.second_type" placeholder="请选择二级分类">
                        <el-option label="后台开发" value="shanghai"></el-option>
                        <el-option label="前端开发" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位名称" :label-width="labelWidth">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="labelWidth">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="职位描述" :label-width="labelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.job_desc"></el-input>
                </el-form-item>
                <el-form-item label="任职要求" :label-width="labelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.job_require"></el-input>
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
          title: "java开发",
          second_type: "后端开发",
          job_desc: "职位描述",
          job_require: "任职要求",
          address: "深圳",
          date: "2016-05-02"
        },
        {
          title: "python开发",
          second_type: "后端开发",
          job_desc: "职位描述",
          job_require: "任职要求",
          address: "深圳",
          date: "2016-05-02"
        },
        {
          title: "php开发",
          second_type: "后端开发",
          job_desc: "职位描述",
          job_require: "任职要求",
          address: "深圳",
          date: "2016-05-02"
        },
        {
          title: "nodejs开发",
          second_type: "后端开发",
          job_desc: "职位描述",
          job_require: "任职要求",
          address: "深圳",
          date: "2016-05-02"
        }
      ],
      dialogFormVisible: false,
      form: {
        title: "",
        second_type: "",
        job_desc: "",
        job_require: "",
        address: ""
      },
      second_type: ["软件开发", "技术安全", "前端"],
      address: ["深圳", "上海", "背景"],
      labelWidth: "120px"
    };
  },

  methods: {
    toggleModal() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },

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
    }
  }
};
</script>
<style lang="less" scoped>

</style>


<template>
    <el-card style="text-align: left">
        <el-row>
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
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
                            @click="editRow(scope.$index, scope.row)">
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      dialogFormVisible : false,
      form: {
          title: '',
          second_type: '',
          job_desc: '',
          job_require: '',
          address:''
      },
      labelWidth: '120px'
    };
  }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}
.el-pagination {
  text-align: right;
}
</style>


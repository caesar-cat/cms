<template>
    <el-card style="text-align: left">
        <el-row :gutter="20" style="margin-left: 0">
            <el-input
                size="small"
                placeholder="请输入职位名称"
                style="width: 200px"
                v-model="title"
            >
            </el-input>
            <el-select placeholder="请选择分类" size="small" v-model="second_type">
                <el-option
                    v-for="item in type_options"
                    :key="item.title"
                    :label="item.title"
                    :value="item.title">
                </el-option>
            </el-select>
            <el-select placeholder="请选择工作地点" size="small" v-model="address">
                <el-option
                    v-for="item in address_options"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
                <el-button icon="el-icon-search" size="small" @click="fetchTableData">查询</el-button>
                <el-button size="small" @click="handleRest" type="info">重置</el-button>
        </el-row>
        <el-row>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="toggleModal($event)" style="margin: 10px 0">新增</el-button>
            <el-table
                border
                :data="tableData"
                v-loading="loading"
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
                    <template slot-scope="scope">
                        <span>{{scope.row.secondType.title}}</span>
                    </template>
                    
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                 <el-table-column label="操作" align="left">
                     <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="toggleModal($event, scope.$index)">
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
            :total="pagination.total"
            @current-change="fetchTableData"
        >
        </el-pagination>
        <el-dialog title="新增职位" :visible.sync="dialogFormVisible" :before-close="toggleModal">
            <input type="hidden" v-model="targetId">
            <el-form :model="form">
                <el-form-item label="所属二级分类" :label-width="labelWidth">
                    <el-select placeholder="请选择分类" size="small" v-model="form.second_type" style="width: 400px">
                        <el-option
                            v-for="item in type_options"
                            :key="item._id"
                            :label="item.title"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" :label-width="labelWidth">
                    <el-select placeholder="请选择地址" size="small" v-model="form.address" style="width: 400px">
                        <el-option
                            v-for="item in address_options"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位名称" :label-width="labelWidth">
                    <el-input v-model="form.title" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="职位描述" :label-width="labelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.job_desc" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="任职要求" :label-width="labelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.job_require" style="width: 400px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="toggleModal($event)">取 消</el-button>
                <el-button v-if="status === 'edit'" type="primary" @click="handleEdit">确 定</el-button>
                <el-button v-if="status === 'add'" type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      tableData: [],
      second_type: undefined,
      address: undefined,
      dialogFormVisible: false,
      loading: false,
      status: "add",
      targetId: "",
      title: undefined,
      form: {
        title: "",
        second_type: "",
        job_desc: "",
        job_require: "",
        address: ""
      },
      type_options: [],
      address_options: ["深圳", "上海", "背景"],
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      labelWidth: "150px"
    };
  },

  async mounted() {
    this.type_options = await request("/job/second_type/fetch", {
      method: "POST"
    }).then(res => res.result);
    this.fetchTableData();
  },

  methods: {
    async fetchTableData(currentPage) {
      this.loading = true;
      const data = await request("/job/list/fetch", {
        method: "POST",
        body: {
          currentPage: currentPage || this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          second_type: this.second_type,
          address: this.address,
          title: this.title
        }
      }).then(res => res.result);
      this.loading = false;
      this.tableData = data.list;
      this.pagination = data.pagination;
    },

    handleRest() {
        this.address = undefined
        this.title = undefined
        this.second_type = undefined
        this.pagination.currentPage = 1
        this.pagination.pageSize = 10
        this.fetchTableData()
    },

    toggleModal(e, index) {
      this.dialogFormVisible = !this.dialogFormVisible;
      if (!this.dialogFormVisible) {
        this.form = {
          title: "",
          second_type: "",
          job_desc: "",
          job_require: "",
          address: ""
        };
      }
      if (index !== undefined && this.dialogFormVisible) {
        this.status = "edit";
        this.targetId = this.tableData[index]._id;
        const { title, address, job_desc, job_require } = this.tableData[index];
        const second_type = this.tableData[index].secondType._id;
        this.form = {
          title,
          address,
          job_desc,
          job_require,
          second_type
        };
      } else {
        this.status = "add";
      }
    },

    //新增
    handleAdd() {
      request("/job/list/add", {
        method: "POST",
        body: {
          ...this.form
        }
      }).then(res => {
            if(res.code === 0) {
                this.$message.success("添加职位成功！");
                this.fetchTableData();
                this.toggleModal()
            }else {
                this.$message.error(res.msg);
            }

      });
    },

    //修改
    handleEdit() {
      request("/job/list/update", {
        method: "POST",
        body: {
          _id: this.targetId,
          ...this.form
        }
      }).then(res => {
            if(res.code === 0) {
                this.$message.success("修改职位成功！");
                this.fetchTableData();
                this.toggleModal()
            }else {
                this.$message.error(res.msg);
            }

      });
    },

    //删除
    handleDelete(i, row) {
      this.$confirm("确定删除此行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //TODO 调用删除接口
        request("/job/list/remove", {
          method: "POST",
          body: {
            _id: this.tableData[i]._id
          }
        }).then(res => {
          if (res.code === 0) {
            this.$message.success("删除成功");
            this.fetchTableData()
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>


<template>
    <el-card>
        <el-row>
            <el-table
                :data="tableData"
                border
                v-loading = "loading"
                style="width: 100%">
                <el-table-column
                label="一级分类标题"
                align="left"
                >
                <template slot-scope="scope">
                    <template v-if="scope.row.editable">
                        <el-input placeholder="请输入标题" :value="scope.row.title" @change="handleFiledsChange($event, 'title', scope.$index)"></el-input>
                    </template>
                    <template v-else>
                         <p>{{ scope.row.title }}</p>
                    </template>
                </template>
                </el-table-column>
                <el-table-column
                  label="排序"
                  sortable
                  align="left"
                  prop="sort"
                >
                 <template slot-scope="scope">
                    <template v-if="scope.row.editable">
                        <el-input placeholder="请输入序号" :value="scope.row.sort" @change="handleFiledsChange($event, 'sort', scope.$index)"></el-input>
                    </template>
                    <template v-else>
                         <p>{{ scope.row.sort }}</p>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                  label="创建时间"
                  sortable
                  align="left"
                  prop="update_time"
                >
                 <template slot-scope="scope">
                    <p>{{ moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <template v-if="scope.row.editable">
                        <template v-if="scope.row.isNew">
                            <el-button
                                size="mini"
                                @click="addRow(scope.$index)">
                                添加
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button
                                size="mini"
                                @click="saveRow(scope.$index, scope.row)">
                                保存
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleCancel(scope.$index, scope.row)">
                                取消
                            </el-button>
                        </template>
                    </template>
                    <template v-else>
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
                </template>
                </el-table-column>
            </el-table>
             <el-button size="medium" class="add-btn" @click="addNew">新增一级分类</el-button>
        </el-row>
    </el-card>
</template>
<script>
import _ from "lodash";
import request from "../../utils/request";
export default {
  data() {
    return {
      tableData: [],
      cache: [],
      loading: true
    };
  },

  mounted() {
    request("/job/first_type/fetch").then(res => {
      this.loading = false;
      this.tableData = _.cloneDeep(res.result);
      this.cache = _.cloneDeep(res.result);
    });
  },

  methods: {
    //添加行
    addNew() {
      const newData = {
        date: this.moment().format("YYYY-MM-DD HH:mm:ss"),
        title: "",
        sort: "",
        editable: true,
        isNew: true
      };
      this.tableData = this.tableData.concat(_.cloneDeep(newData));
      this.cache = this.cache.concat(_.cloneDeep(newData));
    },
    //确认添加行
    addRow(i) {
      let params = this.cache[i];
      delete params.isNew;
      //TODO 调用新增接口
      request("/job/first_type/add", {
        method: "POST",
        body: {
          title: params.title,
          sort: params.sort
        }
      }).then(res => {
        if (res.code === 0) {
          params.editable = false;
          this.$message.success("添加成功");
          this.$set(this.tableData, i, params);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //编辑行
    editRow(i, row) {
      this.tableData = this.tableData.map((item, index) => {
        if (index === i) {
          item.editable = true;
        }
        return item;
      });
    },
    //保存某行数据
    saveRow(i, row) {
      let params = this.cache[i];
      //TODO 调用保存接口
      request("/job/first_type/update", {
        method: "POST",
        body: {
          _id: params._id,
          title: params.title,
          sort: params.sort
        }
      }).then(res => {
        if (res.code === 0) {
          params.editable = false;
          this.$message.success("修改成功");
          this.$set(this.tableData, i, params);
        } else {
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
        request("/job/first_type/remove", {
          method: "POST",
          body: {
            _id: row._id
          }
        }).then(res => {
          if (res.code === 0) {
            this.$message.success("删除成功");
            this.tableData = this.tableData.filter((item, index) => {
              return index !== i;
            });
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    //取消编辑状态
    handleCancel(i, row) {
      this.tableData = this.tableData.map((item, index) => {
        if (index === i) {
          item.editable = false;
        }
        return item;
      });
      this.cache[i] = _.cloneDeep(this.tableData[i]);
    },
    //监听编辑事件
    handleFiledsChange(value, key, i) {
      this.cache = this.cache.map((item, index) => {
        if (i === index) {
          item[key] = value;
        }
        return item;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.add-btn {
  margin-top: 5px;
  width: 100%;
  border: 1px dotted #ccc;
}
</style>


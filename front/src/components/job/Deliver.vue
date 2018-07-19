<template>
    <el-card>
        <el-row>
            <el-date-picker
                v-model="searchTime"
                type="daterange"
                size="small"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                prop="date"
                label="投递时间"
            >
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">下载</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-row>
        <el-pagination
            layout="prev, pager, next"
            :total="100">
        </el-pagination>
    </el-card>
</template>
<script>
export default {
  data() {
    return {
      searchTime: [],
      tableData: [
        {
          date: "2016-05-02"
        },
        {
          date: "2016-05-04"
        },
        {
          date: "2016-05-01"
        },
        {
          date: "2016-05-03"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
    .el-card {
        text-align: left
    }
</style>


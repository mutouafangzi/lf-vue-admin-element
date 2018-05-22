<template>
    <div>
      <el-row>
        <el-col :span="8" :offset="1">
          <el-table border height="310"
                    ref="multipleSourceTable"
                    :data="sourceData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSourceSelectionChange">
            <!-- 使用Element表格的单选多选功能 -->
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="可选责任人">
              <template slot-scope="scope">{{scope.row.name}} -- {{scope.row.mdesc}}</template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col :span="2" :offset="1">
          <div style="height: 180px">
            <el-button
              type="primary"
              style="margin-top: 100px;border-radius: 50%;width: 50px;height: 50px;text-align: center;"
              :disabled="multipleSourceSelection.length == 0"
              @click="addToTarget">
              <i style="font-size: 18px" class="icon iconfont icon-Angle-right"></i>
            </el-button>
          </div>
          <div>
            <el-button
              type="primary"
              style="border-radius: 50%;width: 50px;height: 50px;text-align: center;"
              :disabled="multipleTargetSelection.length == 0"
              @click="addToSource">
              <i style="font-size: 18px" class="icon iconfont icon-Angle-left"></i>
            </el-button>
          </div>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-table border height="310"
                    ref="multipleTargetTable"
                    :data="targetData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleTargetSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="已选责任人">
              <template slot-scope="scope">{{scope.row.name}}-{{scope.row.mdesc}}</template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

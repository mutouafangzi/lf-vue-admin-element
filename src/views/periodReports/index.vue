<template>
  <div class="period-reports-wrap">
    <div class="bread-crumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/report'}">报表</el-breadcrumb-item>
        <el-breadcrumb-item>周期报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--搜索区域-->
    <div class="block search-wrap" style="padding: 15px">
      <el-row class="filter-option">
        <!--筛选区域选项-->
        <el-col :span="16" class="top-allocation pull-left">
          <!--顶部的左部分选项-->
          <el-row :gutter="16" class="allocation-left">
            <el-col :span="6">
              <div class="filter-class">
                <span>报表类型</span>
                <tree-select-input :treeData="reportTypeTree" @getInputData="getReportTypeData"></tree-select-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="filter-class">
                <span>报表周期</span>
                <tree-select-input :treeData="reportPeriodTree" @getInputData="getReportPeriodData"></tree-select-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="filter-class">
                <span>报表状态</span>
                <tree-select-input :treeData="reportStateTree" @getInputData="getReportStateData"></tree-select-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="filter-class">
                <el-input placeholder="请输入 任务名称 进行搜索" v-model="searchtext"></el-input>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!--右侧的搜索-->
        <el-col :span="2" :offset="6" class="search-right pull-right">
          <el-button type="primary" @click="handleClickSearch">
            <i class="icon iconfont icon-Search"></i>搜索
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!--表格区域-->
    <div class="block context-wrap">
      <o-panel>
        <div slot="header">报表内容</div>
        <div slot="body">
          <!--表格上部按钮部分：新增，删除，启用，停用-->
          <div class="handleBtn">
            <el-button type="primary" size="small" :plain="true" @click="addBtn">
              <i class="icon iconfont icon-Plus"></i>新增
            </el-button>
            <el-button type="danger" size="small" :plain="true" @click="deletebtn">
              <i class="icon iconfont icon-Remove"></i>删除
            </el-button>
            <el-button type="primary" size="small" :plain="true" @click="launchBtn">
              <i class="icon iconfont icon-Play"></i>启动
            </el-button>
            <el-button type="primary" size="small" :plain="true" @click="stopBtn">
              <i class="icon iconfont icon-Pause"></i>停用
            </el-button>
          </div>
          <!--表格展示用户部分-->
          <div class="table-box">
            <el-table
              ref="multipleTable"
              :data="periodReportsTable"
              border
              stripe
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="reportName" label="报表名称"></el-table-column>
              <el-table-column prop="creatorName" label="创建人"></el-table-column>
              <el-table-column prop="reportTemplete" label="报表模板"></el-table-column>
              <el-table-column prop="reportState" label="报表状态"></el-table-column>
              <el-table-column prop="execTime" label="执行次数"></el-table-column>
              <el-table-column
                prop="lastExecTime"
                label="上次执行时间"
                :formatter="lastExecTimeFormatter"
              ></el-table-column>
              <el-table-column
                prop="nextExecTime"
                label="下次执行时间"
                :formatter="nextExecTimeFormatter"
              ></el-table-column>
              <el-table-column label="操作" width="120px">
                <template slot-scope="scope">
                  <el-button
                    :plain="true"
                    type="text"
                    size="small"
                    class="color-danger"
                    @click="watchDetail(scope.$index, scope.row)"
                  >
                    <i class="icon iconfont icon-Eye-open"></i>查看
                  </el-button>
                  <el-button
                    :plain="true"
                    type="text"
                    @click="editDetail(scope.$index, scope.row)"
                    size="small"
                  >
                    <i class="icon iconfont icon-Edit"></i>编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div slot="footer">
          <el-pagination
            id="pagination-wrap"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-sizes="[10, 30, 50, 100, 150, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </o-panel>
    </div>

    <!--新增弹窗-->
    <el-dialog
      title="新建报表任务"
      :visible.sync="addReportDialog"
      class="add-report-dialog"
      width="900px"
    >
      <el-form
        :model="addReportForm"
        ref="addReportForm"
        prop="addReportForm"
        label-width="80px"
        status-icon
      >
        <!--告警派发弹窗中的基本信息-->
        <el-form-item label="报表名称" prop="reportName">
          <el-input size="small" v-model="addReportForm.reportName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="descr">
          <el-input v-model="addReportForm.descr" placeholder="请描述内容"></el-input>
        </el-form-item>
        <el-form-item size="small" label="报表模板" prop="reportTemplete">
          <el-select v-model="addReportForm.reportTemplete" placeholder="请选择报表模板">
            <el-option
              :label="item.label"
              :value="item.value"
              :key="index"
              v-for="(item,index) in addReportTempletes"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="报表格式" prop="reportDownType">
          <el-checkbox-group v-model="addReportForm.reportDownType">
            <el-checkbox label="PDF" name="type"></el-checkbox>
            <el-checkbox label="HTML" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="reportPeriodType" label="报表周期">
          <div class="task-circle-wrap">
            <div class="task-circle-scope" style="display: inline-block;vertical-align: top;">
              <el-select v-model="addReportForm.reportPeriodType" placeholder="请选择报表周期">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                  v-for="(item,index) in addReportPeriods"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="checkedUserList" label="通知责任人">
          <template>
            <a-transfer
              :sourceTableData="addresponsible"
              :targetTableData="addCheckedUserList"
              @getCheckedData="getAddCheckedData"
            ></a-transfer>
          </template>
        </el-form-item>
        <el-form-item label="其他收件人" prop="extraMailBox">
          <el-input size="small" placeholder="请以分号分割" v-model="addReportForm.extraMailBox"></el-input>
        </el-form-item>
        <el-form-item label="邮件标题" prop="mailTitle">
          <el-input size="small" v-model="addReportForm.mailTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮件正文" prop="mailContent">
          <el-input size="small" v-model="addReportForm.mailContent"></el-input>
        </el-form-item>
      </el-form>
      <!--告警派发弹窗中的取消和确认-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogCancelBtn()" size="small">取 消</el-button>
        <el-button type="primary" @click="addDialogOkBtn()" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑弹窗-->
    <el-dialog title="编辑报表任务" :visible.sync="editReportDialog" class="report-dialog" width="1000px">
      <el-form
        :model="editReportForm"
        ref="editReportForm"
        prop="editReportForm"
        label-width="100px"
        status-icon
      >
        <!--告警派发弹窗中的基本信息-->
        <el-form-item label="任务名称" prop="reportName">
          <el-input size="small" v-model="editReportForm.reportName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="descr">
          <el-input v-model="editReportForm.descr" placeholder="请描述内容"></el-input>
        </el-form-item>
        <el-form-item size="small" label="报表模板" prop="reportTempleteId">
          <el-select v-model="editReportForm.reportTemplete" placeholder="请选择报表模板">
            <el-option
              :label="item.label"
              :value="item.value"
              :key="index"
              v-for="(item,index) in editReportTempletes"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="报表格式" prop="reportDownType">
          <el-checkbox-group v-model="editReportForm.reportDownType">
            <el-checkbox label="PDF" name="type"></el-checkbox>
            <el-checkbox label="HTML" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="reportPeriodType" label="报表周期">
          <div class="task-circle-wrap">
            <div class="task-circle-scope" style="display: inline-block;vertical-align: top;">
              <el-select v-model="editReportForm.reportPeriodType" placeholder="请选择执行周期">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                  v-for="(item,index) in editReportPeriods"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="checkedUserList" label="通知责任人">
          <!--穿梭框-->
          <template>
            <a-transfer
              :sourceTableData="editOptionalResponsibles"
              :targetTableData="editCheckedResponsibles"
              @getCheckedData="getEditCheckedData"
            ></a-transfer>
          </template>
        </el-form-item>
        <el-form-item label="其他收件人" prop="extraMailBox">
          <el-input size="small" v-model="editReportForm.extraMailBox"></el-input>
        </el-form-item>
        <el-form-item label="邮件标题" prop="mailTitle">
          <el-input size="small" v-model="editReportForm.mailTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮件正文" prop="mailContent">
          <el-input size="small" v-model="editReportForm.mailContent"></el-input>
        </el-form-item>
      </el-form>
      <!--告警派发弹窗中的取消和确认-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogCancelBtn()" size="small">取 消</el-button>
        <el-button type="primary" @click="editDialogOkBtn()" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看弹窗-->
    <el-dialog
      title="查看报表任务"
      :visible.sync="watchReportDialog"
      class="report-dialog"
      width="1000px"
    >
      <el-dialog width="900px" title="效果预览" :visible.sync="resultPreview" append-to-body>
        <section style="overflow: auto;height: 560px;" id="sectWrap">
          <div style="height: 50px;width: 100%;" id="headerWrap">
            <img :src="pageHeaderImg" style="height: 50px">
          </div>
          <div class="a-line"></div>
          <grid-layout
            style="height: 520px"
            class="dragArea"
            ref="gridWrap"
            :col-num="16"
            :row-height="30"
            :is-draggable="false"
            :is-resizable="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            :layout="resultPreviewLayout"
          >
            <grid-item
              class="grid-wrap"
              v-for="(item, $index) in resultPreviewLayout"
              :key="$index"
              :minH="2"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
            >
              <div style="height: 20px; line-height: 20px">
                <span class="title-wrap">{{ getResultEchartsName(item.id) }}</span>
              </div>
              <div :style="style(item)" class="echarts-wrap">
                <component
                  :is="currentView(item.id)"
                  :configObj="configObj(item.id)"
                  :chartData="getEchartsData(item.id)"
                ></component>
              </div>
            </grid-item>
          </grid-layout>
        </section>
      </el-dialog>
      <el-form
        :model="watchReportForm"
        ref="watchReportForm"
        prop="watchReportForm"
        label-width="85px"
        status-icon
      >
        <!--告警派发弹窗中的基本信息-->
        <el-form-item prop="reportName" label="报表名称">
          <el-input v-model="watchReportForm.reportName" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="descr">
          <el-input v-model="watchReportForm.descr" readonly></el-input>
        </el-form-item>
        <el-form-item size="small" label="下次执行时间" prop="nextExecTime">
          <el-input v-model="watchReportForm.nextExecTime" readonly></el-input>
        </el-form-item>
        <el-form-item prop="creatorName" label="创建人">
          <el-input v-model="watchReportForm.creatorName" readonly></el-input>
        </el-form-item>
        <el-form-item prop="reportState" label="报表状态">
          <el-input v-model="watchReportForm.reportState" readonly></el-input>
        </el-form-item>
        <el-form-item prop="recentExecTime" label="最近执行时间">
          <el-input v-model="watchReportForm.recentExecTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="时间周期" prop="timePeriod">
          <el-input size="small" v-model="watchReportForm.timePeriod" readonly></el-input>
        </el-form-item>
        <el-form-item size="small" label="报表" prop="tableResult">
          <o-panel>
            <div slot="body">
              <el-table
                ref="watchReportForm"
                :data="watchReportTable.list"
                border
                stripe
                max-height="250"
                size="mini"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column prop="reportState" width="100" label="报表状态"></el-table-column>
                <el-table-column prop="reportName" label="报表名称"></el-table-column>
                <el-table-column prop="reportHistory" width="120" label="报表历史"></el-table-column>
                <el-table-column
                  prop="taskStartTime"
                  label="任务开始时间"
                  :formatter="taskStartTimeFormatter"
                ></el-table-column>
                <el-table-column
                  prop="taskEndTime"
                  label="任务结束时间"
                  :formatter="taskEndTimeFormatter"
                ></el-table-column>
                <el-table-column width="130" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="reportPreview(scope.$index, scope.row)"
                      type="text"
                      size="small"
                      style="padding: 0px 5px"
                    >
                      <i class="icon iconfont icon-Eye-open-f"></i>预览
                    </el-button>
                    <div style="display: inline-block">
                      <el-dropdown placement="bottom-start">
                        <el-button type="text" size="small">
                          <i class="icon iconfont icon-Download" style="font-size: 16px;"></i>下载
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            class="color-primary"
                            v-if="scope.row.downloadFormat.search('PDF') != -1"
                          >
                            <el-button
                              type="text"
                              size="small"
                              @click="reportDownloadingPDF(scope.$index, scope.row)"
                            >
                              <i class="icon iconfont icon-File-pdf" style="font-size: 16px"></i>
                              <span style="height:16px;line-height: 16px;font-size: 14px">导出pdf</span>
                            </el-button>
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="scope.row.downloadFormat.search('HTML')!=-1"
                            class="color-primary"
                          >
                            <el-button
                              type="text"
                              size="small"
                              @click="reportDownloadingHTML(scope.$index, scope.row)"
                            >
                              <i class="icon iconfont icon-File-f" style="font-size: 16px"></i>
                              <span style="height:16px;line-height: 16px;font-size: 14px">导出html</span>
                            </el-button>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div slot="footer">
              <el-pagination
                @size-change="reportTableSizeChange"
                @current-change="reportTableCurrentChange"
                :current-page.sync="watchReportTable.pageNumber"
                :page-sizes="[10, 30, 50, 100, 150, 200]"
                :page-size="watchReportTable.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="watchReportTable.total"
              ></el-pagination>
            </div>
          </o-panel>
        </el-form-item>
      </el-form>
      <!--告警派发弹窗中的取消和确认-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="watchReportDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="watchReportDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

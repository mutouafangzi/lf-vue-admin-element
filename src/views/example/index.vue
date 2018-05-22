<template>
    <div class="report-template">
      <div class="bread-crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/report'}">报表</el-breadcrumb-item>
          <el-breadcrumb-item>报表模板</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!--搜索区域-->
      <div class="block search-wrap" style="padding: 15px">
        <el-row class="filter-option">
          <!--筛选区域选项-->
          <el-col :span="16" class="top-allocation pull-left">
            <!--顶部的左部分选项-->
            <el-row :gutter="16" class="allocation-left">
              <el-col :span="8">
                <div class="filter-class">
                  <span>模板类型</span>
                  <tree-select-input :treeData="reportClassTree" @getInputData="getReportClassData"></tree-select-input>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="filter-class">
                  <span>来源</span>
                  <tree-select-input :treeData="dataSourceTree" @getInputData="getDataSourceData"></tree-select-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="filter-class">
                  <el-input placeholder="模板名称/创建人" v-model="searchText"></el-input>
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

      <!--表格部分-->
      <div class="block context-wrap">
        <o-panel>
          <div slot="header">报表配置</div>
          <div slot="body">
            <div class="handleBtn">
              <el-button type="primary" size="small" :plain="true" @click="addReportBtn">+ 新增</el-button>
              <el-button type="danger" size="small" :plain="true" @click='deleteReportbtn'>x 删除</el-button>
            </div>
            <!--表格展示用户部分-->
            <div class="table-box">
              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="templeteName"
                  label="模板名称">
                </el-table-column>
                <el-table-column
                  prop="appType"
                  label="类型"></el-table-column>
                <el-table-column
                  prop="templeteType"
                  label="来源">
                </el-table-column>
                <el-table-column
                  prop="creatorName"
                  label="创建人"></el-table-column>
                <el-table-column
                  prop="creatorTime"
                  label="创建时间"></el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="最后修改时间"></el-table-column>
                <el-table-column
                  prop="isRefered"
                  label="是否被引用"
                  :formatter="isReferedFormatter"></el-table-column>
                <el-table-column
                  label="操作"
                  width="120px">
                  <template slot-scope="scope">
                    <el-button :plain="true" type="text" size="small"
                               @click="watchReportRow(scope.$index, scope.row)"><i class="icon iconfont icon-Eye-open"></i>查看
                    </el-button>
                    <el-button :plain="true" type="text" @click="editReportRow(scope.$index, scope.row)" size="small">
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
              :total="total">
            </el-pagination>
          </div>
        </o-panel>
      </div>

      <!--新增弹窗-->
      <el-dialog title="新建报表模板" :visible.sync="isVisibleAddReportDialog" class="add-dialog" width="1100px">
        <el-container>
          <el-aside width="350px">
            <!--左边选择-->
            <el-header height="80px">
              <el-form ref="addTemplateform" :model="addTemplateform" label-width="60px">
                <el-form-item label="模板名称">
                  <el-input v-model="addTemplateform.templeteName"></el-input>
                </el-form-item>
                <el-form-item label="模板类型">
                  <el-select v-model="addTemplateform.appType" placeholder="请选择">
                    <el-option
                      v-for="item in appTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-header>
            <el-main>
                <el-tabs type="card">
                  <el-tab-pane label="图表库">
                    <div style="min-height:250px;overflow-y:auto;max-height:430px;">
                      <ul>
                        <li v-for="(item, index) in chartInfoList">
                          <div style="display: inline-block">
                            <i>{{index + 1}}.</i>
                            <span>{{item.name}}</span>
                          </div>
                          <div
                            style="display: inline-block;width: 100px;height: 100px;line-height: 100px"
                            :id="item.id"
                            draggable="true"
                            @dragstart="dragStart"
                            :data-name="item.type">
                            <div :class="echartThumbnail" style="font-size: 100px" :id="item.type"></div>
                          </div>
                        </li>
                      </ul>
                    </div>

                  </el-tab-pane>
                  <!--<el-tab-pane label="函数">函数</el-tab-pane>-->
                </el-tabs>

            </el-main>

          </el-aside>
          <el-main style="overflow: hidden">
            <!--右边编辑区-->
            <div style="overflow: auto;height: 560px;">
              <section id="preview" @dragover="dragOver" @drop="drop" style="height: 100%"> </section>
            </div>
          </el-main>
        </el-container>

        <!--添加人员中的取消和确认-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogCancelBtn()" size="small">取 消</el-button>
          <el-button type="primary" @click="addDialogOkBtn()" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <!--编辑弹窗-->
      <el-dialog title="编辑报表模板" :visible.sync="isVisibleEditReportDialog" class="add-dialog" width="1300px">

        <!--编辑模板中的取消和确认-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogCancelBtn()" size="small">取 消</el-button>
          <el-button type="primary" @click="editDialogOkBtn()" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <!--查看弹窗-->
      <el-dialog title="查看报表模板" :visible.sync="isVisibleWatchReportDialog" class="add-dialog" width="1300px">

         <span slot="footer" class="dialog-footer">
          <el-button @click="watchDialogCancelBtn()" size="small">取 消</el-button>
          <el-button type="primary" @click="watchDialogOkBtn()" size="small">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

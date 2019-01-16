<template>
  <div :class="themeColor" id="theme-wrap" allowfullscreen="true">
    <!-- @keydown="exitScreen($event)"-->
    <div class="ngsoc-wrap">
      <!--态势标签-->
      <el-container direction="vertical">
        <!--顶部态势的标签和设置按钮区域-->
        <el-header>
          <el-col :span="13">
            <div class="el-tabs__header">
              <div class="el-tabs__nav-wrap">
                <!--标签组-->
                <el-radio-group
                  v-model="checkedTab"
                  class="el-tabs__nav"
                  fill="#fff"
                  @change="clickTag"
                  text-color="#42a9f4">
                  <draggable
                    v-model="tabLists"
                    :move="getdata"
                    @update="datadragEnd"
                    :options="{animation:100,chosenClass:'choose',group:'people'}">
                    <transition-group>
                      <el-radio-button
                        :label="item.id"
                        :name="item.name"
                        :key="$index"
                        v-for="(item,$index) in tabLists">
                        <span class="tab-text-wrap" :title="item.name">
                          {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <el-button @click="clickCommonTabsDelete(item)" type="primary" size="mini">
                          <i class="icon iconfont icon-Remove"></i>
                        </el-button>
                      </el-radio-button>
                    </transition-group>
                  </draggable>
                </el-radio-group>
                <!--标签组的最后更多-->
                <el-button
                  class="more-btn"
                  slot="reference"
                  @click="clickMore"
                  v-popover:popover>
                  ···
                  <!--更多&nbsp;&nbsp;
                  <i class="icon iconfont icon-Sort-down"></i>-->
                </el-button>
                <el-popover
                  ref="popover"
                  v-model="popoverShow"
                  class="popover-wrap"
                  placement="bottom"
                  width="260"
                  trigger="click">
                  <div class="situation-list-tree-wrap">
                    <el-input
                      v-model="sceneSearch"
                      :maxlength=15
                      @keyup.enter.native="clickEnterSearch"
                      placeholder="请输入关键字进行过滤"></el-input>
                    <el-tree
                      class="btn-tree-wrap"
                      ref="situationTree"
                      :props="situationTreeProps"
                      :data="situationLists"
                      default-expand-all
                      node-key="id"
                      :expand-on-click-node="false">
                      <!-- class="filter-tree"
                      :filter-node-method="filterScene"-->
                      <div slot-scope="{ node, data }" style="width: 100%">
                        <el-button
                          type="text"
                          class="span-wrap"
                          :disabled="isSituationClick(data)"
                          @click="() => clickSituationList(data)">
                          <span style="display: block">{{ node.data.name}}</span>
                          <span style="line-height: 16px">{{ node.data.creatorName}}</span>
                        </el-button>
                      </div>
                    </el-tree>
                  </div>
                </el-popover>
              </div>
            </div>
          </el-col>
          <!--态势大屏-->
          <el-col :span="2" class="global-btn-wrap">
            <el-button type="info" @click="clickSituationScreen">
              <i class="icon iconfont icon-Cricle-export-f" style="font-size: 14px"></i>
              &nbsp;态势大屏
            </el-button>
            <el-button style="padding: 5px 7px" @click="reSkin" plain>
              <i class="icon iconfont icon-skin" style="font-size: 16px;"></i>
            </el-button>
          </el-col>
          <!--右边的各种细节按钮以及搜索和时间-->
          <el-col :span="9" class="set-item-wrap">
            <!--选择时间段-->
            <el-date-picker
              v-model="searchTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
               @change="changeTimeStr"
              align="right">
            </el-date-picker>
            <!--多久刷新-->
            <el-select
              class="refresh-time-wrap"
              v-model="refreshInterval"
              placeholder="请选择刷新时间"
              @change="refreshTimeChange">
              <el-option
                class="refresh-wrap"
                v-for="(item, index) in refreshIntervals"
                :key="index"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
            <!--刷新按钮-->
            <el-button style="padding: 5px 7px" @click="allScreenRefresh" plain>
              <i class="icon iconfont icon-Refresh" style="font-size: 16px;"></i>
            </el-button>
            <!--全屏按钮-->
            <el-button style="padding: 5px 7px" @click="useFullScreen" plain>
              <i class="icon iconfont icon-Fullscreen" style="font-size: 16px;"></i>
            </el-button>
            <!--保存项-->
            <el-button style="padding: 5px 7px" @click="downHtml" plain>
              <i class="icon iconfont icon-Save" style="font-size: 16px;"></i>
            </el-button>
            <!--设置/按钮-->
            <el-button style="padding: 5px 7px;margin-right:0;" @click="operateBtn" plain>
              <i class="icon iconfont icon-Setting-f" style="font-size: 16px;"></i>
            </el-button>
          </el-col>
        </el-header>
        <!--图表的配置信息-->
        <el-main id="screen-wrap" style="width: 100%">
          <grid-layout
            ref="gridWrap"
            :layout="echartsLayout"
            :col-num="24"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[15, 15]"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedEvent">
            <grid-item
              class="charts-wrap"
              v-for="(item,$index) in echartsLayout"
              :key="$index"
              :minH= "2"
              :minW= "3"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              @resize="resizeEvent($index)"
              @move="moveEvent"
              @resized="resizedEvent($index)"
              @moved="movedEvent">
              <o-panel v-loading="item.loading" v-if="item.echartsInfos">
                <!--图表内的标题以及删除和刷新按钮-->
                <div slot="header" class="clearfix" v-if="item.echartsInfos">
                  <span>{{ item.echartsInfos.title }}</span>
                  <div class="pull-right">
                    <el-button
                      style="padding: 5px"
                      type="text"
                      @click="refreshEcharts(item.id)">
                      <i class="icon iconfont icon-Refresh"></i>
                    </el-button>
                    <el-button style="padding: 5px" type="text" @click="deleteEcharts(item)">
                      <i class="icon iconfont icon-Remove"></i>
                    </el-button>
                  </div>
                </div>
                <div slot="body" v-if="item.echartsInfos">
                  <div :style="{'height':getBoxheight(item.h)}">
                    <!--各个图表呈现的图-->
                    <component
                      ref="child"
                      :theme="themeColor === 'theme-white' ? 'shineWhite' : 'shineBlack'"
                      @expand-click="expandClick($event,item)"
                      :is="item.echartsInfos.type"
                      :configObj="item.echartsInfos.config"
                      :chartData="item.echartsData"></component>
                  </div>
                </div>
              </o-panel>
              <o-panel  v-if="!item.echartsInfos">
                <div slot="header" class="clearfix" v-if="!item.echartsInfos">
                  <span>图表无数据</span>
                  <div class="pull-right">
                    <el-button
                      style="padding: 5px"
                      type="text"
                      @click="refreshEcharts(item.id)">
                      <i class="icon iconfont icon-Refresh"></i>
                    </el-button>
                    <el-button style="padding: 5px" type="text" @click="deleteEcharts(item)">
                      <i class="icon iconfont icon-Remove"></i>
                    </el-button>
                  </div>
                </div>
                <div slot="body" v-if="!item.echartsInfos">
                  <div :style="{'height':getBoxheight(item.h),'text-align': 'center'}">
                    当前图表无数据，可能已被删除
                  </div>
                </div>
              </o-panel>
            </grid-item>
          </grid-layout>
        </el-main>
      </el-container>

      <!--下钻弹窗-->
      <el-dialog
        title="下钻弹窗"
        :visible.sync="dialogDrillDown"
        class="table-dialog"
        width="1200px">
        <div class="table-box" v-loading="drillDownLoading">
          <el-table
            ref="multipleTable"
            :data="drillDownTable"
            border
            tooltip-effect="dark"
            style="width: 3440px">
            <el-table-column
              :key="item.key"
              v-for="item in formThead"
              :label="item.label"
              :prop="item.label"
              :column-key="item.key">
              <template slot-scope="scope">
                <div class="table-text-wrap">
                  <p
                    class="table-text-p-wrap"
                    :title="item.type | filterFormat(scope.row[item.key].label)"
                    v-if="scope.row[item.key]">
                    {{item.type | filterFormat(scope.row[item.key].label)}}
                  </p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--详情内容中的取消和确认-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDrillDown = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogDrillDown = false" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <!--态势大屏弹窗-->
      <el-dialog
        class="situation-screen-wrap"
        title="态势大屏"
        :visible.sync="situationScreenDialog"
        width="900px">
        <div class="thumbnail-list-wrap">
          <div
            @click="skipUserAction"
            class= "thumbnail-wrap">
            <div class="content-wrap">
              <div class="screen-img-wrap">
                <img style="height: 219px;width: 373px;" :src="situationUserAction">
              </div>
              <div class="screen-text-wrap">
                <span style="font-size: 18px;letter-spacing: 2px;color: #ffffff">用户行为态势感知</span>
              </div>
            </div>
          </div>
          <div
            @click="skipNetworkAttack"
            class= "thumbnail-wrap">
            <div class="content-wrap">
              <div class="screen-img-wrap">
                <img style="height: 219px;width: 373px;" :src="situationNetworkAttack">
              </div>
              <div class="screen-text-wrap">
                <span style="font-size: 18px;letter-spacing: 2px;color: #ffffff">网络攻击态势感知</span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>

      <!--操作弹窗-->
      <el-dialog
        class="add-echarts-wrap"
        title="新增图表"
        :visible.sync="addEchartsDialog"
        width="1200px">
        <div class="echarts-seacher-area">
          <el-form ref="echartsSearchForm" v-model="echartsSearchForm">
            <el-form-item prop="classify">
              <el-select
                v-model="echartsSearchForm.classify"
                :placeholder="addEchartsClass"
                @change="dataSourcesChange">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                  v-for="(item,index) in echartsClassifyList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="text">
              <el-input v-model="echartsSearchText" @change="textChange"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="echarts-content-area">
          <!--<div>
            <input
              type= "checkbox"
              class= "input-checkbox"
              id="allChecked"
              :checked= "echartsIconList.length===checkedEchartIds.length && checkedEchartIds.length"
              @click= "checkedAll"/><label>全选</label>
          </div>-->
          <ul class="echarts-list-wrap">
            <li
              v-for= "item in echartsIconList"
              :key= "item.id"
              class= "echarts-info-wrap">
              <div class="echarts-icon-wrap">
                <!--选中按钮-->
                <input
                  type="checkbox"
                  v-if="getCheckedIds.indexOf(item.id)<0"
                  :checked="checkedEchartIds.indexOf(item.id)>=0"
                  :disabled="getCheckedIds.indexOf(item.id)>=0"
                  name="checkboxinput"
                  class="input-checkbox"
                  @click="checkedOne(item.id)"/>
                <div
                  class="flag-checked"
                  v-if="getCheckedIds.indexOf(item.id)>=0">
                  <span>已选择</span>
                </div>
                <!--icon-->
                <div style="height: 150px;line-height: 150px">
                  <div :class="iconTranform(item.id)" style="width: 100px;font-size: 100px;margin: 0 auto"></div>
                </div>
              </div>
              <div class="echarts-text-wrap">
                <div>
                  <span>名称：{{item.name}}</span><br/>
                  <span>创建人：{{item.creatorName}}</span>
                </div>
                <div>
                  <span>分类：{{item.dataSourceName}}</span><br/>
                  <span>创建时间：{{item.createTime}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addEchartsDeleteBtn" size="small">关 闭</el-button>
        <el-button type="primary" @click="addEchartsOkBtn" size="small">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>

</template>

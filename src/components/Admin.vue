<template>
  <div class="admin">
    <header class="header">
      <div class="header left">
        <!-- <img src="" /> -->
      </div>
      <br />
      <strong>Motof</strong>
      <div class="right">
        <!-- <logined v-show="islogined"></logined> -->
        <router-link @click="clearadmin()" to="Login" style="color: #f56c6c"
          >退出</router-link
        >
      </div>
    </header>
    <main>
      <el-col :span="4">
        <el-menu
          style="border: 1px solid black"
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            index="1"
            @click="num = 0"
            :class="{ active: num == 0 }"
          >
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item
            index="2"
            @click="num = 1"
            :class="{ active: num == 1 }"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item
            index="3"
            @click="
              num = 2;
              initdata(0);
            "
            :class="{ active: num == 2 }"
          >
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item
            index="4"
            @click="
              num = 3;
              initdata(1);
            "
            :class="{ active: num == 3 }"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">图片管理</span>
          </el-menu-item>
          <el-menu-item
            index="5"
            @click="
              num = 4;
              initdata(2);
            "
            :class="{ active: num == 4 }"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">视频管理</span>
          </el-menu-item>
          <!-- <el-menu-item
            index="6"
            @click="
              num = 5;
              initdata(3);
            "
            :class="{ active: num == 5 }"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">数据导入</span>
          </el-menu-item> -->
        </el-menu>
      </el-col>
      <div class="contain">
        <transition name="el-zoom-in-center">
          <div class="front" v-show="num == 0">
            <div class="block">
              <el-avatar
                style="margin-top: 25px; float: left"
                :size="100"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              <h1>尊敬的Admin管理员</h1>
              <p>欢迎来到摩友交流资讯后台管理平台</p>
            </div>
            <div
              ref="myChart2"
              class="shuju"
              :style="{ width: '49%', height: '150px', float: 'left' }"
            >
              <span style="margin-left: 100px">当前用户数量：</span
              ><el-progress
                type="circle"
                :percentage="percentage"
              ></el-progress>
              <!-- :format="format" -->
            </div>

            <div
              ref="myChart"
              :style="{
                width: '65%',
                height: '300px',
                float: 'left',
                margin: '35px 0 0 35px',
              }"
            ></div>
            <div class="title">
              <div class="box">
                <p style="color: black">通知栏</p>
                <ul class="list">
                  <li
                    v-show="ismessage"
                    v-for="(i, index) in messages"
                    :key="index"
                  >
                    {{ i.title | ellipsis }}
                    <span style="float: right; font-size: small">{{
                      i.date
                    }}</span>
                  </li>
                  <el-empty
                    style="margin-top: 50px; color: red"
                    :image-size="80"
                    v-show="!ismessage"
                    description="暂无新数据"
                  ></el-empty>
                </ul>
              </div>
            </div>
          </div>
        </transition>
        <transition name="el-zoom-in-center">
          <div class="usermanagement" v-if="num == 1">
            <div class="titles">
              <div class="boxs">
                <el-input
                  @change="searchM(search)"
                  placeholder="请输入内容"
                  v-model="search"
                  class="input-with-select"
                >
                  <el-select
                    style="width: 100px"
                    v-model="select"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option label="用户名" value="1"></el-option>
                    <el-option label="用户名" value="2"></el-option>
                    <el-option label="用户名" value="3"></el-option>
                  </el-select>
                  <el-button
                    @click="searchM(search)"
                    slot="append"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
                <el-tabs
                  style="margin-left: 20px"
                  v-model="activeName"
                  @tab-click="handleClick"
                >
                  <el-tab-pane label="全部" name="first">
                    <el-table
                      max-height="370"
                      :data="userData"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="用户编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="username"
                        label="用户名称"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="用户状态"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="email"
                        label="用户邮箱"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定冻结此用户吗？"
                            @confirm="confU(scope.row)"
                            :class="
                              scope.row.status == 'freeze' ? 'free' : 'normal'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >冻结</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定为该用户解冻吗？"
                            @confirm="confU(scope.row)"
                            :class="
                              scope.row.status == 'freeze' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >解冻</el-button
                            >
                          </el-popconfirm>
                          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">冻结</el-button>
                      <el-button @click="handleClick(scope.row)" type="text" size="small">解冻</el-button> -->
                          <!-- <el-button type="text" size="small">强制注销</el-button> -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="已冻结" name="second">
                    <el-table
                      max-height="370"
                      :data="freezeuser"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="用户编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="username"
                        label="用户名称"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="用户状态"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="email"
                        label="用户邮箱"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定为该用户解冻吗？"
                            @confirm="confU(scope.row)"
                          >
                            <el-button type="text" size="small" slot="reference"
                              >解冻</el-button
                            >
                          </el-popconfirm>
                          <!-- <el-button type="text" size="small">强制注销</el-button> -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="状态正常" name="third">
                    <el-table
                      max-height="370"
                      :data="finishuser"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="用户编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="username"
                        label="用户名称"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="用户状态"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="email"
                        label="用户邮箱"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定冻结此用户吗？"
                            @confirm="confU(scope.row)"
                          >
                            <el-button type="text" size="small" slot="reference"
                              >冻结</el-button
                            >
                          </el-popconfirm>

                          <!-- <el-button type="text" size="small">强制注销</el-button> -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </transition>
        <transition name="el-zoom-in-center">
          <div class="articlemanagement" v-if="num == 2">
            <div class="titles">
              <div class="boxs">
                <el-input
                  @change="searchA(search)"
                  placeholder="请输入内容"
                  v-model="search"
                  class="input-with-select"
                >
                  <el-select
                    style="width: 100px"
                    v-model="select"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option label="文章标题" value="1"></el-option>
                    <el-option label="文章作者" value="2"></el-option>
                    <el-option label="文章发布状态" value="3"></el-option>
                  </el-select>
                  <el-button
                    @click="searchA(search)"
                    slot="append"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
                <el-tabs
                  style="margin-left: 20px"
                  v-model="activeName"
                  @tab-click="handleClick"
                >
                  <el-tab-pane label="全部" name="first">
                    <el-table
                      max-height="370"
                      :data="articleData"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="文章编码"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        label="文章标题"
                        width="300"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column  label="文章内容" width="200">
                        <template slot-scope="scope">
                          <a href="javascript:void(0)" @click="varticle(scope.row.content)">查看文章详情</a>
                        </template>

                      </el-table-column>
                      <el-table-column prop="author" label="作者" width="120">
                      </el-table-column>
                      <el-table-column prop="label" label="标签" width="120">
                      </el-table-column>
                      <el-table-column prop="date" label="发布时间" width="120">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定同意此文章发布吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '已完成' ? 'free' :(scope.row.status == '下架' ? 'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >同意</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定驳回此文章吗？"
                            @confirm="confAB(scope.row)"
                            :class="
                              scope.row.status == '已完成' ? 'free' :(scope.row.status == '下架' ? 'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >驳回</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定上架此文章吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '下架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此文章吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '下架' ? 'free' :(scope.row.status == '待审核'?'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="待审核" name="second">
                    <el-table
                      max-height="370"
                      :data="reviewarticle"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="文章编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        label="文章标题"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column  label="文章内容" width="120">
                        <template slot-scope="scope">
                          <a href="javascript:void(0)" @click="varticle(scope.row.content)">查看文章详情</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="author" label="作者" width="120">
                      </el-table-column>
                      <el-table-column prop="label" label="标签" width="120">
                      </el-table-column>
                      <el-table-column prop="date" label="发布时间" width="120">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定同意此文章发布吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '已完成' ? 'free' :(scope.row.status == '下架' ? 'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >同意</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定驳回此文章吗？"
                            @confirm="confAB(scope.row)"
                            :class="
                              scope.row.status == '已完成' ? 'free' :(scope.row.status == '下架' ? 'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >驳回</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定上架此文章吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '下架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此文章吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '下架' ? 'free' :(scope.row.status == '待审核'?'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="已完成" name="third">
                    <el-table
                      max-height="370"
                      :data="finisharticle"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="文章编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        label="文章标题"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column  label="文章内容" width="120">
                        <template slot-scope="scope">
                          <a href="javascript:void(0)" @click="varticle(scope.row.content)">查看文章详情</a>
                        </template>
                        
                      </el-table-column>
                      <el-table-column prop="author" label="作者" width="120">
                      </el-table-column>
                      <el-table-column prop="label" label="标签" width="120">
                      </el-table-column>
                      <el-table-column prop="date" label="发布时间" width="120">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定同意此文章发布吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '已完成' ? 'free' :(scope.row.status == '下架' ? 'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >同意</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定驳回此文章吗？"
                            @confirm="confAB(scope.row)"
                            :class="
                              scope.row.status == '已完成' ? 'free' :(scope.row.status == '下架' ? 'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >驳回</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定上架此文章吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '下架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此文章吗？"
                            @confirm="confA(scope.row)"
                            :class="
                              scope.row.status == '下架' ? 'free' :(scope.row.status == '待审核'?'free':(scope.row.status == '已驳回' ? 'free':'normal') )
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div class="tan1" v-show="openarticle">
              <div class="contain1" v-html="articlecontent">
                
              </div>
              <!-- 遮罩层 -->
              <div class="cover">
                <i @click="closeA()" class="el-icon-close" style="font-size:90px;color:red;float:right;"></i>
              </div>
            </div>
          </div>
        </transition>
        <transition name="el-zoom-in-center">
          <div class="picturemanagement" v-if="num == 3">
            <div class="titles">
              <div class="boxs">
                <el-input
                  @change="searchI(search)"
                  placeholder="请输入内容"
                  v-model="search"
                  class="input-with-select"
                >
                  <el-select
                    style="width: 100px"
                    v-model="select"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option label="作者" value="1"></el-option>
                    <el-option label="颜色" value="2"></el-option>
                    <el-option label="款式" value="3"></el-option>
                  </el-select>
                  <el-button
                    @click="searchI(search)"
                    slot="append"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
                <el-tabs
                  style="margin-left: 20px"
                  v-model="activeName"
                  @tab-click="handleClick"
                >
                  <el-tab-pane label="全部" name="first">
                    <el-table
                      max-height="370"
                      :data="imgData"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="图片编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column prop="url" label="图片地址" width="200">
                        <template slot-scope="scope">
                          <!-- <img :src="require(`../assets/images/${scope.row.url}`)" width="100" height="100" /> -->
                          <!-- <img :src="scope.row.url" width="100" height="100" /> -->
                          <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.url"
                            fit="cover"
                            :title="scope.row.title"
                          >
                          </el-image>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column prop="author" label="作者" width="150">
                      </el-table-column>
                      <el-table-column prop="color" label="颜色" width="150">
                      </el-table-column>
                      <el-table-column prop="model" label="款式" width="150">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定上架此图片吗？"
                            @confirm="confP(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'free' : 'normal'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此图片吗？"
                            @confirm="confP(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="已下架" name="second">
                    <el-table
                      max-height="370"
                      :data="reviewimg"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="图片编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column prop="url" label="图片地址" width="200">
                        <template slot-scope="scope">
                          <!-- <img :src="require(`../assets/images/${scope.row.url}`)" width="100" height="100" /> -->
                          <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.url"
                            fit="cover"
                            :title="scope.row.title"
                          >
                          </el-image>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column prop="author" label="作者" width="150">
                      </el-table-column>
                      <el-table-column prop="color" label="颜色" width="150">
                      </el-table-column>
                      <el-table-column prop="model" label="款式" width="150">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定上架此图片吗？"
                            @confirm="confP(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'free' : 'normal'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此图片吗？"
                            @confirm="confP(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="已上架" name="third">
                    <el-table
                      max-height="370"
                      :data="finishimg"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="图片编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column prop="url" label="图片地址" width="200">
                        <template slot-scope="scope">
                          <!-- <img :src="require(`../assets/images/${scope.row.url}`)" width="100" height="100" /> -->
                          <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.url"
                            fit="cover"
                            :title="scope.row.title"
                          >
                          </el-image>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column prop="author" label="作者" width="150">
                      </el-table-column>
                      <el-table-column prop="color" label="颜色" width="150">
                      </el-table-column>
                      <el-table-column prop="model" label="款式" width="150">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定上架此图片吗？"
                            @confirm="confP(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'free' : 'normal'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此图片吗？"
                            @confirm="confP(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </transition>
        <transition name="el-zoom-in-center">
          <div class="videomanagement" v-if="num == 4">
            <div class="titles">
              <div class="boxs">
                <el-input
                  @change="searchV(search)"
                  placeholder="请输入内容"
                  v-model="search"
                  class="input-with-select"
                >
                  <el-select
                    style="width: 100px"
                    v-model="select"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option label="标题" value="1"></el-option>
                    <el-option label="作者" value="2"></el-option>
                    <el-option label="类型" value="3"></el-option>
                  </el-select>
                  <el-button
                    @click="searchV(search)"
                    slot="append"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
                <el-tabs
                  style="margin-left: 20px"
                  v-model="activeName"
                  @tab-click="handleClick"
                >
                  <el-tab-pane label="全部" name="first">
                    <el-table
                      max-height="370"
                      :data="videoData"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="视频编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        label="视频标题"
                        width="250"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="urlplay"
                        label="视频地址"
                        width="300"
                      >
                        <template slot-scope="scope">
                          <a href="javascript:viod(0)" @click="lookvideo(scope.row.url)">{{
                            scope.row.urlplay
                          }}</a>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="author"
                        label="视频作者"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="model"
                        label="视频类型"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定上架此视频吗？"
                            @confirm="confV(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'free' : 'normal'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此视频吗？"
                            @confirm="confV(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="已下架" name="second">
                    <el-table
                      max-height="370"
                      :data="reviewvideo"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="视频编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        label="视频标题"
                        width="250"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="urlplay"
                        label="视频地址"
                        width="300"
                      >
                        <template slot-scope="scope">
                          <a href="javascript:viod(0)" @click="lookvideo(scope.row.url)">{{
                            scope.row.urlplay
                          }}</a>
                          <!-- <iframe
                        ref="myvideo"
                        
                        class="video"
                        frameborder="0"
                        width="200px"
                        height="200px"
                        marginheight="0"
                        marginwidth="0"
                        scrolling="no"
                        :src="scope.row.urlplay"
                        
                        ></iframe> -->
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="author"
                        label="视频作者"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="model"
                        label="视频类型"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定上架此视频吗？"
                            @confirm="confV(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'free' : 'normal'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此视频吗？"
                            @confirm="confV(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="已上架" name="third">
                    <el-table
                      max-height="370"
                      :data="finishvideo"
                      border
                      style="width: 100%"
                    >
                      <el-table-column
                        fixed
                        prop="id"
                        label="视频编码"
                        width="150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        label="视频标题"
                        width="250"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="urlplay"
                        label="视频地址"
                        width="300"
                      >
                        <template slot-scope="scope">
                          <a href="javascript:viod(0)" @click="lookvideo(scope.row.url)">{{
                            scope.row.urlplay
                          }}</a>
                          <!-- <iframe
                        ref="myvideo"
                        
                        class="video"
                        frameborder="0"
                        width="200px"
                        height="200px"
                        marginheight="0"
                        marginwidth="0"
                        scrolling="no"
                        :src="scope.row.urlplay"
                        
                        ></iframe> -->
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="author"
                        label="视频作者"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="发布状态"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="model"
                        label="视频类型"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                          <el-popconfirm
                            title="确定上架此视频吗？"
                            @confirm="confV(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'free' : 'normal'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >上架</el-button
                            >
                          </el-popconfirm>
                          <el-popconfirm
                            title="确定下架此视频吗？"
                            @confirm="confV(scope.row)"
                            :class="
                              scope.row.status == '已上架' ? 'normal' : 'free'
                            "
                          >
                            <el-button type="text" size="small" slot="reference"
                              >下架</el-button
                            >
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div class="tan" v-show="openvideo">
            <iframe
              ref="myvideo"
              class="video"
              style="position:absolute;z-index:999;margin-top:47px;"
              frameborder="0"
              width="80%"
              height="80%"
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              allowfullscreen="true"  
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              :src="videourl"
            ></iframe>
            <!-- 遮罩层 -->
            <div class="cover">
              <i @click="closeM()" class="el-icon-close" style="font-size:90px;color:red;float:right;"></i>
            </div>
          </div>
          </div>
          
        </transition>
        <!-- <transition name="el-zoom-in-center">
          <div class="new" v-if="num == 5">
            <el-button
              type="primary"
              class="newbtn"
              @click="gogo(1)"
              plain
              circle
              >安全</el-button
            >
            <el-button
              type="warning"
              class="newbtn"
              @click="gogo(1)"
              plain
              circle
              >新闻</el-button
            >
            <el-button
              type="success"
              class="newbtn"
              @click="gogo(2)"
              plain
              circle
              >图片</el-button
            >
            <el-button
              type="success"
              class="newbtn"
              @click="gogo(2)"
              plain
              circle
              >视频</el-button
            >
            
          </div>
        </transition> -->
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash.isequal";
import Logined from "./Logined.vue";
export default {
  components: { Logined },
  name: "Admin",
  data: function () {
    return {
      islogined: false,
      islogining: true,
      num: 0,
      sizeList: ["large", "medium", "small"],
      activeName: "first",
      percentage: 0,
      ismessage: "",
      search: "",
      select: "1",
      videourl: "",
      alllength: [],
      userData: [],
      olduserData: [],
      oldarticleData: [],
      oldimgData: [],
      oldvideoData: [],
      articleData: [],
      imgData: [],
      videoData: [],
      messages: [],
      newsearch: "",
      openvideo: false,
      articlecontent:'',
      openarticle:false,
      
    };
  },

  methods: {
    clearadmin(){
      sessionStorage.clear()
    },
    gosafe() {},
    closeM(){
      this.openvideo=false;
      this.videourl="";
    },
    closeset(){
      this.issetbox=false;
      
    },
    closeA(){
      this.openarticle=false;
      this.articlecontent="";
    },
    lookvideo(url) {
      // console.log(url);
      this.videourl=url
      this.openvideo = true;
      
    },
    varticle(item){
      // console.log(item)
      this.openarticle=true;
      this.articlecontent=item
    },
    searchM(search) {
      // console.log(search,this.select);
      var text = this.search;
      // console.log(search, "search");
      if (text == "") {
        this.userData = this.olduserData;
      } else {
        // console.log(this.olduserData, "old");
        let reg = new RegExp(text); //声明正则变量
        let data = this.olduserData.filter((item) => reg.test(item.username)); //返回
        // console.log(data, "searchdata");
        this.userData = data;
      }
    },
    searchA(search) {
      // console.log(search,this.select);
      var text = this.search;
      // console.log(search, "search");
      // console.log(this.oldarticleData, "2");
      var reg = new RegExp(text); //声明正则变量
      var data;
      if (text == "") {
        this.articleData = this.oldarticleData;
      } else {
        // console.log(this.select);
        if (this.select == "1") {
          data = this.oldarticleData.filter((item) => reg.test(item.title)); //返回
          // console.log(data, "new");
        } else if (this.select == "2") {
          data = this.oldarticleData.filter((item) => reg.test(item.author)); //返回
          // console.log(data, "new");
        } else {
          data = this.oldarticleData.filter((item) => reg.test(item.status)); //返回
        }
        this.articleData = data;

        // this.articleData=;
      }
    },

    searchI(search) {
      // console.log(search,this.select);
      var text = this.search;

      var reg = new RegExp(text); //声明正则变量
      var data;
      if (text == "") {
        this.imgData = this.oldimgData;
      } else {
        // console.log(this.select);
        if (this.select == "1") {
          data = this.oldimgData.filter((item) => reg.test(item.author)); //返回
        } else if (this.select == "2") {
          data = this.oldimgData.filter((item) => reg.test(item.color)); //返回
        } else {
          data = this.oldimgData.filter((item) => reg.test(item.model)); //返回
        }
        this.imgData = data;

        // this.articleData=;
      }
    },
    searchV(search) {
      // console.log(search,this.select);
      var text = this.search;

      var reg = new RegExp(text); //声明正则变量
      var data;
      if (text == "") {
        this.videoData = this.oldvideoData;
      } else {
        // console.log(this.select);
        if (this.select == "1") {
          data = this.oldvideoData.filter((item) => reg.test(item.title)); //返回
        } else if (this.select == "2") {
          data = this.oldvideoData.filter((item) => reg.test(item.author)); //返回
        } else {
          data = this.oldvideoData.filter((item) => reg.test(item.model)); //返回
        }
        this.videoData = data;

        // this.articleData=;
      }
    },
    handleClick(scope) {},
    gogo(type) {
      switch (type) {
        case 1:
          this.$router.push({ path: "/SetData" });
          break;
        case 2:
          this.issetbox=true;
          break;
        default:
          break;
      }
    },
    initdata(type) {
      switch (type) {
        case 0:
          var article = sessionStorage.getItem("articleKey");
          // console.log(JSON.parse(article),'article')
          if (article == null || article == "") {
            this.axios({
              method: "post",
              url: "http://localhost:8000/getallarticle",
            })
              .then((res) => {
                // console.log(res);
                this.articleData = res.data;
                this.oldarticleData = res.data;
                sessionStorage.setItem("articleKey", JSON.stringify(res.data));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.articleData = JSON.parse(article);
            this.oldarticleData = JSON.parse(article);
          }

          break;
        case 1:
          var img = sessionStorage.getItem("imgKey");
          if (img == null || img == "") {
            this.axios({
              method: "post",
              url: "http://localhost:8000/getcardmore",
            })
              .then((res) => {
                // console.log(res);
                this.imgData = res.data;
                this.oldimgData = res.data;
                sessionStorage.setItem("imgKey", JSON.stringify(res.data));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.imgData = JSON.parse(img);
            this.oldimgData = JSON.parse(img);
          }

          break;
        case 2:
          var video = sessionStorage.getItem("videoKey");
          if (video == null || video == "") {
            this.axios({
              method: "post",
              url: "http://localhost:8000/getallvideo",
            })
              .then((res) => {
                // console.log(res);
                this.videoData = res.data;
                this.oldvideoData = res.data;
                sessionStorage.setItem("videoKey", JSON.stringify(res.data));
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.videoData = JSON.parse(video);
            this.oldvideoData = JSON.parse(video);
          }

          break;
        case 3:
          break;
        default:
          break;
      }
    },
    confU(tab) {
      let _this=this
      // console.log(tab.id);
      var status=''
      if(tab.status=='freeze'){
        status='normal'
      }else{
        status='freeze'
      }
      this.axios({
        method:'post',
        url:'http://localhost:8000/upustatus',
        params:{
          id:tab.id,
          status:status
        }
      })
      .then((res)=>{
        // console.log(res)
        sessionStorage.clear('pageKey')
        setTimeout(() => {
          _this.getuser();
        }, 500);
      })
      .catch((err)=>{
        console.log(err)
      })

    },
    confA(tab) {
      let _this=this
      // console.log(tab.id);
      var status=''
      if(tab.status=='待审核'){
        status='已完成'
      }
      if(tab.status=='已完成'){
        status='下架'
      }
      if(tab.status=='下架'){
        status='已完成'
      }
      this.axios({
        method:'post',
        url:'http://localhost:8000/upastatus',
        params:{
          id:tab.id,
          status:status
        }
      })
      .then((res)=>{
        // console.log(res)
        sessionStorage.clear('articleKey')
        setTimeout(() => {
          _this.initdata(0);
        }, 500);
      })
      .catch((err)=>{
        console.log(err)
      })

    },
    confAB(tab) {
      let _this=this
      // console.log(tab.id);
      var status='已驳回'
      this.axios({
        method:'post',
        url:'http://localhost:8000/upastatus',
        params:{
          id:tab.id,
          status:status
        }
      })
      .then((res)=>{
        // console.log(res)
        sessionStorage.clear('articleKey')
        setTimeout(() => {
          _this.initdata(0);
        }, 500);
      })
      .catch((err)=>{
        console.log(err)
      })

    },
    confP(tab) {
      let _this=this
      // console.log(tab.id);
      var status=''
      if(tab.status=='已上架'){
        status='已下架'
      }else{
        status='已上架'
      }
      
      this.axios({
        method:'post',
        url:'http://localhost:8000/uppstatus',
        params:{
          id:tab.id,
          status:status
        }
      })
      .then((res)=>{
        // console.log(res)
        sessionStorage.clear('imgKey')
        setTimeout(() => {
          _this.initdata(1);
        }, 500);
      })
      .catch((err)=>{
        console.log(err)
      })

    },
    confV(tab) {
      let _this=this
      // console.log(tab.id);
      var status=''
      if(tab.status=='已上架'){
        status='已下架'
      }else{
        status='已上架'
      }
      
      this.axios({
        method:'post',
        url:'http://localhost:8000/upvstatus',
        params:{
          id:tab.id,
          status:status
        }
      })
      .then((res)=>{
        // console.log(res)
        sessionStorage.clear('videoKey')
        setTimeout(() => {
          _this.initdata(2);
        }, 500);
      })
      .catch((err)=>{
        console.log(err)
      })

    },
    drawLine() {
      // console.log("11");
      let _this = this;
      this.axios({
        method: "post",
        url: "http://localhost:8000/getalllength",
      })
        .then((res) => {
          // console.log(res.data);
          // this.alllength=res.data
          // console.log(this.alllength);
          let data = res.data;
          let newdata = [];
          for (let i in data[0]) {
            // console.log(i);
            // console.log(data[0][i]);
            let middledata = {
              name: i,
              value: data[0][i],
            };
            newdata.push(middledata);
          }
          // console.log(newdata, "newdata");
          this.alllength = newdata;
          var echarts = require("echarts");
          // this.$refs.myChart2.style.width=45+'%';

          var myChart = echarts.init(_this.$refs.myChart);
          let option = {
            title: {
              text: "平台使用情况一览图",
              // subtext: 'Fake Data',
              left: "center",
            },
            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "vertical",
              left: "left",
            },
            series: [
              {
                name: "Access From",
                type: "pie",
                radius: "50%",
                data: [],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          };
          // console.log(option,'option')
          // console.log(this.alllength,'22')
          option.series[0].data = this.alllength;
          myChart.setOption(option);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getuser(){
      let page = sessionStorage.getItem("pageKey");
    if (page == null || page == "") {
      this.axios({
        method: "post",
        url: "http://localhost:8000/getuser",
      })
        .then((res) => {
          // console.log(res);

          this.userData = res.data;
          this.olduserData = res.data;
          sessionStorage.setItem("pageKey", JSON.stringify(res.data));
          // console.log(res.data.length,typeof(res.data.length))
          this.percentage = res.data.length;
          // console.log(this.percentage,'percentage')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log(page,'page')
      this.userData = JSON.parse(page);
      this.olduserData = JSON.parse(page);
      this.percentage = JSON.parse(page).length;
    }
    },
    getmessage(){
      this.axios({
      method: "post",
      url: "http://localhost:8000/getmessage",
    })
      .then((res) => {
        // console.log(res.data);
        this.messages = res.data;
        if (this.messages == null) {
          this.ismessage = false;
        } else {
          this.ismessage = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  watch: {
    select(news, olds) {
      if (news !== olds) {
        this.articleData = this.oldarticleData;
        this.imgData = this.oldimgData;
        this.videoData = this.oldvideoData;
      }
    },
  },
  mounted: function () {
    let _this = this;

    // console.log(this.alllength,'alllength')
    this.$nextTick(() => {
      // console.log("_this", _this);
      _this.drawLine();
    });
  },
  computed: {
    freezeuser() {
      // console.log(this.userData, "1231333333");
      this.fuserData = this.userData.filter(function (item) {
        return item.status == "freeze";
      });
      // console.log(this.fuserData, "12313");
      return this.fuserData;
    },
    finishuser() {
      this.fsuserData = this.userData.filter(function (item) {
        return item.status == "normal";
      });
      console.log(this.fsuserData, "123133");
      return this.fsuserData;
    },
    reviewarticle() {
      this.farticleData = this.articleData.filter(function (item) {
        return item.status == "待审核";
      });
      return this.farticleData;
    },
    finisharticle() {
      this.fsarticleData = this.articleData.filter(function (item) {
        return item.status == "已完成";
      });
      return this.fsarticleData;
    },
    reviewimg() {
      this.fimgData = this.imgData.filter(function (item) {
        return item.status == "已下架";
      });
      return this.fimgData;
    },
    finishimg() {
      this.fsimgData = this.imgData.filter(function (item) {
        return item.status == "已上架";
      });
      return this.fsimgData;
    },
    reviewvideo() {
      this.fvideoData = this.videoData.filter(function (item) {
        return item.status == "已下架";
      });
      return this.fvideoData;
    },
    finishvideo() {
      this.fsvideoData = this.videoData.filter(function (item) {
        return item.status == "已上架";
      });
      return this.fsvideoData;
    },
  },
  filters: {
    // 判断超出30个字显示省略号
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 13) {
        return value.slice(0, 13) + "...";
      }
      return value;
    },
  },

  created: function () {
    this.getuser();
    this.getmessage();
  },
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}

* {
  padding: 0;
  margin: 0;
}
.free {
  display: none;
}

.normal {
  display: inline-flex;
}
.el-tabs__item {
  font-size: 18px;
}
/* .el-tabs__content {
    height: 370px;
    overflow: auto;
    
} */

.admin {
  width: 100%;
  height: 556px;
  /* background-color: beige; */

  /*-webkit-filter: opacity(50%);  
    filter: opacity(50%); */
}
/* .admin::before{
    width: 100%;
    height: 556px;
    background-image: url(../assets/images/bg1.jpg);
    background-size: 100% 100%;
    content: "";
    position: absolute;
    z-index: -1;
    opacity:0.8;
} */
.admin img {
  opacity: 0.7;
}

.header {
  width: 100%;
  height: 70px;
  background-color: #303133;
  position: relative;
}
.el-popconfirm {
  display: inline-flex;
}
.header .left {
  width: 100px;
  height: 100%;
  background-image: url(../assets/images/logo.png);
  background-size: 100% 100%;
  float: left;
}

.header .left {
  float: left;
}
.header strong {
  font-size: 2rem;
  margin-left: 2rem;
  color: #fff;
  font-style: oblique;
}
.header strong:hover {
  cursor: pointer;
}
.header .right {
  width: 12rem;
  float: right;
}

.contain {
  width: 83%;
  margin-left: 17%;
}

.el-menu-item,
.el-submenu__title {
  height: 97px;
  line-height: 97px;
}
.front {
  width: 83%;
  height: 480px;
  /* border: 1px solid black; */
  position: absolute;
}
.front .block {
  width: 50%;
  height: 150px;
  /* background-color: aqua; */
  float: left;
}
.shuju {
  width: 70%;
  height: 150px;
  float: left;
}
.front .block h1 {
  width: 80%;
  margin-top: 20px;
  float: left;
}
.front .block p {
  width: 80%;
  margin-top: 20px;
  float: left;
}
.front .title {
  width: 31%;
  height: 286px;
  float: left;
  margin-top: 35px;
  /* background-color: #545c64; */
  border-radius: 15px;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
  background-color: #9e9e9e;
  box-shadow: inset 0 0 15px 0 #fff;
}
.front .title .box {
  width: 98%;
  height: 98%;
  margin-top: 1%;
  margin-left: 1%;
  border-radius: 15px;
  overflow: auto;
  /* background-color: hsla(0, 0%, 100%);
  box-shadow: inset 0 0 15px 0 #fff; */
}
/* 滑块样式 */
.box::-webkit-scrollbar {
  width: 10px;
}
.box::-webkit-scrollbar-track {
  border-radius: 5px;
}
.box::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
}
.front .title .box li {
  margin-top: 5px;
  color: #e91e63;
}
.titles {
  width: 100%;
  height: 95%;
  /* background-color: #aeabab; */
  border-radius: 2em;
}
.boxs {
  width: 99%;
  height: 99%;
  margin-top: 0.5%;
  margin-left: 0.5%;
  border-radius: 2em;
  /* background-color: hsla(0, 0%, 100%);
  box-shadow: inset 0 0 15px 0 #fff; */
}

.usermanagement {
  width: 83%;
  height: 480px;
  /* border: 1px solid black; */
  position: absolute;
}
.articlemanagement {
  width: 83%;
  height: 480px;
  /* border: 1px solid black; */
  position: absolute;
}
.articlemanagement .tan1{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.articlemanagement .tan1 .contain1{
  position: absolute;
  width: 90%;
  height: 500px;
  color: #fff;
  overflow: auto;
  z-index: 99999;
  margin: 30px 45px;
}
/* 滑块样式 */
.contain1::-webkit-scrollbar {
  width: 10px;
}
.contain1::-webkit-scrollbar-track {
  border-radius: 5px;
}
.contain1::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
}
.articlemanagement>>> a{
  color: tomato;
}
.articlemanagement .tan1 .cover{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #121212;
  opacity: 0.9;
}
.picturemanagement {
  width: 83%;
  height: 480px;
  /* border: 1px solid black; */
  position: absolute;
}
.videomanagement {
  width: 83%;
  height: 480px;
  /* border: 1px solid black; */
  position: absolute;
}
.videomanagement .tan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  
}
.videomanagement .tan .cover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #4c4c4b;
  opacity: 0.5;
}

.new {
  width: 83%;
  height: 480px;
  /* border: 1px solid black; */
  position: absolute;
  background-image: url("../assets/images/last2.png");
  background-size: 100% 100%;
}

.new .newbtn {
  height: 100px;
  font-size: 45px;
  float: left;
  position: absolute;
  left: 5%;
}

.new .newbtn:nth-of-type(1) {
  animation: myfirst 10s linear infinite alternate;
  /* animation-timing-function:linear;
  animation-direction:alternate;
  -webkit-animation-timing-function:linear;  */
  /* -webkit-animation:myfirst 5s infinite;  */
}

.new .newbtn:nth-of-type(2) {
  animation: myfirst 10s linear 3s infinite alternate;
  /* animation:myfirst2 10s infinite;
  animation-timing-function:linear; */
}
.new .newbtn:nth-of-type(3) {
  animation: myfirst 10s linear 6s infinite alternate;
  /* animation:myfirst 10s infinite;
  animation-timing-function:linear; */
}
.new .newbtn:nth-of-type(4) {
  animation: myfirst 10s linear 9s infinite alternate;
  /* animation:myfirst 10s infinite;
  animation-timing-function:linear; */
}
@keyframes myfirst {
  0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(800px, 0px);
  }
}

.new img:first-of-type {
  position: absolute;
  left: 0;
  top: 140px;
  width: 350px;
  height: 320px;
}
.new img:last-of-type {
  position: absolute;
  right: 10px;
  top: 30px;
  width: 460px;
  height: 320px;
}
</style>
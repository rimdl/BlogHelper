<template>
  <el-row>
    <el-col :span="24" class="side">
      <el-row style="background: transparent">
        <el-col :span="24" class="logo">
          <el-avatar :size="50" :src="'/images/logo.png'"/>
          <br>
          <img src="/images/bloghelper.svg" alt="" style="width: 70%">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-divider border-style="dashed"/>
        </el-col>
      </el-row>
      <el-row>
        <router-link to="/" class="r_link">
          <el-col :span="24" class="my_btn">
          <img src="/images/home.svg" class="icon_style" alt="">
          <span class="text_style">主页</span>
        </el-col>
        </router-link>
      </el-row>
      <el-row style="margin-top: 1vh">
        <router-link to="/posts" class="r_link">
        <el-col :span="24" class="my_btn">
          <img src="/images/Document.svg" class="icon_style" alt="">
          <span class="text_style">文章</span>
        </el-col>
        </router-link>
      </el-row>
      <el-row style="margin-top: 1vh">
        <router-link to="/pages" class="r_link">
        <el-col :span="24" class="my_btn">
          <img src="/images/link.svg" class="icon_style" alt="">
          <span class="text_style">页面</span>
        </el-col>
        </router-link>
      </el-row>
      <el-row style="margin-top: 1vh">
        <router-link to="/settings" class="r_link">
        <el-col :span="24" class="my_btn">
          <img src="/images/settings.svg" class="icon_style" alt="">
          <span class="text_style">设置</span>
        </el-col>
        </router-link>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import { useSystemStore } from '../stores/systemStore'
import {ref} from "vue";


</script>

<style scoped>
.side {
  border-radius: 10px;
  height: 98vh;
  background: white;
}

.logo {
  text-align: center;
  margin-top: 1vh;
}

.my_btn{
  display: flex;
  align-items: flex-start;
  border-radius: 10px;
  font-weight: bolder;
  color: rgba(93, 106, 137);
  padding: 10px;
  cursor: pointer;
}
.my_btn:hover{
  scale: 0.98;
  background: rgba(255, 255, 255, 0.8);
  color: rgba(39, 39, 47);
}
.my_btn:active{
  background: rgba(234, 234, 234, 0.8);
}
.icon_style{
  width: 20px;
  height: 20px
}
.text_style{
  vertical-align: sub;
  margin-left: 1vw;
}
.r_link{
  text-decoration: none;
  width: 100%;
}
</style>
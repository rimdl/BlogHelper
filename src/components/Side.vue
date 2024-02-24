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
        <router-link to="/settings" class="r_link">
        <el-col :span="24" class="my_btn">
          <img src="/images/settings.svg" class="icon_style" alt="">
          <span class="text_style">设置</span>
        </el-col>
        </router-link>
      </el-row>

      <div style="position: absolute;bottom: 1vh;width: 100%;">
        <el-row style="padding: 10px">
          <el-col :span-24 class="help_btn">
            <a href="https://github.com/rimdl/BlogHelper" style="text-decoration: none;color: #2c3e50;font-weight: bolder" target="_blank">
              需要帮助？
            </a>
          </el-col>
        </el-row>
      </div>

    </el-col>
  </el-row>
</template>

<script setup>


</script>

<style scoped>
.side {
  border-radius: 10px;
  height: calc(100vh - 16px);
  background: rgba(255,255,255,0.8);
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
  transition: 0.5s;
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
  height: 20px;
  transition: 0.5s;
}
.icon_style:hover{
  transform: rotate(90deg);
}
.text_style{
  vertical-align: sub;
  margin-left: 1vw;
}
.r_link{
  text-decoration: none;
  width: 100%;
}
.diy{
  padding: 10px;
  border-radius: 10px;
}
.add{
  transition: 0.5s;
}
.add:hover{
  transform: rotate(90deg);
}
.router-link-active{
  background: rgba(255, 255, 255, 0.8);
  color: rgba(39, 39, 47);
  border-radius: 10px;
}
.help_btn{
  text-align: center;
  background: rgba(255,255,255,0.5);
  padding: 10px;
  border-radius: 10px;
  transition: 0.5s;
}
.help_btn:hover{
  box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.1);
  scale: 1.01;
}
</style>
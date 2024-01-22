<template>
  <el-row>
    <el-col :span="24" class="nav">
      <el-page-header title=" " :icon="null" style="color: white">
        <template #content>
          <div class="flex items-center">
            <span style="color: white">{{ systemStore.now_page.substring(0,10) }}</span>
<!--            <input type="text" class="input" placeholder="搜索...">-->
          </div>
        </template>
        <template #extra>
          <div>
            <a v-if="userStore.user_info !== {}" :href="userStore.user_info.html_url" target="_blank" style="color: white;cursor: pointer">
            <el-avatar
                :size="20"
                :src="userStore.user_info.avatar_url"
                style="float: left;background: transparent"
                @error="errorHandler"
            >
              <img
                  src="/images/user.svg"
              />
            </el-avatar>
            <span style="float: left;line-height: 20px;margin-left: 10px;font-weight: bolder">{{ userStore.user_info.name }}</span>
            </a>
            <router-link to="/settings">
              <el-avatar :size="20" src="/images/settings_2.svg" style="float: left;background: transparent;margin-left: 20px"/>
            </router-link>
          </div>
        </template>
      </el-page-header>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from "vue";
import { useUserStore } from '../stores/userStore'
import { useSystemStore } from '../stores/systemStore'

const systemStore = useSystemStore()
const userStore = useUserStore()
const errorHandler = () => true

</script>

<style scoped>
.nav {
  border-radius: 10px;
  height: 70px;
  padding: 10px;
}

.input{
  height: 25px;
  margin-left: 2vw;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 5px;
}
</style>
<template>
  <el-row class="main_main_row">
    <el-col :span="24">
      <el-row>
        <el-col :span="6" class="glass welcome" :style="welcome_style">
          <span class="welcome_label" v-if="settingsStore.settings.token">欢迎回来，{{ userStore.user_info.name }}</span>
          <span class="welcome_label" v-else>未获取到用户信息</span>
        </el-col>
        <el-col :span="8" :offset="1" class="glass main_userinfo">
          <el-row>
            <el-col :span="24">
              <span class="main_label">用户信息</span>
            </el-col>
            <el-col :span="24">
              <el-divider border-style="dashed"/>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-if="!settingsStore.settings.token">
              <el-empty description="没有获取到用户信息" :image-size="40"/>
            </el-col>
          </el-row>
          <el-row v-if="settingsStore.settings.token">
            <el-col :span="8" class="main_userinfo_item">
              <el-avatar @error="errorHandler" :src="userStore.user_info.avatar_url" class="main_avatar"
                         :size="78">
                <img
                    src="/images/errorimg.svg"
                    alt="error"
                />
              </el-avatar>
              <br>
              <span class="sub_label user_email">{{ userStore.user_info.email }}</span>
              <p class="main_userinfo_btn">
                <a :href="userStore.user_info.html_url" target="_blank">
                  <el-button size="small" class="btn_github" round><img src="../../public/images/github_2.svg"
                                                                        class="main_github_img" alt="">我的GitHub
                  </el-button>
                </a>
              </p>
            </el-col>
            <el-col :span="16" class="main_userinfo_right">
              <span class="sub_label">公开仓库：</span><span
                class="main_xs_font">{{ userStore.user_info.public_repos }}</span>
              <br>
              <span class="sub_label">创建时间：</span><span
                class="main_xs_font">{{ userStore.user_info.created_at }}</span>
              <br>
              <span class="sub_label">个人说明：</span><span
                class="main_xs_font">{{ userStore.user_info.bio }}<span v-if="!userStore.user_info.bio"
                                                                        class="main_xs_font">......</span></span>
              <br>
              <span class="sub_label">个人博客：</span><span
                class="main_xs_font">{{ userStore.user_info.blog }}<span v-if="!userStore.user_info.blog"
                                                                         class="main_xs_font">......</span></span>
              <br>

              <p class="follower_main">
                <span class="follower">
                <img src="../../public/images/followers.svg" style="width: 20px;" alt="">
                <span class="sub_label" style="margin-left: 5px">followers: <span
                    style="font-weight: bolder;font-size: larger">{{ userStore.user_info.followers }}</span></span>
              </span>
                <span class="follower">&nbsp;&nbsp;&nbsp;</span>
                <span class="follower">
                <img src="../../public/images/following.svg" style="width: 20px;" alt="">
                <span class="sub_label" style="margin-left: 5px">following: <span
                    style="font-weight: bolder;font-size: larger">{{ userStore.user_info.following }}</span></span>
              </span>
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" :offset="1" class="glass" style="border-radius: 20px;padding: 10px">
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-col :span="12">
                  <span class="main_label">当前仓库信息</span>
                </el-col>
                <el-col :span="12" class="main_title_btns">
                  <img @click="reget_repo($event)" src="/images/refresh.svg" class="refresh_btn" style="width: 20px"
                       alt="">
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-divider border-style="dashed"/>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-if="!settingsStore.settings.token">
              <el-empty description="没有获取到仓库信息" :image-size="40"/>
            </el-col>
          </el-row>
          <el-row v-if="settingsStore.settings.token">
            <el-col :span="24">
              <p class="repo_main">
              <span class="repo_span">
                <img src="../../public/images/repo.svg" style="width: 20px;" alt="">
                <span class="sub_label" style="margin-left: 5px">仓库名称：</span><span
                  style="font-size: x-small;font-weight: bolder">{{ repositoryStore.repository_info.name }}</span>
              </span>
                <span class="repo_span">
                <img src="../../public/images/private.svg" style="width: 20px;" alt="">
                <span class="sub_label" style="margin-left: 5px">私有仓库：</span><span
                    style="font-size: x-small;font-weight: bolder">{{ repositoryStore.repository_info.private }}</span>
              </span>
              </p>
              <span class="repo_span_2">
                  <img src="../../public/images/time.svg" style="width: 20px;" alt="">
                  <span class="sub_label">创建时间：</span><span
                  style="font-size: x-small">{{ repositoryStore.repository_info.created_at }}</span>
                </span>
              <span class="repo_span_2">
                   <img src="../../public/images/desc.svg" style="width: 20px;" alt="">
                  <span class="sub_label">仓库描述：</span><span
                  style="font-size: x-small">{{ repositoryStore.repository_info.description }}<span
                  v-if="!repositoryStore.repository_info.description"
                  style="font-size: xx-small;color: gray">......</span></span>
              </span>
              <span class="repo_span_2">
                <img src="../../public/images/link_2.svg" style="width: 20px;" alt="">
              <span class="sub_label">克隆地址：</span><span
                  style="font-size: x-small">{{ repositoryStore.repository_info.clone_url }}</span>
              </span>
              <span class="repo_span_2">
                <img src="../../public/images/link_3.svg" style="width: 20px;" alt="">
              <span class="sub_label">仓库地址：</span><span
                  style="font-size: x-small">{{ repositoryStore.repository_info.html_url }}</span>
              </span>
            </el-col>
          </el-row>
        </el-col>

      </el-row>

      <el-row style="margin-top: 2vh">
        <el-col :span="5" class="glass bl">
          <el-row>
            <el-col :span="10">
              <!--              <el-avatar :size="50" src="/images/edit_2.svg" style="background: blue" :fit="'cover'"/>-->
              <img src="/images/edit_2.svg" alt="error"
                   style="background: #008cff;background-size: cover;width: 50px;margin-left: 10px;border-radius: 10px"/>
            </el-col>
            <el-col :span="14" style="text-align: right">
              <label class="bl_main_label">文章总数</label>
              <br>
              <span style="font-size: x-large;color: #2c3e50;font-weight: bolder">{{ fileList.length }}</span>
            </el-col>
            <el-col :span="24" style="text-align: center">
              <el-button round style="background: rgba(255,255,255,0.5)" class="v_btn">
                <router-link to="/posts" style="text-decoration: none">
                  <label class="bl_sub_label"
                         style="cursor: pointer;display: flex;align-items: center;justify-content: center">
                    <img src="../../public/images/pointer.svg" style="width: 30px" alt="">
                    &nbsp;去写作</label>
                </router-link>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" :offset="1" class="glass bl3">
          <el-row>
            <el-col :span="10">
              <img src="/images/settings_3.svg" alt="error"
                   style="background: white;background-size: cover;width: 50px;margin-left: 10px;border-radius: 10px"/>
            </el-col>
            <el-col :span="14" style="text-align: right">
              <label class="bl_main_label">设置</label>
              <br>
              <span class="bl_sub_label">系统设置</span>
            </el-col>
            <el-col :span="24" style="text-align: center">
              <el-button round style="background: rgba(255,255,255,0.5)" class="v_btn">
                <router-link to="/settings" style="text-decoration: none">
                  <label class="bl_sub_label"
                         style="cursor: pointer;display: flex;align-items: center;justify-content: center">
                    <img src="../../public/images/settings_4.svg" style="width: 20px" alt="">
                    &nbsp;点击前往设置页面</label>
                </router-link>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" :offset="1" class="glass bl4">
          <el-row>
            <el-col :span="10">
              <!--              <el-avatar :size="50" src="/images/github.svg" style="background: white"/>-->
              <img src="/images/myself.svg" alt="error"
                   style="background: white;background-size: cover;width: 50px;margin-left: 10px;border-radius: 10px"/>
            </el-col>
            <el-col :span="14" style="text-align: right">
              <label class="bl_main_label">我的GitHub</label>
              <br>
              <span class="bl_sub_label">访问我的GitHub主页</span>
            </el-col>
            <el-col :span="24" style="text-align: center">
              <el-button round style="background: rgba(255,255,255,0.5)" class="v_btn">
                <a :href="userStore.user_info.html_url" style="text-decoration: none" target="_blank">
                  <label class="bl_sub_label"
                         style="cursor: pointer;display: flex;align-items: center;justify-content: center">
                    <img src="../../public/images/br.svg" style="width: 25px" alt="">
                    &nbsp;{{ userStore.user_info.name }}</label>
                </a>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" :offset="1" class="glass bl2">
          <el-row>
            <el-col :span="10">
              <!--              <el-avatar :size="50" src="/images/github.svg" style="background: white"/>-->
              <img src="/images/github.svg" alt="error"
                   style="background: white;background-size: cover;width: 50px;margin-left: 10px;border-radius: 10px"/>
            </el-col>
            <el-col :span="14" style="text-align: right">
              <label class="bl_main_label">项目代码</label>
              <br>
              <span class="bl_sub_label">查看BlogHelper代码</span>
            </el-col>
            <el-col :span="24" style="text-align: center">
              <el-button round style="background: rgba(255,255,255,0.5)" class="v_btn">
                <a href="https://github.com/rimdl/BlogHelper" style="text-decoration: none" target="_blank">
                  <label class="bl_sub_label"
                         style="cursor: pointer;display: flex;align-items: center;justify-content: center">
                    <img src="../../public/images/visit.svg" style="width: 25px" alt="">
                    &nbsp;github</label>
                </a>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-top: 2vh">
        <el-col :span="12" class="glass" style="padding: 10px;border-radius: 20px">
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-col :span="12">
                  <label class="main_label">已发布文章</label>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <!--                  <el-button @click="get_tree" round size="small">刷新</el-button>-->
                  <img @click="get_tree" src="/images/refresh.svg" class="refresh_btn" style="width: 20px" alt="">
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-divider border-style="dashed"/>
            </el-col>
          </el-row>
          <el-row class="preview_post">
            <el-col :span="24" v-for="(item,index) in  fileList" :key="item.value.url" class="post">
              <el-row>
                <el-col :span="20">
                  <router-link
                      :to="'/read?url='+item.value.url" style="text-decoration: none">
                    <el-tag round effect="dark">{{ index + 1 }}</el-tag>
                    <span class="main_label" title="点击阅读">&nbsp;&nbsp;{{
                        item.label.substring(item.label.indexOf('_post') + 7)
                      }}</span>
                  </router-link>
                </el-col>
                <el-col :span="4" style="text-align: right">
                  <el-tooltip content="编辑" placement="top" effect="light">
                    <router-link
                        :to="'/posts?filename='+item.label.substring(item.label.indexOf('_post') + 7)+'&url='+item.value.url">
                      <el-avatar :size="30" class="edit_svg" style="background: white" src="/images/edit.svg"/>
                    </router-link>
                  </el-tooltip>

                  <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定删除吗？"
                                 @confirm="deleteGit(item.sha,item.label.substring(item.label.indexOf('_post') + 7),$event)">
                    <template #reference>
                      <el-avatar class="remove_svg" title="删除" :size="30" style="background: white;margin-left: 1vw"
                                 src="/images/delete.svg"/>
                    </template>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24" v-if="fileList.length === 0">
              <el-empty :image-size="100" description="没有数据"/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="1" class="glass" style="border-radius: 20px;padding: 10px">
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-col :span="18">
                  <label class="main_label">草稿箱</label>
                </el-col>
                <el-col :span="6" style="text-align: right">
                  <el-popconfirm title="确认清空草稿箱?" @confirm="clearDrafts" confirm-button-text="清空"
                                 cancel-button-text="取消">
                    <template #reference>
                      <img title="清空草稿箱" src="../../public/images/clear.svg" class="clear_btn" style="width: 20px;"
                           alt="">
                    </template>
                  </el-popconfirm>

                </el-col>
              </el-row>

            </el-col>
            <el-col :span="24">
              <el-divider border-style="dashed"/>
            </el-col>
          </el-row>
          <el-row class="preview_post">
            <el-col :span="24" v-for="(item,index) in  drafts" :key="index" class="post">
              <el-row>
                <el-col :span="20">
                  <el-tag round effect="dark">{{ index + 1 }}</el-tag>
                  <span class="main_label">&nbsp;&nbsp;{{ item.filename }}</span>
                </el-col>
                <el-col :span="4" style="text-align: right">
                  <el-tooltip content="编辑" placement="top" effect="light">
                    <router-link :to="'/posts?filename='+item.filename">
                      <el-avatar class="edit_svg" :size="30" style="background: white" src="/images/edit.svg"/>
                    </router-link>
                  </el-tooltip>

                  <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定删除吗？"
                                 @confirm="deleteDraft(item.filename)">
                    <template #reference>
                      <el-avatar class="remove_svg" title="删除" :size="30" style="background: white;margin-left: 1vw"
                                 src="/images/delete.svg"/>
                    </template>
                  </el-popconfirm>

                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24" v-if="drafts.length === 0">
              <el-empty :image-size="100" description="没有数据"/>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" class="main_footer">
      <p style="font-weight: bolder;font-size: larger;">
        <img src="../../public/images/bloghelper.svg" style="width: 100px" alt="">
      </p>
      <span style="font-size: smaller;color: #34495e;font-weight: bolder">本项目开源地址：<a
          href="https://github.com/rimdl/BlogHelper" target="_blank">Github</a></span>
      &nbsp;
      <span style="font-size: smaller;color: #34495e;font-weight: bolder">您可在此处反馈问题：<a
          href="https://github.com/rimdl/BlogHelper/issues" target="_blank">issues</a></span>
      <br>
      <span
          style="font-size: smaller;color: #34495e;font-weight: bolder;display: flex;align-items: center;justify-content: center">© 2023-{{
          current_year
        }} <span><img src="../../public/images/heart.svg" class="heartBeat" alt=""></span> BlogHelper, <a
            class="ft_link" href="https://github.com/rimdl">@xinsi.</a></span>
      <a style="font-size: smaller;color: #34495e;font-weight: bolder;text-decoration: none"
         :href="'https://github.com/rimdl/BlogHelper/releases/tag/'+config.version" target="_blank">Release:
        {{ config.version }}</a>
    </el-col>
    <el-col :span="24">
    </el-col>
  </el-row>
</template>

<script setup>
import {useUserStore} from "../stores/userStore.js";
import {inject, onMounted, ref, watch} from "vue";
import party from "party-js";
import {useSettingsStore} from "../stores/settingsStore.js";
import {useRepositoryStore} from "../stores/repositoryStore.js";
import {ElMessageBox, ElNotification} from "element-plus";
import {useTreeStore} from "../stores/treeStore.js";
import {myFetch} from "../utils/my_fetch.js";
import {useSystemStore} from "../stores/systemStore.js";
import config from '../../package.json'


const userStore = useUserStore()
const settingsStore = useSettingsStore()
const repositoryStore = useRepositoryStore()
const treeStore = useTreeStore()
const systemStore = useSystemStore()
const errorHandler = () => true

const fileList = ref([])
const drafts = ref([])
const current_year = ref("")
const loading = ref(true)
const welcome_style = ref("")

function isPropertyValueEmpty(obj, property) {
  return obj[property] === undefined || obj[property] === null || (typeof obj[property] === 'string' && obj[property].trim() === '');
}

const get_tree = inject("get_tree")
onMounted(() => {
  if (!isPropertyValueEmpty(settingsStore.settings, 'token')) {
    if (treeStore.tree_info.length === 0) {
      get_tree(false)
    } else {
      if (systemStore.loadTree) {
        get_tree(true);
        systemStore.set_loadTree(false)
      }
    }
    get_repository_info()
    getPostFile()
    getDrafts()
  } else {
    ElMessageBox({
      title: '提示',
      message: '<strong>本地未获取到配置信息，请前往<a href="/settings">设置</a>页面进行配置。</strong>',
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showConfirmButton: false
    })
  }
  current_year.value = new Date().getFullYear()
  loading.value = false
  welcome_style.value = `background-image: url('${userStore.user_info.avatar_url}');background-size: cover;`
})


const reget_repo = async (e) => {
  ElNotification({
    title: '提示',
    message: '正在尝试获取仓库信息',
    type: 'info',
  })
  if (!isPropertyValueEmpty(settingsStore.settings, 'token')) {
    await get_repository_info()
    party.confetti(e)
    ElNotification({
      title: '提示',
      message: '仓库信息获取成功',
      type: 'success',
    })
  } else {
    ElNotification({
      title: '提示',
      dangerouslyUseHTMLString: true,
      message: '<strong>用户信息未设置，请前往 <a href="/settings" style="color: #007bff;">设置</a> 页面进行设置。</strong>',
      type: 'error',
    })
  }
}
const get_repository_info = async () => {
  if (!isPropertyValueEmpty(settingsStore.settings, 'token')) {
    let url = "https://api.github.com/repos/" + settingsStore.settings.sub_repo;
    let headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + settingsStore.settings.token,
      'X-GitHub-Api-Version': '2022-11-28'
    }
    let data = await myFetch.get(url, headers)
    if (data.error === null) {
      repositoryStore.set_repository_info(data.data)
    } else {
      console.log(data.error)
    }
  }
}

const extractNodesByPath = inject("extractNodesByPath")


const getPostFile = () => {
  let data = treeStore.tree_info
  let root_path = ""
  if (settingsStore.settings.root.path.length !== 1) {
    root_path = settingsStore.settings.root.path
  }
  let startPath = root_path + "/source/_posts/";
  fileList.value = data.reduce((acc, rootNode) => extractNodesByPath(rootNode, startPath, acc), []);
}

const getDrafts = () => {
  if (localStorage.getItem("drafts") !== null) {
    drafts.value = JSON.parse(localStorage.getItem("drafts"))
  }
}

watch(() => treeStore.tree_info, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    getPostFile();
    console.log("tree_info changed")
  }
})

const deleteDraft = (filename) => {
  const drafts = JSON.parse(localStorage.getItem("drafts"))
  for (let i = 0; i < drafts.length; i++) {
    if (drafts[i].filename === filename) {
      drafts.splice(i, 1);
      ElNotification({
        title: '提示',
        message: '已经删除咯',
        type: 'success',
      })
      localStorage.setItem("drafts", JSON.stringify(drafts))
      getDrafts()
      break;
    }
  }
}

const deleteGit = async (sha, filename, e) => {
  ElNotification({
    title: '提示',
    message: '正在尝试删除',
    type: 'info',
  })
  let root_path = ""
  if (settingsStore.settings.root.path.length !== 1) {
    root_path = settingsStore.settings.root.path
  }
  let url = "https://api.github.com/repos/" + settingsStore.settings.sub_repo + "/contents" + root_path + "/source/_posts/" + filename;
  let headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': 'Bearer ' + settingsStore.settings.token,
    'X-GitHub-Api-Version': '2022-11-28'
  }
  let body = {
    "message": "delete file",
    "committer": {"name": userStore.user_info.name, "email": userStore.user_info.email},
    "sha": sha
  }
  const data = await myFetch.deleteData(url, headers, body)
  if (data.error === null) {
    getPostFile()
    party.confetti(e)
    fileList.value = fileList.value.filter(item => item.sha !== sha)
    systemStore.set_loadTree(true)
    ElNotification({
      title: '提示',
      message: '删除成功啦',
      type: 'success',
    })
  } else {
    ElNotification({
      title: '出错了',
      message: data.error,
      type: 'error',
    })
  }
}

const clearDrafts = () => {
  localStorage.removeItem("drafts")
  drafts.value = []
  ElNotification({
    title: '提示',
    message: '已经清空啦',
    type: 'success',
  })
}
</script>

<style scoped>
.main_main_row {
  padding: 10px;
  border-radius: 20px
}

.main_label {
  font-weight: bolder;
  color: rgba(93, 106, 137);
}

.sub_label {
  font-weight: bolder;
  color: rgba(93, 106, 137);
  font-size: smaller;
}

.user_name {
  font-size: larger;
}

.user_email {
  opacity: 0.8;
}

.btn_github {
  padding: 10px;
  font-weight: bold;
  color: white;
  background: #4318ff;
  transition: all 0.5s;
}

.btn_github:hover {
  transform: translateY(-2px);
}

.preview_post {
  max-height: 25vh;
  overflow-y: scroll;
  padding: 10px;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}

.post {
  height: 5vh;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: 0.5s;
}

.post:hover {
  background: whitesmoke;
  transform: translateY(-1px);
}

@keyframes gradientBG {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.bl {
  border: none;
  border-radius: 10px;
  padding: 10px;
  //background: #e8faea;
  //background: linear-gradient(90deg, rgba(99, 230, 179, 1) 0%, rgba(68, 228, 141, 1) 50%, rgba(44, 225, 105, 1) 100%);
  background: rgba(255, 255, 255, 0.7);
  transition: 0.5s;
}

.bl2 {
  border: none;
  border-radius: 10px;
  padding: 10px;
  //background: rgb(52, 181, 231);
  //background: linear-gradient(90deg, rgba(52, 181, 231, 1) 0%, rgba(49, 158, 228, 1) 50%, rgba(44, 134, 225, 1) 100%);
  background: rgba(255, 255, 255, 0.7);
  transition: 0.5s;
}

.bl3 {
  border: none;
  border-radius: 10px;
  padding: 10px;
  //background: rgb(219,226,52);
  //background: linear-gradient(90deg, rgba(219,226,52,1) 0%, rgba(46,219,226,1) 100%);
  background: rgba(255, 255, 255, 0.7);
  transition: 0.5s;
}

.bl4 {
  border: none;
  border-radius: 10px;
  padding: 10px;
  //background: rgb(219,226,52);
  //background: linear-gradient(90deg, rgba(219,226,52,1) 0%, rgba(46,219,226,1) 100%);
  background: rgba(255, 255, 255, 0.7);
  transition: 0.5s;
}

.bl:hover {
  transform: translateY(-3px);
}

.bl2:hover {
  transform: translateY(-3px);
}

.bl3:hover {
  transform: translateY(-3px);
}

.bl4:hover {
  transform: translateY(-3px);
}

.bl_main_label {
  color: #2c3e50;
  font-weight: bolder;
}

.bl_sub_label {
  color: #2c3e50;
  font-weight: bolder;
  font-size: smaller;
  opacity: 0.8;
}

.refresh_btn {
  cursor: pointer;
  transition: 0.5s;
}

.refresh_btn:hover {
  transform: rotate(180deg);
}

.main_footer {
  padding: 10px;
  margin-top: 1vh;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}

.v_btn {
  transition: 0.5s;
}

.v_btn:hover {
  scale: 1.1;
}

.heartBeat {
  margin-right: 0.5vw;
  margin-left: 0.5vw;
  width: 20px;
  animation: heartBeat 2s infinite linear alternate;
}

@keyframes heartBeat {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.2);
  }
}

.ft_link {
  color: #34495e;
  margin-left: 0.5vw;
  text-decoration: none;
  font-size: larger;
}

.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
  font-size: calc(100vh / 24);
  color: #072552;
  font-weight: bolder;
}

.welcome_label {
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.follower_main {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 10px;
  transition: 0.5s;
}

.follower_main:hover {
  box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.1);
  scale: 1.01;
}

.follower {
  display: flex;
  align-items: center;
}

.repo_main {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  margin-top: -2vh;
  transition: 0.5s;
}

.repo_main:hover {
  box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.1);
  scale: 1.01;
}

.repo_span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.repo_span_2 {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  margin-top: 1vh;
}

.clear_btn {
  transform-origin: center top;
  cursor: pointer;
}

.clear_btn:hover {
  animation: shaking linear 1s infinite alternate;
}

@keyframes shaking {
  0% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-15deg);
  }
}

.edit_svg:hover {
  animation: shaking linear 0.5s infinite alternate;
  opacity: 0.7;
}

.remove_svg:hover {
  animation: shaking linear 0.5s infinite alternate;
  opacity: 0.7;
}

.main_userinfo {
  border-radius: 20px;
  padding: 10px
}

.main_userinfo_item {
  text-align: center;
  border-right: 1px lightgray solid;
}

.main_avatar {
  background: white;
}

.main_userinfo_btn {
  text-align: center;
}

.main_userinfo_right {
  padding: 10px;
}

.main_xs_font {
  font-size: x-small
}

.main_github_img {
  width: 16px;
  margin-right: 5px
}

.main_title_btns {
  display: flex;
  justify-content: right;
  align-items: center;
}

.check_img {
  width: 20px;
  transition: 0.5s;
}

.check_img:hover {
  scale: 1.1;
}
</style>
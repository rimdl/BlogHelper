<template>
  <el-row style="padding:10px;border-radius: 20px">
    <el-col :span="24">
      <el-row>
        <el-col :span="11" class="glass" style="border-radius: 20px;padding: 10px">
          <el-row>
            <el-col :span="24">
              <span class="main_label">当前用户信息</span>
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
            <el-col :span="8" style="text-align: center;border-right: 1px lightgray solid">
              <el-avatar @error="errorHandler" :src="userStore.user_info.avatar_url" style="background: white;"
                         :size="50">
                <img
                    src="/images/errorimg.svg"
                />
              </el-avatar>
              <br>
              <span class="sub_label">{{ userStore.user_info.name }}</span>
              <br>
              <span class="sub_label">{{ userStore.user_info.email }}</span>
              <br>

              <a :href="userStore.user_info.html_url" target="_blank">
                <el-button size="small" round>转到GitHub</el-button>
              </a>
            </el-col>
            <el-col :span="16" style="padding: 10px">
              <span class="sub_label">公开仓库：</span><span
                style="font-size: x-small">{{ userStore.user_info.public_repos }}</span>
              <br>
              <span class="sub_label">创建时间：</span><span
                style="font-size: x-small">{{ userStore.user_info.created_at }}</span>
              <br>
              <span class="sub_label">个人说明：</span><span
                style="font-size: x-small">{{ userStore.user_info.bio }}<span v-if="!userStore.user_info.bio"
                                                                              style="font-size: xx-small;color: gray">什么都没说......</span></span>
              <br>
              <span class="sub_label">个人博客：</span><span
                style="font-size: x-small">{{ userStore.user_info.blog }}<span v-if="!userStore.user_info.blog"
                                                                               style="font-size: xx-small;color: gray">什么都没有......</span></span>
              <br>
              <span class="sub_label">我的公司：</span><span style="font-size: x-small">{{ userStore.user_info.company }}<span
                v-if="!userStore.user_info.company"
                style="font-size: xx-small;color: gray">什么都没有......</span></span>
              <br>
              <span class="sub_label">followers:{{ userStore.user_info.followers }}</span>
              <span style="margin-left: 1vw" class="sub_label">following:{{ userStore.user_info.following }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="2" class="glass" style="border-radius: 20px;padding: 10px">
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-col :span="12">
                  <span class="main_label">当前仓库信息</span>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <img @click="reget_repo($event)" src="/images/refresh.svg" class="refresh_btn" style="width: 20px" alt="">
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
              <span class="sub_label">仓库名称：</span><span
                style="font-size: x-small">{{ repositoryStore.repository_info.name }}</span>
              <br>
              <span class="sub_label">创建时间：</span><span
                style="font-size: x-small">{{ repositoryStore.repository_info.created_at }}</span>
              <br>
              <span class="sub_label">克隆地址：</span><span
                style="font-size: x-small">{{ repositoryStore.repository_info.clone_url }}</span>
              <br>
              <span class="sub_label">仓库描述：</span><span
                style="font-size: x-small">{{ repositoryStore.repository_info.description }}<span
                v-if="!repositoryStore.repository_info.description"
                style="font-size: xx-small;color: gray">没有描述......</span></span>
              <br>
              <span class="sub_label">是否私有：</span><span
                style="font-size: x-small">{{ repositoryStore.repository_info.private }}</span>
              <br>
              <span class="sub_label">仓库地址：</span><span
                style="font-size: x-small">{{ repositoryStore.repository_info.url }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-top: 2vh">
        <el-col :span="5" class="glass bl">
          <el-row>
            <el-col :span="10">
              <!--              <el-avatar :size="50" src="/images/edit_2.svg" style="background: blue" :fit="'cover'"/>-->
              <img src="/images/edit_2.svg"
                   style="background: #008cff;background-size: cover;width: 50px;margin-left: 10px;border-radius: 10px"/>
            </el-col>
            <el-col :span="14" style="text-align: right">
              <label class="bl_main_label">文章总数</label>
              <br>
              <span style="font-size: x-large;color: white;font-weight: bolder">{{ fileList.length }}</span>
            </el-col>
            <el-col :span="24" style="text-align: center">
              <router-link to="/posts" style="text-decoration: none">
                <label class="bl_sub_label" style="cursor: pointer">去写作>>></label>
              </router-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" :offset="1" class="glass bl2">
          <el-row>
            <el-col :span="10">
              <!--              <el-avatar :size="50" src="/images/github.svg" style="background: white"/>-->
              <img src="/images/github.svg"
                   style="background: white;background-size: cover;width: 50px;margin-left: 10px;border-radius: 10px"/>
            </el-col>
            <el-col :span="14" style="text-align: right">
              <label class="bl_main_label">项目代码</label>
              <br>
              <span class="bl_sub_label">查看本项目代码</span>
            </el-col>
            <el-col :span="24" style="text-align: center">
              <a href="https://github.com/rimdl/BlogHelper" style="text-decoration: none" target="_blank">
                <label class="bl_sub_label" style="cursor: pointer">去github>>></label>
              </a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-top: 2vh">
        <el-col :span="11" class="glass" style="padding: 10px;border-radius: 20px">
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
                  <el-tag round effect="dark">{{ index + 1 }}</el-tag>
                  <span class="main_label">&nbsp;&nbsp;{{ item.label.substring(item.label.indexOf('_post') + 7) }}</span>
                </el-col>
                <el-col :span="4" style="text-align: right">
                  <el-tooltip content="编辑" placement="top" effect="light">
                    <router-link
                        :to="'/posts?filename='+item.label.substring(item.label.indexOf('_post') + 7)+'&url='+item.value.url">
                      <el-avatar :size="30" style="background: white" src="/images/edit.svg"/>
                    </router-link>
                  </el-tooltip>

                  <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定删除吗？"
                                 @confirm="deleteGit(item.sha,item.label.substring(item.label.indexOf('_post') + 7),$event)">
                    <template #reference>
                        <el-avatar :size="30" style="background: white;margin-left: 1vw" src="/images/delete.svg"/>
                    </template>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="2" class="glass" style="border-radius: 20px;padding: 10px">
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-col :span="18">
                  <label class="main_label">草稿箱</label>
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
                      <el-avatar :size="30" style="background: white" src="/images/edit.svg"/>
                    </router-link>
                  </el-tooltip>

                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定删除吗？"
                                   @confirm="deleteDraft(item.filename)">
                      <template #reference>
                        <el-avatar :size="30" style="background: white;margin-left: 1vw" src="/images/delete.svg"/>
                      </template>
                    </el-popconfirm>

                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>

<script setup>
import {useUserStore} from "../stores/userStore.js";
import {getCurrentInstance, inject, onBeforeMount, onBeforeUpdate, onMounted, ref, watch} from "vue";
import party from "party-js";
import {useSettingsStore} from "../stores/settingsStore.js";
import {useRepositoryStore} from "../stores/repositoryStore.js";
import {ElNotification} from "element-plus";
import {useTreeStore} from "../stores/treeStore.js";

const globalProperties = getCurrentInstance().appContext.config.globalProperties;
const myFetch = globalProperties.$myFetch;

const userStore = useUserStore()
const settingsStore = useSettingsStore()
const repositoryStore = useRepositoryStore()
const treeStore = useTreeStore()
const errorHandler = () => true

const fileList = ref([])
const drafts = ref([])

function isPropertyValueEmpty(obj, property) {
  return obj[property] === undefined || obj[property] === null || (typeof obj[property] === 'string' && obj[property].trim() === '');
}

const get_tree = inject("get_tree")
onMounted(() => {
  if (!isPropertyValueEmpty(settingsStore.settings, 'token')) {
    get_repository_info()
    getPostFile()
    getDrafts()
    get_tree()
  }
})


const reget_repo = async (e) => {
  if (!isPropertyValueEmpty(settingsStore.settings, 'token')) {
    await get_repository_info()
    party.confetti(e)
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

</script>

<style scoped>
.main_label {
  font-weight: bolder;
  color: rgba(93, 106, 137);
}

.sub_label {
  font-weight: bolder;
  color: rgba(93, 106, 137);
  font-size: smaller;
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
}

.post:hover {
  background: whitesmoke;
  transform: translateY(-1px);
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bl {
  border: none;
  border-radius: 10px;
  padding: 10px;
  background: rgb(99, 230, 179);
  background: linear-gradient(90deg, rgba(99, 230, 179, 1) 0%, rgba(68, 228, 141, 1) 50%, rgba(44, 225, 105, 1) 100%);
}

.bl2 {
  border: none;
  border-radius: 10px;
  padding: 10px;
  background: rgb(52, 181, 231);
  background: linear-gradient(90deg, rgba(52, 181, 231, 1) 0%, rgba(49, 158, 228, 1) 50%, rgba(44, 134, 225, 1) 100%);
}

.bl:hover {
  transform: translateY(-3px);
}

.bl2:hover {
  transform: translateY(-3px);
}

.bl_main_label {
  color: white;
  font-weight: bolder;
}

.bl_sub_label {
  color: white;
  font-weight: bolder;
  font-size: smaller;
}

.refresh_btn{
  cursor: pointer;
  transition: 0.5s;
}

.refresh_btn:hover{
  transform: rotate(180deg);
}

.test{
  background-image: url("/images/test.svg");
  background-size: 100% 9vh;
}
</style>
<template>
  <el-container>
    <el-aside style="border-radius: 20px;"><Side/></el-aside>
    <el-container>
      <el-header><Nav /></el-header>
      <el-main>

<!--        <router-view ></router-view>-->
        <router-view v-slot="{ Component }">
          <transition name="scale" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Side from  './components/Side.vue';
import Nav from  './components/Nav.vue';
import {onBeforeMount, watch,provide} from "vue";
import {useUserStore} from "./stores/userStore";
import { useRouter } from "vue-router";
import {useSystemStore} from "./stores/systemStore";
import {useSettingsStore} from "./stores/settingsStore.js";
import {useTreeStore} from "./stores/treeStore.js";
import { ElNotification } from 'element-plus';
import {myFetch} from "./utils/my_fetch.js";

const systemStore = useSystemStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const treeStore = useTreeStore()

const router = useRouter();

function isPropertyValueEmpty(obj, property) {
  return obj[property] === undefined || obj[property] === null || (typeof obj[property] === 'string' && obj[property].trim() === '');
}

onBeforeMount(() => {
  if (localStorage.getItem("user_info")!== null){
    userStore.set_user_info(JSON.parse(localStorage.getItem("user_info")))
  }
  if (localStorage.getItem("settings") !== null){
    settingsStore.set_settings(JSON.parse(localStorage.getItem("settings")))
  }
  // get_tree()
})
watch(() => router.currentRoute.value, (newVal, oldVal) =>{
  if (newVal !== oldVal){
    systemStore.set_now_page(newVal.path)
  }
})

const get_tree = async () => {
  ElNotification({
    title: '提示',
    message: '正在尝试获取文件列表',
    type: 'info',
  })
  if (!isPropertyValueEmpty(settingsStore.settings,'token')){

    let url = "https://api.github.com/repos/"+settingsStore.settings.sub_repo+"/git/trees/"+settingsStore.settings.branch
    let headers = {
      // 可选的请求头，例如：
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer '+settingsStore.settings.token,
      'X-GitHub-Api-Version': '2022-11-28'
    }
    let data = await myFetch.get(url,headers)
    if (data.error === null){
      try {
        const resultTree = await fetchAndBuildGitTree(data.data.url, headers);
        let tree = [{
          "value": {'path':'/','url':data.data.url},
          "label": "/",
          children: resultTree
        }]
        treeStore.set_tree_info(tree)
        ElNotification({
          title: '成功',
          message: '成功获取文件列表',
          type: 'success',
        })
      } catch (error) {
        console.error(error.message);
      }
    }
    else {
      console.log(data.error)
    }
  }
}

provide("get_tree",get_tree)

async function fetchAndBuildGitTree(url, headers, parentPath = '') {
  let data = await myFetch.get(url,headers)
  if (data.error !== null){
    console.log(data.error)
    return;
  }
  const treeItems = [];

  for (const item of data.data.tree) {
    const currentPath = `${parentPath}/${item.path}`;
    const value = {'path':currentPath,'url':item.url};
    const label = currentPath;
    const type = item.type;
    const sha =  item.sha;

    let nodeData = {
      value,
      label,
      type,
      sha
    };

    if (item.type === 'tree') {
      nodeData.children = await fetchAndBuildGitTree(item.url, headers, currentPath);
    }

    treeItems.push(nodeData);
  }

  return treeItems; // 不管数量多少，返回的都是包含多个项的数组
}

const extractNodesByPath = (node, pathToExtract, extractedArray = []) =>{
  const currentPath = node.label;

  if (currentPath.startsWith(pathToExtract)) {
    const extractedNode = {
      value: node.value,
      label: node.label,
      type: node.type,
      sha: node.sha// 添加 type 属性
      // 根据需要可以添加更多属性
    };
    extractedArray.push(extractedNode);
  }

  if (Array.isArray(node.children) && node.type !== 'file') { // 可选条件：仅遍历非文件类型的节点（如果有type区分）
    for (let child of node.children) {
      extractNodesByPath(child, pathToExtract, extractedArray);
    }
  }
  return extractedArray;
}

provide("extractNodesByPath",extractNodesByPath)

</script>


<style scoped>


:deep(.glass) {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}


 ::-webkit-scrollbar {
   width: 8px;
 }
 ::-webkit-scrollbar-thumb {
   background-color: #eaecf1;
   border-radius: 3px;
 }

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

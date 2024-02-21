<template>
  <el-row class="glass settings">
    <el-col :span="24">
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="12">
              <label class="settings_label">设置</label>
            </el-col>
            <el-col :span="12" style="text-align: right;display: flex;justify-content: end">
              <el-button type="primary" round @click="exportSettings">导出</el-button>
              <el-upload :show-file-list="false" :http-request="importSettings" multiple :limit="1">
                <el-button round>导入</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-divider border-style="dashed"/>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-row>
        <el-col :span="24" style="text-align: center">
          <label class="settings_sub_label">账户设置</label>
        </el-col>
        <el-col :span="24">
          <table>
            <tr>
              <td style="width: 70px">
                <!--              <el-avatar style="background: transparent" src="/images/github.svg" size="default"/>-->
                <img alt="error" style="background-size: cover;width: 50px;" src="/images/github.svg"/>
              </td>
              <td style="width: 90%;">
                <span class="settings_sub_label">仓库地址</span><br>
                <input type="text" v-model="repo" placeholder="例：https://github.com/user/repo" class="input_style"/>
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="24">
          <table>
            <tr>
              <td style="width: 70px">
                <img alt="error" style="background-size: cover;width: 50px;" src="/images/key.svg"/>
              </td>
              <td style="width: 90%;">
                <span class="settings_sub_label">token</span><br>
                <input type="text" v-model="token" placeholder="从Github获取" class="input_style"/>
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="24">
          <table>
            <tr>
              <td style="width: 70px">
                <!--              <el-avatar style="background: transparent" src="/images/branch.svg" size="default"/>-->
                <img alt="error" style="background-size: cover;width: 50px;" src="/images/branch.svg"/>
              </td>
              <td style="width: 90%;">
                <span class="settings_sub_label">代码分支</span>
                <a :style="'margin-left:1vw;font-size: smaller;color:'+tip_color+';cursor: pointer'"
                   @click="get_branches($event)">{{ branch_tips }}</a>
                <br>
                <el-select
                    v-model="branch"
                    class="m-2"
                    placeholder="Select"
                    size="small"
                    style="width: 10vw"
                >
                  <el-option
                      v-for="(item,index) in branches"
                      :key="index"
                      :label="item"
                      :value="item"
                  />
                </el-select>
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="24" style="margin-top: 2vh;text-align: center">
          <el-button @click="save_settings($event)" round size="small">保存</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-divider border-style="dashed"/>
    </el-col>
    <el-col :span="24">
      <el-row>
        <el-col :span="24" style="text-align: center">
          <label class="settings_sub_label">其他设置</label>
        </el-col>
        <el-col :span="24" v-if="!settingsStore.settings.token">
          <el-empty description="用户信息还未设置，无法设置此处内容" :image-size="60"/>
        </el-col>
        <el-col :span="24" v-if="settingsStore.settings.token">
          <table>
            <tr>
              <td style="width: 70px">
                <!--              <el-avatar style="background: transparent" src="/images/root.svg" size="default"/>-->
                <img alt="error" style="background-size: cover;width: 50px;" src="/images/root.svg"/>
              </td>
              <td style="width: 90%;">
                <span class="settings_sub_label">项目根目录</span>
                <a style="margin-left: 1vw;color: #66ccff;font-size: smaller;cursor: pointer"
                   @click="get_tree">刷新目录</a>
                <br>
                <el-cascader v-model="root" :options="treeStore.tree_info" size="small" :props="cascader_prop"
                             @change="handleRootChange($event)" clearable filterable/>
                <el-button @click="save_other_settings($event)" size="small" round style="margin-left: 1vw">保存
                </el-button>
                <br>
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="24" v-if="settingsStore.settings.token" style="margin-top: 2vh">
          <el-row>
            <el-col :span="24" class="flex_other">
              <div class="flex_table">
                <img alt="error" style="background-size: cover;width: 50px;" src="/images/table.svg"/>
              </div>
              <div style="margin-left: 1vw" class="flex_table">
                <span class="settings_sub_label">Front-Matter设置</span>
                <el-button style="margin-left: 1vw" size="small" round type="primary" @click="show_add = !show_add">
                  添加
                </el-button>
                <br>


                <el-table :data="frontMatters" :height="250">
                  <el-table-column prop="label" label="显示名称"/>
                  <el-table-column prop="key" label="key"/>
                  <el-table-column prop="type" label="类型"/>
                  <el-table-column prop="default" label="默认值"/>
                  <el-table-column label="操作">
                    <template #default="scope">
                      <el-button size="small" round @click="handleEdit(scope.$index, scope.row)"
                      >编辑
                      </el-button
                      >
                      <el-popconfirm title="确定删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                                     @confirm="handleDelete(scope.$index, scope.row)">
                        <template #reference>
                          <el-button size="small" type="danger" round>删除</el-button>
                        </template>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-drawer v-model="show_add" title="添加Front-Matter项目" z-index="9999" style="border-radius: 20px" :modal="false"
               :with-header="true">
      <span class="settings_sub_label">显示名称</span><br>
      <input type="text" v-model="frontMatter.label" placeholder="请输入" class="input_style"/>
      <br>
      <span class="settings_sub_label">key</span><br>
      <input type="text" v-model="frontMatter.key" placeholder="请输入" class="input_style"/>
      <br>
      <span class="settings_sub_label">类型</span><br>
      <el-select v-model="frontMatter.type" class="m-2" placeholder="请选择" style="width: 240px">
        <el-option key="text" label="文本" value="text"/>
        <el-option key="num" label="数字" value="num"/>
        <el-option key="bool" label="布尔" value="bool"/>
        <el-option key="arr" label="数组" value="arr"/>
        <el-option key="datetime" label="日期" value="datetime"/>
      </el-select>
      <br>
      <div v-if="frontMatter.type">
        <span class="settings_sub_label">默认值<small>(不输入则不设置)</small></span><br>
        <input v-if="frontMatter.type === 'text'" type="text" v-model="frontMatter.default" placeholder="请输入text"
               class="input_style"/>
        <input v-if="frontMatter.type === 'num'" type="number" v-model="frontMatter.default" placeholder="请输入text"
               class="input_style"/>
        <el-switch v-if="frontMatter.type === 'bool'" v-model="frontMatter.default"/>
        <input v-if="frontMatter.type === 'arr'" type="text" v-model="frontMatter.default"
               placeholder="多个值请使用英文逗号隔开" class="input_style"/>
        <el-date-picker v-if="frontMatter.type === 'datetime'" v-model="frontMatter.default" type="datetime"
                        placeholder="Select date and time"/>
      </div>
      <br>
      <el-button style="width: 100%;" v-if="frontMatter.key" type="success" @click="save_front_matter">保存</el-button>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="show_add = !show_add">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </el-row>
</template>

<script setup>
import {useSettingsStore} from '../stores/settingsStore'
import {useUserStore} from '../stores/userStore'
import {onBeforeMount, ref, watch, inject, onMounted} from "vue";
import party from "party-js";
import {useTreeStore} from "../stores/treeStore.js";
import {ElNotification, ElMessageBox} from 'element-plus';
import {myFetch} from "../utils/my_fetch.js";

const get_tree = inject("get_tree")
const repo = ref('')
const token = ref('')
const branches = ref([])
const branch = ref('')
const branch_tips = ref('点击获取')
const sub_repo = ref('')
const tip_color = ref('#00d0ff')
const root = ref('')
const options = ref([])
const cascader_prop = {
  checkStrictly: true,
  emitPath: false
}

const show_add = ref(false)
const frontMatter = ref({})
const frontMatters = ref([])

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const treeStore = useTreeStore()


onBeforeMount(() => {
  if (localStorage.getItem("settings") !== null) {
    let settings = JSON.parse(localStorage.getItem("settings"))
    repo.value = settings.repo
    token.value = settings.token
    branch.value = settings.branch
    branches.value = settings.branches
    sub_repo.value = settings.sub_repo
    settingsStore.set_settings(settings)
    if (branches.value.length !== 0) {
      branch_tips.value = "点击重新获取"
    }
  }
  if (localStorage.getItem("user_info") !== null) {
    userStore.set_user_info(JSON.parse(localStorage.getItem("user_info")))
  }
})
const get_branches = async (e) => {
  if (repo.value !== null && repo.value !== '' && token.value !== null && token.value !== '') {
    branches.value = []
    tip_color.value = "#00d0ff"
    branch_tips.value = "正在尝试获取分支列表..."
    let url = "https://api.github.com/repos/" + sub_repo.value + "/branches"
    let headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token.value,
      'X-GitHub-Api-Version': '2022-11-28'
    }
    let data = await myFetch.get(url, headers)
    if (data.error === null) {
      for (let i = 0; i < data.data.length; i++) {
        branches.value.push(data.data[i].name)
        party.confetti(e, {
          count: 40,
          size: 0.55,
          spread: 13
        })
      }
      branch_tips.value = "获取成功，点击重新获取"
    } else {
      branch_tips.value = "出错了：" + data.error
      tip_color.value = "red"
    }
  } else {
    branch_tips.value = "请完整填写仓库地址和token，之后再点击"
  }
}

watch([() => repo.value, () => treeStore.tree_info], ([newVal, newVal2], [oldVal, oldVal2]) => {
  if (newVal !== oldVal && newVal !== '' && newVal !== null) {
    if (newVal.trim().indexOf(".com/") !== -1) {
      sub_repo.value = newVal.trim().substring(newVal.indexOf(".com/") + 5)
    }
    if (newVal2 !== oldVal2) {
      let originalData = newVal2
      // 遍历并修改顶层节点
      originalData.forEach(rootNode => {
        addDisableProperty(rootNode);
      });
      options.value = originalData
    }
  }
})

const save_settings = (e) => {
  if (repo.value && token.value && branch.value) {
    let settings = {
      repo: repo.value,
      token: token.value,
      branch: branch.value,
      branches: branches.value,
      sub_repo: sub_repo.value,
      root: {'path': '', 'url': ''}
    }
    localStorage.setItem("settings", JSON.stringify(settings))
    settingsStore.set_settings(settings)
    get_user_info()
    party.confetti(e)
    ElMessageBox.alert('接下来去设置一下其他内容吧', '成功', {
      confirmButtonText: '好的',
      callback: () => {

      },
    })
  } else {
    ElNotification({
      title: '错误',
      message: '请完整填写仓库地址、token及分支，之后再点击',
      type: 'error',
    })
  }
}

const get_user_info = async () => {
  let url = "https://api.github.com/user"
  let headers = {
    // 可选的请求头，例如：
    'Accept': 'application/vnd.github+json',
    'Authorization': 'Bearer ' + token.value,
    'X-GitHub-Api-Version': '2022-11-28'
  }
  let data = await myFetch.get(url, headers)
  if (data.error === null) {
    localStorage.setItem("user_info", JSON.stringify(data.data))
    userStore.set_user_info(data.data)
  } else {
    console.log(data.error)
  }
}

options.value = treeStore.tree_info
const handleRootChange = (e) => {
  let settings = JSON.parse(localStorage.getItem("settings"))
  settings.root = {'url': root.value}
  party.confetti(e)
}
const save_other_settings = (e) => {
  party.confetti(e)
  ElNotification({
    title: '成功',
    message: '保存成功',
    type: 'success',
  })
  let settings = JSON.parse(localStorage.getItem("settings"))
  settings.root = root.value
  localStorage.setItem("settings", JSON.stringify(settings))
}


function addDisableProperty(node) {
  if (node.type === 'blob') {
    node.disabled = true;
  }
  if (node.label !== "/") {
    node.label = node.label.substring(1)
  }
  // 如果存在children属性并且是数组，则递归处理子节点
  if (Array.isArray(node.children)) {
    node.children.forEach(childNode => {
      addDisableProperty(childNode);
    });
  }
}

onMounted(() => {
  let front_matter = localStorage.getItem("front_matter")
  if (front_matter !== null) {
    frontMatters.value = JSON.parse(front_matter)
  }
})

const save_front_matter = () => {
  if (frontMatter.value.id) {
    let front_matter = JSON.parse(localStorage.getItem("front_matter"))
    front_matter = front_matter.filter(front_matter => front_matter.id !== frontMatter.value.id)
    console.log(front_matter)
    let data = frontMatter.value
    front_matter.push(data)
    localStorage.setItem("front_matter", JSON.stringify(front_matter))
    ElNotification({
      title: '成功',
      message: '修改成功',
      type: 'success',
    })
  } else {
    frontMatter.value.id = Date.now()
    let front_matter = JSON.parse(localStorage.getItem("front_matter"))
    let arr = []
    if (frontMatter.value.type === "arr" && frontMatter.value.default) {
      arr = frontMatter.value.default.split(',')
      frontMatter.value.default = arr
    }
    if (front_matter !== null) {
      front_matter.push(frontMatter.value)
      localStorage.setItem("front_matter", JSON.stringify(front_matter))
    } else {
      localStorage.setItem("front_matter", JSON.stringify([frontMatter.value]))
    }
    frontMatters.value = JSON.parse(localStorage.getItem("front_matter"))
    ElNotification({
      title: '成功',
      message: '保存成功',
      type: 'success',
    })
  }
  frontMatter.value = {}
}

const handleEdit = (index, row) => {
  frontMatter.value = row
  show_add.value = true
}
const handleDelete = (index, row) => {
  let data = frontMatters.value
  frontMatters.value = data.filter(data => data.id !== row.id)
  localStorage.setItem("front_matter", JSON.stringify(frontMatters.value))
  ElNotification({
    title: '成功',
    message: '删除成功',
    type: 'success',
  })
}

const exportSettings = () => {
  let settings = JSON.parse(localStorage.getItem("settings"))
  let user_info = JSON.parse(localStorage.getItem("user_info"))
  let front_matter = JSON.parse(localStorage.getItem("front_matter"))
  let sys_config = {"settings": settings, "user_info": user_info, "front_matter": front_matter}
  let blob = new Blob([JSON.stringify(sys_config)], {type: "application/json;charset=utf-8"});

  // 创建一个指向Blob对象的URL
  let url = URL.createObjectURL(blob);

  // 创建隐藏的a标签
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.download = 'bloghelper_sys_config.json'; // 指定下载的文件名
  document.body.appendChild(link);

  // 触发点击下载
  link.click();
  // 清理资源
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 0);
}

function isPropertyValueEmpty(obj, property) {
  return obj[property] === undefined || obj[property] === null || (typeof obj[property] === 'string' && obj[property].trim() === '');
}

const importSettings = (content) => {
  console.log(1)
  let fileReader = new FileReader();
  fileReader.onload = function (event) {
    // 当文件读取完成时
    const content = event.target?.result;
    let sys_config = JSON.parse(content);
    if (!isPropertyValueEmpty(sys_config, 'settings')) {
      localStorage.setItem("settings", JSON.stringify(sys_config.settings))
      ElNotification({
        title: '成功',
        message: '账户信息获取成功',
        type: 'success',
      })
    } else {
      ElNotification({
        title: '提示',
        message: '未获取到账户信息，请核对',
        type: 'info',
      })
    }
    if (!isPropertyValueEmpty(sys_config, 'user_info')) {
      localStorage.setItem("user_info", JSON.stringify(sys_config.user_info))
      ElNotification({
        title: '成功',
        message: '用户信息获取成功',
        type: 'success',
      })
    } else {
      ElNotification({
        title: '提示',
        message: '未获取到用户信息，请核对',
        type: 'info',
      })
    }
    if (!isPropertyValueEmpty(sys_config, 'front_matter')) {
      localStorage.setItem("front_matter", JSON.stringify(sys_config.front_matter))
      ElNotification({
        title: '成功',
        message: 'front_matter信息获取成功',
        type: 'success',
      })
    } else {
      ElNotification({
        title: '提示',
        message: '未获取到front_matter信息，请核对',
        type: 'info',
      })
    }
  };
  fileReader.onerror = function (error) {
    console.error('Error reading file:', error);
  };
  fileReader.readAsText(content.file);
  ElNotification({
    title: '提示',
    message: '导入完成，请刷新页面',
    type: 'info',
  })
}

</script>

<style scoped>
.settings {
  border-radius: 20px;
  padding: 20px;
}

.settings_label {
  font-weight: bolder;
  color: rgba(93, 106, 137);
}

.settings_sub_label {
  font-weight: bolder;
  color: rgba(93, 106, 137);
  font-size: small;
}

.input_style {
  width: 100%;
  border: none;
  outline: none;
  height: 30px;
  border-bottom: rgba(187, 234, 255, 1) 1px solid;
  background: transparent;
}

.input_style:hover {
  background: rgba(187, 234, 255, 0.1);
}



.flex_other {
  display: flex;
}

.flex_table {
  flex-grow: 1;
}

</style>
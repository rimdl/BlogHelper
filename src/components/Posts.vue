<template>
  <el-row style="margin-top: 2vh;">
    <el-col :lg="7" :xs="24">
      <el-row>
        <el-col :span="11">
          <el-row class="glass myBtn" @click="newPost">
            <el-col :span="8" style="padding: 10px">
              <el-avatar shape="square" :size="60" src="/images/new.svg" style="background: transparent" />
            </el-col>
            <el-col :span="16" style="padding: 20px;text-align: right">
              <label class="main_label">新建</label>
              <br>
              <span class="sub_label">开始新的写作</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="2">
          <router-link to="/" style="text-decoration: none">
          <el-row class="glass myBtn">
            <el-col :span="8" style="padding: 10px">
              <el-avatar shape="square" :size="60" src="/images/draft.svg" style="background: transparent"/>
            </el-col>
            <el-col :span="16" style="padding: 20px;text-align: right">
              <label class="main_label">选择</label>
              <br>
              <span class="sub_label">编辑已有文章</span>
            </el-col>
          </el-row>
          </router-link>
        </el-col>
      </el-row>
      <el-row style="margin-top: 2vh" v-if="editorData">
        <el-col :span="11">
          <el-button style="width: 100%" round class="publish_btn" :disabled="disablePublishBtn" @click="publish_post($event)">发布</el-button>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-button style="width: 100%" round class="draft_btn" @click="save_draft($event)">存草稿</el-button>
        </el-col>
      </el-row>
      <transition name="fade-in">
        <el-row v-if="showSettings" class="glass" style="border-radius: 20px;padding: 10px;margin-top: 2vh;">
          <el-col :span="24">
            <el-row>
              <el-col :span="12">
                <label class="main_label">文章设置</label>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button type="primary" round @click="saveFileInfo">保存</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-divider border-style="dashed"/>
          </el-col>
          <el-col :span="24" style="overflow-y: scroll;max-height: 63vh">
            <el-row>
              <el-col :span="24" v-for="(item,index) in local_front_matter" style="margin-top: 1vh;" :key="index">
            <el-row>
              <el-col :span="6" class="edit_label">
                <img src="../../public/images/dot.svg" style="width: 20px" alt="">
                <label class="sub_label">{{item.label}}</label>
              </el-col>
              <el-col :span="18">
                <el-input v-if="item.type === 'text'" type="text" v-model="file_info[item.key]" style="width: 100%"/>
                <el-input v-if="item.type === 'num'" type="number" v-model="file_info[item.key]" style="width: 100%"/>
                <el-input v-if="item.type === 'arr'" type="text" :placeholder="'多个'+item.key+'使用英文逗号隔开:'+item.key+','+item.key+','+item.key" v-model="file_info[item.key]" style="width: 100%"/>
                <el-switch v-if="item.type === 'bool'" v-model="file_info[item.key]"/>
                <el-date-picker v-if="item.type === 'datetime'" value-format="YYYY-MM-DD HH:mm:ss" v-model="file_info[item.key]" style="width: 100%" type="datetime" :placeholder="item.label"/>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="24" style="margin-top: 1vh" v-if="show_settings_edit">
            <el-row>
              <el-col :span="24">
                <label class="sub_label">手动编辑：<span style="font-size: smaller">(注意：手动编辑不用点击保存按钮)</span></label>
              </el-col>
              <el-col :span="24">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" v-model="front_matter" style="width: 100%"/>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="24" style="margin-top: 1vh">
            <el-row>
              <el-col :span="24" style="text-align: right">
                <router-link to="/settings" style="text-decoration: none">
                  <span style="font-weight: bold;font-size: smaller;color: #66ccff;margin-left: 1vw">添加更多选项</span>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
            </el-row>
          </el-col>
        </el-row>
      </transition>
    </el-col>
    <transition name="fade-in">
    <el-col  v-if="show_edit" :lg="16" xs="20"   style="padding: 10px;overflow-y: scroll;">
      <div style="padding: 10px;border-radius: 20px;" class="glass">
        <ckeditor5 :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor5>
      </div>
    </el-col>
    </transition>
  </el-row>

</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import CkEditor from '@ckeditor/ckeditor5-vue'
import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic'
import 'ckeditor5/build/translations/zh-cn'
import {Paragraph} from '@ckeditor/ckeditor5-paragraph'
import {Essentials} from '@ckeditor/ckeditor5-essentials'
import {Bold, Code, Italic, Strikethrough} from '@ckeditor/ckeditor5-basic-styles'
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote'
import {HorizontalLine} from '@ckeditor/ckeditor5-horizontal-line'
import {Markdown} from '@ckeditor/ckeditor5-markdown-gfm'
import {SourceEditing} from '@ckeditor/ckeditor5-source-editing'
import {Autoformat} from '@ckeditor/ckeditor5-autoformat'
import {Heading} from '@ckeditor/ckeditor5-heading'
import {ListProperties, TodoList} from '@ckeditor/ckeditor5-list'
import {CodeBlock} from '@ckeditor/ckeditor5-code-block'
import {Link,LinkImage} from '@ckeditor/ckeditor5-link'
import {Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar} from '@ckeditor/ckeditor5-table'
import {Image,ImageToolbar,ImageTextAlternative, ImageCaption,ImageInsert,AutoImage} from '@ckeditor/ckeditor5-image'
import {ElNotification} from "element-plus";
import yaml from "js-yaml"
import party from "party-js";
import {useRoute} from 'vue-router';
import {useSettingsStore} from "../stores/settingsStore.js";
import {myFetch} from "../utils/my_fetch.js";
import {useSystemStore} from "../stores/systemStore.js";

const {query} = useRoute();
const show_settings_edit = ref(false)
const editor = ClassicEditor
const ckeditor5 = CkEditor.component
const editorData = ref('')
const editorConfig = {
  language: 'zh-cn',
  plugins: [
    Paragraph,
    Essentials,
    Bold, // 加粗
    Italic,  // 斜体
    Strikethrough, // 删除线
    Code,
    CodeBlock,
    BlockQuote,
    HorizontalLine,
    Markdown,
    SourceEditing,
    Autoformat,
    Heading,
    ListProperties,
    TodoList,
    Link,
    Table, // 表格插件
    TableToolbar, // 表工具栏
    TableProperties, // 表属性插件
    TableCellProperties, // 单元格属性插件
    TableColumnResize, // 调整表列宽度插件
    TableCaption, // 表标题插件
    Image,
    ImageToolbar,
    ImageTextAlternative,
    ImageCaption,
    ImageInsert,
    AutoImage,
    LinkImage,
  ],
  codeBlock:{
    languages: [
      { language: 'plaintext', label: 'Plain text' }, // The default language.
      { language: 'c', label: 'C' },
      { language: 'cs', label: 'C#' },
      { language: 'cpp', label: 'C++' },
      { language: 'css', label: 'CSS' },
      { language: 'diff', label: 'Diff' },
      { language: 'html', label: 'HTML' },
      { language: 'java', label: 'Java' },
      { language: 'javascript', label: 'JavaScript' },
      { language: 'php', label: 'PHP' },
      { language: 'python', label: 'Python' },
      { language: 'ruby', label: 'Ruby' },
      { language: 'typescript', label: 'TypeScript' },
      { language: 'xml', label: 'XML' },
      { language: 'bash', label: 'Bash' },
      { language: 'go', label: 'Go' },
      { language: 'json', label: 'Json' },
      { language: 'sql', label: 'Sql' },
      { language: 'yaml', label: 'Yaml' },
        ]
  },
  toolbar: [
    'sourceEditing',
    '|',
    'heading',
    '|',
    'bulletedList',
    'numberedList',
    'todoList',
    'insertTable',
    '|',
    'undo', // 撤消
    'redo', // 重做
    '|',
    'selectAll', // 全选
    'bold', // 加粗
    'italic', // 斜体
    'strikethrough', // 删除线
    '|',
    'code', // 行内代码
    'codeblock',
    'link',
    'insertImage',
    '|',
    'blockQuote',
    'horizontalLine',
  ],
  heading: {
    options: [
      {model: 'paragraph', title: '标题', class: 'ck-heading_paragraph'},
      {model: 'heading1', view: 'h1', title: '标题 1', class: 'ck-heading_heading1'},
      {model: 'heading2', view: 'h2', title: '标题 2', class: 'ck-heading_heading2'},
      {model: 'heading3', view: 'h3', title: '标题 3', class: 'ck-heading_heading3'},
      {model: 'heading4', view: 'h4', title: '标题 4', class: 'ck-heading_heading4'},
      {model: 'heading5', view: 'h5', title: '标题 5', class: 'ck-heading_heading5'},
      {model: 'heading6', view: 'h6', title: '标题 6', class: 'ck-heading_heading6'},
    ]
  },
  table: {
    // 新建表格默认 1 行 1 列 为表头
    defaultHeadings: {rows: 1, columns: 1},
    // 表工具栏（气球）
    contentToolbar: [
      'toggleTableCaption', // 打开/关闭表标题
      '|',
      'tableColumn', // 表列设置
      'tableRow', // 表行设置
    ],
  },
  image: {
    toolbar: [
      'link', // 图像链接
    ]
  }
}

const showSettings = ref(false)
const show_edit = ref(false)

const file_info = ref({})

const settingsStore = useSettingsStore()
const systemStore = useSystemStore()

const sha = ref('')

const local_front_matter = ref({})

onMounted(async () =>{
  local_front_matter.value = JSON.parse(localStorage.getItem("front_matter"))
  if (query.filename && !query.url){
    const drafts = JSON.parse(localStorage.getItem("drafts"))
    for (const draft of drafts) {
      if (draft.filename === query.filename){
        const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = frontMatterRegex.exec(draft.content);
        if (match) {
          const frontMatterContent = match[1];
          front_matter.value = "---\n"+frontMatterContent+"\n---"
          file_info.value = yaml.load(frontMatterContent)
          editorData.value = draft.content.replace(/^---[^]*---/, '');
          show_edit.value = true
          showSettings.value = true
          show_settings_edit.value = true
        } else {
          console.log('No front matter found.');
        }
        file_info.value.updated =  formatDate(new Date())
      }
    }
  }
  else if(query.filename && query.url){
    const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
    file_info.value.updated =  formatDate(new Date())
    let headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer '+settingsStore.settings.token,
      'X-GitHub-Api-Version': '2022-11-28'
    }
    const data = await myFetch.get(query.url,headers)
    if (data.error === null){
      showSettings.value = true
      show_edit.value = true
      show_settings_edit.value = true
      sha.value = data.data.sha
      let content = new TextDecoder().decode(Uint8Array.from(atob(data.data.content), (c) => c.charCodeAt(0)))
      editorData.value = content.replace(/^---[^]*---/, '');
      const match = frontMatterRegex.exec(content);

      if (match) {
        const frontMatterContent = match[1];
        const json_data = yaml.load(frontMatterContent)
        front_matter.value = "---\n"+frontMatterContent+"\n---"
        file_info.value = json_data

      } else {
        console.log('No front matter found.');
      }
      file_info.value.filename =  query.filename.slice(0, -3)
    }
  }
  for (let i = 0; i < local_front_matter.value.length; i++) {
    if (!isPropertyValueEmpty(local_front_matter.value[i],"default")){
      if (!file_info.value[local_front_matter.value[i].key])
      file_info.value[local_front_matter.value[i].key] = local_front_matter.value[i].default
    }
  }
})

const newPost = () => {
  showSettings.value = true
  let date = new Date()
  if(isPropertyValueEmpty(file_info.value,'date')){
    file_info.value.date =  formatDate(date)
  }
  if(isPropertyValueEmpty(file_info.value,'updated')){
    file_info.value.updated =  formatDate(date)
  }
}
function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function removeEmptyEntries(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        delete obj[key];
      }
    }
  }
  return obj;
}
function isPropertyValueEmpty(obj, property) {
  return obj[property] === undefined || obj[property] === null || (typeof obj[property] === 'string' && obj[property].trim() === '');
}

const front_matter = ref('')
const saveFileInfo = () => {
  const fms = local_front_matter.value
  let obj = JSON.stringify(file_info.value)
  for (let fm of fms) {
    if (fm.type === "num"){
      file_info.value[fm.key] = parseFloat(file_info.value[fm.key])
    }
    if (fm.type === "arr"){
      obj = JSON.parse(obj)
      if (obj[fm.key]){
        if (!Array.isArray(obj[fm.key])){
          obj[fm.key] = obj[fm.key].split(',').map(item => item.trim())
        }
      }
    }
  }
  show_settings_edit.value = true
   if(!isPropertyValueEmpty(obj,'filename')){
     show_edit.value = true
     let r_obj = removeEmptyEntries(obj)
     front_matter.value = "---\n"+yaml.dump(r_obj)+"---"
   }
   else{
     show_edit.value = false
     ElNotification({
       title: '失败',
       message: '还未设置文件名',
       type: 'error',
     })
   }
}

const save_draft  = (e) => {
  const obj = file_info.value
  if(!isPropertyValueEmpty(obj,'filename') && front_matter.value !== ''){
    const draft = {
      filename: obj.filename,
      content: front_matter.value+"\n"+editorData.value,
      date: obj.date
    }
    if (localStorage.getItem("drafts") !==null){
      let drafts = JSON.parse(localStorage.getItem("drafts"))
      let isPush = true
      for (let i=0; i< drafts.length;i++) {
        if (drafts[i].filename === draft.filename){
          drafts[i] = draft
          isPush = false
          break
        }
      }
      if (isPush){
        drafts.push(draft)
      }
      localStorage.setItem("drafts", JSON.stringify(drafts))
      party.confetti(e)
    }
    else {
      localStorage.setItem("drafts", JSON.stringify([draft]))
    }
    ElNotification({
      title: '成功',
      message: '草稿保存成功',
      type: 'success',
    })
  }
  else{
    show_edit.value = false
    ElNotification({
      title: '失败',
      message: '还未设置文件名或Front—Matter未设置',
      type: 'error',
    })
  }
}

const disablePublishBtn = ref(false)
const publish_post = async (e) => {
  disablePublishBtn.value = true
  ElNotification({
    title: '提示',
    message: '正在尝试发布',
    type: 'info',
  })
  let root_path = ""
  if (settingsStore.settings.root.path.length !== 1){
    root_path = settingsStore.settings.root.path
  }
  const path = root_path+"/source/_posts/"+file_info.value.filename+".md"
  const put_url = 'https://api.github.com/repos/' + settingsStore.settings.sub_repo + '/contents'+path
// 确保字符串是UTF-8编码的，因为btoa()只接受ASCII字符
  let utf8String = unescape(encodeURIComponent(front_matter.value+"\n"+editorData.value));
  let content = btoa(utf8String);
  const headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': 'Bearer ' + settingsStore.settings.token,
    'X-GitHub-Api-Version': '2022-11-28'
  }
  const branch = settingsStore.settings.branch
  const msg = ""
  let body = {}
  if (sha.value !== ""){
    body = {branch: branch, message: msg, content: content,sha: sha.value,path: path}
  }
  else {
    body = {branch: branch, message: msg, content: content,path: path}
  }
  const data = await myFetch.put(put_url, headers,body)
  if (data.error === null){
    party.confetti(e,{
      count: 40,
      size: 0.55,
      spread: 13
    })
    disablePublishBtn.value = false
    if (query.filename){
      deleteDraft(query.filename)
    }
    file_info.value = {}
    editorData.value = ''
    show_edit.value = false
    showSettings.value = false
    systemStore.set_loadTree(true)
    ElNotification({
      title: '成功',
      message: '文章发布成功',
      type: 'success',
    })
  }
  else {
    disablePublishBtn.value = false
    ElNotification({
      title: '出错了',
      message: data.error,
      type: 'error',
    })
  }
}

const deleteDraft = (filename) => {
  if (localStorage.getItem("drafts")){
    const drafts = JSON.parse(localStorage.getItem("drafts"))
    for (let i = 0; i < drafts.length; i++) {
      if (drafts[i].filename === filename){
        drafts.splice(i, 1);
        ElNotification({
          title: '提示',
          message: '草稿已删除',
          type: 'success',
        })
        localStorage.setItem("drafts", JSON.stringify(drafts))
        break;
      }
    }
  }
}
watch(()=>file_info.value,(nv)=>{
  if (nv.filename){
    saveFileInfo()
  }
  else {
    show_edit.value = false
  }
},{
  deep: true,
})
</script>

<style scoped>
.main_label{
  font-weight: bolder;
  color: rgba(93, 106, 137);
}
.sub_label{
  font-weight: bolder;
  color: rgba(93, 106, 137);
  font-size: smaller;
}
.myBtn{
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s;
}
.myBtn:hover{
  transform: translateY(-1px);
  background: rgba(255,255,255,0.9);
}
.publish_btn{
  background: rgb(198,255,70);
  background: linear-gradient(90deg, rgba(198,255,70,1) 0%, rgba(48,255,245,1) 50%, rgba(157,135,255,1) 100%);
  color: gray;
  font-weight: bolder;
  height: 100%;
  animation: gradientBG 15s ease infinite;
  background-size: 300% 300%;
}

.draft_btn{
  background: rgb(198,255,70);
  background: linear-gradient(90deg, rgba(255, 197, 61,1) 0%, rgba(255, 255, 255,1) 50%, rgba(24, 144, 255,1) 100%);
  color: gray;
  font-weight: bolder;
  height: 100%;
  animation: gradientBG 20s ease infinite;
  background-size: 300% 300%;
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

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}
:deep(::-webkit-scrollbar) {
  width: 8px;
}
:deep(::-webkit-scrollbar-thumb) {
  background-color: #eaecf1;
  border-radius: 3px;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity .5s;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
:deep(.ck.ck-editor__main>.ck-editor__editable){
  height: 73vh;
  background: transparent;
  border: none;
}

:deep(.ck-source-editing-area){
  height: 73vh;
  background: transparent;
  border: none;
}
:deep(.ck-source-editing-area textarea){
  height: 73vh;
  background: transparent;
  border: none;
  font-family: Arial;
  overflow: scroll;
}
.edit_label{
  display: flex;
  align-items: center;
  transition: 0.5s;
}
.edit_label:hover{
  transform: translateY(-2px);
}


</style>
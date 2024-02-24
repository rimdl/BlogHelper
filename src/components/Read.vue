

<template>
<el-row>
  <el-col :span="22" :offset="1"  id="read_main">
    <el-row>
      <el-col :span="24" :style="top">
        <p class="title">
          <span>{{front_matter.title}}</span>
        </p>
        <p class="info">
          <span>创建时间：{{front_matter.date}}</span>
          &nbsp;&nbsp;
          <span>更新时间：{{front_matter.updated}}</span>
        </p>
      </el-col>
      <el-col :span="24" v-html="html" class="markdown-body" id="read"></el-col>
    </el-row>
  </el-col>
</el-row>
</template>

<script setup>
import {useRoute} from "vue-router";
import {myFetch} from "../utils/my_fetch.js";
import {marked} from "marked";
import {onMounted, ref} from "vue";
import {useSettingsStore} from "../stores/settingsStore.js";
import yaml from "js-yaml";
import {useSystemStore} from "../stores/systemStore.js";

const {query} = useRoute();
const settingsStore = useSettingsStore()
const html = ref('')
const front_matter = ref({})

const top = ref('')
const systemStore = useSystemStore()

onMounted(()=>{
  read(query.url)
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'
  document.head.appendChild(link)
  systemStore.loading = false
})
const read = async (url) => {
  let headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': 'Bearer '+settingsStore.settings.token,
    'X-GitHub-Api-Version': '2022-11-28'
  }
  const data = await myFetch.get(url,headers)
  let text = ""
  if (data.error === null){
    let content = new TextDecoder().decode(Uint8Array.from(atob(data.data.content), (c) => c.charCodeAt(0)))
    text = content.replace(/^---[^]*---/, '');
    const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = frontMatterRegex.exec(content);

    if (match) {
      const frontMatterContent = match[1];
      front_matter.value = yaml.load(frontMatterContent)
      if (front_matter.value.cover){
        top.value = "border-radius: 10px;padding: 10px;background-image: url('"+front_matter.value.cover+"');background-size: cover;"
      }
      else {
        top.value = "border-radius: 10px;padding: 10px;background: rgba(255,255,255,0.3)"
      }
    }
  }
  const render = new marked.Renderer()
  marked.setOptions({
    renderer: render,
    gfm: true,
    pedantic: false,
    sanitize: false
  })
  let temp = marked(text)
  html.value = temp.replace(/(<img\s+src)/gi, '<br>$1');
}
</script>

<style scoped>
#read_main{
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  padding: 10px;
  border-radius: 20px;

}
#read{
  overflow-y: scroll;
  max-height: 70vh;
  margin-top: 1vh;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}
:deep(::-webkit-scrollbar ){
  height: 8px;
}
:deep(::-webkit-scrollbar-thumb) {
  background-color: #eaecf1;
  border-radius: 3px;
}

.info{
  font-size: x-small;
  color: #34495e;
  background: rgba(255,255,255,0.5);
  padding: 5px;
  border-radius: 10px;
}
.title{
  font-size: larger;
  font-weight: bolder;
  color: #2c3e50;
  background: rgba(255,255,255,0.5);
  padding: 5px;
  border-radius: 10px;
}
</style>
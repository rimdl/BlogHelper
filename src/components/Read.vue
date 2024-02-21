

<template>
<el-row>
  <el-col :span="22" :offset="1" id="read" v-html="html">

  </el-col>
</el-row>
</template>

<script setup>
import {useRoute} from "vue-router";
import {myFetch} from "../utils/my_fetch.js";
import {marked} from "marked";
import {onMounted, ref} from "vue";
import {useSettingsStore} from "../stores/settingsStore.js";

const {query} = useRoute();
const settingsStore = useSettingsStore()
const html = ref('')
onMounted(()=>{
  read(query.url)
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
#read{
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  padding: 10px;
  border-radius: 20px;
  overflow-y: scroll;
  max-height: 85vh;
}
:deep(img){
  display: block;
  max-width: 70%;
  margin: 0 auto;
  border-radius: 10px;
}
:deep(pre){
  padding: 10px;
  border-radius: 10px;
  background: rgba(246, 248, 250,0.6);
  overflow-x: scroll;

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
</style>
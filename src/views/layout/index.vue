<template>
  <div class="layout-container">
    <keep-alive :include="['Todo']">
      <router-view />
    </keep-alive>
    <van-tabbar route>
      <van-tabbar-item replace to="/todo" icon="flag-o">εΎε</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o">ζη</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

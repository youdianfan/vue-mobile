<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
@import "./styles/layout.less";
</style>

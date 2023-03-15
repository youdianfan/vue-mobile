<template>
  <div class="error">
    <van-empty image="error" description="404" />
  </div>
</template>
<
<script>
import {Empty} from 'vant';

export default {
  components: {
    [Empty.name]: Empty
  }
}
</script>
<style lang="less" scoped>
.error{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
</style>


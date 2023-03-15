<template>
  <div class="home">
    首页
  </div>
</template>

<script>

import {Button} from 'vant';

export default {
  name: 'Home',
  components: {
    [Button.name]: Button,
  },
  mounted() {
    console.log("BASE_URL: ", process.env.BASE_URL);
    console.log("VUE_APP_API: ", process.env.VUE_APP_API);
  }
}
</script>

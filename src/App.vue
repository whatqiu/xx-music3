<template>
<div>
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
    <!-- <keep-alive>
    </keep-alive> -->
</div>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'

export default {
  components: {
    MHeader: Header,
    Tab
  }
}
</script>

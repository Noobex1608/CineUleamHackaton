<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuth } from './composables/useAuth'

const { checkSession } = useAuth()

onMounted(() => {
  checkSession()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>

</style>

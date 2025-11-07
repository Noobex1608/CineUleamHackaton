<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
<<<<<<< HEAD
import { useAuth } from './composables/useAuth'

const { checkSession } = useAuth()

onMounted(() => {
  checkSession()
})
=======
import Chatbot from './components/Chatbot.vue'
>>>>>>> b5d7463839beb94f12655f6f142ba30f1f452ae2
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="grow">
      <router-view />
    </main>
    <Footer />
    <Chatbot />
  </div>
</template>

<style scoped>

</style>

<template>
  <nav 
    class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" 
    role="navigation" 
    aria-label="Navegación principal"
  >
    <div class="container mx-auto px-8">
      <div class="flex items-center justify-between h-20">

        <div class="flex items-center">
          <router-link 
            to="/" 
            class="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:ring-offset-2 rounded"
            aria-label="Ir a página de inicio"
          >
            <img 
              src="../assets/LOGO-ULEAM-VERTICAL.png" 
              alt="Logo Universidad Laica Eloy Alfaro de Manabí" 
              class="h-16 w-fit"
              id="logo-navbar"
            />
          </router-link>
        </div>


        <div class="hidden md:flex items-center gap-4" role="menubar">
          <router-link 
            to="/cartelera" 
            class="text-gray-700 text-sm font-medium hover:text-[#C1272D] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:ring-offset-2 rounded px-2 py-1"
            role="menuitem"
            aria-label="Ver cartelera de películas"
          >
            <FilmIcon class="w-4 h-4" aria-hidden="true" />
            <span>Cartelera</span>
          </router-link>

          <template v-if="isAuthenticated">
            <div class="flex items-center gap-2 text-gray-700 text-sm px-3 py-1 border-l border-gray-300">
              <UserCircleIcon class="w-5 h-5 text-[#C1272D]" />
              <span class="font-medium">{{ currentUser?.nombre || 'Usuario' }}</span>
            </div>

            <button
              @click="handleLogout"
              class="text-gray-700 text-sm font-medium hover:text-[#C1272D] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:ring-offset-2 rounded px-2 py-1"
            >
              <ArrowRightStartOnRectangleIcon class="w-4 h-4" aria-hidden="true" />
              <span>Cerrar Sesión</span>
            </button>
          </template>

          <template v-else>
            <router-link 
              v-if="!isLoginPage"
              to="/login" 
              class="text-gray-700 text-sm font-medium hover:text-[#C1272D] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
              aria-label="Iniciar sesión en tu cuenta"
            >
              <ArrowRightOnRectangleIcon class="w-4 h-4" aria-hidden="true" />
              <span>Iniciar Sesión</span>
            </router-link>

            <router-link 
              v-if="!isRegisterPage"
              to="/registro" 
              class="bg-[#C1272D] hover:bg-[#8B1F23] text-white text-sm font-medium px-5 py-2 rounded transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#8B1F23] focus:ring-offset-2"
              role="menuitem"
              aria-label="Crear cuenta nueva"
            >
              <UserPlusIcon class="w-4 h-4" aria-hidden="true" />
              <span>Registro</span>
            </router-link>
          </template>
        </div>

        <!-- Botón Hamburguesa - Mobile -->
        <button 
          @click="toggleMenu" 
          class="md:hidden text-gray-700 hover:text-[#C1272D] transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-[#C1272D] rounded"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Abrir menú de navegación"
        >
          <Bars3Icon v-if="!isMenuOpen" class="w-7 h-7" aria-hidden="true" />
          <XMarkIcon v-else class="w-7 h-7" aria-hidden="true" />
        </button>
      </div>

      <!-- Menu Mobile -->
      <div 
        v-if="isMenuOpen" 
        id="mobile-menu"
        class="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4 space-y-3"
        role="menu"
      >
        <router-link 
          to="/cartelera" 
          @click="toggleMenu"
          class="flex items-center gap-3 text-gray-700 font-medium hover:text-[#C1272D] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#C1272D] rounded px-2"
          role="menuitem"
          aria-label="Ver cartelera de películas"
        >
          <FilmIcon class="w-5 h-5" aria-hidden="true" />
          <span>Cartelera</span>
        </router-link>

        <template v-if="isAuthenticated">
          <div class="flex items-center gap-3 text-gray-700 font-medium py-2 px-2 border-t border-gray-200">
            <UserCircleIcon class="w-6 h-6 text-[#C1272D]" />
            <span>{{ currentUser?.nombre || 'Usuario' }}</span>
          </div>

          <button
            @click="handleLogout(); toggleMenu()"
            class="w-full flex items-center gap-3 bg-[#C1272D] hover:bg-[#8B1F23] text-white font-medium px-4 py-2 rounded transition-colors justify-center focus:outline-none focus:ring-2 focus:ring-[#8B1F23] focus:ring-offset-2"
          >
            <ArrowRightStartOnRectangleIcon class="w-5 h-5" aria-hidden="true" />
            <span>Cerrar Sesión</span>
          </button>
        </template>

        <template v-else>
          <router-link 
            to="/registro" 
            @click="toggleMenu"
            class="flex items-center gap-3 text-gray-700 font-medium hover:text-[#C1272D] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#C1272D] rounded px-2"
            role="menuitem"
            aria-label="Crear cuenta nueva"
          >
            <UserPlusIcon class="w-5 h-5" aria-hidden="true" />
            <span>Registro</span>
          </router-link>

          <router-link 
            v-if="!isLoginPage"
            to="/login" 
            @click="toggleMenu"
            class="flex items-center gap-3 bg-[#C1272D] hover:bg-[#8B1F23] text-white font-medium px-4 py-2 rounded transition-colors justify-center focus:outline-none focus:ring-2 focus:ring-[#8B1F23] focus:ring-offset-2"
            role="menuitem"
            aria-label="Iniciar sesión en tu cuenta"
          >
            <ArrowRightOnRectangleIcon class="w-5 h-5" aria-hidden="true" />
            <span>Iniciar Sesión</span>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { FilmIcon, UserPlusIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { currentUser, isAuthenticated, logout, checkSession } = useAuth()

const isMenuOpen = ref(false)

const isLoginPage = computed(() => route.path === '/login')
const isRegisterPage = computed(() => route.path === '/registro')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  try {
    await logout()
    router.push('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

onMounted(() => {
  checkSession()
})
</script>

<style scoped>

.router-link-active {
  color: #C1272D;
}
#logo-navbar {
  max-width: 120px;
}

</style>
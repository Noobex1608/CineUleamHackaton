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

          <!-- Enlace Admin (solo visible para administradores) -->
          <router-link 
            to="/admin" 
            class="text-gray-700 text-sm font-medium hover:text-[#C1272D] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:ring-offset-2 rounded px-2 py-1"
            role="menuitem"
            aria-label="Panel de administración"
          >
            <CogIcon class="w-4 h-4" aria-hidden="true" />
            <span>Admin</span>
          </router-link>

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
        </div>


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

        <!-- Enlace Admin móvil -->
        <router-link 
          to="/admin" 
          @click="toggleMenu"
          class="flex items-center gap-3 text-gray-700 font-medium hover:text-[#C1272D] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#C1272D] rounded px-2"
          role="menuitem"
          aria-label="Panel de administración"
        >
          <CogIcon class="w-5 h-5" aria-hidden="true" />
          <span>Admin</span>
        </router-link>

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
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FilmIcon, UserPlusIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon, CogIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'

const route = useRoute()

const isMenuOpen = ref(false)

const isLoginPage = computed(() => route.path === '/login')
const isRegisterPage = computed(() => route.path === '/registro')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>

.router-link-active {
  color: #C1272D;
}
#logo-navbar {
  max-width: 120px;
}

</style>
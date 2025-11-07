<template>
  <nav 
    class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" 
    role="navigation" 
    aria-label="Navegación principal"
  >
    <div class="container mx-auto px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo ULEAM - Lado Izquierdo -->
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

        <!-- Menu Desktop - Lado Derecho -->
        <div class="hidden md:flex items-center gap-4" role="menubar">
          <!-- Cartelera -->
          <router-link 
            to="/cartelera" 
            class="text-gray-700 text-sm font-medium hover:text-[#C1272D] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:ring-offset-2 rounded px-2 py-1"
            role="menuitem"
            aria-label="Ver cartelera de películas"
          >
            <FilmIcon class="w-4 h-4" aria-hidden="true" />
            <span>Cartelera</span>
          </router-link>

          <!-- Registro -->
          <router-link 
            to="/registro" 
            class="text-gray-700 text-sm font-medium hover:text-[#C1272D] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:ring-offset-2 rounded px-2 py-1"
            role="menuitem"
            aria-label="Crear cuenta nueva"
          >
            <UserPlusIcon class="w-4 h-4" aria-hidden="true" />
            <span>Registro</span>
          </router-link>

          <!-- Iniciar Sesión -->
          <router-link 
            to="/login" 
            class="bg-[#C1272D] hover:bg-[#8B1F23] text-white text-sm font-medium px-5 py-2 rounded transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#8B1F23] focus:ring-offset-2"
            role="menuitem"
            aria-label="Iniciar sesión en tu cuenta"
          >
            <ArrowRightOnRectangleIcon class="w-4 h-4" aria-hidden="true" />
            <span>Iniciar Sesión</span>
          </router-link>
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
import { ref } from 'vue'
import { FilmIcon, UserPlusIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline' 

// Estado del menu mobile
const isMenuOpen = ref(false)

// Toggle menu mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.router-link-active {
  color: #C1272D;
}
#logo-navbar {
  max-width: 120px;
}

</style>
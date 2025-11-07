<template>
  <div class="min-h-screen bg-gray-100 pt-8">
    <Toast
      :show="showToast"
      :message="toastMessage"
      :title="toastTitle"
      :type="toastType"
      @close="showToast = false"
    />
    
    <!-- Título del Admin -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div class="text-center">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <p class="mt-2 text-base sm:text-lg text-gray-600">CineUleam - Sistema de Gestión</p>
      </div>
    </div>

    <!-- Navegación del Admin -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Navegación para móvil -->
        <div class="block sm:hidden">
          <div class="relative">
            <button 
              @click="showMobileMenu = !showMobileMenu"
              class="w-full flex items-center justify-between py-4 px-4 text-left text-sm font-medium text-gray-700 border-b"
            >
              <span>{{ getActiveTabLabel() }}</span>
              <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': showMobileMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div v-show="showMobileMenu" class="absolute top-full left-0 right-0 bg-white shadow-lg z-10 border-t">
              <button 
                @click="selectTab('dashboard')"
                :class="[
                  'w-full text-left py-3 px-4 text-sm font-medium transition-colors',
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                Dashboard
              </button>
              <button 
                @click="selectTab('peliculas')"
                :class="[
                  'w-full text-left py-3 px-4 text-sm font-medium transition-colors',
                  activeTab === 'peliculas' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                Gestión de Películas
              </button>
              <button 
                @click="selectTab('salas')"
                :class="[
                  'w-full text-left py-3 px-4 text-sm font-medium transition-colors',
                  activeTab === 'salas' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                Configurar Salas
              </button>
              <button 
                @click="selectTab('estadisticas')"
                :class="[
                  'w-full text-left py-3 px-4 text-sm font-medium transition-colors',
                  activeTab === 'estadisticas' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                Estadísticas
              </button>
            </div>
          </div>
        </div>
        
        <!-- Navegación para desktop -->
        <div class="hidden sm:flex sm:space-x-8">
          <button 
            @click="activeTab = 'dashboard'"
            :class="[
              'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'dashboard' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Dashboard
          </button>
          <button 
            @click="activeTab = 'peliculas'"
            :class="[
              'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'peliculas' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Gestión de Películas
          </button>
          <button 
            @click="activeTab = 'salas'"
            :class="[
              'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'salas' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Configurar Salas
          </button>
          <button 
            @click="activeTab = 'estadisticas'"
            :class="[
              'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'estadisticas' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Estadísticas
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div class="sm:px-0">
        
        <!-- Dashboard -->
        <AdminDashboard 
          v-if="activeTab === 'dashboard'"
          :total-peliculas="totalPeliculas"
          :total-usuarios="totalUsuarios"
          :total-reservas="totalReservas"
          :total-salas="totalSalas"
        />

        <!-- Gestión de Películas -->
        <MovieManagement
          v-if="activeTab === 'peliculas'"
          :peliculas="peliculas"
          :salas="salas"
          :is-loading-peliculas="isLoadingPeliculas"
          @create-movie="handleCreateMovie"
          @update-movie="handleUpdateMovie"
          @delete-movie="handleDeleteMovie"
          @show-toast="displayToast"
        />

        <!-- Configuración de Salas -->
        <SalaManagement
          v-if="activeTab === 'salas'"
          :salas="salas"
          @create-sala="handleCreateSala"
          @update-sala="handleUpdateSala"
          @delete-sala="handleDeleteSala"
          @show-toast="displayToast"
        />

        <!-- Estadísticas -->
        <AdminStatistics
          v-if="activeTab === 'estadisticas'"
          :peliculas="peliculas"
          :reservas="reservas"
        />

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useAdmin } from '../composables/useAdmin'
import Toast from '../components/Toast.vue'
import AdminDashboard from '../components/admin/AdminDashboard.vue'
import MovieManagement from '../components/admin/MovieManagement.vue'
import SalaManagement from '../components/admin/SalaManagement.vue'
import AdminStatistics from '../components/admin/AdminStatistics.vue'
import type { Pelicula } from '../interfaces/Pelicula'
import type { Sala } from '../interfaces/Sala'

const router = useRouter()
const { isAuthenticated, currentUser, checkSession } = useAuth()
const {
  // Estado
  peliculas,
  reservas,
  salas,
  
  // Estados de carga
  isLoadingPeliculas,
  
  // Estadísticas
  totalPeliculas,
  totalUsuarios,
  totalReservas,
  totalSalas,
  
  // Funciones
  loadAllData,
  createMovie,
  updateMovie,
  deleteMovie,
  createSala,
  updateSala,
  deleteSala
} = useAdmin()

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
const toastTitle = ref('')
const toastType = ref<'success' | 'error' | 'warning' | 'info'>('info')

// Estado de navegación
const activeTab = ref('dashboard')
const showMobileMenu = ref(false)

// Función helper para mostrar toast
const displayToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  toastTitle.value = title
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}

// Función para obtener el label de la tab activa
const getActiveTabLabel = () => {
  const labels: Record<string, string> = {
    dashboard: 'Dashboard',
    peliculas: 'Gestión de Películas',
    salas: 'Configurar Salas',
    estadisticas: 'Estadísticas'
  }
  return labels[activeTab.value] || 'Dashboard'
}

// Función para seleccionar tab y cerrar menú móvil
const selectTab = (tab: string) => {
  activeTab.value = tab
  showMobileMenu.value = false
}

// Handlers para las operaciones CRUD de películas
const handleCreateMovie = async (movieData: Partial<Pelicula>) => {
  try {
    await createMovie(movieData)
    displayToast('Éxito', 'Película creada exitosamente', 'success')
  } catch (error: any) {
    displayToast('Error', error.message, 'error')
  }
}

const handleUpdateMovie = async (id: string, movieData: Partial<Pelicula>) => {
  try {
    await updateMovie(id, movieData)
    displayToast('Éxito', 'Película actualizada exitosamente', 'success')
  } catch (error: any) {
    displayToast('Error', error.message, 'error')
  }
}

const handleDeleteMovie = async (id: string) => {
  try {
    await deleteMovie(id)
    displayToast('Éxito', 'Película eliminada exitosamente', 'success')
  } catch (error: any) {
    displayToast('Error', error.message, 'error')
  }
}

// Handlers para las operaciones CRUD de salas
const handleCreateSala = async (salaData: Partial<Sala>) => {
  try {
    await createSala(salaData)
    displayToast('Éxito', 'Sala creada exitosamente', 'success')
  } catch (error: any) {
    displayToast('Error', error.message, 'error')
  }
}

const handleUpdateSala = async (id: string, salaData: Partial<Sala>) => {
  try {
    await updateSala(id, salaData)
    displayToast('Éxito', 'Sala actualizada exitosamente', 'success')
  } catch (error: any) {
    displayToast('Error', error.message, 'error')
  }
}

const handleDeleteSala = async (id: string) => {
  try {
    await deleteSala(id)
    displayToast('Éxito', 'Sala eliminada exitosamente', 'success')
  } catch (error: any) {
    displayToast('Error', error.message, 'error')
  }
}

onMounted(async () => {
  // Verificar autenticación primero
  await checkSession()
  
  // Si no está autenticado, redirigir al login
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  
  // Verificar si el usuario es administrador
  if (currentUser.value?.tipo !== 'admin') {
    displayToast('Acceso Denegado', 'No tienes permisos para acceder al panel de administración', 'error')
    setTimeout(() => {
      router.push('/')
    }, 2000)
    return
  }
  
  // Cargar datos iniciales
  await loadAllData()
})
</script>

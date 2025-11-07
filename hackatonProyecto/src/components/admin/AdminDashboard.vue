<template>
  <div class="space-y-6 sm:space-y-8">
    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Dashboard General</h2>
    
    <!-- Tarjetas de Estadísticas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      <!-- Tarjeta de Películas -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden shadow-xl rounded-xl sm:rounded-2xl">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="flex items-center justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-blue-100 text-sm sm:text-base lg:text-lg font-medium truncate">Total Películas</p>
              <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 sm:mt-2">{{ totalPeliculas }}</p>
              <p class="text-blue-200 text-xs sm:text-sm mt-1">En cartelera</p>
            </div>
            <div class="bg-blue-400 bg-opacity-30 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 ml-2">
              <svg class="w-8 h-8 sm:w-10 h-10 lg:w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Usuarios -->
      <div class="bg-gradient-to-br from-green-500 to-green-600 overflow-hidden shadow-xl rounded-xl sm:rounded-2xl">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="flex items-center justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-green-100 text-sm sm:text-base lg:text-lg font-medium truncate">Total Usuarios</p>
              <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 sm:mt-2">{{ totalUsuarios }}</p>
              <p class="text-green-200 text-xs sm:text-sm mt-1">Registrados</p>
            </div>
            <div class="bg-green-400 bg-opacity-30 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 ml-2">
              <svg class="w-8 h-8 sm:w-10 h-10 lg:w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Reservas -->
      <div class="bg-gradient-to-br from-yellow-500 to-orange-500 overflow-hidden shadow-xl rounded-xl sm:rounded-2xl">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="flex items-center justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-yellow-100 text-sm sm:text-base lg:text-lg font-medium truncate">Total Reservas</p>
              <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 sm:mt-2">{{ totalReservas }}</p>
              <p class="text-yellow-200 text-xs sm:text-sm mt-1">Confirmadas</p>
            </div>
            <div class="bg-yellow-400 bg-opacity-30 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 ml-2">
              <svg class="w-8 h-8 sm:w-10 h-10 lg:w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Salas -->
      <div class="bg-gradient-to-br from-purple-500 to-purple-600 overflow-hidden shadow-xl rounded-xl sm:rounded-2xl">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="flex items-center justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-purple-100 text-sm sm:text-base lg:text-lg font-medium truncate">Salas Activas</p>
              <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 sm:mt-2">{{ totalSalas }}</p>
              <p class="text-purple-200 text-xs sm:text-sm mt-1">En funcionamiento</p>
            </div>
            <div class="bg-purple-400 bg-opacity-30 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 ml-2">
              <svg class="w-8 h-8 sm:w-10 h-10 lg:w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-12 0H3m2 0h2m0 0v-3.5a2 2 0 011-1.732l.5-.289a2 2 0 011 0l.5.289a2 2 0 011 1.732V21"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalPeliculas: number
  totalUsuarios: number
  totalReservas: number
  totalSalas: number
}

defineProps<Props>()
</script>
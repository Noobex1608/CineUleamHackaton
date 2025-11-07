<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Dashboard General</h2>
      <p class="text-lg text-gray-600">CineUleam - Sistema de Gestión</p>
    </div>
    
    <!-- Tarjetas de Estadísticas en disposición 2x2 -->
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <!-- Tarjeta de Películas - Rojo ULEAM -->
        <div class="bg-[#C1272D] overflow-hidden shadow-lg rounded-xl">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-red-100 text-sm font-medium uppercase tracking-wide">Total Películas</p>
                <p class="text-4xl font-bold text-white mt-2">{{ totalPeliculas }}</p>
                <p class="text-red-200 text-sm mt-1">En cartelera</p>
              </div>
              <div class="bg-red-600 rounded-lg p-3 ml-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjeta de Usuarios - Azul ULEAM -->
        <div class="bg-[#1E3A8A] overflow-hidden shadow-lg rounded-xl">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Usuarios</p>
                <p class="text-4xl font-bold text-white mt-2">{{ totalUsuarios }}</p>
                <p class="text-blue-200 text-sm mt-1">Registrados</p>
              </div>
              <div class="bg-blue-700 rounded-lg p-3 ml-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjeta de Reservas - Dorado -->
        <div class="bg-[#F59E0B] overflow-hidden shadow-lg rounded-xl">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-amber-100 text-sm font-medium uppercase tracking-wide">Total Reservas</p>
                <p class="text-4xl font-bold text-white mt-2">{{ totalReservas }}</p>
                <p class="text-amber-200 text-sm mt-1">Confirmadas</p>
              </div>
              <div class="bg-amber-600 rounded-lg p-3 ml-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjeta de Salas - Verde -->
        <div class="bg-[#059669] overflow-hidden shadow-lg rounded-xl">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-emerald-100 text-sm font-medium uppercase tracking-wide">Salas Activas</p>
                <p class="text-4xl font-bold text-white mt-2">{{ totalSalas }}</p>
                <p class="text-emerald-200 text-sm mt-1">En funcionamiento</p>
              </div>
              <div class="bg-emerald-600 rounded-lg p-3 ml-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto border">
      <div class="text-center">
        <h3 class="text-xl font-bold text-gray-900 mb-2">Universidad Laica Eloy Alfaro de Manabí</h3>
        <p class="text-gray-600 mb-4">Sistema de Gestión Cinematográfica</p>
        
        <div class="flex justify-center space-x-6 text-sm text-gray-600">
          <span class="flex items-center">
            <div class="w-3 h-3 bg-[#C1272D] rounded-full mr-2"></div>
            Películas
          </span>
          <span class="flex items-center">
            <div class="w-3 h-3 bg-[#1E3A8A] rounded-full mr-2"></div>
            Usuarios
          </span>
          <span class="flex items-center">
            <div class="w-3 h-3 bg-[#F59E0B] rounded-full mr-2"></div>
            Reservas
          </span>
          <span class="flex items-center">
            <div class="w-3 h-3 bg-[#059669] rounded-full mr-2"></div>
            Salas
          </span>
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
<template>
  <div class="min-h-screen bg-gray-100 pt-8">
    <!-- Título del Admin -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <p class="mt-2 text-lg text-gray-600">CineUleam - Sistema de Gestión</p>
      </div>
    </div>

    <!-- Navegación del Admin -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
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
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        
        <!-- Dashboard -->
        <div v-if="activeTab === 'dashboard'" class="space-y-8">
          <h2 class="text-3xl font-bold text-gray-900 text-center">Dashboard General</h2>
          
          <!-- Tarjetas de Estadísticas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Tarjeta de Películas -->
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden shadow-xl rounded-2xl">
              <div class="p-8">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-blue-100 text-lg font-medium">Total Películas</p>
                    <p class="text-4xl font-bold text-white mt-2">{{ totalPeliculas }}</p>
                    <p class="text-blue-200 text-sm mt-1">En cartelera</p>
                  </div>
                  <div class="bg-blue-400 bg-opacity-30 rounded-2xl p-4">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarjeta de Usuarios -->
            <div class="bg-gradient-to-br from-green-500 to-green-600 overflow-hidden shadow-xl rounded-2xl">
              <div class="p-8">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-green-100 text-lg font-medium">Total Usuarios</p>
                    <p class="text-4xl font-bold text-white mt-2">{{ totalUsuarios }}</p>
                    <p class="text-green-200 text-sm mt-1">Registrados</p>
                  </div>
                  <div class="bg-green-400 bg-opacity-30 rounded-2xl p-4">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarjeta de Reservas -->
            <div class="bg-gradient-to-br from-yellow-500 to-orange-500 overflow-hidden shadow-xl rounded-2xl">
              <div class="p-8">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-yellow-100 text-lg font-medium">Total Reservas</p>
                    <p class="text-4xl font-bold text-white mt-2">{{ totalReservas }}</p>
                    <p class="text-yellow-200 text-sm mt-1">Confirmadas</p>
                  </div>
                  <div class="bg-yellow-400 bg-opacity-30 rounded-2xl p-4">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarjeta de Salas -->
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 overflow-hidden shadow-xl rounded-2xl">
              <div class="p-8">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-purple-100 text-lg font-medium">Salas Activas</p>
                    <p class="text-4xl font-bold text-white mt-2">{{ totalSalas }}</p>
                    <p class="text-purple-200 text-sm mt-1">En funcionamiento</p>
                  </div>
                  <div class="bg-purple-400 bg-opacity-30 rounded-2xl p-4">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-12 0H3m2 0h2m0 0v-3.5a2 2 0 011-1.732l.5-.289a2 2 0 011 0l.5.289a2 2 0 011 1.732V21"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestión de Películas -->
        <div v-if="activeTab === 'peliculas'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">Gestión de Películas</h2>
            <button 
              @click="showCreateForm = true"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + Nueva Película
            </button>
          </div>

          <!-- Formulario de Crear/Editar Película -->
          <div v-if="showCreateForm || editingMovie" class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ editingMovie ? 'Editar Película' : 'Nueva Película' }}
            </h3>
            <form @submit.prevent="submitMovie" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input 
                    v-model="movieForm.nombre" 
                    type="text" 
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Idioma</label>
                  <select 
                    v-model="movieForm.idioma" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                    <option value="Portugués">Portugués</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea 
                  v-model="movieForm.descripcion" 
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">URL del Poster</label>
                <input 
                  v-model="movieForm.url_poster" 
                  type="url"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Fecha y Hora de Proyección</label>
                  <input 
                    v-model="movieForm.fecha_hora_proyeccion" 
                    type="datetime-local" 
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Sala</label>
                  <select 
                    v-model="movieForm.sala_id" 
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Selecciona una sala</option>
                    <option v-for="sala in salas" :key="sala.id" :value="sala.id">
                      {{ sala.nombre }} ({{ sala.capacidad }} asientos)
                    </option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end space-x-3">
                <button 
                  type="button" 
                  @click="cancelForm"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ editingMovie ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Lista de Películas -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="movie in peliculas" :key="movie.id" class="px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img 
                      v-if="movie.url_poster" 
                      :src="movie.url_poster" 
                      :alt="movie.nombre"
                      class="h-16 w-12 object-cover rounded"
                    >
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ movie.nombre }}</div>
                      <div class="text-sm text-gray-500">{{ movie.idioma }} • {{ formatDate(movie.fecha_hora_proyeccion) }}</div>
                      <div class="text-sm text-gray-500">{{ getSalaName(movie.sala_id) }}</div>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      @click="editMovie(movie)"
                      class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button 
                      @click="deleteMovie(movie.id)"
                      class="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Configuración de Salas -->
        <div v-if="activeTab === 'salas'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Configuración de Salas</h2>
              <p class="text-gray-600 mt-1">Gestiona las salas de cine disponibles</p>
            </div>
            <button 
              @click="showCreateSalaForm = true"
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Nueva Sala
            </button>
          </div>

          <!-- Formulario de Crear/Editar Sala -->
          <div v-if="showCreateSalaForm || editingSala" class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ editingSala ? 'Editar Sala' : 'Nueva Sala' }}
            </h3>
            <form @submit.prevent="submitSala" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nombre de la Sala</label>
                  <input 
                    v-model="salaForm.nombre" 
                    type="text" 
                    required
                    placeholder="Ej: Sala Premium, Sala VIP, etc."
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Capacidad</label>
                  <input 
                    v-model.number="salaForm.capacidad" 
                    type="number" 
                    required
                    min="1"
                    max="500"
                    placeholder="Número de asientos"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                </div>
              </div>
              <div class="flex justify-end space-x-3">
                <button 
                  type="button" 
                  @click="cancelSalaForm"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ editingSala ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Lista de Salas -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-6 py-4 bg-gray-50 border-b">
              <h3 class="text-lg font-medium text-gray-900">Salas Configuradas ({{ salas.length }})</h3>
            </div>
            <ul class="divide-y divide-gray-200">
              <li v-for="sala in salas" :key="sala.id" class="px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-12 0H3m2 0h2m0 0v-3.5a2 2 0 011-1.732l.5-.289a2 2 0 011 0l.5.289a2 2 0 011 1.732V21"/>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-lg font-semibold text-gray-900">{{ sala.nombre }}</div>
                      <div class="text-sm text-gray-600">
                        <span class="inline-flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                          </svg>
                          Capacidad: {{ sala.capacidad }} asientos
                        </span>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">ID: {{ sala.id }}</div>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      @click="editSala(sala)"
                      class="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Editar
                    </button>
                    <button 
                      @click="deleteSala(sala.id)"
                      class="text-red-600 hover:text-red-900 text-sm font-medium flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            
            <!-- Estado vacío -->
            <div v-if="salas.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-12 0H3m2 0h2m0 0v-3.5a2 2 0 011-1.732l.5-.289a2 2 0 011 0l.5.289a2 2 0 011 1.732V21"/>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No hay salas configuradas</h3>
              <p class="text-gray-500 mb-4">Agrega tu primera sala para comenzar</p>
              <button 
                @click="showCreateSalaForm = true"
                class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Crear Primera Sala
              </button>
            </div>
          </div>
        </div>

        <!-- Estadísticas -->
        <div v-if="activeTab === 'estadisticas'" class="space-y-8">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900">Estadísticas de Reservas</h2>
              <p class="text-gray-600 mt-2">Análisis detallado del comportamiento de reservas</p>
            </div>
            <button 
              @click="refreshChart"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Actualizar
            </button>
          </div>
          
          <!-- Tarjetas de resumen -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
              <h4 class="text-blue-100 text-sm font-medium uppercase tracking-wider">Total de Reservas</h4>
              <p class="text-3xl font-bold mt-2">{{ totalReservas }}</p>
              <p class="text-blue-200 text-sm mt-1">Confirmadas</p>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
              <h4 class="text-green-100 text-sm font-medium uppercase tracking-wider">Idiomas Disponibles</h4>
              <p class="text-3xl font-bold mt-2">{{ uniqueLanguages }}</p>
              <p class="text-green-200 text-sm mt-1">En cartelera</p>
            </div>
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
              <h4 class="text-purple-100 text-sm font-medium uppercase tracking-wider">Idioma Más Popular</h4>
              <p class="text-3xl font-bold mt-2">{{ mostPopularLanguage }}</p>
              <p class="text-purple-200 text-sm mt-1">Preferido</p>
            </div>
          </div>

          <!-- Gráfico Principal -->
          <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div class="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b">
              <h3 class="text-2xl font-bold text-gray-900">Distribución de Reservas por Idioma</h3>
              <p class="text-gray-600 mt-1">Visualización de preferencias de idioma de los usuarios</p>
            </div>
            
            <div class="p-8">
              <div class="flex justify-center items-center">
                <div class="bg-gray-50 rounded-2xl p-8 shadow-inner">
                  <canvas ref="chartCanvas" width="700" height="500" class="rounded-xl"></canvas>
                </div>
              </div>
              
              <div v-if="!hasReservations" class="text-center py-12">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
                <p class="text-gray-500">No hay reservas para mostrar estadísticas</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import type { Pelicula } from '../interfaces/Pelicula'
import type { Usuario } from '../interfaces/Usuario'
import type { Reserva } from '../interfaces/Reserva'
import type { Sala } from '../interfaces/Sala'

// Estado de la aplicación
const activeTab = ref('dashboard')
const showCreateForm = ref(false)
const editingMovie = ref<Pelicula | null>(null)

// Estado para las salas
const showCreateSalaForm = ref(false)
const editingSala = ref<Sala | null>(null)

// Datos simulados (en una app real, estos vendrían de una API)
const peliculas = ref<Pelicula[]>([
  {
    id: '1',
    nombre: 'Avengers: Endgame',
    descripcion: 'La batalla final contra Thanos',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Avengers',
    idioma: 'Español',
    fecha_hora_proyeccion: '2024-12-01T19:00',
    sala_id: 'SALA-001'
  },
  {
    id: '2',
    nombre: 'The Batman',
    descripcion: 'El nuevo caballero de la noche',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Batman',
    idioma: 'Inglés',
    fecha_hora_proyeccion: '2024-12-01T21:30',
    sala_id: 'SALA-002'
  },
  {
    id: '3',
    nombre: 'Spider-Man: No Way Home',
    descripcion: 'El multiverso se abre',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Spider-Man',
    idioma: 'Español',
    fecha_hora_proyeccion: '2024-12-02T18:00',
    sala_id: 'SALA-001'
  },
  {
    id: '4',
    nombre: 'Dune',
    descripcion: 'Una épica aventura espacial',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Dune',
    idioma: 'Inglés',
    fecha_hora_proyeccion: '2024-12-02T20:00',
    sala_id: 'SALA-003'
  },
  {
    id: '5',
    nombre: 'Fast & Furious 9',
    descripcion: 'La familia está de vuelta',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Fast-9',
    idioma: 'Español',
    fecha_hora_proyeccion: '2024-12-03T19:30',
    sala_id: 'SALA-002'
  },
  {
    id: '6',
    nombre: 'Top Gun: Maverick',
    descripcion: 'El regreso de un héroe',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Top-Gun',
    idioma: 'Inglés',
    fecha_hora_proyeccion: '2024-12-03T21:00',
    sala_id: 'SALA-001'
  },
  {
    id: '7',
    nombre: 'Coco',
    descripcion: 'Una historia sobre la familia',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Coco',
    idioma: 'Español',
    fecha_hora_proyeccion: '2024-12-04T16:00',
    sala_id: 'SALA-002'
  },
  {
    id: '8',
    nombre: 'The Matrix Resurrections',
    descripcion: 'Neo regresa a la Matrix',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Matrix',
    idioma: 'Inglés',
    fecha_hora_proyeccion: '2024-12-04T22:00',
    sala_id: 'SALA-003'
  },
  {
    id: '9',
    nombre: 'Encanto',
    descripcion: 'La magia de la familia Madrigal',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Encanto',
    idioma: 'Español',
    fecha_hora_proyeccion: '2024-12-05T17:00',
    sala_id: 'SALA-001'
  },
  {
    id: '10',
    nombre: 'Amélie',
    descripcion: 'Una historia francesa encantadora',
    url_poster: 'https://via.placeholder.com/300x450/333/fff?text=Amelie',
    idioma: 'Francés',
    fecha_hora_proyeccion: '2024-12-05T20:30',
    sala_id: 'SALA-002'
  }
])

const usuarios = ref<Usuario[]>([
  { id: '1', nombre: 'Juan Pérez', correo_institucional: 'juan.perez@live.uleam.edu.ec', tipo: 'estudiante' },
  { id: '2', nombre: 'María García', correo_institucional: 'maria.garcia@live.uleam.edu.ec', tipo: 'admin' },
  { id: '3', nombre: 'Carlos López', correo_institucional: 'carlos.lopez@live.uleam.edu.ec', tipo: 'estudiante' },
  { id: '4', nombre: 'Ana Rodríguez', correo_institucional: 'ana.rodriguez@live.uleam.edu.ec', tipo: 'admin' },
  { id: '5', nombre: 'Luis Martínez', correo_institucional: 'luis.martinez@live.uleam.edu.ec', tipo: 'estudiante' },
  { id: '6', nombre: 'Sofia Hernández', correo_institucional: 'sofia.hernandez@live.uleam.edu.ec', tipo: 'estudiante' },
  { id: '7', nombre: 'Diego Torres', correo_institucional: 'diego.torres@live.uleam.edu.ec', tipo: 'admin' },
  { id: '8', nombre: 'Isabella Cruz', correo_institucional: 'isabella.cruz@live.uleam.edu.ec', tipo: 'estudiante' }
])

const reservas = ref<Reserva[]>([
  // Reservas para películas en Español
  { id: '1', usuario_id: '1', pelicula_id: '1', asiento_id: 'A1', fecha_creacion: '2024-11-01T10:00:00Z' },
  { id: '2', usuario_id: '2', pelicula_id: '3', asiento_id: 'B5', fecha_creacion: '2024-11-02T14:30:00Z' },
  { id: '3', usuario_id: '3', pelicula_id: '5', asiento_id: 'C3', fecha_creacion: '2024-11-03T16:45:00Z' },
  { id: '4', usuario_id: '4', pelicula_id: '7', asiento_id: 'D7', fecha_creacion: '2024-11-04T12:20:00Z' },
  { id: '5', usuario_id: '5', pelicula_id: '9', asiento_id: 'E2', fecha_creacion: '2024-11-05T09:15:00Z' },
  { id: '6', usuario_id: '6', pelicula_id: '1', asiento_id: 'F4', fecha_creacion: '2024-11-05T11:30:00Z' },
  { id: '7', usuario_id: '7', pelicula_id: '3', asiento_id: 'G6', fecha_creacion: '2024-11-06T13:45:00Z' },
  { id: '8', usuario_id: '8', pelicula_id: '5', asiento_id: 'H1', fecha_creacion: '2024-11-06T15:20:00Z' },
  
  // Reservas para películas en Inglés
  { id: '9', usuario_id: '1', pelicula_id: '2', asiento_id: 'A3', fecha_creacion: '2024-11-01T18:00:00Z' },
  { id: '10', usuario_id: '2', pelicula_id: '4', asiento_id: 'B7', fecha_creacion: '2024-11-02T20:15:00Z' },
  { id: '11', usuario_id: '3', pelicula_id: '6', asiento_id: 'C5', fecha_creacion: '2024-11-03T19:30:00Z' },
  { id: '12', usuario_id: '4', pelicula_id: '8', asiento_id: 'D2', fecha_creacion: '2024-11-04T21:45:00Z' },
  { id: '13', usuario_id: '5', pelicula_id: '2', asiento_id: 'E8', fecha_creacion: '2024-11-05T17:10:00Z' },
  { id: '14', usuario_id: '6', pelicula_id: '4', asiento_id: 'F3', fecha_creacion: '2024-11-05T22:00:00Z' },
  
  // Reservas para películas en Francés
  { id: '15', usuario_id: '7', pelicula_id: '10', asiento_id: 'G8', fecha_creacion: '2024-11-06T19:45:00Z' },
  { id: '16', usuario_id: '8', pelicula_id: '10', asiento_id: 'H5', fecha_creacion: '2024-11-06T20:30:00Z' },
  { id: '17', usuario_id: '1', pelicula_id: '10', asiento_id: 'A6', fecha_creacion: '2024-11-07T16:15:00Z' }
])

// Datos de salas
const salas = ref<Sala[]>([
  { id: 'SALA-001', nombre: 'Sala Principal', capacidad: 120 },
  { id: 'SALA-002', nombre: 'Sala VIP', capacidad: 50 },
  { id: 'SALA-003', nombre: 'Sala Premium', capacidad: 80 }
])

// Estadísticas calculadas
const totalPeliculas = ref(peliculas.value.length)
const totalUsuarios = ref(usuarios.value.length)
const totalReservas = ref(reservas.value.length)
const totalSalas = ref(salas.value.length)
const hasReservations = ref(reservas.value.length > 0)

// Formulario de película
const movieForm = ref<Partial<Pelicula>>({
  nombre: '',
  descripcion: '',
  url_poster: '',
  idioma: 'Español',
  fecha_hora_proyeccion: '',
  sala_id: ''
})

// Formulario de sala
const salaForm = ref<Partial<Sala>>({
  nombre: '',
  capacidad: 0
})

const chartCanvas = ref<HTMLCanvasElement>()

// Variables computadas para estadísticas
const uniqueLanguages = computed(() => {
  const languages = new Set<string>()
  reservas.value.forEach(reserva => {
    const pelicula = peliculas.value.find(p => p.id === reserva.pelicula_id)
    if (pelicula && pelicula.idioma) {
      languages.add(pelicula.idioma)
    }
  })
  return languages.size
})

const mostPopularLanguage = computed(() => {
  const stats: { [key: string]: number } = {}
  reservas.value.forEach(reserva => {
    const pelicula = peliculas.value.find(p => p.id === reserva.pelicula_id)
    if (pelicula && pelicula.idioma) {
      stats[pelicula.idioma] = (stats[pelicula.idioma] || 0) + 1
    }
  })
  
  let maxCount = 0
  let popularLanguage = 'N/A'
  
  Object.entries(stats).forEach(([language, count]) => {
    if (count > maxCount) {
      maxCount = count
      popularLanguage = language
    }
  })
  
  return popularLanguage
})

// Métodos
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-ES')
}

const getSalaName = (salaId: string) => {
  const sala = salas.value.find(s => s.id === salaId)
  return sala ? `${sala.nombre} (${sala.capacidad} asientos)` : `Sala: ${salaId}`
}

const editMovie = (movie: Pelicula) => {
  editingMovie.value = movie
  movieForm.value = { ...movie }
  showCreateForm.value = false
}

const cancelForm = () => {
  showCreateForm.value = false
  editingMovie.value = null
  movieForm.value = {
    nombre: '',
    descripcion: '',
    url_poster: '',
    idioma: 'Español',
    fecha_hora_proyeccion: '',
    sala_id: ''
  }
}

const submitMovie = () => {
  if (editingMovie.value) {
    // Actualizar película existente
    const index = peliculas.value.findIndex(p => p.id === editingMovie.value!.id)
    if (index !== -1) {
      peliculas.value[index] = { ...movieForm.value as Pelicula }
    }
  } else {
    // Crear nueva película
    const newMovie: Pelicula = {
      id: Date.now().toString(),
      ...movieForm.value as Omit<Pelicula, 'id'>
    }
    peliculas.value.push(newMovie)
  }
  
  totalPeliculas.value = peliculas.value.length
  cancelForm()
}

const deleteMovie = (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
    peliculas.value = peliculas.value.filter(p => p.id !== id)
    totalPeliculas.value = peliculas.value.length
  }
}

// Funciones para salas
const editSala = (sala: Sala) => {
  editingSala.value = sala
  salaForm.value = { ...sala }
  showCreateSalaForm.value = false
}

const cancelSalaForm = () => {
  showCreateSalaForm.value = false
  editingSala.value = null
  salaForm.value = {
    nombre: '',
    capacidad: 0
  }
}

const submitSala = () => {
  if (editingSala.value) {
    // Actualizar sala existente
    const index = salas.value.findIndex(s => s.id === editingSala.value!.id)
    if (index !== -1) {
      salas.value[index] = { ...salaForm.value as Sala }
    }
  } else {
    // Crear nueva sala
    const newSala: Sala = {
      id: `SALA-${String(salas.value.length + 1).padStart(3, '0')}`,
      ...salaForm.value as Omit<Sala, 'id'>
    }
    salas.value.push(newSala)
  }
  
  totalSalas.value = salas.value.length
  cancelSalaForm()
}

const deleteSala = (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta sala?')) {
    // Verificar si hay películas usando esta sala
    const peliculasEnSala = peliculas.value.filter(p => p.sala_id === id)
    if (peliculasEnSala.length > 0) {
      alert(`No se puede eliminar la sala porque tiene ${peliculasEnSala.length} película(s) programada(s).`)
      return
    }
    
    salas.value = salas.value.filter(s => s.id !== id)
    totalSalas.value = salas.value.length
  }
}

const drawPieChart = () => {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Limpiar el canvas
  ctx.clearRect(0, 0, 700, 500)

  // Calcular estadísticas por idioma
  const stats: { [key: string]: number } = {}
  
  reservas.value.forEach(reserva => {
    const pelicula = peliculas.value.find(p => p.id === reserva.pelicula_id)
    if (pelicula && pelicula.idioma) {
      stats[pelicula.idioma] = (stats[pelicula.idioma] || 0) + 1
    }
  })

  const languages = Object.keys(stats)
  const values = Object.values(stats)
  const total = values.reduce((a, b) => a + b, 0)
  
  if (total === 0) {
    ctx.fillStyle = '#6B7280'
    ctx.font = '18px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('No hay datos disponibles', 350, 250)
    return
  }

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6']
  const centerX = 300  // Movido más a la izquierda para dar espacio a la leyenda
  const centerY = 250
  const radius = 140

  let currentAngle = 0

  // Dibujar las secciones del pastel
  languages.forEach((language, index) => {
    const value = values[index]
    if (value === undefined) return
    
    const sliceAngle = (value / total) * 2 * Math.PI
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.closePath()
    const color = colors[index % colors.length]
    if (color) ctx.fillStyle = color
    ctx.fill()
    
    // Dibujar borde
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 3
    ctx.stroke()
    
    // Dibujar etiquetas
    const labelAngle = currentAngle + sliceAngle / 2
    const labelX = centerX + Math.cos(labelAngle) * (radius * 0.75)
    const labelY = centerY + Math.sin(labelAngle) * (radius * 0.75)
    
    // Solo mostrar etiquetas si el slice es lo suficientemente grande
    if (sliceAngle > 0.3) { // Solo si es mayor a ~17 grados
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'center'
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 4
      
      // Idioma
      ctx.strokeText(`${language}`, labelX, labelY - 10)
      ctx.fillText(`${language}`, labelX, labelY - 10)
      
      // Número
      ctx.font = 'bold 20px Arial'
      ctx.strokeText(`${value}`, labelX, labelY + 15)
      ctx.fillText(`${value}`, labelX, labelY + 15)
    }
    
    currentAngle += sliceAngle
  })

  // Dibujar leyenda mejorada
  let legendY = 60
  const legendX = 500  // Movido más a la derecha
  
  // Título de la leyenda
  ctx.fillStyle = '#1F2937'
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('Distribución:', legendX, legendY - 25)
  
  languages.forEach((language, index) => {
    const color = colors[index % colors.length]
    const value = values[index]
    if (color && value !== undefined) {
      // Rectángulo de color
      ctx.fillStyle = color
      ctx.fillRect(legendX, legendY - 12, 30, 24)
      
      // Borde del rectángulo
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.strokeRect(legendX, legendY - 12, 30, 24)
      
      // Texto de la leyenda
      ctx.fillStyle = '#1F2937'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'left'
      const percentage = ((value / total) * 100).toFixed(1)
      ctx.fillText(`${language}:`, legendX + 40, legendY)
      ctx.fillText(`${value} (${percentage}%)`, legendX + 40, legendY + 18)
      
      legendY += 50
    }
  })
}

const refreshChart = () => {
  nextTick(() => {
    drawPieChart()
  })
}

onMounted(() => {
  nextTick(() => {
    if (activeTab.value === 'estadisticas') {
      drawPieChart()
    }
  })
})

// Watch para redibujar el gráfico cuando se cambie al tab de estadísticas
watch(activeTab, (newTab) => {
  if (newTab === 'estadisticas') {
    nextTick(() => {
      drawPieChart()
    })
  }
})
</script>

<style scoped>
input, select, textarea {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
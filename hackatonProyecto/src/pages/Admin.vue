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
            <div class="bg-linear-to-br from-blue-500 to-blue-600 overflow-hidden shadow-xl rounded-2xl">
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
            <div class="bg-linear-to-br from-green-500 to-green-600 overflow-hidden shadow-xl rounded-2xl">
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
            <div class="bg-linear-to-br from-yellow-500 to-orange-500 overflow-hidden shadow-xl rounded-2xl">
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
            <div class="bg-linear-to-br from-purple-500 to-purple-600 overflow-hidden shadow-xl rounded-2xl">
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
            <!-- Loading state -->
            <div v-if="isLoadingPeliculas" class="text-center py-12">
              <div class="inline-flex items-center px-4 py-2 text-sm text-gray-600">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando películas...
              </div>
            </div>
            
            <!-- Lista de películas -->
            <ul v-else-if="peliculas.length > 0" class="divide-y divide-gray-200">
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
            
            <!-- Estado vacío -->
            <div v-else class="text-center py-12">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9z"/>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No hay películas</h3>
              <p class="text-gray-500 mb-4">Agrega tu primera película para comenzar</p>
              <button 
                @click="showCreateForm = true"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Crear Primera Película
              </button>
            </div>
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
                    <div class="shrink-0">
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
            <div class="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
              <h4 class="text-blue-100 text-sm font-medium uppercase tracking-wider">Total de Reservas</h4>
              <p class="text-3xl font-bold mt-2">{{ totalReservas }}</p>
              <p class="text-blue-200 text-sm mt-1">Confirmadas</p>
            </div>
            <div class="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
              <h4 class="text-green-100 text-sm font-medium uppercase tracking-wider">Idiomas Disponibles</h4>
              <p class="text-3xl font-bold mt-2">{{ uniqueLanguages }}</p>
              <p class="text-green-200 text-sm mt-1">En cartelera</p>
            </div>
            <div class="bg-linear-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
              <h4 class="text-purple-100 text-sm font-medium uppercase tracking-wider">Idioma Más Popular</h4>
              <p class="text-3xl font-bold mt-2">{{ mostPopularLanguage }}</p>
              <p class="text-purple-200 text-sm mt-1">Preferido</p>
            </div>
          </div>

          <!-- Gráfico Principal -->
          <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div class="bg-linear-to-r from-gray-50 to-white px-8 py-6 border-b">
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
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'
import Toast from '../components/Toast.vue'
import type { Pelicula } from '../interfaces/Pelicula'
import type { Usuario } from '../interfaces/Usuario'
import type { Reserva } from '../interfaces/Reserva'
import type { Sala } from '../interfaces/Sala'

const router = useRouter()
const { isAuthenticated, currentUser, checkSession } = useAuth()

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
const toastTitle = ref('')
const toastType = ref<'success' | 'error' | 'warning' | 'info'>('info')

// Estado de la aplicación
const activeTab = ref('dashboard')
const showCreateForm = ref(false)
const editingMovie = ref<Pelicula | null>(null)

// Estado para las salas
const showCreateSalaForm = ref(false)
const editingSala = ref<Sala | null>(null)

// Variables reactivas para datos de Supabase
const peliculas = ref<Pelicula[]>([])
const usuarios = ref<Usuario[]>([])
const reservas = ref<Reserva[]>([])
const salas = ref<Sala[]>([])

// Loading states
const isLoadingPeliculas = ref(false)
const isLoadingSalas = ref(false)
const isLoadingStats = ref(false)

// Estadísticas calculadas
const totalPeliculas = computed(() => peliculas.value.length)
const totalUsuarios = computed(() => usuarios.value.length)
const totalReservas = computed(() => reservas.value.length)
const totalSalas = computed(() => salas.value.length)
const hasReservations = computed(() => reservas.value.length > 0)

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

// Función helper para mostrar toast
const displayToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  toastTitle.value = title
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}

// ===== FUNCIONES DE SUPABASE =====

// Cargar películas desde Supabase
const loadPeliculas = async () => {
  try {
    isLoadingPeliculas.value = true
    const { data, error } = await supabase
      .from('pelicula')
      .select('*')
      .order('fecha_hora_proyeccion', { ascending: true })

    if (error) throw error
    
    peliculas.value = data || []
  } catch (error) {
    console.error('Error al cargar películas:', error)
    displayToast('Error', 'No se pudieron cargar las películas', 'error')
  } finally {
    isLoadingPeliculas.value = false
  }
}

// Cargar salas desde Supabase
const loadSalas = async () => {
  try {
    isLoadingSalas.value = true
    const { data, error } = await supabase
      .from('sala')
      .select('*')
      .order('nombre', { ascending: true })

    if (error) throw error
    
    salas.value = data || []
  } catch (error) {
    console.error('Error al cargar salas:', error)
    displayToast('Error', 'No se pudieron cargar las salas', 'error')
  } finally {
    isLoadingSalas.value = false
  }
}

// Cargar estadísticas desde Supabase
const loadStats = async () => {
  try {
    isLoadingStats.value = true
    
    // Cargar usuarios
    const { data: usuariosData, error: usuariosError } = await supabase
      .from('usuario')
      .select('*')
    
    if (usuariosError) throw usuariosError
    usuarios.value = usuariosData || []

    // Cargar reservas
    const { data: reservasData, error: reservasError } = await supabase
      .from('reserva')
      .select('*')
    
    if (reservasError) throw reservasError
    reservas.value = reservasData || []

  } catch (error) {
    console.error('Error al cargar estadísticas:', error)
  } finally {
    isLoadingStats.value = false
  }
}

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

const submitMovie = async () => {
  try {
    if (editingMovie.value) {
      // Actualizar película existente
      const { error } = await supabase
        .from('pelicula')
        .update({
          nombre: movieForm.value.nombre,
          descripcion: movieForm.value.descripcion,
          url_poster: movieForm.value.url_poster,
          idioma: movieForm.value.idioma,
          fecha_hora_proyeccion: movieForm.value.fecha_hora_proyeccion,
          sala_id: movieForm.value.sala_id
        })
        .eq('id', editingMovie.value.id)

      if (error) throw error
      
      displayToast('Éxito', 'Película actualizada exitosamente', 'success')
    } else {
      // Crear nueva película
      const { error } = await supabase
        .from('pelicula')
        .insert({
          nombre: movieForm.value.nombre,
          descripcion: movieForm.value.descripcion,
          url_poster: movieForm.value.url_poster,
          idioma: movieForm.value.idioma,
          fecha_hora_proyeccion: movieForm.value.fecha_hora_proyeccion,
          sala_id: movieForm.value.sala_id
        })

      if (error) throw error
      
      displayToast('Éxito', 'Película creada exitosamente', 'success')
    }
    
    // Recargar las películas
    await loadPeliculas()
    cancelForm()
    
  } catch (error: any) {
    console.error('Error al guardar película:', error)
    console.error('Detalles del error:', JSON.stringify(error, null, 2))
    displayToast('Error', `No se pudo guardar la película: ${error.message || 'Error desconocido'}`, 'error')
  }
}

const deleteMovie = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
    try {
      const { error } = await supabase
        .from('pelicula')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      displayToast('Éxito', 'Película eliminada exitosamente', 'success')
      // Recargar las películas
      await loadPeliculas()
      
    } catch (error) {
      console.error('Error al eliminar película:', error)
      displayToast('Error', 'No se pudo eliminar la película', 'error')
    }
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

const submitSala = async () => {
  try {
    if (editingSala.value) {
      // Actualizar sala existente
      const { error } = await supabase
        .from('sala')
        .update({
          nombre: salaForm.value.nombre,
          capacidad: salaForm.value.capacidad
        })
        .eq('id', editingSala.value.id)

      if (error) throw error
      
      displayToast('Éxito', 'Sala actualizada exitosamente', 'success')
    } else {
      // Crear nueva sala
      const { error } = await supabase
        .from('sala')
        .insert({
          nombre: salaForm.value.nombre,
          capacidad: salaForm.value.capacidad
        })

      if (error) throw error
      
      displayToast('Éxito', 'Sala creada exitosamente', 'success')
    }
    
    // Recargar las salas
    await loadSalas()
    cancelSalaForm()
    
  } catch (error: any) {
    console.error('Error al guardar sala:', error)
    console.error('Detalles del error:', JSON.stringify(error, null, 2))
    displayToast('Error', `No se pudo guardar la sala: ${error.message || 'Error desconocido'}`, 'error')
  }
}

const deleteSala = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta sala?')) {
    try {
      // Verificar si hay películas usando esta sala
      const { data: peliculasEnSala, error: checkError } = await supabase
        .from('pelicula')
        .select('id')
        .eq('sala_id', id)

      if (checkError) throw checkError

      if (peliculasEnSala && peliculasEnSala.length > 0) {
        displayToast('Advertencia', `No se puede eliminar la sala porque tiene ${peliculasEnSala.length} película(s) programada(s).`, 'warning')
        return
      }

      const { error } = await supabase
        .from('sala')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      displayToast('Éxito', 'Sala eliminada exitosamente', 'success')
      // Recargar las salas
      await loadSalas()
      
    } catch (error) {
      console.error('Error al eliminar sala:', error)
      displayToast('Error', 'No se pudo eliminar la sala', 'error')
    }
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
  await Promise.all([
    loadPeliculas(),
    loadSalas(),
    loadStats()
  ])
  
  // Dibujar gráfico si estamos en estadísticas
  nextTick(() => {
    if (activeTab.value === 'estadisticas') {
      drawPieChart()
    }
  })
})

// Watch para redibujar el gráfico cuando se cambie al tab de estadísticas
watch(activeTab, async (newTab) => {
  if (newTab === 'estadisticas') {
    await loadStats()
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
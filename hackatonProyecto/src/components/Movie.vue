<template>
  <article 
    class="movie-card group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white focus-within:ring-2 focus-within:ring-[#C1272D] focus-within:ring-offset-2"
    role="article"
    :aria-label="`Película: ${movie.nombre}. ${movie.descripcion || ''}. Idioma: ${movie.idioma || 'No especificado'}`"
    tabindex="0"
    @click="$emit('view-details', movie)"
    @keydown.enter="$emit('view-details', movie)"
    @keydown.space.prevent="$emit('view-details', movie)"
  >

    <div class="relative aspect-2/3 overflow-hidden bg-gray-100">
      <img 
        :src="displayPoster" 
        :alt="`Póster de la película ${movie.nombre}`"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
        loading="lazy"
      />
      

      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
      

      <div 
        v-if="isNewRelease" 
        class="absolute top-3 left-3 bg-[#C1272D] text-white font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-lg z-10 animate-pulse"
        role="status"
        aria-label="Película en estreno"
      >
        <StarIcon class="w-3.5 h-3.5" aria-hidden="true" />
        <span>Estreno</span>
      </div>


      <div 
        v-if="movie.idioma" 
        class="absolute top-3 right-3 bg-gray-900 bg-opacity-90 text-white font-bold px-2.5 py-1.5 rounded text-xs shadow-lg border border-white border-opacity-20"
        role="note"
        :aria-label="`Idioma: ${movie.idioma}`"
      >
        <span>{{ movie.idioma }}</span>
      </div>


      <div 
        v-if="movie.sala_id" 
        class="absolute bottom-3 right-3 bg-[#C1272D] bg-opacity-95 text-white font-semibold px-3 py-1.5 rounded-lg text-xs shadow-lg"
        role="note"
      >
        <span>Sala {{ getSalaNumber(movie.sala_id) }}</span>
      </div>

    </div>


    <div class="p-4 bg-white">

      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-[#C1272D] uppercase tracking-wide flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {{ formatDate(movie.fecha_hora_proyeccion) }}
        </span>
        <div class="text-xs text-gray-500 font-medium">
          {{ formatTime(movie.fecha_hora_proyeccion) }}
        </div>
      </div>


      <h3 class="text-gray-900 font-bold text-base mb-2 line-clamp-2 leading-tight group-hover:text-[#C1272D] transition-colors">
        {{ movie.nombre }}
      </h3>

 
      <p v-if="movie.descripcion" class="text-gray-600 text-xs line-clamp-2 mb-3">
        {{ movie.descripcion }}
      </p>


      <div class="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
        <span v-if="movie.idioma" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          {{ movie.idioma }}
        </span>
        <button 
          class="text-[#C1272D] font-semibold hover:text-[#8B1F23] transition-colors"
          @click.stop="$emit('view-details', movie)"
        >
          Reservar →
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'


export interface Movie {
  id: string // uuid
  nombre: string
  descripcion?: string
  url_poster?: string
  idioma?: string
  fecha_hora_proyeccion: string // timestamp
  sala_id: string // uuid
}


const props = defineProps<{
  movie: Movie
}>()


defineEmits<{
  'view-details': [movie: Movie]
  'toggle-favorite': [movieId: string, isFavorite: boolean]
}>()


const imageError = ref(false)


const placeholderImage = 'https://via.placeholder.com/300x450/f3f4f6/9ca3af?text=Sin+Imagen'


const displayPoster = computed(() => {
  return imageError.value ? placeholderImage : props.movie.url_poster || placeholderImage
})


const isNewRelease = computed(() => {
  const proyeccionDate = new Date(props.movie.fecha_hora_proyeccion)
  const now = new Date()
  const diffTime = proyeccionDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays >= 0 && diffDays <= 7
})


const handleImageError = () => {
  imageError.value = true
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  }
  return date.toLocaleDateString('es-ES', options)
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

const getSalaNumber = (salaId: string) => {
  // Manejo seguro para extraer número de sala
  const parts = salaId.split('-')
  if (parts.length === 0) return 1
  
  const hash = parts[0]
  if (!hash || hash.length === 0) return 1
  
  // Intentar extraer número del hash o usar un cálculo alternativo
  const parsed = parseInt(hash.substring(0, 2), 16)
  return isNaN(parsed) ? 1 : (parsed % 10) || 1
}
</script>

<style scoped>
.movie-card {
  border: 1px solid #e5e7eb;
  transform: translateY(0);
}

.movie-card:hover {
  border-color: #C1272D;
  transform: translateY(-8px);
}

.movie-card:focus {
  outline: none;
}


.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}


@media (prefers-contrast: high) {
  .movie-card {
    border-width: 3px;
  }
}


@media (prefers-reduced-motion: reduce) {
  .movie-card,
  .movie-card img,
  .movie-card * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

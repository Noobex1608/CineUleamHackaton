<template>
  <div class="min-h-screen bg-white" lang="es">

    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#C1272D] text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B1F23]"
    >
      Saltar al contenido principal
    </a>


    <section 
      class="relative h-[450px] md:h-[500px] bg-linear-to-r from-[#C1272D] via-[#A12027] to-[#8B1F23] overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >

      <div class="absolute inset-0" aria-hidden="true">
        <img 
          src="../assets/GenteCine.jpg" 
          alt=""
          class="w-full h-full object-cover opacity-25 mix-blend-overlay"
          role="presentation"
        />
>
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>
      
      <div class="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center">
        <div class="max-w-3xl">
          <h1 id="hero-heading" class="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Hola,
          </h1>
          <p class="text-2xl md:text-3xl lg:text-4xl text-white font-light mb-8 animate-fade-in-delay">
            disfruta lo mejor del cine
          </p>
          <div class="flex gap-4 animate-fade-in-delay-2">
            <button class="bg-white text-[#C1272D] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Ver Cartelera
            </button>
            <button class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#C1272D] transition-all">
              Próximamente
            </button>
          </div>
        </div>
      </div>
      

      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>


    <nav 
      class="bg-white border-b border-gray-200 sticky top-20 z-20 shadow-sm" 
      aria-label="Filtros de películas"
      role="navigation"
    >
      <div class="container mx-auto px-8">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center gap-8" role="tablist">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="text-gray-700 font-semibold pb-2 transition-all relative focus:outline-none focus:ring-2 focus:ring-[#C1272D] rounded px-3 py-2"
              :class="activeTab === tab.id ? 'text-[#C1272D]' : 'text-gray-500 hover:text-gray-700'"
              role="tab"
              :aria-selected="activeTab === tab.id"
              :aria-controls="`panel-${tab.id}`"
              :tabindex="activeTab === tab.id ? 0 : -1"
            >
              {{ tab.label }}
              <span 
                v-if="activeTab === tab.id" 
                class="absolute bottom-0 left-0 right-0 h-1 bg-[#C1272D] rounded-t-full transition-all"
                aria-hidden="true"
              ></span>
            </button>
          </div>
          

          <div class="hidden md:flex items-center gap-2">
            <span class="text-sm text-gray-500 mr-2">Vista:</span>
            <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="Vista en cuadrícula">
              <svg class="w-5 h-5 text-[#C1272D]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
              </svg>
            </button>
            <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="Vista en lista">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>


    <main 
      id="main-content"
      class="container mx-auto px-8 mt-10 pb-16 grow"
      role="main"
    >

      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            {{ tabs.find(t => t.id === activeTab)?.label }}
          </h2>
          <p class="text-gray-500">
            {{ filteredMovies.length }} película{{ filteredMovies.length !== 1 ? 's' : '' }} disponible{{ filteredMovies.length !== 1 ? 's' : '' }}
          </p>
        </div>
        

        <div class="hidden md:flex items-center gap-4">
          <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C1272D] focus:border-transparent">
            <option>Todos los idiomas</option>
            <option>Español</option>
            <option>Inglés</option>
            <option>Italiano</option>
            <option>Francés</option>
            <option>Portugués</option>
          </select>
        </div>
      </div>


      <div 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        role="list"
        :aria-label="`Películas en ${tabs.find(t => t.id === activeTab)?.label}`"
      >
        <Movie 
          v-for="movie in filteredMovies" 
          :key="movie.id"
          :movie="movie"
          @view-details="handleViewDetails"
        />
      </div>
      

      <div 
        v-if="filteredMovies.length === 0" 
        class="text-center py-20"
        role="status"
        aria-live="polite"
      >
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
        </svg>
        <p class="text-gray-500 text-lg font-medium mb-2">No hay películas disponibles</p>
        <p class="text-gray-400 text-sm">Vuelve pronto para ver las próximas funciones</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Movie, { type Movie as MovieType } from '../components/Movie.vue'

const router = useRouter()


const tabs = [
  { id: 'billboard', label: 'Cartelera' },
  { id: 'now', label: 'Ahora' },
  { id: 'upcoming', label: 'Próximamente' }
]

const activeTab = ref('billboard')


const movies = ref<MovieType[]>([
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    nombre: "THE MATRIX",
    descripcion: "Un hacker descubre que la realidad tal como la conoce es una simulación creada por máquinas.",
    url_poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    idioma: "Inglés",
    fecha_hora_proyeccion: "2024-11-15T19:30:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440011'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    nombre: "INCEPTION",
    descripcion: "Un ladrón que roba secretos corporativos mediante tecnología de sueños compartidos.",
    url_poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    idioma: "Inglés",
    fecha_hora_proyeccion: "2024-11-16T20:00:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440012'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    nombre: "ZOOPOCALIPSIS",
    descripcion: "Aventura animada llena de acción y humor para toda la familia.",
    url_poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    idioma: "Español",
    fecha_hora_proyeccion: "2024-11-14T16:00:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440013'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    nombre: "VOLVER AL FUTURO",
    descripcion: "Un adolescente viaja accidentalmente 30 años al pasado en un DeLorean.",
    url_poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    idioma: "Inglés",
    fecha_hora_proyeccion: "2024-11-17T18:30:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440014'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    nombre: "EL CADAVER DE LA NOVIA",
    descripcion: "Animación gótica de Tim Burton sobre amor más allá de la muerte.",
    url_poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    idioma: "Español",
    fecha_hora_proyeccion: "2024-11-15T15:00:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440015'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    nombre: "TELEFONO NEGRO 2",
    descripcion: "Terror psicológico que explora los horrores del pasado.",
    url_poster: "https://image.tmdb.org/t/p/w500/5vUux2vNUTqwCzb7tVcH18XnsF5.jpg",
    idioma: "Inglés",
    fecha_hora_proyeccion: "2024-11-18T21:30:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440016'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    nombre: "LA VITA È BELLA",
    descripcion: "Un padre usa su imaginación para proteger a su hijo en un campo de concentración.",
    url_poster: "https://image.tmdb.org/t/p/w500/mGJuQwMq1bEboaVTqQAW9UZZfMo.jpg",
    idioma: "Italiano",
    fecha_hora_proyeccion: "2024-11-16T17:00:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440017'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    nombre: "AMÉLIE",
    descripcion: "Una joven parisina decide cambiar la vida de quienes la rodean.",
    url_poster: "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
    idioma: "Francés",
    fecha_hora_proyeccion: "2024-11-19T19:00:00Z",
    sala_id: '550e8400-e29b-41d4-a716-446655440018'
  }
])


const filteredMovies = computed(() => {

  return movies.value
})


const handleViewDetails = (movie: MovieType) => {
  const movieData = encodeURIComponent(JSON.stringify(movie))
  router.push({
    name: 'movieDetails',
    params: { movie: movieData }
  })
}
</script>

<style scoped>

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus,
.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}


@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fade-in 0.8s ease-out 0.2s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 0.8s ease-out 0.4s both;
}


@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-fade-in-delay,
  .animate-fade-in-delay-2,
  .animate-bounce {
    animation: none !important;
  }
}
</style>
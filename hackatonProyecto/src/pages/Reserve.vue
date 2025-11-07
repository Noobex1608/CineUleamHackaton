<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header con botón de volver -->
    <div class="bg-white border-b border-gray-200 py-6">
      <div class="container mx-auto px-8">
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-[#C1272D] transition-colors font-medium"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver a película
        </button>
      </div>
    </div>

    <div class="container mx-auto px-8 py-12">
      <!-- Información de la película -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-6">
          <div class="shrink-0">
            <img
              :src="movie?.url_poster"
              :alt="movie?.nombre"
              class="w-24 h-36 object-cover rounded-lg shadow-md"
            />
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">
              {{ movie?.nombre }}
            </h1>
            <div class="flex flex-wrap gap-3">
              <span
                class="inline-flex items-center gap-2 px-4 py-2 bg-[#C1272D] text-white rounded-lg text-sm font-medium"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ formatDate(movie?.fecha_hora_proyeccion) }}
              </span>

              <span
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ formatTime(movie?.fecha_hora_proyeccion) }}
              </span>

              <span
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                Sala {{ getSalaNumber(movie?.sala_id) }}
              </span>

              <span
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  />
                </svg>
                {{ movie?.idioma }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Selección de asientos -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">
              Selecciona tus asientos
            </h2>
            <p class="text-gray-600 mt-1">
              <span class="text-[#C1272D] font-semibold text-lg">{{
                selectedSeats.length
              }}</span>
              <span class="text-gray-500"> / {{ maxSeats }} asientos seleccionados</span>
            </p>
          </div>

          <div class="flex flex-wrap gap-4 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 bg-gray-300 rounded border-2 border-gray-400"></div>
              <span class="text-gray-700 font-medium">Reservado</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 bg-gray-100 rounded border-2 border-gray-300"></div>
              <span class="text-gray-700 font-medium">Disponible</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 bg-blue-500 rounded"></div>
              <span class="text-gray-700 font-medium">Seleccionado</span>
            </div>
          </div>
        </div>

        <!-- Pantalla -->
        <div class="mb-12">
          <div class="w-full max-w-xl mx-auto mb-8">
            <div class="relative">
              <svg
                viewBox="0 0 400 60"
                class="w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="screenGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" style="stop-color: #c1272d; stop-opacity: 1" />
                    <stop offset="50%" style="stop-color: #9ca3af; stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: #c1272d; stop-opacity: 1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 50 Q 200 10, 380 50"
                  stroke="url(#screenGradient)"
                  stroke-width="8"
                  fill="none"
                  stroke-linecap="round"
                  class="drop-shadow-lg"
                />
              </svg>
            </div>
            <p class="text-center text-sm text-gray-500 font-medium mt-2">
              PANTALLA
            </p>
          </div>

          <!-- Asientos -->
          <div class="max-w-5xl mx-auto">
            <div class="flex justify-center gap-12">
              <!-- Sección izquierda -->
              <div class="space-y-2">
                <div
                  v-for="row in seatRows"
                  :key="row.label"
                  class="flex items-center gap-3"
                >
                  <span
                    class="text-sm text-gray-600 font-semibold w-6 text-right"
                    >{{ row.label }}</span
                  >
                  <div class="flex gap-2">
                    <button
                      v-for="seat in row.seats"
                      :key="seat.id"
                      @click="toggleSeat(seat)"
                      :disabled="
                        seat.status === 'reserved' ||
                        seat.status === 'distance'
                      "
                      :class="getSeatClass(seat)"
                      class="w-8 h-8 rounded text-xs font-semibold transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {{ seat.status === "distance" ? "" : seat.number }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Sección derecha -->
              <div class="space-y-2">
                <div
                  v-for="row in rightSeatRows"
                  :key="row.label"
                  class="flex items-center gap-3"
                >
                  <div class="flex gap-2">
                    <button
                      v-for="seat in row.seats"
                      :key="seat.id"
                      @click="toggleSeat(seat)"
                      :disabled="
                        seat.status === 'reserved' ||
                        seat.status === 'distance'
                      "
                      :class="getSeatClass(seat)"
                      class="w-8 h-8 rounded text-xs font-semibold transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {{ seat.status === "distance" ? "" : seat.number }}
                    </button>
                  </div>
                  <span
                    class="text-sm text-gray-600 font-semibold w-6"
                    >{{ row.label }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón de confirmación -->
        <div class="pt-6 border-t border-gray-200">
          <button
            @click="confirmReservation"
            :disabled="selectedSeats.length === 0"
            class="w-full bg-[#C1272D] hover:bg-[#8B1F23] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Confirmar reserva
          </button>
          <p class="text-sm text-gray-500 mt-3 text-center">
            {{
              selectedSeats.length === 0
                ? "Selecciona al menos un asiento para continuar"
                : `Has seleccionado: ${selectedSeats.map((s) => s.id).join(", ")}`
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const maxSeats = 1

// Obtener los datos de la película de los parámetros de la ruta
const movie = computed(() => {
  const movieData = route.params.movie;
  if (typeof movieData === "string") {
    return JSON.parse(decodeURIComponent(movieData));
  }
  return movieData;
})

interface Seat {
  id: string
  number: string
  row: string
  status: 'available' | 'reserved' | 'vip' | 'selected' | 'distance'
}

const selectedSeats = ref<Seat[]>([])

const goBack = () => {
  router.back()
}

// Funciones para formatear fecha y hora
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("es-ES", { month: "short" });
  return `${day} ${month}`;
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSalaNumber = (salaId: string) => {
  const lastDigit = salaId?.slice(-1);
  return lastDigit;
};

const generateSeats = (startRow: string, endRow: string, columns: number): any[] => {
  const rows = []
  const startChar = startRow.charCodeAt(0)
  const endChar = endRow.charCodeAt(0)
  
  for (let i = startChar; i <= endChar; i++) {
    const rowLabel = String.fromCharCode(i)
    const seats: Seat[] = []
    
    for (let j = 1; j <= columns; j++) {
      const seatNumber = j.toString().padStart(2, '0')
      const isReserved = Math.random() > 0.7
      
      seats.push({
        id: `${rowLabel}${seatNumber}`,
        number: seatNumber,
        row: rowLabel,
        status: isReserved ? 'reserved' : 'available'
      })
    }
    
    rows.push({ label: rowLabel, seats })
  }
  
  return rows
}

const seatRows = ref(generateSeats('A', 'G', 12))
const rightSeatRows = ref(generateSeats('A', 'G', 3))

const getSeatClass = (seat: Seat) => {
  if (seat.status === 'distance') {
    return 'bg-transparent border-2 border-gray-300'
  }
  if (selectedSeats.value.some(s => s.id === seat.id)) {
    return 'bg-blue-500 text-white shadow-lg'
  }
  if (seat.status === 'reserved') {
    return 'bg-gray-300 text-gray-500 border-2 border-gray-400 cursor-not-allowed'
  }
  return 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
}

const toggleSeat = (seat: Seat) => {
  const index = selectedSeats.value.findIndex(s => s.id === seat.id)
  
  if (index > -1) {
    selectedSeats.value.splice(index, 1)
  } else {
    if (selectedSeats.value.length < maxSeats) {
      selectedSeats.value.push(seat)
    }
  }
}

const confirmReservation = () => {
  if (selectedSeats.value.length === 0) return
  
  console.log('Asientos seleccionados:', selectedSeats.value)
  console.log('Película:', movie.value)
  alert(`Has seleccionado: ${selectedSeats.value.map(s => s.id).join(', ')} para ${movie.value?.nombre}`)
  router.push('/')
}
</script>

<style scoped>
</style>
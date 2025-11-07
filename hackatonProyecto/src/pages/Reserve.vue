<template>
  <div class="min-h-screen bg-gray-900 text-white py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <button @click="goBack" class="text-white hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold">Selecciona tus asientos</h1>
      </div>

      <div class="flex gap-4 mb-8">
        <div class="flex-1 bg-gray-800 h-2 rounded"></div>
        <div class="flex-1 bg-gray-800 h-2 rounded"></div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="text-lg font-semibold">
            <span class="text-gray-400">{{ selectedSeats.length }}</span> / {{ maxSeats }}
          </div>
          <div class="flex items-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-gray-600 rounded"></div>
              <span>Reservado</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-gray-500 rounded"></div>
              <span>Disponible</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-[#C1272D] rounded"></div>
              <span>Vip</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-cyan-500 rounded"></div>
              <span>Seleccionado</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
              <span>Distanciamiento</span>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <div class="w-full max-w-2xl mx-auto mb-12">
            <div class="h-1 bg-gradient-to-r from-yellow-500 via-cyan-500 to-yellow-500 rounded-full opacity-70"></div>
            <p class="text-center text-sm text-gray-400 mt-2">Pantalla</p>
          </div>

          <div class="max-w-4xl mx-auto">
            <p class="text-center text-sm font-semibold mb-6">Sala Normal</p>
            
            <div class="flex justify-center gap-8">
              <div class="space-y-3">
                <div v-for="row in seatRows" :key="row.label" class="flex items-center gap-2">
                  <span class="text-xs text-gray-400 w-6 text-right">{{ row.label }}</span>
                  <div class="flex gap-2">
                    <button
                      v-for="seat in row.seats"
                      :key="seat.id"
                      @click="toggleSeat(seat)"
                      :disabled="seat.status === 'reserved' || seat.status === 'distance'"
                      :class="getSeatClass(seat)"
                      class="w-8 h-8 rounded text-xs font-medium transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {{ seat.status === 'distance' ? '' : seat.number }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="space-y-3 ml-8">
                <div v-for="row in rightSeatRows" :key="row.label" class="flex items-center gap-2">
                  <div class="flex gap-2">
                    <button
                      v-for="seat in row.seats"
                      :key="seat.id"
                      @click="toggleSeat(seat)"
                      :disabled="seat.status === 'reserved' || seat.status === 'distance'"
                      :class="getSeatClass(seat)"
                      class="w-8 h-8 rounded text-xs font-medium transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {{ seat.status === 'distance' ? '' : seat.number }}
                    </button>
                  </div>
                  <span class="text-xs text-gray-400 w-6">{{ row.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="confirmReservation"
          :disabled="selectedSeats.length === 0"
          class="bg-[#C1272D] hover:bg-[#8B1F23] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-12 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          Continuar con la reserva
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const maxSeats = 1

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

const generateSeats = (startRow: string, endRow: string, columns: number, vipRows: string[] = []): any[] => {
  const rows = []
  const startChar = startRow.charCodeAt(0)
  const endChar = endRow.charCodeAt(0)
  
  for (let i = startChar; i <= endChar; i++) {
    const rowLabel = String.fromCharCode(i)
    const seats: Seat[] = []
    const isVipRow = vipRows.includes(rowLabel)
    
    for (let j = 1; j <= columns; j++) {
      const seatNumber = j.toString().padStart(2, '0')
      const isReserved = Math.random() > 0.7
      
      seats.push({
        id: `${rowLabel}${seatNumber}`,
        number: seatNumber,
        row: rowLabel,
        status: isReserved ? 'reserved' : isVipRow ? 'vip' : 'available'
      })
    }
    
    rows.push({ label: rowLabel, seats })
  }
  
  return rows
}

const seatRows = ref(generateSeats('A', 'J', 20, ['A']))
const rightSeatRows = ref(generateSeats('A', 'J', 5, ['A']))

const getSeatClass = (seat: Seat) => {
  if (seat.status === 'distance') {
    return 'bg-transparent border-2 border-gray-700'
  }
  if (selectedSeats.value.some(s => s.id === seat.id)) {
    return 'bg-cyan-500 text-white'
  }
  if (seat.status === 'reserved') {
    return 'bg-gray-600 text-gray-800'
  }
  if (seat.status === 'vip') {
    return 'bg-[#C1272D] text-white hover:bg-[#8B1F23]'
  }
  return 'bg-gray-500 text-white hover:bg-gray-400'
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
  alert(`Has seleccionado: ${selectedSeats.value.map(s => s.id).join(', ')}`)
  router.push('/')
}
</script>

<style scoped>
</style>
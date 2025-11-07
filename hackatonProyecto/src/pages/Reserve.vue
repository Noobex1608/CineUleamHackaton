<template>
  <div class="min-h-screen bg-white py-8 px-4">
    <!-- Toast Notification -->
    <Toast
      :show="showToast"
      :message="toastMessage"
      :title="toastTitle"
      :type="toastType"
      @close="showToast = false"
    />
    
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button @click="goBack" class="text-gray-800 hover:text-[#C1272D] transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-gray-800">Selecciona tus asientos</h1>
      </div>

      <!-- Información de la película -->
      <div v-if="movie" class="bg-gray-50 rounded-lg p-4 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ movie.nombre }}</h2>
        <p class="text-gray-600 text-sm">{{ new Date(movie.fecha_hora_proyeccion).toLocaleString('es-ES') }}</p>
      </div>
      
      <!-- Mensaje de ya tiene reserva -->
      <div v-if="userHasReservation && !loading" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <div>
            <p class="font-semibold text-green-800">✅ Ya tienes una reserva para esta película</p>
            <p class="text-sm text-green-700 mt-1">Tu asiento reservado está marcado en verde. Solo puedes reservar un asiento por película.</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-[#C1272D]"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-600">{{ error }}</p>
        <button @click="() => loadSeats()" class="mt-2 text-sm text-red-700 hover:text-red-800 underline">
          Intentar de nuevo
        </button>
      </div>

      <!-- Seats Content -->
      <div v-else>
        <!-- Progress bars -->
        <div class="flex gap-4 mb-8">
          <div class="flex-1 bg-[#C1272D] h-2 rounded"></div>
          <div class="flex-1 bg-gray-300 h-2 rounded"></div>
        </div>

        <!-- Seat selection area -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <!-- Counter and Legend -->
          <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div class="text-lg font-semibold text-gray-800">
              <span class="text-[#C1272D]">{{ selectedSeats.length }}</span> / {{ maxSeats }}
            </div>
            <div class="flex items-center gap-6 text-sm flex-wrap">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-[#C1272D] rounded"></div>
                <span class="text-gray-700">Reservado</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-gray-500 rounded"></div>
                <span class="text-gray-700">Disponible</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-cyan-500 rounded"></div>
                <span class="text-gray-700">Seleccionado</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-green-600 rounded"></div>
                <span class="text-gray-700">Mi Reserva</span>
              </div>
            </div>
          </div>

          <!-- Screen -->
          <div class="mb-8">
            <div class="w-full max-w-3xl mx-auto mb-12">
              <svg viewBox="0 0 800 60" class="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#C1272D;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#888888;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#C1272D;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path d="M 50 40 Q 400 10, 750 40" stroke="url(#screenGradient)" stroke-width="3" fill="none"/>
              </svg>
              <p class="text-center text-sm text-gray-500 mt-2">Pantalla</p>
            </div>

            <!-- Seats Grid -->
            <div class="max-w-4xl mx-auto">
              <div class="flex justify-center gap-8">
                <!-- Left Section -->
                <div class="space-y-3">
                  <div v-for="row in seatRows" :key="row.label" class="flex items-center gap-2">
                    <span class="text-xs text-gray-500 w-6 text-right font-medium">{{ row.label }}</span>
                    <div class="flex gap-2">
                      <button
                        v-for="seat in row.seats"
                        :key="seat.id"
                        @click="toggleSeat(seat)"
                        :disabled="seat.status === 'reserved' || seat.status === 'my-reservation'"
                        :class="getSeatClass(seat)"
                        class="w-8 h-8 rounded text-xs font-medium transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {{ seat.number }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Right Section -->
                <div v-if="rightSeatRows.length > 0" class="space-y-3 ml-8">
                  <div v-for="row in rightSeatRows" :key="row.label" class="flex items-center gap-2">
                    <div class="flex gap-2">
                      <button
                        v-for="seat in row.seats"
                        :key="seat.id"
                        @click="toggleSeat(seat)"
                        :disabled="seat.status === 'reserved' || seat.status === 'my-reservation'"
                        :class="getSeatClass(seat)"
                        class="w-8 h-8 rounded text-xs font-medium transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {{ seat.number }}
                      </button>
                    </div>
                    <span class="text-xs text-gray-500 w-6 font-medium">{{ row.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Confirm Button -->
        <div class="flex justify-center">
          <button
            @click="confirmReservation"
            :disabled="selectedSeats.length === 0 || loading"
            class="bg-[#C1272D] hover:bg-[#8B1F23] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-12 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {{ loading ? 'Procesando...' : 'Continuar con la reserva' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Ticket Modal -->
    <TicketModal 
      :show="showTicketModal" 
      :ticketData="ticketData"
      @close="handleCloseTicket"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TicketModal from '../components/TicketModal.vue'
import Toast from '../components/Toast.vue'
import { useAuth } from '../composables/useAuth'
import { useReservations } from '../composables/useReservations'
import { supabase } from '../lib/supabase'

const router = useRouter()
const route = useRoute()
const { currentUser } = useAuth()
const { checkExistingReservation, getSeatId, checkSeatReservation, createReservation } = useReservations()
const maxSeats = 1

// Intervalo para recarga automática
let reloadInterval: number | null = null
let realtimeChannel: any = null

interface Seat {
  id: string
  number: number
  row: string
  status: 'available' | 'reserved' | 'selected' | 'my-reservation'
  reservedBy?: string // UUID del usuario que reservó
}

interface SeatRow {
  label: string
  seats: Seat[]
}

interface TicketData {
  reservationId: string
  movieName: string
  movieLanguage: string
  dateTime: string
  salaName: string
  seatRow: string
  seatNumber: number
  userName: string
  userEmail: string
}

const selectedSeats = ref<Seat[]>([])
const seatRows = ref<SeatRow[]>([])
const rightSeatRows = ref<SeatRow[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const showTicketModal = ref(false)
const userHasReservation = ref(false)

// Toast notification
const showToast = ref(false)
const toastMessage = ref('')
const toastTitle = ref('')
const toastType = ref<'success' | 'error' | 'warning' | 'info'>('info')

const ticketData = ref<TicketData>({
  reservationId: '',
  movieName: '',
  movieLanguage: '',
  dateTime: '',
  salaName: '',
  seatRow: '',
  seatNumber: 0,
  userName: '',
  userEmail: ''
})

// Obtener los datos de la película de los parámetros de la ruta
const movie = computed(() => {
  const movieData = route.params.movie;
  if (typeof movieData === "string") {
    return JSON.parse(decodeURIComponent(movieData));
  }
  return movieData;
})

const goBack = () => {
  router.back()
}

// Función para mostrar notificaciones toast
const displayToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  toastTitle.value = title
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}

// Cargar asientos dinámicamente basándose en la capacidad de la sala
const loadSeats = async (showLoading = true) => {
  try {
    if (showLoading) {
      loading.value = true
    }
    error.value = null

    // Debug logs (comentados para producción)
    // console.log('🎬 Datos de la película:', movie.value)
    // console.log('🏢 Sala ID:', movie.value.sala_id)

    // 1. Obtener información de la sala
    const { data: salaData, error: salaError } = await supabase
      .from('sala')
      .select('id, capacidad')
      .eq('id', movie.value.sala_id)
      .single()

    // console.log('🏢 Datos de la sala:', salaData)
    // console.log('❌ Error de sala:', salaError)

    if (salaError || !salaData) {
      error.value = `La sala con ID ${movie.value.sala_id} no existe en la base de datos. Por favor, verifica que la película esté asociada a una sala válida.`
      console.error('❌ Sala no encontrada. IDs de salas disponibles: Consulta tu base de datos.')
      throw new Error('Sala no encontrada')
    }

    const capacidad = salaData.capacidad
    // console.log('📊 Capacidad:', capacidad)

    // 2. Calcular número de filas y columnas basado en la capacidad
    // Ratio aproximado de 1:2 (filas:columnas) para una sala de cine típica
    const numFilas = Math.ceil(Math.sqrt(capacidad / 2))
    const numColumnas = Math.ceil(capacidad / numFilas)
    // console.log(`📐 Matriz: ${numFilas} filas x ${numColumnas} columnas`)

    // 3. Obtener asientos ya reservados para esta película
    // JOIN: reserva -> asiento para obtener fila y numero
    const { data: reservasData, error: reservasError } = await supabase
      .from('reserva')
      .select(`
        id,
        usuario_id,
        asiento:asiento_id (
          id,
          fila,
          numero,
          sala_id
        )
      `)
      .eq('pelicula_id', movie.value.id)

    if (reservasError) throw reservasError

    // Debug: Ver datos crudos de Supabase (comentado para producción)
    // console.log('📦 Datos crudos de reservas:', JSON.stringify(reservasData, null, 2))

    // Crear un Map con la clave "fila-numero" de los asientos reservados
    // y guardar el ID del asiento y el usuario que lo reservó
    const reservedSeatsMap = new Map<string, { id: string, userId: string }>()
    
    if (reservasData) {
      reservasData.forEach((reserva: any) => {
        if (reserva.asiento) {
          const key = `${reserva.asiento.fila}-${reserva.asiento.numero}`
          reservedSeatsMap.set(key, { 
            id: reserva.asiento.id,
            userId: reserva.usuario_id
          })
          
          // Verificar si el usuario actual ya tiene una reserva
          if (reserva.usuario_id === currentUser.value?.id) {
            userHasReservation.value = true
          }
        }
      })
    }
    
    // Debug logs (comentados para producción)
    // console.log('🔒 Asientos reservados (fila-numero):', Array.from(reservedSeatsMap.keys()))
    // console.log('👤 Usuario actual ID:', currentUser.value?.id)
    
    // Debug: mostrar detalles de cada reserva (comentado para producción)
    // reservedSeatsMap.forEach((reservation, key) => {
    //   console.log(`🪑 Asiento ${key}: Usuario ${reservation.userId}, ¿Es mío? ${reservation.userId === currentUser.value?.id}`)
    // })

    // 4. Generar asientos dinámicamente
    const rows: SeatRow[] = []
    let asientoCounter = 0

    for (let i = 0; i < numFilas && asientoCounter < capacidad; i++) {
      const fila = String.fromCharCode(65 + i) // A, B, C, D...
      const seats: Seat[] = []

      for (let j = 1; j <= numColumnas && asientoCounter < capacidad; j++) {
        const seatKey = `${fila}-${j}`
        const reservation = reservedSeatsMap.get(seatKey)
        const isReserved = !!reservation
        const isMyReservation = isReserved && reservation.userId === currentUser.value?.id
        
        seats.push({
          id: reservation?.id || `${salaData.id}-${fila}-${j}`, // Usar ID real si existe, sino generar uno
          number: j,
          row: fila,
          status: isMyReservation ? 'my-reservation' : (isReserved ? 'reserved' : 'available'),
          reservedBy: reservation?.userId
        })
        asientoCounter++
      }

      rows.push({ label: fila, seats })
    }

    // console.log('💺 Filas generadas:', rows.length)
    // console.log('💺 Primera fila:', rows[0])

    // 5. Dividir en dos secciones: 80% izquierda, 20% derecha
    const leftRows: SeatRow[] = []
    const rightRows: SeatRow[] = []

    rows.forEach(row => {
      const splitPoint = Math.ceil(row.seats.length * 0.8)
      const leftSeats = row.seats.slice(0, splitPoint)
      const rightSeats = row.seats.slice(splitPoint)

      leftRows.push({ label: row.label, seats: leftSeats })
      
      if (rightSeats.length > 0) {
        rightRows.push({ label: row.label, seats: rightSeats })
      }
    })

    seatRows.value = leftRows
    rightSeatRows.value = rightRows

    // console.log('✅ Asientos cargados - Izquierda:', seatRows.value.length, 'Derecha:', rightSeatRows.value.length)

  } catch (err: any) {
    console.error('❌ Error al cargar asientos:', err)
    error.value = 'No se pudieron cargar los asientos. Por favor, intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

const getSeatClass = (seat: Seat) => {
  if (selectedSeats.value.some(s => s.id === seat.id)) {
    return 'bg-cyan-500 text-white'
  }
  if (seat.status === 'my-reservation') {
    return 'bg-green-600 text-white cursor-default'
  }
  if (seat.status === 'reserved') {
    return 'bg-[#C1272D] text-white cursor-not-allowed'
  }
  return 'bg-gray-500 text-white hover:bg-gray-400'
}

const toggleSeat = (seat: Seat) => {
  if (seat.status === 'reserved' || seat.status === 'my-reservation') return
  
  // Si el usuario ya tiene una reserva, no puede seleccionar otro asiento
  if (userHasReservation.value) {
    displayToast('Reserva Existente', 'Ya tienes una reserva para esta película. Solo puedes reservar un asiento por película.', 'warning')
    return
  }
  
  const index = selectedSeats.value.findIndex(s => s.id === seat.id)
  
  if (index > -1) {
    selectedSeats.value.splice(index, 1)
  } else {
    if (selectedSeats.value.length < maxSeats) {
      selectedSeats.value.push(seat)
    }
  }
}

const confirmReservation = async () => {
  if (selectedSeats.value.length === 0) return
  
  const selectedSeat = selectedSeats.value[0]
  if (!selectedSeat) return

  try {
    loading.value = true

    // 0. Verificar si el usuario ya tiene una reserva para esta película
    const reservaUsuario = await checkExistingReservation(currentUser.value?.id || '', movie.value.id)

    if (reservaUsuario) {
      displayToast('Reserva Existente', 'Ya tienes una reserva para esta película. Solo puedes reservar un asiento por película.', 'warning')
      return
    }

    // 1. Verificar si el asiento existe en la tabla asiento
    let asientoExistente = await getSeatId(movie.value.sala_id, selectedSeat.row, selectedSeat.number)
    
    let asientoId: string

    // 2. Si el asiento no existe, crearlo
    if (!asientoExistente) {
      const { data: nuevoAsiento, error: asientoInsertError } = await supabase
        .from('asiento')
        .insert({
          sala_id: movie.value.sala_id,
          fila: selectedSeat.row,
          numero: selectedSeat.number
        })
        .select('id')
        .single()

      if (asientoInsertError) throw asientoInsertError
      if (!nuevoAsiento) throw new Error('No se pudo crear el asiento')

      asientoId = nuevoAsiento.id
    } else {
      asientoId = asientoExistente.id
    }

    // 3. Verificar si el asiento ya está reservado para esta película
    const reservaExistente = await checkSeatReservation(movie.value.id, asientoId)

    if (reservaExistente) {
      displayToast('Asiento Ocupado', 'Este asiento ya ha sido reservado por otro usuario. Por favor, selecciona otro.', 'warning')
      await loadSeats(false) // Recargar asientos sin loading
      return
    }

    // 4. Crear la reserva en la base de datos
    const nuevaReserva = await createReservation({
      usuario_id: currentUser.value?.id || '',
      pelicula_id: movie.value.id,
      asiento_id: asientoId,
      fecha_reserva: new Date().toISOString()
    })
    
    if (!nuevaReserva) throw new Error('No se pudo crear la reserva')

    // 5. Obtener el nombre de la sala
    const { data: salaData } = await supabase
      .from('sala')
      .select('nombre')
      .eq('id', movie.value.sala_id)
      .single()

    // 6. Preparar datos del ticket
    ticketData.value = {
      reservationId: nuevaReserva.id,
      movieName: movie.value.nombre,
      movieLanguage: movie.value.idioma || 'N/A',
      dateTime: movie.value.fecha_hora_proyeccion,
      salaName: salaData?.nombre || 'Sala 1',
      seatRow: selectedSeat.row,
      seatNumber: selectedSeat.number,
      userName: currentUser.value?.nombre || 'Usuario',
      userEmail: currentUser.value?.correo_institucional || ''
    }

    // 7. Limpiar selección y recargar asientos para mostrar el asiento como ocupado
    selectedSeats.value = []
    
    // 8. Mostrar el modal del ticket
    showTicketModal.value = true
    
    // 9. Recargar asientos en segundo plano para reflejar la nueva reserva
    // (sin bloquear el modal del ticket y sin mostrar loading)
    loadSeats(false).catch(err => console.error('Error al recargar asientos:', err))

  } catch (err: any) {
    console.error('Error al crear reserva:', err)
    
    // Mensajes de error más específicos
    if (err.code === '23505') {
      displayToast('Reserva Existente', 'Ya tienes una reserva para esta película. Solo puedes reservar un asiento por película.', 'warning')
    } else if (err.message) {
      displayToast('Error', err.message, 'error')
    } else {
      displayToast('Error', 'No se pudo crear la reserva. Por favor, intenta de nuevo.', 'error')
    }
  } finally {
    loading.value = false
  }
}

const handleCloseTicket = () => {
  showTicketModal.value = false
  // Actualizar el estado para mostrar la reserva del usuario
  userHasReservation.value = true
  // Recargar asientos sin mostrar loading (actualización silenciosa)
  loadSeats(false)
}

// Cargar asientos al montar el componente
onMounted(() => {
  loadSeats() // Primera carga con loading
  
  // Recargar asientos cada 5 segundos para mantener sincronizados (sin loading)
  reloadInterval = window.setInterval(() => {
    loadSeats(false)
  }, 5000) // 5 segundos
  
  // Suscribirse a cambios en tiempo real en la tabla reserva
  realtimeChannel = supabase
    .channel('reservas-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'reserva',
        filter: `pelicula_id=eq.${movie.value.id}`
      },
      () => {
        // Recargar asientos cuando hay cambios (sin loading)
        loadSeats(false)
      }
    )
    .subscribe()
})

// Limpiar el intervalo y suscripción al desmontar
onUnmounted(() => {
  if (reloadInterval) {
    clearInterval(reloadInterval)
  }
  if (realtimeChannel) {
    supabase.removeChannel(realtimeChannel)
  }
})
</script>

<style scoped>
</style>
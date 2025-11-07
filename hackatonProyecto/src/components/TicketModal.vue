<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all"
      >
        <!-- Header -->
        <div
          class="bg-linear-to-r from-[#C1272D] to-[#8B1F23] p-6 text-white relative"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div class="flex items-center gap-3 mb-2">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            <h2 class="text-2xl font-bold">¡Reserva Confirmada!</h2>
          </div>
          <p class="text-sm text-white/90">
            Tu entrada ha sido generada exitosamente
          </p>
        </div>

        <!-- Ticket Content -->
        <div class="p-6 space-y-4">
          <!-- Movie Info -->
          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-xl font-bold text-gray-800 mb-1">
              {{ ticketData.movieName }}
            </h3>
            <p class="text-sm text-gray-600">{{ ticketData.movieLanguage }}</p>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Fecha y Hora -->
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-xs text-gray-500 mb-1">Fecha</p>
              <p class="font-semibold text-gray-800">
                {{ formatDate(ticketData.dateTime) }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-xs text-gray-500 mb-1">Hora</p>
              <p class="font-semibold text-gray-800">
                {{ formatTime(ticketData.dateTime) }}
              </p>
            </div>

            <!-- Sala -->
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-xs text-gray-500 mb-1">Sala</p>
              <p class="font-semibold text-gray-800">
                {{ ticketData.salaName }}
              </p>
            </div>

            <!-- Asiento -->
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-xs text-gray-500 mb-1">Asiento</p>
              <p class="font-semibold text-gray-800 text-lg">
                {{ ticketData.seatRow }}{{ ticketData.seatNumber }}
              </p>
            </div>
          </div>

          <!-- Usuario -->
          <div class="bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-3">
            <p class="text-xs text-gray-500 mb-1">Reservado por</p>
            <p class="font-semibold text-gray-800">{{ ticketData.userName }}</p>
            <p class="text-sm text-gray-600">{{ ticketData.userEmail }}</p>
          </div>

          <!-- QR Code -->
          <div class="flex justify-center py-4">
            <div
              class="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm"
            >
              <canvas ref="qrCanvas" class="w-48 h-48"></canvas>
            </div>
          </div>

          <!-- Reservation ID -->
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-1">ID de Reserva</p>
            <p
              class="font-mono text-sm text-gray-800 bg-gray-100 py-2 px-4 rounded-lg inline-block"
            >
              {{ ticketData.reservationId }}
            </p>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="bg-gray-50 p-4 space-y-2">
          <button
            @click="downloadTicket"
            class="w-full bg-[#C1272D] hover:bg-[#8B1F23] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Descargar Ticket
          </button>
          <button
            @click="sendEmail"
            :disabled="emailSending"
            class="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-lg border-2 border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {{ emailSending ? "Enviando..." : "Enviar a mi correo" }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import QRCode from "qrcode";
import { nextTick, onMounted, ref, watch } from "vue";

interface TicketData {
  reservationId: string;
  movieName: string;
  movieLanguage: string;
  dateTime: string;
  salaName: string;
  seatRow: string;
  seatNumber: number;
  userName: string;
  userEmail: string;
}

interface Props {
  show: boolean;
  ticketData: TicketData;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const qrCanvas = ref<HTMLCanvasElement | null>(null);
const emailSending = ref(false);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const generateQR = async () => {
  if (!qrCanvas.value) return;

  const qrData = JSON.stringify({
    reservationId: props.ticketData.reservationId,
    movieName: props.ticketData.movieName,
    dateTime: props.ticketData.dateTime,
    seat: `${props.ticketData.seatRow}${props.ticketData.seatNumber}`,
    sala: props.ticketData.salaName,
    userEmail: props.ticketData.userEmail,
  });

  try {
    await QRCode.toCanvas(qrCanvas.value, qrData, {
      width: 192,
      margin: 2,
      color: {
        dark: "#1F2937",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    console.error("Error generando QR:", error);
  }
};

const closeModal = () => {
  emit("close");
};

const downloadTicket = () => {
  // Crear una imagen del ticket
  const ticketElement = document.querySelector(
    ".bg-white.rounded-2xl"
  ) as HTMLElement;
  if (!ticketElement) return;

  // Por ahora, descargar solo el QR
  if (qrCanvas.value) {
    const dataUrl = qrCanvas.value.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `ticket-${props.ticketData.reservationId}.png`;
    link.href = dataUrl;
    link.click();
  }
};

const sendEmail = async () => {
  emailSending.value = true;

  try {
    // Aquí se integraría con tu backend para enviar el email
    // Por ahora simulamos el envío
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("✅ Ticket enviado a tu correo electrónico!");
  } catch (error) {
    console.error("Error enviando email:", error);
    alert("❌ Error al enviar el ticket. Por favor, intenta de nuevo.");
  } finally {
    emailSending.value = false;
  }
};

watch(
  () => props.show,
  async (newValue) => {
    if (newValue) {
      await nextTick();
      generateQR();
    }
  }
);

onMounted(() => {
  if (props.show) {
    generateQR();
  }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9) translateY(20px);
}
</style>

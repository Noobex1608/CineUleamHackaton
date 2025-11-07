<template>
  <div class="fixed bottom-0 right-0 z-50">
    <transition name="chat">
      <div
        v-if="isOpen"
        class="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col border border-gray-200 mb-4 mr-4"
      >
        <div class="bg-gradient-to-r from-[#C1272D] to-[#8B1F23] p-4 rounded-t-2xl flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-[#C1272D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-bold text-lg">CineIA Cultural</h3>
              <p class="text-white/80 text-xs">Explorando culturas a través del cine</p>
            </div>
          </div>
          <button
            @click="isOpen = false"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-[80%] rounded-2xl p-3 shadow-sm',
                message.role === 'user'
                  ? 'bg-[#C1272D] text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              ]"
            >
              <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
              <span class="text-xs opacity-70 mt-1 block">{{ formatTime(message.timestamp) }}</span>
            </div>
          </div>

          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-200">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-[#C1272D] rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-[#C1272D] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-[#C1272D] rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div class="flex gap-2 mb-2">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="sendMessage(suggestion)"
              class="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              {{ suggestion }}
            </button>
          </div>
          <form @submit.prevent="handleSubmit" class="flex gap-2">
            <input
              v-model="userInput"
              type="text"
              placeholder="Pregunta sobre culturas o películas..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C1272D] focus:border-transparent"
              :disabled="isTyping"
            />
            <button
              type="submit"
              :disabled="!userInput.trim() || isTyping"
              class="bg-[#C1272D] hover:bg-[#8B1F23] text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>

    <transition name="logo">
      <button
        v-if="!isOpen"
        @click="isOpen = true"
        class="absolute bottom-0 right-0 w-40 h-40 transition-all duration-300 hover:scale-105"
      >
        <img 
          src="../assets/Gentleman.png" 
          alt="Chatbot Cultural" 
          class="w-full h-full object-contain drop-shadow-2xl"
        />
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import axios from 'axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const isOpen = ref(false)
const userInput = ref('')
const isTyping = ref(false)
const messages = ref<Message[]>([])
const messagesContainer = ref<HTMLElement | null>(null)

const PERPLEXITY_API_KEY = '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'
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions'

const suggestions = ref([
  '¿Qué temas culturales?',
  'Películas similares',
  'Contexto histórico'
])

const systemPrompt = `Eres un asistente cultural cinematográfico experto llamado "CineIA Cultural". Tu misión es servir como puente cultural entre diferentes cinematografías del mundo.

Tus capacidades incluyen:
- Explicar referencias culturales, históricas y sociales en películas
- Establecer conexiones transculturales entre películas de diferentes países
- Comparar cómo diferentes culturas abordan temas universales (honor, familia, libertad, identidad, etc.)
- Sugerir películas relacionadas de diversas cinematografías
- Analizar contextos históricos y sociales de las películas
- Revelar patrones y similitudes entre diferentes culturas a través del cine

Cuando respondas:
- Sé conciso pero informativo
- Usa emojis relevantes (🎭, 🌍, 📽️, 💡, 🎬)
- Proporciona ejemplos específicos de películas
- Establece conexiones entre culturas
- Fomenta el estudio comparativo de culturas

Responde en español de manera educativa y accesible.`

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

const callPerplexityAPI = async (userMessage: string): Promise<string> => {
  try {
    // Construir el historial de mensajes para contexto
    const conversationHistory = messages.value
      .slice(-6) // Últimos 6 mensajes para mantener contexto
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }))

    const response = await axios.post(
      PERPLEXITY_API_URL,
      {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...conversationHistory,
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error al llamar a Perplexity API:', error)
    return '❌ Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.'
  }
}

const sendMessage = async (content: string) => {
  if (!content.trim()) return

  messages.value.push({
    role: 'user',
    content: content,
    timestamp: new Date()
  })

  userInput.value = ''
  isTyping.value = true
  scrollToBottom()

  // Llamar a la API de Perplexity
  const response = await callPerplexityAPI(content)

  messages.value.push({
    role: 'assistant',
    content: response,
    timestamp: new Date()
  })

  isTyping.value = false
  scrollToBottom()
}

const handleSubmit = () => {
  sendMessage(userInput.value)
}

onMounted(() => {
  messages.value.push({
    role: 'assistant',
    content: '¡Hola! 👋 Soy tu asistente cultural cinematográfico. Puedo ayudarte a entender referencias culturales, comparar temas entre diferentes cinematografías y explorar conexiones transculturales. ¿Qué te gustaría descubrir hoy?',
    timestamp: new Date()
  })
})
</script>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: all 0.3s ease;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.logo-enter-active,
.logo-leave-active {
  transition: all 0.3s ease;
}

.logo-enter-from,
.logo-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #C1272D;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8B1F23;
}
</style>
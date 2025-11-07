<template>
  <footer 
    class="bg-[#2c3e50] text-gray-300 py-8 mt-auto" 
    role="contentinfo"
    aria-label="Información de la universidad"
  >
    <div class="container mx-auto px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo ULEAM -->
        <div class="flex items-center">
          <img 
            src="../assets/LOGO-ULEAM-VERTICAL.png" 
            alt="Logo Universidad Laica Eloy Alfaro de Manabí" 
            class="h-20 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>

        <!-- Información de Copyright -->
        <div class="text-center md:text-right text-sm leading-relaxed">
          <p class="mb-1">
            <strong class="font-semibold">ULEAM</strong> © Copyright 2020, Todos los derechos reservados - Universidad Laica Eloy Alfaro de Manabí
          </p>
          <address class="not-italic">
            <p class="mb-1">
              Dirección: <span class="font-normal">Av. Circunvalación - Vía a San Mateo</span>
            </p>
            <p>
              <span class="font-normal">Manta - Manabí - Ecuador</span>
            </p>
          </address>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No se requiere lógica adicional para el footer estático
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>

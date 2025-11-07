import * as domtoimage from "dom-to-image-more";

export const useImageCapture = () => {
  // Configuración optimizada para evitar errores CORS
  const getOptimizedOptions = () => ({
    quality: 1.0,
    bgcolor: "#ffffff",
    useCORS: true,
    allowTaint: true,
    scale: 1,
    style: {
      "font-family":
        'Arial, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      transform: "scale(1)",
      "transform-origin": "top left",
    },
    filter: (node: any) => {
      // Filtrar nodos problemáticos
      if (!node || !node.tagName) return true;

      const tagName = node.tagName.toUpperCase();

      // Filtrar links de Google Fonts y otros recursos externos
      if (tagName === "LINK") {
        const href = node.getAttribute("href") || "";
        if (
          href.includes("fonts.googleapis.com") ||
          href.includes("fonts.gstatic.com") ||
          href.includes("google.com")
        ) {
          return false;
        }
      }

      // Filtrar scripts externos
      if (tagName === "SCRIPT") {
        const src = node.getAttribute("src") || "";
        if (
          src.includes("google") ||
          src.includes("gtag") ||
          src.includes("analytics")
        ) {
          return false;
        }
      }

      return true;
    },
    imagePlaceholder:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  });

  // Función para capturar imagen con múltiples intentos
  const captureElementAsImage = async (
    element: HTMLElement,
    retries = 2
  ): Promise<string> => {
    let lastError: any;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`📷 Intento ${attempt} de captura de imagen...`);

        // Pequeña pausa para asegurar que el DOM esté listo
        await new Promise((resolve) => setTimeout(resolve, 100));

        const dataUrl = await domtoimage.toPng(element, getOptimizedOptions());

        console.log("✅ Imagen capturada exitosamente");
        return dataUrl;
      } catch (error) {
        console.warn(`⚠️ Intento ${attempt} falló:`, error);
        lastError = error;

        if (attempt < retries) {
          // Esperar un poco antes del siguiente intento
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    // Si todos los intentos fallaron, intentar con configuración más básica
    try {
      console.log("🔄 Intentando captura con configuración básica...");

      const basicOptions = {
        quality: 0.8,
        bgcolor: "#ffffff",
        style: {
          "font-family": "Arial, sans-serif",
        },
      };

      return await domtoimage.toPng(element, basicOptions);
    } catch (finalError) {
      console.error("❌ Error final en captura de imagen:", finalError);
      throw new Error(
        `No se pudo capturar la imagen después de ${retries} intentos. Error: ${
          lastError?.message || "Desconocido"
        }`
      );
    }
  };

  // Función específica para capturar tickets
  const captureTicketImage = async (
    ticketElement: HTMLElement
  ): Promise<string> => {
    try {
      // Asegurar que las fuentes estén cargadas
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      return await captureElementAsImage(ticketElement, 3);
    } catch (error) {
      console.error("❌ Error capturando ticket:", error);
      throw error;
    }
  };

  return {
    captureElementAsImage,
    captureTicketImage,
  };
};

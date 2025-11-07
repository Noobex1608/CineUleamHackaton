import { supabase } from "../lib/supabase";

export const useReservations = () => {
  // Función para verificar reserva existente con manejo específico de errores
  const checkExistingReservation = async (
    userId: string,
    peliculaId: string
  ) => {
    try {
      console.log("🔍 Verificando reserva existente:", { userId, peliculaId });

      const { data, error, status } = await supabase
        .from("reserva")
        .select("id")
        .eq("usuario_id", userId)
        .eq("pelicula_id", peliculaId)
        .limit(1);

      if (error) {
        console.error("❌ Error en checkExistingReservation:", error);
        if (status === 406) {
          console.warn("⚠️ Error 406: Problema de configuración API");
          return null; // Retorna null en lugar de fallar
        }
        throw error;
      }

      console.log("✅ Resultado checkExistingReservation:", data);
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("❌ Error verificando reserva:", error);
      // En lugar de fallar completamente, retornamos null
      return null;
    }
  };

  // Función para obtener asiento con manejo específico de errores
  const getSeatId = async (salaId: string, fila: string, numero: number) => {
    try {
      console.log("🪑 Obteniendo ID de asiento:", { salaId, fila, numero });

      const { data, error, status } = await supabase
        .from("asiento")
        .select("id")
        .eq("sala_id", salaId)
        .eq("fila", fila)
        .eq("numero", numero)
        .limit(1);

      if (error) {
        console.error("❌ Error en getSeatId:", error);
        if (status === 406) {
          console.warn("⚠️ Error 406: Problema de configuración API");
          return null;
        }
        throw error;
      }

      console.log("✅ Resultado getSeatId:", data);
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("❌ Error obteniendo asiento:", error);
      return null;
    }
  };

  // Función para verificar si un asiento está reservado
  const checkSeatReservation = async (
    peliculaId: string,
    asientoId: string
  ) => {
    try {
      console.log("🎟️ Verificando reserva de asiento:", {
        peliculaId,
        asientoId,
      });

      const { data, error, status } = await supabase
        .from("reserva")
        .select("id")
        .eq("pelicula_id", peliculaId)
        .eq("asiento_id", asientoId)
        .limit(1);

      if (error) {
        console.error("❌ Error en checkSeatReservation:", error);
        if (status === 406) {
          console.warn("⚠️ Error 406: Problema de configuración API");
          return null;
        }
        throw error;
      }

      console.log("✅ Resultado checkSeatReservation:", data);
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("❌ Error verificando reserva de asiento:", error);
      return null;
    }
  };

  // Función para crear nueva reserva
  const createReservation = async (reservaData: {
    usuario_id: string;
    pelicula_id: string;
    asiento_id: string;
    fecha_reserva: string;
  }) => {
    try {
      console.log("📝 Creando nueva reserva:", reservaData);

      const { data, error } = await supabase
        .from("reserva")
        .insert([reservaData])
        .select();

      if (error) {
        console.error("❌ Error creando reserva:", error);
        throw error;
      }

      console.log("✅ Reserva creada exitosamente:", data);
      return data[0];
    } catch (error) {
      console.error("❌ Error en createReservation:", error);
      throw error;
    }
  };

  return {
    checkExistingReservation,
    getSeatId,
    checkSeatReservation,
    createReservation,
  };
};

import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import type { Usuario } from '../interfaces'

const currentUser = ref<Usuario | null>(null)
const isAuthenticated = computed(() => currentUser.value !== null)

export function useAuth() {
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      const { data: usuario, error: usuarioError } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (usuarioError) throw usuarioError

      currentUser.value = usuario
      localStorage.setItem('user', JSON.stringify(usuario))
    }

    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    currentUser.value = null
    localStorage.removeItem('user')
  }

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session?.user) {
      const { data: usuario } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (usuario) {
        currentUser.value = usuario
      }
    } else {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        currentUser.value = JSON.parse(savedUser)
      }
    }
  }

  const register = async (email: string, password: string, nombre: string, tipo: string = 'estudiante') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          tipo,
        }
      }
    })

    if (error) throw error

    if (data.user) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const { error: insertError } = await supabase
        .from('usuario')
        .upsert({
          id: data.user.id,
          nombre,
          correo_institucional: email,
          tipo,
        }, {
          onConflict: 'id'
        })

      if (insertError) {
        console.error('Error al insertar usuario:', insertError)
      }
    }

    return data
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    checkSession,
    register,
  }
}

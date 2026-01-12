/**
 * Utilitaire pour obfusquer les requêtes API et masquer les données sensibles
 */

// Mapping des endpoints réels vers des noms génériques pour masquer les vraies routes
const ENDPOINT_MAP: { [key: string]: string } = {
  login: 'auth',
  'users/sign-up': 'register',
  logout: 'session',
  changePassword: 'security',
  'job-offers': 'data',
  'job-skills': 'metadata',
  companies: 'entities',
  'candidate-profile': 'profile',
  'candidate-education': 'education',
  'candidate-experience': 'experience',
  'candidate-skill': 'skills',
}

// Clés sensibles à masquer dans les réponses
const SENSITIVE_KEYS = [
  'jwt',
  'token',
  'password',
  'email',
  'phone',
  'authorization',
  'Authorization',
]

/**
 * Obfusque un endpoint pour masquer la vraie route API
 */
export const obfuscateEndpoint = (endpoint: string): string => {
  if (import.meta.env.DEV) {
    return endpoint // En développement, garder les vrais noms
  }

  // Remplacer les endpoints par des noms génériques
  let obfuscated = endpoint
  for (const [real, generic] of Object.entries(ENDPOINT_MAP)) {
    if (obfuscated.includes(real)) {
      obfuscated = obfuscated.replace(real, generic)
      break
    }
  }

  return obfuscated
}

/**
 * Masque les données sensibles dans un objet
 */
export const maskSensitiveData = (data: any): any => {
  if (!data || typeof data !== 'object') {
    return data
  }

  if (Array.isArray(data)) {
    return data.map((item) => maskSensitiveData(item))
  }

  const masked: any = {}

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase()

    // Masquer les clés sensibles
    if (SENSITIVE_KEYS.some((sensitive) => lowerKey.includes(sensitive.toLowerCase()))) {
      masked[key] = '***MASKED***'
    } else if (typeof value === 'object' && value !== null) {
      // Récursion pour les objets imbriqués
      masked[key] = maskSensitiveData(value)
    } else {
      masked[key] = value
    }
  }

  return masked
}

/**
 * Génère un nom de requête générique pour masquer le vrai endpoint
 */
export const generateGenericRequestName = (method: string, endpoint: string): string => {
  const genericEndpoint = obfuscateEndpoint(endpoint)
  return `${method.toUpperCase()}_${genericEndpoint.replace(/\//g, '_')}_${Date.now()}`
}

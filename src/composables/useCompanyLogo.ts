import { ref, computed } from 'vue'

interface Company {
    id?: number
    name?: string
    webSiteUrl?: string
    logoUrl?: string
}

/**
 * Composable pour gérer les logos des compagnies avec fallback et optimisation
 */
export const useCompanyLogo = () => {
    // Cache des logos qui ont échoué pour éviter de les recharger
    const failedLogos = ref<Set<string>>(new Set())

    /**
     * Génère un logo SVG en base64 avec la première lettre du nom de l'entreprise
     */
    const generateSvgLogo = (name: string, backgroundColor = '#10b981', textColor = '#ffffff'): string => {
        const letter = name.charAt(0).toUpperCase()
        const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
        <rect width="128" height="128" fill="${backgroundColor}" rx="16"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              font-family="system-ui, -apple-system, sans-serif" 
              font-size="64" font-weight="600" fill="${textColor}">
          ${letter}
        </text>
      </svg>
    `
        return `data:image/svg+xml;base64,${btoa(svg)}`
    }

    /**
     * Obtient le logo de la compagnie avec fallback intelligent
     */
    const getCompanyLogo = (company: Company): string => {
        // 1. Si logoUrl existe, l'utiliser
        if (company.logoUrl && !failedLogos.value.has(company.logoUrl)) {
            return company.logoUrl
        }

        // 2. Générer directement le SVG fallback (pas d'appel externe)
        const companyName = company.name || `Company ${company.id || ''}`
        return generateSvgLogo(companyName)
    }

    /**
     * Gestionnaire d'erreur pour les images
     */
    const handleImageError = (event: Event, company: Company) => {
        const target = event.target as HTMLImageElement

        // Éviter les boucles infinies
        if (target.dataset.fallbackApplied === 'true') {
            return
        }

        // Marquer l'URL comme échouée
        if (target.src) {
            failedLogos.value.add(target.src)
        }

        // Appliquer le fallback SVG
        target.dataset.fallbackApplied = 'true'
        const companyName = company.name || `Company ${company.id || ''}`
        target.src = generateSvgLogo(companyName)
    }

    /**
     * Extrait le domaine d'une URL
     */
    const getDomainFromUrl = (url: string): string => {
        if (!url) return ''
        try {
            return new URL(url).hostname.replace('www.', '')
        } catch {
            return url
        }
    }

    /**
     * Obtient une couleur basée sur le nom de l'entreprise (pour cohérence visuelle)
     */
    const getColorFromName = (name: string): { bg: string; text: string } => {
        const colors = [
            { bg: '#10b981', text: '#ffffff' }, // emerald
            { bg: '#3b82f6', text: '#ffffff' }, // blue
            { bg: '#8b5cf6', text: '#ffffff' }, // violet
            { bg: '#f59e0b', text: '#ffffff' }, // amber
            { bg: '#ef4444', text: '#ffffff' }, // red
            { bg: '#06b6d4', text: '#ffffff' }, // cyan
            { bg: '#ec4899', text: '#ffffff' }, // pink
            { bg: '#14b8a6', text: '#ffffff' }, // teal
        ]

        // Utiliser le code du premier caractère pour choisir une couleur
        const index = name.charCodeAt(0) % colors.length
        return colors[index]
    }

    /**
     * Génère un logo SVG avec couleur basée sur le nom
     */
    const getColoredLogo = (company: Company): string => {
        const companyName = company.name || `Company ${company.id || ''}`
        const colors = getColorFromName(companyName)
        return generateSvgLogo(companyName, colors.bg, colors.text)
    }

    return {
        getCompanyLogo,
        handleImageError,
        getDomainFromUrl,
        getColoredLogo,
        generateSvgLogo,
    }
}

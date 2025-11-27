import { onMounted, onUnmounted, type Ref } from 'vue'

export interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}

/**
 * Composable pour gérer les animations d'apparition au scroll
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
    delay = 0
  } = options

  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const animationDelay = target.dataset.delay || delay.toString()

            setTimeout(() => {
              target.classList.add('animate-in')
              target.classList.remove('animate-out')
            }, parseInt(animationDelay))

            if (once) {
              observer?.unobserve(target)
            }
          } else if (!once) {
            entry.target.classList.add('animate-out')
            entry.target.classList.remove('animate-in')
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    // Observer tous les éléments avec la classe animate-on-scroll
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => {
      observer?.observe(el)
    })
  }

  const observeElement = (element: HTMLElement | Ref<HTMLElement | null>) => {
    if (!observer) return

    const el = element instanceof HTMLElement ? element : element.value
    if (el) {
      observer.observe(el)
    }
  }

  const unobserveElement = (element: HTMLElement | Ref<HTMLElement | null>) => {
    if (!observer) return

    const el = element instanceof HTMLElement ? element : element.value
    if (el) {
      observer.unobserve(el)
    }
  }

  onMounted(() => {
    // Délai pour s'assurer que le DOM est chargé
    setTimeout(() => {
      initObserver()
    }, 100)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    observeElement,
    unobserveElement
  }
}


import { useWindowSize } from './useWindowSize'

export function useResponsive() {
  const { width } = useWindowSize()
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  }
}

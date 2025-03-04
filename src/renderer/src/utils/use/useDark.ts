import { useConfigStore } from '@renderer/stores/config.ts'
import { storeToRefs } from 'pinia'

function setDark(event: MediaQueryList | MediaQueryListEvent): void {
  if (event.matches) {
    document.documentElement.setAttribute('theme-mode', 'dark')
  } else {
    document.documentElement.removeAttribute('theme-mode')
  }
}

export const useDark = (): void => {
  const configStore = useConfigStore()
  const { config } = storeToRefs(configStore)
  const theme = config.value.general.theme
  const match = window.matchMedia('(prefers-color-scheme: dark)')
  match.removeEventListener('change', setDark)

  if (theme === 'light') {
    document.documentElement.setAttribute('theme-mode', 'light')
  } else if (theme === 'dark') {
    document.documentElement.setAttribute('theme-mode', 'dark')
  } else {
    setDark(match)
    match.addEventListener('change', setDark)
  }
}

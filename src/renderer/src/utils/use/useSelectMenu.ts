import { type MenuProps } from 'tdesign-vue-next'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

export const useSelectMenu = (): [Ref<string, string>, MenuProps['onChange']] => {
  const router = useRouter()
  const selectedMenu = ref(router.currentRoute.value.path)

  const changeMenu: MenuProps['onChange'] = async (value) => {
    value = value.toString()

    if (value.includes('link')) {
      window.open(value.split('-')[1])
      return
    }

    const prev = router.currentRoute.value.path
    await router.push({ path: value })

    if (router.currentRoute.value.path === value) selectedMenu.value = value
    else selectedMenu.value = prev
  }

  return [selectedMenu, changeMenu]
}

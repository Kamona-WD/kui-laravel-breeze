import { defineComponent, Transition } from 'vue'
import { onMounted } from 'vue'
import { router } from '@inertiajs/vue3'
import { sidebarState } from '@/Composables'
import SidebarHeader from '@/Components/Sidebar/SidebarHeader'
import SidebarContent from '@/Components/Sidebar/SidebarContent'
import SidebarFooter from '@/Components/Sidebar/SidebarFooter'

const SidebarOverlay = defineComponent({
    setup() {
        return () => (
            <Transition
                enterActiveClass="transition"
                enterFromClass="opacity-0"
                enterToClass="opacity-100"
                leaveActiveClass="transition"
                leaveFromClass="opacity-100"
                leaveToClass="opacity-0"
            >
                <div
                    v-show={sidebarState.isOpen}
                    onClick={() => {
                        sidebarState.isOpen = false
                    }}
                    class="fixed inset-0 z-20 bg-black/50 lg:hidden"
                ></div>
            </Transition>
        )
    },
})

export default defineComponent({
    setup() {
        onMounted(() => {
            window.addEventListener('resize', sidebarState.handleWindowResize)

            router.on('navigate', () => {
                if (window.innerWidth <= 1024) {
                    sidebarState.isOpen = false
                }
            })
        })

        return () => (
            <>
                <SidebarOverlay />

                <aside
                    class={[
                        'fixed inset-y-0 z-40 flex w-64 -translate-x-full flex-col gap-6 bg-white py-3 shadow-lg transition-all duration-200 dark:bg-dark-1 md:transition-[width] lg:translate-x-0',
                        {
                            'translate-x-0 w-64':
                                sidebarState.isOpen || sidebarState.isHovered,
                            '-translate-x-full w-64 md:w-16 md:translate-x-0':
                                !sidebarState.isOpen && !sidebarState.isHovered,
                        },
                    ]}
                    onmouseenter={() => {
                        sidebarState.handleHover(true)
                    }}
                    onmouseleave={() => {
                        sidebarState.handleHover(false)
                    }}
                >
                    <SidebarHeader />
                    <SidebarContent />
                    <SidebarFooter />
                </aside>
            </>
        )
    },
})

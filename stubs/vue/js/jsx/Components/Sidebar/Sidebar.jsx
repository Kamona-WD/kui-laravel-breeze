import { defineComponent, Transition } from 'vue'
import { onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
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

            Inertia.on('navigate', () => {
                if (window.innerWidth <= 1024) {
                    sidebarState.isOpen = false
                }
            })
        })

        return () => (
            <>
                <SidebarOverlay />

                <aside
                    style={{
                        transitionProperty: 'width, transform',
                        transitionDuration: '150ms',
                    }}
                    class={[
                        'fixed inset-y-0 z-20 py-4 flex flex-col space-y-6 bg-white shadow-lg dark:bg-dark-eval-1',
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

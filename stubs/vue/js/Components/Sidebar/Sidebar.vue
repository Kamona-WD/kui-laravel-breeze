<template>
    <aside
        style="
            transition-property: width, transform;
            transition-duration: 150ms;
        "
        :class="[
            'fixed inset-y-0 z-20 py-4 flex flex-col space-y-6 bg-white shadow-lg dark:bg-dark-eval-1',
            {
                'translate-x-0 w-64':
                    sidebarState.isOpen || sidebarState.isHovered,
                '-translate-x-full w-64 md:w-16 md:translate-x-0':
                    !sidebarState.isOpen && !sidebarState.isHovered,
            },
        ]"
        @mouseenter="sidebarState.handleHover(true)"
        @mouseleave="sidebarState.handleHover(false)"
    >
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
    </aside>
</template>

<script>
import { onMounted, ref, Transition, resolveComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { sidebarState } from '@/Composables'
import SidebarHeader from '@/Components/Sidebar/SidebarHeader.vue'
import SidebarContent from '@/Components/Sidebar/SidebarContent.vue'
import SidebarFooter from '@/Components/Sidebar/SidebarFooter.vue'

export default {
    components: {
        SidebarHeader,
        SidebarContent,
        SidebarFooter,
    },
    setup() {
        onMounted(() => {
            window.addEventListener('resize', sidebarState.handleWindowResize)

            Inertia.on('navigate', () => {
                if (window.innerWidth <= 1024) {
                    sidebarState.isOpen = false
                }
            })
        })

        return {
            sidebarState,
        }
    },
}
</script>

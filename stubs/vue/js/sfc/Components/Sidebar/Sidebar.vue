<script setup>
import { onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { sidebarState } from '@/Composables'
import SidebarHeader from '@/Components/Sidebar/SidebarHeader.vue'
import SidebarContent from '@/Components/Sidebar/SidebarContent.vue'
import SidebarFooter from '@/Components/Sidebar/SidebarFooter.vue'

onMounted(() => {
    window.addEventListener('resize', sidebarState.handleWindowResize)

    Inertia.on('navigate', () => {
        if (window.innerWidth <= 1024) {
            sidebarState.isOpen = false
        }
    })
})
</script>

<template>
    <transition
        enter-active-class="transition"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-show="sidebarState.isOpen"
            @click="sidebarState.isOpen = false"
            class="fixed inset-0 z-20 bg-black/50 lg:hidden"
        ></div>
    </transition>

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

<template>
    <div class="relative">
        <SidebarLink @click="isOpen = !isOpen" :title="title">
            <template #icon>
                <slot name="icon">
                    <EmptyCircleIcon
                        aria-hidden="true"
                        class="flex-shrink-0 w-6 h-6"
                    />
                </slot>
            </template>

            <template #arrow>
                <span
                    v-show="sidebarState.isOpen || sidebarState.isHovered"
                    aria-hidden="true"
                    class="relative block w-6 h-6 ml-auto"
                >
                    <span
                        :class="[
                            'absolute right-[9px] bg-gray-400 mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200',
                            {
                                '-rotate-45': isOpen,
                                'rotate-45': !isOpen,
                            },
                        ]"
                    ></span>
                    <span
                        :class="[
                            'absolute left-[9px] bg-gray-400 mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200',
                            {
                                'rotate-45': isOpen,
                                '-rotate-45': !isOpen,
                            },
                        ]"
                    ></span>
                </span>
            </template>
        </SidebarLink>

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
        >
            <div
                v-show="
                    isOpen && (sidebarState.isOpen || sidebarState.isHovered)
                "
                class="overflow-hidden transition-all duration-200 max-h-0"
            >
                <ul
                    class="relative px-0 pt-2 pb-0 ml-5  before:w-0 before:block before:absolute before:inset-y-0 before:left-0 before:border-l-2 before:border-l-gray-200 dark:before:border-l-gray-600"
                >
                    <slot />
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref } from 'vue'
import SidebarLink from '@/Components/Sidebar/SidebarLink.vue'
import { EmptyCircleIcon } from '@/Components/Icons/outline.jsx'
import { sidebarState } from '@/Composables'

export default {
    components: {
        SidebarLink,
        EmptyCircleIcon,
    },
    props: {
        title: {
            type: String,
        },
        icon: {
            required: false,
        },
        active: {
            type: Boolean,
        },
    },
    setup(props) {
        const { active } = props

        const isOpen = ref(active)

        const beforeEnter = (el) => {
            el.style.maxHeight = `0px`
        }
        const enter = (el) => {
            el.style.maxHeight = `${el.scrollHeight}px`
        }
        const beforeLeave = (el) => {
            el.style.maxHeight = `${el.scrollHeight}px`
        }
        const leave = (el) => {
            el.style.maxHeight = `0px`
        }

        return {
            isOpen,
            sidebarState,
            beforeEnter,
            enter,
            beforeLeave,
            leave,
        }
    },
}
</script>

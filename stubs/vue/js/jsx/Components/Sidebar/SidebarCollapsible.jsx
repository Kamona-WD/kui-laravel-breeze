import { defineComponent, ref, Transition } from 'vue'
import SidebarLink from '@/Components/Sidebar/SidebarLink'
import { EmptyCircleIcon } from '@/Components/Icons/outline'
import { sidebarState } from '@/Composables'

export default defineComponent({
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

    setup(props, { slots }) {
        const isOpen = ref(props.active)

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

        return () => (
            <div class="relative">
                <SidebarLink
                    onClick={() => {
                        isOpen.value = !isOpen.value
                    }}
                    active={props.active}
                    title={props.title}
                >
                    {{
                        icon: () =>
                            slots.icon ? (
                                slots.icon?.()
                            ) : (
                                <EmptyCircleIcon
                                    aria-hidden="true"
                                    class="flex-shrink-0 w-6 h-6"
                                />
                            ),
                        arrow: () => (
                            <span
                                v-show={
                                    sidebarState.isOpen ||
                                    sidebarState.isHovered
                                }
                                aria-hidden="true"
                                class="relative block w-6 h-6 ml-auto"
                            >
                                <span
                                    class={[
                                        'absolute right-[9px] mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200',
                                        {
                                            '-rotate-45': isOpen.value,
                                            'rotate-45': !isOpen.value,
                                            'bg-white': props.active,
                                            'bg-gray-400': !props.active,
                                        },
                                    ]}
                                ></span>
                                <span
                                    class={[
                                        'absolute left-[9px] mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200',
                                        {
                                            'rotate-45': isOpen.value,
                                            '-rotate-45': !isOpen.value,
                                            'bg-white': props.active,
                                            'bg-gray-400': !props.active,
                                        },
                                    ]}
                                ></span>
                            </span>
                        ),
                    }}
                </SidebarLink>

                <Transition
                    onBeforeEnter={beforeEnter}
                    onEnter={enter}
                    onBeforeLeave={beforeLeave}
                    onLeave={leave}
                    appear
                >
                    <div
                        v-show={
                            isOpen.value &&
                            (sidebarState.isOpen || sidebarState.isHovered)
                        }
                        class="overflow-hidden transition-all duration-200 max-h-0"
                    >
                        <ul class="relative px-0 pt-2 pb-0 ml-5 before:w-0 before:block before:absolute before:inset-y-0 before:left-0 before:border-l-2 before:border-l-gray-200 dark:before:border-l-gray-600">
                            {slots.default?.()}
                        </ul>
                    </div>
                </Transition>
            </div>
        )
    },
})

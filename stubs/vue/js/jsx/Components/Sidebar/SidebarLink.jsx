import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { sidebarState } from '@/Composables'
import { EmptyCircleIcon } from '@/Components/Icons/outline'

export default defineComponent({
    props: {
        href: {
            type: String,
            required: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: true,
        },
        external: {
            type: Boolean,
            default: false,
        },
    },

    setup(props, { slots }) {
        const Tag = !props.external ? Link : 'a'

        if (props.href) {
            return () => (
                <Tag
                    href={props.href}
                    class={[
                        'p-2 flex items-center gap-2 rounded-md transition-colors',
                        {
                            'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-dark-eval-2':
                                !props.active,
                            'text-white bg-purple-500 shadow-lg hover:bg-purple-600':
                                props.active,
                        },
                    ]}
                >
                    {slots.icon ? (
                        slots.icon()
                    ) : (
                        <EmptyCircleIcon
                            aria-hidden="true"
                            class="flex-shrink-0 w-6 h-6"
                        />
                    )}

                    <span
                        class="text-base font-medium"
                        v-show={sidebarState.isOpen || sidebarState.isHovered}
                    >
                        {props.title}
                    </span>
                </Tag>
            )
        }
        return () => (
            <button
                type="button"
                class={[
                    'p-2 w-full flex items-center gap-2 rounded-md transition-colors',
                    {
                        'text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-dark-eval-2':
                            !props.active,
                        'text-white bg-purple-500 shadow-lg hover:bg-purple-600':
                            props.active,
                    },
                ]}
            >
                {slots.icon ? (
                    slots.icon()
                ) : (
                    <EmptyCircleIcon
                        aria-hidden="true"
                        class="flex-shrink-0 w-6 h-6"
                    />
                )}

                <span
                    class="text-base font-medium"
                    v-show={sidebarState.isOpen || sidebarState.isHovered}
                >
                    {props.title}
                </span>

                {slots.arrow?.()}
            </button>
        )
    },
})

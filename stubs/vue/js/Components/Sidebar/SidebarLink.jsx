import { defineComponent } from 'vue'
import { Link } from '@inertiajs/vue3'
import { sidebarState } from '@/Composables'
import { twMerge } from 'tailwind-merge'

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
        icon: {
            type: String,
            default: 'tabler--circle',
        }
    },

    setup(props, { slots }) {
        const Tag = !props.external ? Link : 'a'

        const baseClasses = 'w-full flex items-center gap-2 rounded-md p-2 transition-colors'

        const inActiveClasses = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-dark-2 dark:hover:text-gray-300'

        const activeClasses = 'bg-primary text-white shadow-lg hover:bg-primary-dark'

        const InnerNodes = () => (
            <>
                <span
                    aria-hidden="true"
                    class={['iconify h-6 w-6 flex-shrink-0', props.icon]}
                ></span>

                <span
                    class="text-base font-medium"
                    v-show={sidebarState.isOpen || sidebarState.isHovered}
                >
                    {props.title}
                </span>
            </>
        )

        if (props.href) {
            return () => (
                <Tag
                    href={props.href}
                    class={twMerge([
                        baseClasses,
                        !props.active && inActiveClasses,
                        props.active && activeClasses,
                    ])}
                >
                    {InnerNodes()}
                </Tag>
            )
        }
        return () => (
            <button
                type="button"
                class={twMerge([
                    baseClasses,
                    !props.active && inActiveClasses,
                    props.active && activeClasses,
                ])}
            >
                {InnerNodes()}

                {slots.arrow?.()}
            </button>
        )
    },
})

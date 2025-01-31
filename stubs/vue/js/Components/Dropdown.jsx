import { defineComponent, Transition, computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Link } from '@inertiajs/vue3'

export const DropdownLink = defineComponent({
    props: {
        title: {
            type: String,
        },
        startIcon: {
            type: String || undefined,
            default: undefined,
        },
        endIcon: {
            type: String || undefined,
            default: undefined,
        },
    },

    inheritAttrs: false,

    setup(props, { attrs }) {
        return () => (
            <MenuItem class="w-full">
                {({ active, disabled }) => (
                    <Link
                        {...attrs}
                        class={[
                            'inline-flex items-center gap-2 w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none dark:text-gray-300',
                            {
                                'bg-primary text-white dark:text-white': active,
                                'pointer-events-none': disabled,
                            },
                        ]}
                    >
                        {props.startIcon && (
                            <span
                                aria-hidden="true"
                                class={['iconify h-4 w-4', props.startIcon]}
                            ></span>
                        )}
                        <span>{props.title}</span>
                        {props.endIcon && (
                            <span
                                aria-hidden="true"
                                class={['ms-auto iconify h-4 w-4', props.endIcon]}
                            ></span>
                        )}
                    </Link>
                )}
            </MenuItem>
        )
    },
})

export const Dropdown = defineComponent({
    props: {
        align: {
            default: 'right',
        },
        width: {
            default: '48',
        },
        contentClasses: {
            default: () => ['py-1', 'bg-white dark:bg-dark-1'],
        },
    },

    setup(props, { slots }) {
        const widthClass = computed(() => {
            return {
                48: 'w-48',
            }[props.width.toString()]
        })

        const alignmentClasses = computed(() => {
            if (props.align === 'left') {
                return 'origin-top-left left-0'
            } else if (props.align === 'right') {
                return 'origin-top-right right-0'
            } else {
                return 'origin-top'
            }
        })

        return () => (
            <Menu as="div" class="relative">
                <MenuButton as="span">{slots.trigger?.()}</MenuButton>

                <Transition
                    enterActiveClass="transition ease-out duration-200"
                    enterFromClass="transform opacity-0 scale-95"
                    enterToClass="transform opacity-100 scale-100"
                    leaveActiveClass="transition ease-in duration-75"
                    leaveFromClass="transform opacity-100 scale-100"
                    leaveToClass="transform opacity-0 scale-95"
                >
                    <MenuItems
                        class={[
                            'absolute z-50 mt-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:ring-primary-darker focus:ring-offset-1 focus:ring-offset-white focus:dark:ring-offset-dark-1',
                            widthClass.value,
                            alignmentClasses.value,
                        ]}
                    >
                        <div
                            class={[
                                'rounded-md ring-1 ring-black ring-opacity-5',
                                props.contentClasses,
                            ]}
                        >
                            {slots.default?.()}
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        )
    },
})

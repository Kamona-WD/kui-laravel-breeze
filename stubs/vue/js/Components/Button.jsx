import { defineComponent, toRefs, useAttrs } from 'vue'
import { Link } from '@inertiajs/vue3'
import { twMerge } from 'tailwind-merge'

export default defineComponent({
    props: {
        variant: {
            type: String,
            default: 'primary',
            validator(value) {
                return [
                    'primary',
                    'success',
                    'danger',
                    'warning',
                    'info',
                    'white',
                    'black',
                    'transparent',
                ].includes(value)
            },
        },
        type: {
            type: String,
            default: 'submit',
        },
        size: {
            type: String,
            default: 'base',
            validator(value) {
                return ['sm', 'base', 'lg'].includes(value)
            },
        },
        squared: {
            type: Boolean,
            default: false,
        },
        pill: {
            type: Boolean,
            default: false,
        },
        href: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        srText: {
            type: String || undefined,
            default: undefined,
        },
        text: {
            type: String || undefined,
            default: undefined,
        },
        icon: {
            type: String || undefined,
            default: undefined,
        },
        startIcon: {
            type: String || undefined,
            default: undefined,
        },
        endIcon: {
            type: String || undefined,
            default: undefined,
        },
        external: {
            type: Boolean,
            default: false,
        },
        slim: {
            type: Boolean,
            default: false,
        },
        simpleLink: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['click'],

    setup(props, { slots, emit }) {
        const {
            type,
            variant,
            size,
            squared,
            pill,
            href,
            srText,
            icon,
            startIcon,
            endIcon,
            external,
            simpleLink,
        } = props

        const { disabled, text } = toRefs(props)

        const baseClasses =
            'inline-flex items-center justify-center gap-1 transition-colors font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-2'

        let variantClasses = ''
        switch (variant) {
            case 'primary':
                variantClasses =
                    'bg-primary text-white hover:bg-primary-dark focus:ring-primary'
                break
            case 'success':
                variantClasses =
                    'bg-success text-white hover:bg-success-dark focus:ring-success'
                break
            case 'info':
                variantClasses =
                    'bg-info text-white hover:bg-info-dark focus:ring-info'
                break
            case 'warning':
                variantClasses =
                    'bg-warning text-white hover:bg-warning-dark focus:ring-warning'
                break
            case 'danger':
                variantClasses =
                    'bg-danger text-white hover:bg-danger-dark focus:ring-danger'
                break
            case 'white':
                variantClasses =
                    'bg-white text-gray-500 hover:bg-gray-100 focus:ring-white'
                break
            case 'black':
                variantClasses =
                    'bg-black text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-black dark:hover:bg-dark-3'
                break
            case 'transparent':
                variantClasses =
                    'bg-transparent text-gray-500 hover:text-gray-600 focus:ring-primary dark:text-gray-300 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-2'
                break
        }

        const classes = twMerge(
            baseClasses,
            variantClasses,
            !squared && !pill && 'rounded-md',
            pill && 'rounded-full',
            href && disabled.value && 'pointer-events-none opacity-50',
            size == 'sm' && (icon ? 'p-1.5' : 'px-2.5 py-1.5 text-sm'),
            size == 'base' && (icon ? 'p-2' : 'px-4 py-2'),
            size == 'lg' && (icon ? 'p-3' : 'px-5 py-2 text-xl'),
            useAttrs().class,
        )

        const iconSizeClasses = [
            {
                'w-5 h-5': size == 'sm',
                'w-6 h-6': size == 'base',
                'w-7 h-7': size == 'lg',
            },
        ]

        const handleClick = (e) => {
            if (disabled.value) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            emit('click', e)
        }

        const Tag = external ? 'a' : Link

        const BtnBody = () => (
            <>
                {srText && <span class="sr-only">{srText}</span>}
                {icon && (
                    <span
                        aria-hidden="true"
                        class={['iconify', icon, iconSizeClasses]}
                    ></span>
                )}
                {startIcon && (
                    <span
                        aria-hidden="true"
                        class={['iconify', startIcon, iconSizeClasses]}
                    ></span>
                )}
                {text.value && <span>{text.value}</span>}
                {slots.default?.({ iconSizeClasses })}
                {endIcon && (
                    <span
                        aria-hidden="true"
                        class={['iconify', endIcon, iconSizeClasses]}
                    ></span>
                )}
            </>
        )

        if (href) {
            if (!simpleLink) {
                return () => (
                    <Tag
                        href={!disabled.value ? href : null}
                        class={classes}
                        aria-disabled={disabled.value.toString()}
                    >
                        {BtnBody()}
                    </Tag>
                )
            } else {
                <Tag
                    href={!disabled.value ? href : null}
                    class="text-blue-500 transition-colors hover:underline hover:text-blue-600"
                    aria-disabled={disabled.value.toString()}
                >
                    {slots.default?.({ iconSizeClasses })}
                </Tag>
            }

        } else {
            if (!simpleLink) {
                return () => (
                    <button
                        onClick={handleClick}
                        type={type}
                        class={classes}
                        disabled={disabled.value}
                    >
                        {BtnBody()}
                    </button>
                )
            }

            return () => (
                <button
                    type={type}
                    onClick={handleClick}
                    class="text-blue-500 transition-colors hover:underline hover:text-blue-600"
                    disabled={disabled.value}
                >

                    {BtnBody()}
                </button>
            )

        }
    },
})

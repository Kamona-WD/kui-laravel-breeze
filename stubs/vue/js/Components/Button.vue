<template>
    <component :is="Tag" v-if="href" :href="!disabled ? href : null" :class="classes" :aria-disabled="disabled.toString()">
        <span v-if="srText" class="sr-only">{{ srText }}</span>
        <slot :iconSizeClasses="iconSizeClasses" />
    </component>
    <button v-else :type="type" :class="classes" @click="handleClick" :disabled="disabled">
        <span v-if="srText" class="sr-only">{{ srText }}</span>
        <slot :iconSizeClasses="iconSizeClasses" />
    </button>
</template>

<script>
import { toRefs, computed } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

export default {
    props: {
        variant: {
            type: String,
            default: 'primary',
            validator(value) {
                return ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'black'].includes(value)
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
        iconOnly: {
            type: Boolean,
            default: false,
        },
        srText: {
            type: String || undefined,
            default: undefined,
        },
        external: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['click'],
    
    setup(props, { emit }) {
        const { type, variant, size, squared, pill, href, iconOnly, srText, external } = props

        const { disabled } = toRefs(props)

        const baseClasses = [
            'inline-flex items-center transition-colors font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-eval-2',
        ]

        const variantClasses = (variant) => ({
            'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500': variant == 'primary',
            'bg-white text-gray-500 hover:bg-gray-100 focus:ring-purple-500 dark:text-gray-400 dark:bg-dark-eval-1 dark:hover:bg-dark-eval-2 dark:hover:text-gray-200':
                variant == 'secondary',
            'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500': variant == 'success',
            'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500': variant == 'danger',
            'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500': variant == 'warning',
            'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500': variant == 'info',
            'bg-black text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-black dark:hover:bg-dark-eval-3':
                variant == 'black',
        })

        const classes = computed(() => [
            ...baseClasses,
            iconOnly
                ? {
                      'p-1.5': size == 'sm',
                      'p-2': size == 'base',
                      'p-3': size == 'lg',
                  }
                : {
                      'px-2.5 py-1.5 text-sm': size == 'sm',
                      'px-4 py-2 text-base': size == 'base',
                      'px-5 py-2 text-xl': size == 'lg',
                  },
            variantClasses(variant),
            {
                'rounded-md': !squared && !pill,
                'rounded-full': pill,
            },
            {
                'pointer-events-none opacity-50': href && disabled.value,
            },
        ])

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

        const Tag = external ?  'a' : Link

        return {
            classes,
            handleClick,
            Tag,
            iconSizeClasses,
        }
    }
}
</script>

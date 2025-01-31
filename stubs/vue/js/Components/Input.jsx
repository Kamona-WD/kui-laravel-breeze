import { defineComponent, ref } from 'vue'
import { twMerge } from 'tailwind-merge'

export default defineComponent({
    props: {
        modelValue: String,
        icon: {
            type: String || undefined,
            default: undefined,
        },
    },

    inheritAttrs: false,

    emits: ['update:modelValue'],

    setup(props, { emit, attrs, expose }) {
        const input = ref(null)

        const focus = () => {
            input.value?.focus()
        }

        expose({
            input,
            focus
        })

        const baseClasses = 'w-full py-2 border-gray-400 rounded-md'
        const focusClasses = 'focus:border-gray-400 focus:ring focus:ring-primary focus:ring-offset-2 focus:ring-offset-white'
        const darkClasses = 'dark:border-gray-500 dark:bg-dark-1 dark:text-gray-300 dark:focus:ring-offset-dark-1'

        const classes = twMerge([
            baseClasses,
            focusClasses,
            darkClasses,
            !props.icon && 'px-4',
            props.icon && 'ps-11 pe-4',
        ])

        if (props.icon) {
            return () => (
                <div class="relative text-gray-500 focus-within:text-gray-900 dark:focus-within:text-gray-400">
                    <div
                        aria-hidden="true"
                        class="absolute inset-y-0 flex items-center px-4 pointer-events-none "
                    >
                        <span aria-hidden="true" class={['iconify w-5 h-5', props.icon]}></span>
                    </div>

                    <input
                        {...attrs}
                        class={classes}
                        value={props.modelValue}
                        onInput={(e) => {
                            emit('update:modelValue', e.target.value)
                        }}
                        ref={input}
                    />
                </div>
            )
        } 

        return () => (
            <input
                {...attrs}
                class={classes}
                value={props.modelValue}
                onInput={(e) => {
                    emit('update:modelValue', e.target.value)
                }}
                ref={input}
            />
        )

    },
})

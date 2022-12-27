import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        modelValue: String,
        withIcon: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        return () => (
            <input
                class={[
                    'py-2 border-gray-400 rounded-md',
                    'focus:border-gray-400 focus:ring focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white',
                    'dark:border-gray-600 dark:bg-dark-eval-1 dark:text-gray-300 dark:focus:ring-offset-dark-eval-1',
                    {
                        'px-4': !props.withIcon,
                        'pl-11 pr-4': props.withIcon,
                    },
                ]}
                value={props.modelValue}
                onInput={(e) => {
                    emit('update:modelValue', e.target.value)
                }}
            />
        )
    },
})

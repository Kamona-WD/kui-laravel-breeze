import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        checked: {
            type: [Array, Boolean],
            default: false,
        },
        value: {
            default: null,
        },
    },

    emits: ['update:checked'],

    setup(props, { emit }) {
        const { value, checked } = props

        const isChecked = ref(checked)

        return () => (
            <input
                type="checkbox"
                class="text-purple-500 border-gray-300 rounded focus:border-purple-300 focus:ring focus:ring-purple-500 dark:border-gray-600 dark:bg-dark-eval-1 dark:focus:ring-offset-dark-eval-1"
                value={value}
                v-model={isChecked.value}
                onChange={() => {
                    emit('update:checked', isChecked.value)
                }}
            />
        )
    },
})

import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        value: String,
    },

    setup(props, { slots }) {
        return () => (
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {props.value ? <span>{props.value}</span> : slots.default?.()}
            </label>
        )
    },
})

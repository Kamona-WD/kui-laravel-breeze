import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        message: String,
    },

    setup(props) {
        return () => (
            <>
                {props.message && (
                    <p class="text-sm text-red-600">{props.message}</p>
                )}
            </>
        )
    },
})

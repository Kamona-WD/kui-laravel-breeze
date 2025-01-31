import { defineComponent } from 'vue'

export default defineComponent({
    setup(_, { slots }) {
        return () => (
            <div class="relative text-gray-500  focus-within:text-gray-900 dark:focus-within:text-gray-400">
                <div
                    aria-hidden="true"
                    class="absolute inset-y-0 flex items-center px-4 pointer-events-none "
                >
                    {slots.icon?.()}
                </div>

                {slots.default?.()}
            </div>
        )
    },
})

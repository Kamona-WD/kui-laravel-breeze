import { defineComponent, computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

export default defineComponent({
    setup() {
        const errors = computed(() => usePage().props.value.errors)

        const hasErrors = computed(() => Object.keys(errors.value).length > 0)

        return () => (
            <div>
                {hasErrors.value && (
                    <>
                        <div class="font-medium text-red-600">
                            Whoops! Something went wrong.
                        </div>

                        <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                            {Object.entries(errors.value).map(
                                ([key, error]) => (
                                    <li ley={key}>{error}</li>
                                )
                            )}
                        </ul>
                    </>
                )}
            </div>
        )
    },
})

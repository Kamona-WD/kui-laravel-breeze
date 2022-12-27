import { defineComponent } from 'vue'
import { Head, Link } from '@inertiajs/inertia-vue3'
import { MoonIcon, SunIcon } from '@heroicons/vue/outline'
import ApplicationLogo from '@/Components/ApplicationLogo'
import PageFooter from '@/Components/PageFooter'
import Button from '@/Components/Button'
import { toggleDarkMode, isDark } from '@/Composables'

export default defineComponent({
    props: {
        title: String,
    },

    setup(props, { slots }) {
        return () => (
            <>
                <Head title={props.title} />

                <div class="flex flex-col items-center justify-center min-h-screen gap-4 py-6 bg-gray-100 dark:bg-dark-eval-0">
                    <div class="flex-shrink-0">
                        <Link href="/">
                            <ApplicationLogo class="w-20 h-20" />
                        </Link>
                    </div>

                    <main class="flex items-center flex-1 w-full sm:max-w-md">
                        <div class="w-full px-6 py-4 overflow-hidden bg-white shadow-md  sm:rounded-lg dark:bg-dark-eval-1">
                            {slots.default?.()}
                        </div>
                    </main>

                    <PageFooter />

                    <div class="fixed right-10 top-10">
                        <Button
                            iconOnly
                            variant="secondary"
                            type="button"
                            onClick={toggleDarkMode}
                            class="hidden md:inline-flex"
                            srText="Toggle dark mode"
                        >
                            {({ iconSizeClasses }) => (
                                <>
                                    <MoonIcon
                                        v-show={!isDark.value}
                                        aria-hidden="true"
                                        class={iconSizeClasses}
                                    />
                                    <SunIcon
                                        v-show={isDark.value}
                                        aria-hidden="true"
                                        class={iconSizeClasses}
                                    />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </>
        )
    },
})

import { defineComponent } from 'vue'
import { Link } from '@inertiajs/vue3'
import { scrolling, sidebarState } from '@/Composables'
import Button from '@/Components/Button'
import ApplicationLogo from '@/Components/ApplicationLogo'

export default defineComponent({
    setup() {
        return () => (
            <div
                class={[
                    'fixed inset-x-0 bottom-0 flex items-center justify-between px-4 py-2 sm:px-6 transition-transform duration-500 bg-white md:hidden dark:bg-dark-1',
                    {
                        'translate-y-full': scrolling.down,
                        'translate-y-0': scrolling.up,
                    },
                ]}
            >
                <Button
                    variant="transparent"
                    type="button"
                    sr-text="Search"
                    icon="tabler--search"
                />

                <Link href={route('dashboard')}>
                    <ApplicationLogo class="w-10 h-10" />
                    <span class="sr-only">Dashboard</span>
                </Link>

                <Button
                    variant="transparent"
                    type="button"
                    onClick={() => {
                        sidebarState.isOpen = true
                    }}
                    class="md:hidden"
                    sr-text="Open main menu"
                    icon="tabler--menu-3"
                />
            </div>
        )
    },
})

import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { SearchIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { scrolling, sidebarState } from '@/Composables'
import Button from '@/Components/Button'
import ApplicationLogo from '@/Components/ApplicationLogo'

export default defineComponent({
    setup() {
        return () => (
            <div
                class={[
                    'fixed inset-x-0 bottom-0 flex items-center justify-between px-4 py-4 sm:px-6 transition-transform duration-500 bg-white md:hidden dark:bg-dark-eval-1',
                    {
                        'translate-y-full': scrolling.down,
                        'translate-y-0': scrolling.up,
                    },
                ]}
            >
                <Button
                    iconOnly
                    variant="secondary"
                    type="button"
                    srText="Search"
                >
                    {({ iconSizeClasses }) => (
                        <SearchIcon
                            aria-hidden="true"
                            class={iconSizeClasses}
                        />
                    )}
                </Button>

                <Link href={route('dashboard')}>
                    <ApplicationLogo class="w-10 h-10" />
                    <span class="sr-only">K UI</span>
                </Link>

                <Button
                    iconOnly
                    variant="secondary"
                    type="button"
                    onClick={() => {
                        sidebarState.isOpen = !sidebarState.isOpen
                    }}
                    class="md:hidden"
                    srText="Search"
                >
                    {({ iconSizeClasses }) => (
                        <>
                            <MenuIcon
                                v-show={!sidebarState.isOpen}
                                aria-hidden="true"
                                class={iconSizeClasses}
                            />
                            <XIcon
                                v-show={sidebarState.isOpen}
                                aria-hidden="true"
                                class={iconSizeClasses}
                            />
                        </>
                    )}
                </Button>
            </div>
        )
    },
})

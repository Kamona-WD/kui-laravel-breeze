import { defineComponent, onMounted, onUnmounted } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import { useFullscreen } from '@vueuse/core'
import MoblieBottombar from '@/Components/Navbar/MoblieBottombar'
import { SunIcon, MoonIcon, ArrowsExpandIcon } from '@heroicons/vue/outline'
import { handleScroll, isDark, scrolling, toggleDarkMode } from '@/Composables'
import Button from '@/Components/Button'
import { Dropdown, DropdownLink } from '@/Components/Dropdown'
import { ArrowsInnerIcon } from '@/Components/Icons/outline'

export default defineComponent({
    setup() {
        const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

        onMounted(() => {
            document.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            document.removeEventListener('scroll', handleScroll)
        })
        return () => (
            <>
                <nav
                    aria-label="secondary"
                    class={[
                        'sticky top-0 z-10 px-6 py-4 bg-white flex items-center justify-between transition-transform duration-500 dark:bg-dark-eval-1',
                        {
                            '-translate-y-full': scrolling.down,
                            'translate-y-0': scrolling.up,
                        },
                    ]}
                >
                    <div class="flex items-center gap-2">
                        {/* Dark mode button */}
                        <Button
                            iconOnly
                            variant="secondary"
                            type="button"
                            onClick={toggleDarkMode}
                            class="md:hidden"
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

                    <div class="flex items-center gap-2">
                        {/* Dark mode button */}
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

                        {/* FullScreen button */}
                        <Button
                            iconOnly
                            variant="secondary"
                            type="button"
                            onClick={toggleFullScreen}
                            class="hidden md:inline-flex"
                            srText="Toggle dark mode"
                        >
                            {({ iconSizeClasses }) => (
                                <>
                                    <ArrowsExpandIcon
                                        v-show={!isFullscreen.value}
                                        aria-hidden="true"
                                        class={iconSizeClasses}
                                    />
                                    <ArrowsInnerIcon
                                        v-show={isFullscreen.value}
                                        aria-hidden="true"
                                        class={iconSizeClasses}
                                    />
                                </>
                            )}
                        </Button>

                        {/* User menu */}
                        <Dropdown
                            align="right"
                            width="48"
                            v-slots={{
                                trigger: () => (
                                    <button
                                        type="button"
                                        class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md  hover:text-gray-700 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark-eval-1 dark:bg-dark-eval-1 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {usePage().props.value.auth.user.name}

                                        <svg
                                            class="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                ),

                                content: () => (
                                    <>
                                        <DropdownLink
                                            href={route('profile.edit')}
                                            title="Profile"
                                        />

                                        <DropdownLink
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            title="Log Out"
                                        />
                                    </>
                                ),
                            }}
                        />
                    </div>
                </nav>

                <MoblieBottombar />
            </>
        )
    },
})

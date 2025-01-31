import { defineComponent, onMounted, onUnmounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import MoblieBottombar from '@/Components/Navbar/MoblieBottombar'
import { handleScroll, isDark, scrolling, toggleDarkMode } from '@/Composables'
import Button from '@/Components/Button'
import { Dropdown, DropdownLink } from '@/Components/Dropdown'

export default defineComponent({
    setup() {
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
                        'sticky top-0 z-10 px-6 py-3 bg-white flex items-center justify-between transition-transform duration-500 dark:bg-dark-1',
                        {
                            '-translate-y-full': scrolling.down,
                            'translate-y-0': scrolling.up,
                        },
                    ]}
                >
                    <div class="flex items-center gap-2">
                        {/* Quick actions dropdown */}
                        <Dropdown
                            align="left"
                            width="48"
                            v-slots={{
                                trigger: () => (
                                    <Button 
                                        variant="transparent" 
                                        icon="tabler--sparkles"
                                        sr-text="Quick actions"
                                    />
                                ),
                            }}
                        >
                            <DropdownLink href="#" title="Manage users" start-icon="tabler--users" />
                            <DropdownLink href="#" title="Site settings" start-icon="tabler--settings" />
                            <DropdownLink href="#" title="Action 3" start-icon="tabler--circle" />
                            <DropdownLink href="#" title="Action 4" start-icon="tabler--circle" />
                        </Dropdown>

                        <Button
                            variant="transparent"
                            srText="Search"
                            icon="tabler--search"
                            class="hidden md:inline-flex"
                        />
                    </div>

                    <div class="flex items-center gap-2">
                        {/* Dark mode button */}
                        <Button
                            variant="transparent"
                            type="button"
                            onClick={() => toggleDarkMode()}
                            class="hidden p-2 md:inline-flex"
                            srText="Toggle dark mode"
                        >
                            {({ iconSizeClasses }) => (
                                <>
                                    <span
                                        v-show={!isDark.value}
                                        aria-hidden="true"
                                        class={[
                                            'iconify tabler--moon',
                                            iconSizeClasses,
                                        ]}
                                    ></span>

                                    <span
                                        v-show={isDark.value}
                                        aria-hidden="true"
                                        class={[
                                            'iconify tabler--sun',
                                            iconSizeClasses,
                                        ]}
                                    ></span>
                                </>
                            )}
                        </Button>

                        {/* User menu */}
                        <Dropdown
                            align="right"
                            width="48"
                            v-slots={{
                                trigger: () => (
                                    <Button 
                                        variant="transparent"
                                        end-icon="tabler--chevron-down"
                                        text={usePage().props.auth.user.name}
                                    />
                                ),
                            }}
                        >
                            <DropdownLink
                                href={route('profile.edit')}
                                start-icon="tabler--user"
                                title="Profile"
                            />

                            <DropdownLink
                                href={route('logout')}
                                method="post"
                                as="button"
                                start-icon="tabler--logout"
                                title="Log Out"
                            />
                        </Dropdown>
                    </div>
                </nav>

                <MoblieBottombar />
            </>
        )
    },
})

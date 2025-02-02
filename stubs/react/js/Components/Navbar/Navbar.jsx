import { useContext } from 'react'
import { GlobalContext } from '@/Layouts/Authenticated'
import Button from '@/Components/Button'
import Dropdown from '@/Components/Dropdown'
import MobileBottomBar from '@/Components/Navbar/MobileBottomBar'
import { twJoin } from 'tailwind-merge'

export default ({ auth }) => {
    const { isScrollDown, isScrollUp, isDark, setDarkMode } =
        useContext(GlobalContext)

    return (
        <>
            <nav
                aria-label="Secondary"
                className={twJoin([
                    'sticky top-0 z-10 flex items-center justify-between px-6 py-3 transition-transform duration-500 bg-white dark:bg-dark-1',
                    isScrollDown && '-translate-y-full',
                    isScrollUp && 'translate-y-0'
                ])}
            >
                <div className="flex items-center gap-2">
                    {/* Quick actions dropdown */}
                    <Dropdown
                        align="left"
                        trigger={
                            <Button
                                type="button"
                                variant="transparent"
                                icon="tabler--sparkles"
                                srText="Quick actions"
                            />
                        }
                    >
                        <Dropdown.Item
                            href="#"
                            startIcon="tabler--users"
                            title="Manage users"
                        />
                        <Dropdown.Item
                            href="#"
                            startIcon="tabler--settings"
                            title="Site settings"
                        />
                        <Dropdown.Item
                            href="#"
                            startIcon="tabler--circle"
                            title="Action 3"
                        />
                        <Dropdown.Item
                            href="#"
                            startIcon="tabler--circle"
                            title="Action 4"
                        />
                    </Dropdown>

                    <Button
                        variant="transparent"
                        srText="Search"
                        icon="tabler--search"
                        className="hidden md:inline-flex"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {/* Dark mode button */}
                    <Button
                        type="button"
                        variant="transparent"
                        className="p-2"
                        srText="Toggle dark mode"
                        onClick={() => {
                            setDarkMode(!isDark)
                        }}
                    >
                        {isDark ? (
                            <span aria-hidden="true" className="iconify tabler--sun w-6 h-6"></span>
                        ) : (
                            <span aria-hidden="true" className="iconify tabler--moon w-6 h-6"></span>
                        )}
                    </Button>

                    {/* User menu */}
                    <Dropdown
                        trigger={
                            <Button
                                type="button"
                                variant="transparent"
                                endIcon="tabler--chevron-down"
                                text={auth.user.name}
                            />
                        }
                    >
                        <Dropdown.Item
                            href={route('profile.edit')}
                            title="Profile"
                        />

                        <Dropdown.Item
                            href={route('logout')}
                            method="post"
                            as="button"
                            title="Log Out"
                        />
                    </Dropdown>
                </div>
            </nav>

            <MobileBottomBar />
        </>
    )
}

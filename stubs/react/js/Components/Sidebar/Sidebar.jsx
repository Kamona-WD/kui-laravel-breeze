import { useContext, useState } from 'react'
import { GlobalContext } from '@/Layouts/Authenticated'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import {
    MenuFoldLineLeftIcon,
    MenuFoldLineRightIcon,
    EmptyCircleIcon,
} from '@/Components/Icons/outline'
import { XIcon } from '@heroicons/react/outline'
import { Transition } from 'react-transition-group'
import { Transition as HeadlessTransition } from '@headlessui/react'
import SidebarContent from '@/Components/Sidebar/SidebarContent'

const SidebarOverlay = () => {
    const { isSidebarOpen, setSidebarOpen } = useContext(GlobalContext)

    return (
        <>
            <HeadlessTransition
                show={isSidebarOpen}
                enter="transition z-20"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition z-20"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                {isSidebarOpen && (
                    <div
                        onClick={() => {
                            setSidebarOpen(false)
                        }}
                        className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    ></div>
                )}
            </HeadlessTransition>
        </>
    )
}

const SidebarHeader = () => {
    const { isSidebarOpen, isSidebarHovered, setSidebarOpen } =
        useContext(GlobalContext)

    return (
        <div className="flex items-center justify-between flex-shrink-0 px-3">
            <Link href={route('dashboard')} className="inline-flex">
                <span className="sr-only">K-UI</span>
                <ApplicationLogo aria-hidden="true" className="w-10 h-auto" />
            </Link>

            {(isSidebarOpen || isSidebarHovered) && (
                <Button
                    iconOnly
                    variant="secondary"
                    type="button"
                    srText={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                    onClick={() => {
                        setSidebarOpen(!isSidebarOpen)
                    }}
                >
                    {isSidebarOpen ? (
                        <MenuFoldLineLeftIcon
                            aria-hidden="true"
                            className="hidden w-6 h-6 lg:block"
                        />
                    ) : (
                        <MenuFoldLineRightIcon
                            aria-hidden="true"
                            className="hidden w-6 h-6 lg:block"
                        />
                    )}

                    <XIcon aria-hidden="true" className="w-6 h-6 lg:hidden" />
                </Button>
            )}
        </div>
    )
}

export const SidebarLink = ({
    href,
    active = false,
    title,
    external = false,
    icon,
    arrow,
    onClick,
}) => {
    const { isSidebarOpen, isSidebarHovered } = useContext(GlobalContext)

    let LinkTag = external ? 'a' : Link

    const baseClasses = `p-2 w-full flex items-center gap-2 rounded-md transition-colors`
    const activeClasses =
        'text-white bg-purple-500 shadow-lg hover:bg-purple-600'
    const unActiveClasses =
        'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-dark-eval-2'

    if (href) {
        return (
            <LinkTag
                href={href}
                className={`${baseClasses} ${
                    active ? activeClasses : unActiveClasses
                }`}
            >
                {icon ?? (
                    <EmptyCircleIcon
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6"
                    />
                )}
                {(isSidebarOpen || isSidebarHovered) && (
                    <span className="text-base font-medium">{title}</span>
                )}
            </LinkTag>
        )
    } else {
        return (
            <button
                type="button"
                className={`${baseClasses} ${
                    active ? activeClasses : unActiveClasses
                }`}
                onClick={onClick}
            >
                {icon ?? (
                    <EmptyCircleIcon
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6"
                    />
                )}
                {(isSidebarOpen || isSidebarHovered) && (
                    <span className="text-base font-medium">{title}</span>
                )}

                {arrow}
            </button>
        )
    }
}

export const SidebarCollapsibleItem = ({
    href,
    title,
    active = false,
    external = false,
    target,
}) => {
    const Tag = external ? 'a' : Link

    const linkBaseClasses = `transition-colors hover:text-gray-900 dark:hover:text-gray-100`
    const linkActiveClasses = `text-gray-900 dark:text-gray-200`
    const linkInActiveClasses = `text-gray-500 dark:text-gray-400`
    return (
        <li
            className={`relative leading-8 m-0 pl-6 before:block before:w-4 before:h-0 before:absolute before:left-0 before:top-4 before:border-t-2 before:border-t-gray-200 before:-mt-0.5 last:before:bg-white last:before:h-auto last:before:top-4 last:before:bottom-0 dark:last:before:bg-dark-eval-1 dark:before:border-t-gray-600`}
        >
            <Tag
                href={href}
                target={target}
                className={`${linkBaseClasses} ${
                    active ? linkActiveClasses : linkInActiveClasses
                }`}
            >
                {title}
            </Tag>
        </li>
    )
}

export const SidebarCollapsible = ({
    title,
    icon,
    active = false,
    children,
}) => {
    const [isOpen, setOpen] = useState(active)
    const { isSidebarOpen, isSidebarHovered } = useContext(GlobalContext)

    return (
        <div className="relative">
            <SidebarLink
                active={active}
                title={title}
                onClick={() => {
                    setOpen(!isOpen)
                }}
                icon={
                    icon ?? (
                        <EmptyCircleIcon
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6"
                        />
                    )
                }
                arrow={
                    (isSidebarOpen || isSidebarHovered) && (
                        <span
                            aria-hidden="true"
                            className="relative block w-6 h-6 ml-auto"
                        >
                            <span
                                className={`absolute right-[9px] mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200 ${
                                    isOpen ? '-rotate-45' : 'rotate-45'
                                } ${active ? 'bg-white' : 'bg-gray-400'}`}
                            ></span>
                            <span
                                className={`absolute left-[9px] mt-[-5px] h-2 w-[2px] top-1/2 transition-all duration-200 ${
                                    isOpen ? 'rotate-45' : '-rotate-45'
                                } ${active ? 'bg-white' : 'bg-gray-400'}`}
                            ></span>
                        </span>
                    )
                }
            ></SidebarLink>

            <Transition
                appear
                in={isOpen && (isSidebarOpen || isSidebarHovered)}
                onEnter={(node) => {
                    node.style.maxHeight = `0px`
                }}
                onEntered={(node) => {
                    node.style.maxHeight = `${node.scrollHeight}px`
                }}
                onExit={(node) => {
                    node.style.maxHeight = `${node.scrollHeight}px`
                }}
                onExited={(node) => {
                    node.style.maxHeight = `0px`
                }}
                timeout={0}
            >
                {(state) => (
                    <div className="overflow-hidden duration-200 transition-all max-h-0">
                        <ul className="relative px-0 pt-2 pb-0 ml-5 before:w-0 before:block before:absolute before:inset-y-0 before:left-0 before:border-l-2 before:border-l-gray-200 dark:before:border-l-gray-600">
                            {children}
                        </ul>
                    </div>
                )}
            </Transition>
        </div>
    )
}

const SidebarFooter = () => {
    const { isSidebarOpen, setSidebarOpen } = useContext(GlobalContext)

    return (
        <div className="flex-shrink-0 px-3 lg:hidden">
            <Button
                iconOnly
                variant="secondary"
                type="button"
                onClick={() => {
                    setSidebarOpen(!isSidebarOpen)
                }}
                srText={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isSidebarOpen ? (
                    <MenuFoldLineLeftIcon
                        aria-hidden="true"
                        className="w-6 h-6"
                    />
                ) : (
                    <MenuFoldLineRightIcon
                        aria-hidden="true"
                        className="w-6 h-6"
                    />
                )}
            </Button>
        </div>
    )
}

export default () => {
    const { isSidebarOpen, isSidebarHovered, handleSidebarHover } =
        useContext(GlobalContext)

    return (
        <>
            <SidebarOverlay />

            <aside
                style={{
                    transitionProperty: 'width, transform',
                    transitionDuration: '150ms',
                }}
                className={`fixed inset-y-0 z-20 flex flex-col py-4 space-y-6 bg-white shadow-lg dark:bg-dark-eval-1 ${
                    isSidebarOpen || isSidebarHovered
                        ? 'translate-x-0 w-64'
                        : ''
                } ${
                    !isSidebarOpen && !isSidebarHovered
                        ? '-translate-x-full w-64 md:w-16 md:translate-x-0'
                        : ''
                }`}
                onMouseEnter={() => handleSidebarHover(true)}
                onMouseLeave={() => handleSidebarHover(false)}
            >
                <SidebarHeader />
                <SidebarContent />
                {isSidebarOpen && <SidebarFooter />}
            </aside>
        </>
    )
}

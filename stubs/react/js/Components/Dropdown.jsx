import { Transition } from '@headlessui/react'
import { Menu } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { twJoin, twMerge } from 'tailwind-merge'

const Item = ({ href, title, method = 'GET', as, startIcon, endIcon, ...rest }) => {
    const baseClasses = `inline-flex items-center gap-2 w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none dark:text-gray-300`

    return (
        <Menu.Item>
            {({ active, disabled }) => (
                <Link
                    href={href}
                    method={method}
                    as={as}
                    className={twMerge([
                        baseClasses,
                        active && 'bg-primary text-white dark:text-white',
                        disabled && 'pointer-events-none',

                    ])}
                    {...rest}
                >
                    {startIcon && <span aria-hidden="true" className={twJoin([
                        'iconify h-4 w-4',
                        startIcon,
                    ])}></span>}
                    {title}
                    {endIcon && <span aria-hidden="true" className={twJoin([
                        'ms-auto iconify h-4 w-4',
                        endIcon,
                    ])}></span>}
                </Link>
            )}
        </Menu.Item>
    )
}

const Dropdown = ({
    children,
    trigger,
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white dark:bg-dark-1',
}) => {
    let alignmentClasses = 'origin-top'

    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0'
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0'
    }

    let widthClasses = ''

    if (width === '48') {
        widthClasses = 'w-48'
    }

    return (
        <Menu as="div" className="relative">
            <Menu.Button as="span">{trigger}</Menu.Button>

            <Transition
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leaveactive="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={twJoin([
                        'absolute z-50 mt-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:ring-primary-darker focus:ring-offset-1 focus:ring-offset-white focus:dark:ring-offset-dark-1',
                        alignmentClasses,
                        widthClasses,
                    ])}
                >
                    <div
                        className={`rounded-md ring-1 ring-black/5 ${contentClasses}`}
                    >
                        {children}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

Dropdown.Item = Item
export default Dropdown
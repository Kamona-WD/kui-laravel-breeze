import { Link } from '@inertiajs/inertia-react'
import { Transition } from '@headlessui/react'
import { Menu } from '@headlessui/react'

const Item = ({ href, title, method = 'GET', as }) => {
    const baseClasses = `block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition duration-150 ease-in-out focus:outline-none dark:focus:text-white dark:focus:bg-dark-eval-3 dark:text-gray-400`

    return (
        <Menu.Item>
            {({ active, disabled }) => (
                <Link
                    href={href}
                    method={method}
                    as={as}
                    className={`${baseClasses} ${
                        active &&
                        'bg-gray-100 dark:text-gray-200 dark:bg-dark-eval-3'
                    } ${disabled && 'pointer-events-none'}`}
                >
                    {title}
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
    contentClasses = 'py-1 bg-white',
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
                leaveActive="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                >
                    <div
                        className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}
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

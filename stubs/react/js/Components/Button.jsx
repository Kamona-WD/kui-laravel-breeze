import { Link } from '@inertiajs/inertia-react'

export default ({
    type = 'submit',
    className = '',
    processing,
    children,
    href,
    target,
    external,
    variant = 'primary',
    size = 'base',
    iconOnly,
    squared = false,
    pill = false,
    srText,
    onClick,
}) => {
    const baseClasses = `inline-flex items-center transition-colors font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-eval-2`

    let variantClasses = ``

    switch (variant) {
        case 'secondary':
            variantClasses = `bg-white text-gray-500 hover:bg-gray-100 focus:ring-purple-500 dark:text-gray-400 dark:bg-dark-eval-1 dark:hover:bg-dark-eval-2 dark:hover:text-gray-200`
            break
        case 'success':
            variantClasses = `bg-green-500 text-white hover:bg-green-600 focus:ring-green-500`
            break
        case 'danger':
            variantClasses = `bg-red-500 text-white hover:bg-red-600 focus:ring-red-500`
            break
        case 'warning':
            variantClasses = `bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500`
            break
        case 'info':
            variantClasses = `bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500`
            break
        case 'black':
            variantClasses = `bg-black text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-black dark:hover:bg-dark-eval-3`
            break
        default:
            variantClasses = `bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500`
    }

    const sizeClasses = `${
        size == 'base' ? (iconOnly ? 'p-2' : 'px-4 py-2 text-base') : ''
    } ${size == 'sm' ? (iconOnly ? 'p-1.5' : 'px-2.5 py-1.5 text-sm') : ''} ${
        size == 'lg' ? (iconOnly ? 'p-3' : 'px-5 py-2 text-xl') : ''
    }`

    const roundedClasses = `${!squared && !pill ? 'rounded-md' : ''} ${
        pill ? 'rounded-full' : ''
    }`

    const iconSizeClasses = `${size == 'sm' ? 'w-5 h-5' : ''} ${
        size == 'base' ? 'w-6 h-6' : ''
    } ${size == 'lg' ? 'w-7 h-7' : ''}`

    if (href) {
        const Tag = external ? 'a' : Link

        return (
            <Tag
                target={target}
                href={href}
                className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className} ${
                    processing ? 'pointer-events-none opacity-50' : ''
                }`}
            >
                {children}
                {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
            </Tag>
        )
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className}`}
            disabled={processing}
            onClick={onClick}
        >
            {children}
            {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
        </button>
    )
}

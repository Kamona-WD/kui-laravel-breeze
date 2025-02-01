import { Link } from '@inertiajs/react'
import { twJoin, twMerge } from 'tailwind-merge'

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
    icon,
    startIcon,
    endIcon,
    text,
    squared = false,
    pill = false,
    srText,
    onClick,
    ...rest
}) => {
    const baseClasses = `inline-flex items-center justify-center gap-1 transition-colors font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-2`

    let variantClasses = ''
    
    switch (variant) {
        case 'primary':
            variantClasses =
                'bg-primary text-white hover:bg-primary-dark focus:ring-primary'
            break
        case 'success':
            variantClasses =
                'bg-success text-white hover:bg-success-dark focus:ring-success'
            break
        case 'info':
            variantClasses =
                'bg-info text-white hover:bg-info-dark focus:ring-info'
            break
        case 'warning':
            variantClasses =
                'bg-warning text-white hover:bg-warning-dark focus:ring-warning'
            break
        case 'danger':
            variantClasses =
                'bg-danger text-white hover:bg-danger-dark focus:ring-danger'
            break
        case 'white':
            variantClasses =
                'bg-white text-gray-500 hover:bg-gray-100 focus:ring-white'
            break
        case 'black':
            variantClasses =
                'bg-black text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-black dark:hover:bg-dark-3'
            break
        case 'transparent':
            variantClasses =
                'bg-transparent text-gray-500 hover:text-gray-600 focus:ring-primary dark:text-gray-300 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-2'
            break
    }

    const sizeClasses = twJoin([
        size == 'sm' && (icon ? 'p-1.5' : 'px-2.5 py-1.5 text-sm'),
        size == 'base' && (icon ? 'p-2' : 'px-4 py-2 text-base'),
        size == 'lg' && (icon ? 'p-3' : 'px-5 py-2 text-xl'),
    ])

    const roundedClasses = twJoin([
        (!squared && !pill) && 'rounded-md',
        pill && 'rounded-full'
    ])

    const iconSizeClasses = twJoin([
        size == 'sm' && 'w-5 h-5',
        size == 'base' && 'w-6 h-6',
        size == 'lg' && 'w-7 h-7',
    ])

    if (href) {
        const Tag = external ? 'a' : Link

        return (
            <Tag
                target={target}
                href={href}
                className={twMerge([
                    baseClasses,
                    sizeClasses,
                    variantClasses,
                    roundedClasses,
                    processing && 'pointer-events-none opacity-50',
                    className,
                ])}
                {...rest}
            >
                {icon && <span className={twJoin(['iconify', icon, iconSizeClasses])}></span>}
                {srText && <span className="sr-only">{srText}</span>}
                {startIcon && <span className={twJoin(['iconify', startIcon, iconSizeClasses])}></span>}
                {children}
                {text && <span>{text}</span>}
                {endIcon && <span className={twJoin(['iconify', endIcon, iconSizeClasses])}></span>}
            </Tag>
        )
    }

    return (
        <button
            type={type}
            className={twMerge([
                baseClasses,
                sizeClasses,
                variantClasses,
                roundedClasses,
                className,
            ])}
            disabled={processing}
            onClick={onClick}
            {...rest}
        >
            {icon && <span className={twJoin(['iconify', icon, iconSizeClasses])}></span>}
            {srText && <span className="sr-only">{srText}</span>}
            {startIcon && <span className={twJoin(['iconify', startIcon, iconSizeClasses])}></span>}
            {children}
            {text && <span>{text}</span>}
            {endIcon && <span className={twJoin(['iconify', endIcon, iconSizeClasses])}></span>}
        </button>
    )
}

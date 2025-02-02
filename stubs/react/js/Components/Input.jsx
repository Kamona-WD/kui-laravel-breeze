import { useEffect, useRef } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

const InputIconWrapper = ({ icon, children }) => {
    return (
        <div className="relative text-gray-500 focus-within:text-gray-900 dark:focus-within:text-gray-400">
            <div
                aria-hidden="true"
                className="absolute inset-y-0 flex items-center px-4 pointer-events-none"
            >
                <span aria-hidden="true" className={[twJoin(['iconify w-5 h-5', icon])]}></span>
            </div>

            {children}
        </div>
    )
}


export default ({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    icon,
    placeholder,
}) => {
    const input = useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    const baseClasses = `w-full py-2 border-gray-400 rounded-md focus:border-gray-400 focus:ring focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:border-gray-600 dark:bg-dark-1 dark:text-gray-300 dark:focus:ring-offset-dark-1`

    return (
        icon ? <InputIconWrapper icon={icon}>
            <input
                type={type}
                name={name}
                value={value}
                className={twMerge(['ps-11 pe-4', baseClasses, className])}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </InputIconWrapper>
            : <input
                type={type}
                name={name}
                value={value}
                className={twMerge(['px-4', baseClasses, className])}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
            />
    )
}

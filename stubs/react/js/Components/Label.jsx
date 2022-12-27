export default ({ forInput, value, className, children }) => {
    return (
        <label
            htmlFor={forInput}
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
        >
            {value ? value : children}
        </label>
    )
}

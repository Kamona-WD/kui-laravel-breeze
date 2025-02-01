export default ({ name, value, handleChange }) => {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="text-purple-500 border-gray-300 rounded focus:border-purple-300 focus:ring focus:ring-purple-500 dark:border-gray-600 dark:bg-dark-1 dark:focus:ring-offset-dark-1"
            onChange={(e) => handleChange(e)}
        />
    )
}

import Button from '@/Components/Button'
import Authenticated from '@/Layouts/Authenticated'
import { HomeIcon } from '@heroicons/react/outline'

export default (props) => {
    const variants = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'black',
    ]

    const sizes = ['sm', 'base', 'lg']

    return (
        <Authenticated
            title="Buttons"
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Buttons
                </h2>
            }
        >
            <div className="p-6">
                <div className="grid items-center gap-6">
                    {variants.map((variant) => (
                        <div
                            key={variant}
                            className="grid items-start grid-cols-3 gap-6 justify-items-center"
                        >
                            {sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={variant}
                                    size={size}
                                >
                                    {variant}
                                </Button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6">
                <div className="grid items-center gap-6">
                    {variants.map((variant) => (
                        <div
                            key={variant}
                            className="grid items-start grid-cols-3 gap-6 justify-items-center"
                        >
                            {sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={variant}
                                    size={size}
                                    className="gap-2 justify-center"
                                >
                                    <HomeIcon
                                        aria-hidden="true"
                                        className={`${
                                            size == 'sm' && 'w-5 h-5'
                                        } ${size == 'base' && 'w-6 h-6'} ${
                                            size == 'lg' && 'w-7 h-7'
                                        }`}
                                    />
                                    <span>{variant}</span>
                                </Button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6">
                <div className="grid items-center gap-6">
                    {variants.map((variant) => (
                        <div
                            key={variant}
                            className="grid items-start grid-cols-3 gap-6 justify-items-center"
                        >
                            {sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={variant}
                                    size={size}
                                    iconOnly
                                >
                                    <HomeIcon
                                        aria-hidden="true"
                                        className={`${
                                            size == 'sm' && 'w-5 h-5'
                                        } ${size == 'base' && 'w-6 h-6'} ${
                                            size == 'lg' && 'w-7 h-7'
                                        }`}
                                    />
                                    <span className="sr-only">{variant}</span>
                                </Button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    )
}

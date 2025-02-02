import Button from '@/Components/Button'
import Authenticated from '@/Layouts/Authenticated'

export default (props) => {
    const variants = [
        'primary',
        'success',
        'danger',
        'warning',
        'info',
        'black',
        'white',
        'transparent',
    ]

    const sizes = ['sm', 'base', 'lg']

    return (
        <Authenticated
            title="Buttons"
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold">
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
                                    type="button"
                                    variant={variant}
                                    size={size}
                                    className="capitalize"
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
                                    type="button"
                                    variant={variant}
                                    size={size}
                                    startIcon="tabler--home"
                                    text={variant}
                                    className="capitalize"
                                />
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
                                    icon="tabler--home"
                                    srText={variant}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    )
}

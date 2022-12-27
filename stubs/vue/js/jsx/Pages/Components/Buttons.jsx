import { defineComponent } from 'vue'
import AuthenticatedLayout from '@/Layouts/Authenticated'
import Button from '@/Components/Button'
import { GithubIcon } from '@/Components/Icons/brands'
import { HomeIcon } from '@heroicons/vue/outline'

const Header = defineComponent({
    setup() {
        return () => (
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 class="text-xl font-semibold leading-tight">Buttons</h2>

                <Button
                    external
                    variant="black"
                    target="_blank"
                    class="items-center gap-2 max-w-xs"
                    href="https://github.com/kamona-wd/kui-laravel-breeze"
                >
                    {({ iconSizeClasses }) => (
                        <>
                            <GithubIcon
                                aria-hidden="true"
                                class={iconSizeClasses}
                            />
                            <span>Star on Github</span>
                        </>
                    )}
                </Button>
            </div>
        )
    },
})

export default defineComponent({
    setup() {
        let buttonsVariants = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'black',
        ]

        let buttonSizes = ['sm', 'base', 'lg']

        return () => (
            <AuthenticatedLayout
                title="Buttons"
                v-slots={{ header: () => <Header /> }}
            >
                <div class="grid items-center gap-6 mt-4">
                    {buttonsVariants.map((variant) => (
                        <div
                            key={variant}
                            class="grid items-start grid-cols-3 gap-4 justify-items-center"
                        >
                            {buttonSizes.map((size) => (
                                <Button
                                    key={size}
                                    type="button"
                                    variant={variant}
                                    size={size}
                                >
                                    Button
                                </Button>
                            ))}
                        </div>
                    ))}

                    {buttonsVariants.map((variant) => (
                        <div
                            key={variant}
                            class="grid items-start grid-cols-3 gap-4 justify-items-center"
                        >
                            {buttonSizes.map((size) => (
                                <Button
                                    key={size}
                                    type="button"
                                    variant={variant}
                                    size={size}
                                    class="justify-center gap-2"
                                >
                                    {({ iconSizeClasses }) => (
                                        <>
                                            <HomeIcon
                                                aria-hidden="true"
                                                class={iconSizeClasses}
                                            />
                                            <span>Button</span>
                                        </>
                                    )}
                                </Button>
                            ))}
                        </div>
                    ))}

                    {buttonsVariants.map((variant) => (
                        <div
                            key={variant}
                            class="grid items-start grid-cols-3 gap-4 justify-items-center"
                        >
                            {buttonSizes.map((size) => (
                                <Button
                                    iconOnly
                                    key={size}
                                    type="button"
                                    variant={variant}
                                    size={size}
                                    class="justify-center gap-2"
                                >
                                    {({ iconSizeClasses }) => (
                                        <>
                                            <HomeIcon
                                                aria-hidden="true"
                                                class={iconSizeClasses}
                                            />
                                            <span class="sr-only">
                                                Icon only button
                                            </span>
                                        </>
                                    )}
                                </Button>
                            ))}
                        </div>
                    ))}
                </div>
            </AuthenticatedLayout>
        )
    },
})

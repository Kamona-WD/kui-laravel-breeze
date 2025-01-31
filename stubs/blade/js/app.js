import './bootstrap'

import Alpine from 'alpinejs'
import AlpineCollapse from '@alpinejs/collapse'
import AlpineAnchor from '@alpinejs/anchor'
import AlpineResize from '@alpinejs/resize'
import kuiPlugin from './plugins'

Alpine.plugin(AlpineCollapse)
Alpine.plugin(AlpineAnchor)
Alpine.plugin(AlpineResize)
Alpine.plugin(kuiPlugin)

Alpine.start()

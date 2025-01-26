import './bootstrap'

import Alpine from 'alpinejs'
import AlpineCollapse from '@alpinejs/collapse'
import AlpineAnchor from '@alpinejs/anchor'
import kuiPlugin from './plugins'

Alpine.plugin(AlpineCollapse)
Alpine.plugin(AlpineAnchor)
Alpine.plugin(kuiPlugin)

Alpine.start()

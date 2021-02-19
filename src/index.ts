import { corsListener } from './events/corsListener'
import { favIconListener } from './events/favIconListener'
import { eventListener } from './events/eventListener'

addEventListener("fetch", corsListener)

addEventListener("fetch", favIconListener)

addEventListener("fetch", eventListener)

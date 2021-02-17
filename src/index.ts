import { corsListener } from './listeners/corsListener'
import { favIconListener } from './listeners/favIconListener'
import { eventListener } from './listeners/eventListener'

addEventListener("fetch", corsListener)

addEventListener("fetch", favIconListener)

addEventListener("fetch", eventListener)

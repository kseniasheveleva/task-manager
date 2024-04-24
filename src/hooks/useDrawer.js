import { EVENT_TYPES } from "../constants/eventTypes"
import { eventEmitter } from "../core/EventEmitter"

export const useDrawer = (data) => {
    eventEmitter.emit(EVENT_TYPES.openDrawer, data);
}
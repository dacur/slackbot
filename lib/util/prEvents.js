'use strict';

class PREvents {

  static color(itemEvent) {
    let colors = {
      none: '#6cc644',
      closed: '#777777',
      merged: '#6e5494',
      head_ref_deleted: '#777777'
    }
    return colors[itemEvent] || colors['none'];
  }

  static isInactive(itemEvent) {
    let inactiveEvents = ['closed', 'merged', 'head_ref_deleted']
    return inactiveEvents.indexOf(itemEvent) > -1
  }

  static emoji(itemEvent) {
    return {
      merged: 'cr-merged'
    }[itemEvent];
  }

}

module.exports = PREvents

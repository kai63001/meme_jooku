import moment from 'moment/moment'

export default (ctx, inject) => {
  inject('moment', (dateTime = Date.now()) => moment(dateTime).fromNow())
}

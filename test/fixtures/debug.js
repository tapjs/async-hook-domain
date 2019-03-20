process.env.ASYNC_HOOK_DOMAIN_DEBUG = '1'
const Domain = require('../..')
const d = new Domain(() => {})
d.destroy()

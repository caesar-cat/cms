
module.exports = app => {
    return {
      schedule: {
        cron: '0 0 */3 * * *',
        type: 'worker'
      },
      async task(ctx) {
        console.log(11)
      },
    };
  }
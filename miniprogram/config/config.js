const env = 'dev'
const envConfig = {
  // dev开发环境
  'dev': {
    cloudEnv: 'test-a6t3z',   //云开发环境ID
  },
  // 线上发布云环境
  'prod': {
    cloudEnv: 'prod-3hpas',
  }
}
module.exports = envConfig[env]

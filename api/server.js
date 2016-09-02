var koa = require('koa')
var router = require('koa-router')()
var Boom = require('boom')
var faker = require('faker')
var uuid = require('uuid')
var logger = require('koa-logger')
var _ = require('lodash')
var app = koa()

var PORT = process.env.PORT || 9998

var fakeRepos = require('../gh-repo.js')().repos

router
  .get('/', function * (next) {
    this.type = 'html'
    this.body = `
      Astronomy API Server running. <br/>
      For more details, please visit: <br/>
      <a href='https://github.com/therebelrobot/astronomy'>therebelrobot/astronomy</a>`
  })
  .get('/user', function * (next) {
    this.body = getFakeUser()
  })
  .get('/user/stars', function * (next) {
    this.body = fakeRepos
  })
  .get('/user/stars/tags', function * (next) {
    const tags = _.uniq(_.flatten(_.map(fakeRepos, 'tags')))
    this.body = tags
  })
  .get('/user/stars/:starId', function * (next) {
    let { starId } = this.params
    starId = parseInt(starId)
    const foundRepo = _.filter(fakeRepos, { id: starId })
    this.body = foundRepo
  })
  .get('/user/stars/:starId/tags', function * (next) {
    let { starId } = this.params
    starId = parseInt(starId)
    const foundRepo = _.filter(fakeRepos, {id:starId})

    this.body = foundRepo[0].tags
  })

app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))

app.listen(PORT, function () {
  console.log(`Astronomy API listening on port ${PORT}`)
})

function getFakeUser(username){
  username = username || faker.internet.userName()
  return {
    login: username,
    id: uuid.v4(),
    github_id: uuid.v4(),
    avatar_url: faker.internet.avatar(),
    gravatar_id: '',
    url: `https://api.github.com/users/${username}`,
    html_url: `https://github.com/${username}`,
    followers_url: `https://api.github.com/users/${username}/followers`,
    following_url: `https://api.github.com/users/${username}/following{/other_user}`,
    gists_url: `https://api.github.com/users/${username}/gists{/gist_id}`,
    starred_url: `https://api.github.com/users/${username}/starred{/owner}{/repo}`,
    subscriptions_url: `https://api.github.com/users/${username}/subscriptions`,
    organizations_url: `https://api.github.com/users/${username}/orgs`,
    repos_url: `https://api.github.com/users/${username}/repos`,
    events_url: `https://api.github.com/users/${username}/events{/privacy}`,
    received_events_url: `https://api.github.com/users/${username}/received_events`,
    type: `User`,
    site_admin: faker.random.boolean(),
    name: faker.name.firstName()+' '+faker.name.lastName(),
    company: faker.company.companyName(),
    blog: faker.internet.url(),
    location: faker.address.city(),
    email: faker.internet.email(),
    hireable: faker.random.boolean(),
    bio: faker.company.catchPhrase(),
    public_repos: faker.random.number(15),
    public_gists: faker.random.number(15),
    followers: faker.random.number(15),
    following: faker.random.number(15),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    total_private_repos: faker.random.number(15),
    owned_private_repos: faker.random.number(15),
    private_gists: faker.random.number(15),
    disk_usage: faker.random.number(15000),
    collaborators: faker.random.number(8)
  }
}

const faker = require('faker')

module.exports = () => {
  var total = 20
  var allRepos = []
  var i = 0
  while(i < total){
    i++
    var username = faker.internet.userName()
    var repo = faker.hacker.adjective()+'-'+faker.hacker.noun()
    var results = {
      'id': i,
      'owner': {
        'login': username,
        'id': i,
        'avatar_url': faker.image.avatar(),
        'gravatar_id': ``,
        'url': `https://api.github.com/users/${username}`,
        'html_url': `https://github.com/${username}`,
        'followers_url': `https://api.github.com/users/${username}/followers`,
        'following_url': `https://api.github.com/users/${username}/following{/other_user}`,
        'gists_url': `https://api.github.com/users/${username}/gists{/gist_id}`,
        'starred_url': `https://api.github.com/users/${username}/starred{/owner}{/repo}`,
        'subscriptions_url': `https://api.github.com/users/${username}/subscriptions`,
        'organizations_url': `https://api.github.com/users/${username}/orgs`,
        'repos_url': `https://api.github.com/users/${username}/repos`,
        'events_url': `https://api.github.com/users/${username}/events{/privacy}`,
        'received_events_url': `https://api.github.com/users/${username}/received_events`,
        'type': `User`,
        'site_admin': faker.random.boolean()
      },
      'name': `${repo}`,
      'full_name': `${username}/${repo}`,
      'description': faker.lorem.sentence(),
      'private': faker.random.boolean(),
      'fork': faker.random.boolean(),
      'url': `https://api.github.com/repos/${username}/${repo}`,
      'html_url': `https://github.com/${username}/${repo}`,
      'archive_url': `http://api.github.com/repos/${username}/${repo}/{archive_format}{/ref}`,
      'assignees_url': `http://api.github.com/repos/${username}/${repo}/assignees{/user}`,
      'blobs_url': `http://api.github.com/repos/${username}/${repo}/git/blobs{/sha}`,
      'branches_url': `http://api.github.com/repos/${username}/${repo}/branches{/branch}`,
      'clone_url': `https://github.com/${username}/${repo}.git`,
      'collaborators_url': `http://api.github.com/repos/${username}/${repo}/collaborators{/collaborator}`,
      'comments_url': `http://api.github.com/repos/${username}/${repo}/comments{/number}`,
      'commits_url': `http://api.github.com/repos/${username}/${repo}/commits{/sha}`,
      'compare_url': `http://api.github.com/repos/${username}/${repo}/compare/{base}...{head}`,
      'contents_url': `http://api.github.com/repos/${username}/${repo}/contents/{+path}`,
      'contributors_url': `http://api.github.com/repos/${username}/${repo}/contributors`,
      'deployments_url': `http://api.github.com/repos/${username}/${repo}/deployments`,
      'downloads_url': `http://api.github.com/repos/${username}/${repo}/downloads`,
      'events_url': `http://api.github.com/repos/${username}/${repo}/events`,
      'forks_url': `http://api.github.com/repos/${username}/${repo}/forks`,
      'git_commits_url': `http://api.github.com/repos/${username}/${repo}/git/commits{/sha}`,
      'git_refs_url': `http://api.github.com/repos/${username}/${repo}/git/refs{/sha}`,
      'git_tags_url': `http://api.github.com/repos/${username}/${repo}/git/tags{/sha}`,
      'git_url': `git:github.com/${username}/${repo}.git`,
      'hooks_url': `http://api.github.com/repos/${username}/${repo}/hooks`,
      'issue_comment_url': `http://api.github.com/repos/${username}/${repo}/issues/comments{/number}`,
      'issue_events_url': `http://api.github.com/repos/${username}/${repo}/issues/events{/number}`,
      'issues_url': `http://api.github.com/repos/${username}/${repo}/issues{/number}`,
      'keys_url': `http://api.github.com/repos/${username}/${repo}/keys{/key_id}`,
      'labels_url': `http://api.github.com/repos/${username}/${repo}/labels{/name}`,
      'languages_url': `http://api.github.com/repos/${username}/${repo}/languages`,
      'merges_url': `http://api.github.com/repos/${username}/${repo}/merges`,
      'milestones_url': `http://api.github.com/repos/${username}/${repo}/milestones{/number}`,
      'mirror_url': `git:git.example.com/${username}/${repo}`,
      'notifications_url': `http://api.github.com/repos/${username}/${repo}/notifications{?since, all, participating}`,
      'pulls_url': `http://api.github.com/repos/${username}/${repo}/pulls{/number}`,
      'releases_url': `http://api.github.com/repos/${username}/${repo}/releases{/id}`,
      'ssh_url': `git@github.com:${username}/${repo}.git`,
      'stargazers_url': `http://api.github.com/repos/${username}/${repo}/stargazers`,
      'statuses_url': `http://api.github.com/repos/${username}/${repo}/statuses/{sha}`,
      'subscribers_url': `http://api.github.com/repos/${username}/${repo}/subscribers`,
      'subscription_url': `http://api.github.com/repos/${username}/${repo}/subscription`,
      'svn_url': `https://svn.github.com/${username}/${repo}`,
      'tags_url': `http://api.github.com/repos/${username}/${repo}/tags`,
      'teams_url': `http://api.github.com/repos/${username}/${repo}/teams`,
      'trees_url': `http://api.github.com/repos/${username}/${repo}/git/trees{/sha}`,
      'homepage': `https://github.com`,
      'language': null,
      'forks_count': faker.random.number(),
      'stargazers_count': faker.random.number(),
      'watchers_count': faker.random.number(),
      'size': faker.random.number(),
      'default_branch': `master`,
      'open_issues_count': faker.random.number(),
      'has_issues': faker.random.boolean(),
      'has_wiki': faker.random.boolean(),
      'has_pages': faker.random.boolean(),
      'has_downloads': faker.random.boolean(),
      'pushed_at': faker.date.past(),
      'created_at': faker.date.past(),
      'updated_at': faker.date.past(),
      'permissions': {
        'admin': faker.random.boolean(),
        'push': faker.random.boolean(),
        'pull': faker.random.boolean()
      }
    }
    allRepos.push(results)
  }
  return {
    repos: allRepos
  }
}

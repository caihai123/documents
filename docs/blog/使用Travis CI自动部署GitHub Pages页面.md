---
title: 使用Travis CI自动部署GitHub Pages页面
data: 2020-06-24
description : 使用Travis CI自动部署GitHub Pages页面
---
# 使用Travis CI自动部署GitHub Pages页面
假设你已经知道GitHub的GitHub Pages功能，你只需要将前端文件放在GitHub仓库中，就可以在设置中开启此功能。
::: tip
项目名为 `${username}.github.io` 的项目会默认开启，可通过`https://${username}.github.io`（首页）访问，但是只能从massets分支构建。
:::

如果你平时开发的就是html文件，这样做是没有任何问题的，你只需要每次修改之后提交代码就可以了。但是现在大部分的前端开发都需要编译这种操作，也就是说源码是不能直接在浏览器上运行的，这时我们也有两种办法：
1，每次修改后在手动在本地打包，然后提交打包好的文件。
2，使用自动部署，每次提交代码后自动抓取代码并执行打包操作，然后自动将打包好的文件推送到github仓库中。

上面哪种方式好其实已经一目了然了，今天主要描述的就是使用Travis CI自动部署的过程和我遇到的一些问题。主要通过[vuepress](https://www.vuepress.cn/)项目和[vue](https://cn.vuejs.org/)项目来演示，另外，你可能对这个有兴趣
+ [vuePress部署](https://www.vuepress.cn/guide/deploy.html#github-pages)
+ [nuxt部署](https://www.nuxtjs.cn/faq/github-pages)

## vuepress项目部署
首先你得有一个vuepress项目和github账号，我假设这些你都有了，现在将vuepress项目上传到github仓库。

然后你需要有一个Travis CI账号：点击进入 [Travis CI](https://travis-ci.org/) 后直接使用github账号注册。

点击自己头像 `>` 点击`Settings`,找到你的vuepress项目并选中，就像这样
<img :src="$withBase('/static/img/travis-01.png')" alt="foo">

然后回到github页面，点击自己头像 `>` settings `>` Developer settings `>` Personal access tokens `>` 点击生成令牌
<img :src="$withBase('/static/img/git-token.png')" alt="foo">

你只需要选择截图中的权限，然后到最下面点击生成
<img :src="$withBase('/static/img/token.png')" alt="foo">

这时候你需要将他复制出来找个安全的地方保存，因为页面刷新之后你就看不见了，只能重新生成。

现在回到 `Travis CI` 页面，找到你的`vuepress`项目，点击后面的设置
<img :src="$withBase('/static/img/travis-setting.png')" alt="foo">

找到这个地方，在这里加上你刚才获取到的`GITHUB_TOKEN`
<img :src="$withBase('/static/img/setting-token.png')" alt="foo">

现在去到你的vuePress项目代码，在根项目下创建`.travis.yml`文件，这个属于`Travis CI`的配置文件，在`Travis CI`拉到你的代码后会通过里面的规则执行构建，就像这样
``` yml
    language: node_js
node_js:
  - lts/*
install:
  - npm install
script:
  - npm run docs:build # npm run docs:build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist 
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master # 从 master 分支拉取代码
```
上面的代码可以理解为：
给我们一个node环境，从 master 分支拉取代码，在拉取到的项目执行`npm install`命令，然后执行`npm run docs:build`命令，然后将`docs/.vuepress/dist `里的文件推送到你的github仓库中的`gh-pages`（默认）分支。

最后，将你的代码提交到仓库。看看`Travis CI`有没有帮你自动构建。

## vue项目部署

现在来看看怎么部署vue项目，其实每个工程的配置方式都差不多，只是`.travis.yml`会不一样而已。
```yml
    language: node_js
node_js:
  - lts/*
install:
  - npm install
script:
  - npm run build 
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: dist 
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master # 从 master 分支拉取代码
```
但是我要说的应该是另外一种情况，我现在有个vue项目，我想将他部署到`caihai123.github.io` 也就是我的首页中，但是前面也说了，首页必须从`master`分支构建，所以我开心把配置文件改成了这样
``` yml
    language: node_js
node_js:
  - lts/*
install:
  - npm install
script:
  - npm run build 
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  target-branch: master
  on:
    branch: gh-page
```
也就是说将源码放在`gh-page`分支，当代码变更的时候拉取`gh-page`分支的代码执行打包，然后将打包后的`dist`推送到`master`分支上。但是当我提交代码之后，
<img :src="$withBase('/static/img/travix-log.png')" alt="foo">

意思是不允许推送到这个分支，想想也还好理解，这个分支是有点特殊。正当我要放弃的时候又发现了另外一种方式，不禁感叹别人的智慧，果然牛逼
``` yml
language: node_js
node_js:
  - lts/*
install:
  - npm install
script:
  - npm run build 
after_script:
  - cd ./dist
  - git init
  - git config user.name "${GIT_NAME}"
  - git config user.email "${GIT_EMAIL}"
  - git add .
  - git commit -m "Update docs"
  - git push --force --quiet "https://${GITHUB_TOKEN}@${GH_REF}" master:master
branches:
  only:
  - gh-page
env:
 global:
   - GH_REF: github.com/caihai123/caihai123.github.io.git
```
意思也很明确，我们本地都可以使用 `git` 向 `master` 上提交代码，凭什么它就不行。

::: warning
要是帅一点的人可能应该也注意到了，现在我的网页的域名是 `caihai123` , 可不是github自带的 `caihai123.github.io` 。因为我配置了自定义域名，需要注意的是，使用了自定义域名之后在你的 `${username}.github.io` 的 `master` 分支根目录下一定会有个 `CNAME` 文件，里面写的就是你的域名，现在你每次提交代码后 `master` 的代码都会被全部替换，所以我直接把`CNAME`我的vue工程中的 `public` 中，这样每次打包之后的 `dist` 下就会有这个文件了，是不是很棒棒哒！

:::

## 总结

最后总结一下，`Travis CI`自动化配置主要有这几步：
1. 注册 `Travis CI` 账号。
2. 将 `github` 上生成的 `Personal access tokens`(令牌)配置到 `Travis CI` 中。
3. 添加 `.travis.yml` 配置文件
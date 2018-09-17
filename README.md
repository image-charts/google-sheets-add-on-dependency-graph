Insert a dependency graph in Google Sheets (custom formula)
============================================================

[![Codecov branch](https://img.shields.io/codecov/c/github/image-charts/google-sheets-add-on-dependency-graph/master.svg)](https://codecov.io/gh/image-charts/google-sheets-add-on-dependency-graph) [![CircleCI branch](https://img.shields.io/circleci/project/github/image-charts/google-sheets-add-on-dependency-graph/master.svg)](https://circleci.com/gh/image-charts/google-sheets-add-on-dependency-graph)

# What is is?

Dependency graph is a Google Apps add-ons for Google Sheet that display beautiful dependency image graphs generated with [Image-Charts](https://www.image-charts.com/?google-sheets-add-on-dependency-graph).

> We've built a roadmap on google spreadsheet but now we can't find a way to visualize the whole dependency graph 😥

> [Hold my beer](https://twitter.com/FGRibreau/status/1041782155364446208).

![](https://pbs.twimg.com/media/DnUnQm9XcAAa7fk.jpg)

# Usage

- Open your spreadsheet
- (todo)
- `=image(DEPENDENCY_GRAPH_URL(B2:B23; F2:F23; "ortho"); 2)`

See [example](#todo).

# Add-on development

### Setup

- Enable Apps Script API: https://script.google.com/home/usersettings
- `npm install`
- `npm run first-run` to setup clasp

### Deploy on Google App Scripts

```
npm run deploy
```


### Resources

- https://developers.google.com/gsuite/add-ons/overview
- https://github.com/gsuitedevs/apps-script-samples
- https://stackoverflow.com/a/37056733/745121
- https://github.com/oshliaer/google-apps-script-awesome-list
- https://github.com/fossamagna/gasify

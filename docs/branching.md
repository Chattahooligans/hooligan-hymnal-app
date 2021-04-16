# Hooligan Hymnal Branching Guide

Like many open-source projects, Hooligan Hymnal does new development on feature or bugfix branches, which are then reviewed in a pull request before being merged into the `main` branch. It's not always apparent to new developers how to build a version for their SG while staying up-to-date on the latest changes from upstream, however. This guide shows the existing workflow that other developers are using to both work upstream and build their own versions.

# Starting your branch

Start from the latest instance of the `main` branch, then run `git checkout -b YOUR_BRANCH_NAME_HERE`. You can make your changes to your configuration from this new branch and version control them. Creating the new branch should be the first thing that you do so that you avoid accidentally committing your configuration changes to your local copy of `main`.

# Updating your branch from upstream

When you want to upgrade your version of the app to the latest upstream changes, run the following commands:

`git pull`
`git merge origin/main`

Resolve any merge conflicts, then check the version history of the example config files to see if there are any new configuration keys added. You will want to add these to your local configuration and adjust them to match your installation. Hooligan Hymnal regularly adds new configuration options for the app's behavior and skin, and not reviewing for these may lead to surprising behavior when you upgrade.

# Contributing upstream

When making code changes, please make sure your feature branches are created from `main` instead of from your SG's branch! Doing otherwise will result in a PR that includes your SG's configuration changes and any customizations you have made to the code, which will be rejected until it is cleaned up.

If you did some development work on your SG branch and want to create a clean feature branch from it, you can use Git's [cherry-pick](https://git-scm.com/docs/git-cherry-pick) feature to apply the commits to the new branch.

# Breaking Changes

Breaking changes are documented in a PR for each version of the platform. The PR contains a comment documenting what needs to be changed in your downstream branch (usually adding configuration settings). The code will often still run without running these changes, but unexpected issues can occur, so be sure to check the PRs!
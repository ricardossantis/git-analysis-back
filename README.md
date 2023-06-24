# Git analysis
## Tool that aims to provide relevant code quality information on a repository leveraging neural networks and git history analysis
### it uses the cli tool code maat and related scripts to make the main analysis and brainJs as a neural network tool

## Ps: to run it, it's necessary to build the docker image of code maat locally and also upload a log file available by running this command on the desired repo:
### git log --all --numstat --date=short --pretty=format:'--%h--%ad--%aN' --no-renames --after=2018-01-01 > logfile.log
[link]https://github.com/adamtornhill/code-maat

## GitHub integration may be done in the future, only the logFile upload will be available

### Commands are on package.json file.
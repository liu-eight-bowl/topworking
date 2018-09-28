
# Author: Andy
# 此文件方便命令行一键执行add，commit和push，提高效率
# 使用方法-进入git.sh对应的目录，然后在git命令行上执行 ： ./git.sh

unset msg

read -p "请输入commit提交的描述: " msg

git add -A
git commit -m "$msg"
git push
git status
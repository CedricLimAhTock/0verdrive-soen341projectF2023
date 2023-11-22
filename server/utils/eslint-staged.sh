#!/bin/bash
clear
fileList=$(git diff --diff-filter=d --cached --name-only | cut -d'/' -f2- | grep -E '\.(js|vue)$')
if [ ${#fileList} -lt 1 ]; then
    echo -e "You have no staged .js or .vue files to test\n"
    exit
fi
npx eslint ${fileList[*]} "$@"
if [ $? -ne 0 ]; then
    echo -e "\nPlease fix the above linting issues before committing.\n"
    exit 1
fi
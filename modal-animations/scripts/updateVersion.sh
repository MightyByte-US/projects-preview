#!/bin/bash

branch_name=$1

if [[ -z $branch_name ]]; then
    # Get branch's name from current branch
    branch_name=$(git branch --show-current)
    echo "On branch: $branch_name"
fi

# Note: \d doesn't work, hence the use of [0-9]
version_regex='^build\/([0-9]+\.[0-9]+\.[0-9]+)$'
if [[ $branch_name =~ $version_regex ]]; then
    # Version matched, update version
    version=${BASH_REMATCH[1]}

    current_dir=$(dirname ${BASH_SOURCE[0]})
    ./$current_dir/updateChangelog.sh $version

    # Update package.json, package-lock.json, commit and tag
    updated_version=$(npm version $version -m "Build %s")

    echo "Updated to $updated_version"
else
    echo "The current branch's name doesn't have the format 'build/major.minor.patch'. Skipping..."
fi
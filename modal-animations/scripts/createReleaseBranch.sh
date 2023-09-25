#!/bin/bash

if [[ "$(git status --porcelain)" ]]; then
    echo "Please commit your changes first"
    exit 1
fi

echo -ne "What is the version number (valid format: major.minor.patch)? "
read version_number

# Note: \d doesn't work, hence the use of [0-9]
version_regex='^[0-9]+\.[0-9]+\.[0-9]+$'
if [[ $version_number =~ $version_regex ]]; then
    echo -ne "From which branch do you want to create the release from (leave empty to create from the current branch)? "
    read branch_name

    build_branch_name=build/$version_number
    git checkout -b $build_branch_name $branch_name

    echo -ne "Do you want to push $build_branch_name to the remote repository? (y/N) "
    read push_answer

    if [[ $push_answer == "y" || $push_answer == "Y" ]]; then
        git push -u origin $build_branch_name
    fi
else
    echo "The format entered is invalid"
fi
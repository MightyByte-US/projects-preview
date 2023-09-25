#!/bin/bash

version_number=$1

# Note: \d doesn't work, hence the use of [0-9]
version_regex='^[0-9]+\.[0-9]+\.[0-9]+$'
if [[ $version_number =~ $version_regex ]]; then
    changelog_file=CHANGELOG.md

    if [[ -e $changelog_file ]]; then
        # Replace changelog's "Unreleased" with the "version number - date"
        current_date=$(date '+%Y-%m-%d')
        sed -i'.bak' 's/ Unreleased/ '$version_number' - '$current_date'/g' $changelog_file
        rm $changelog_file'.bak'
        git add CHANGELOG.md && git commit -m "Update changelog: $version_number"
    else
        echo "$changelog_file not found, skipping it"
    fi
else
    echo "The version number format must be 'major.minor.patch'"
fi


#!/usr/bin/env bash

# filename: bugsnag.sh
echo "set env variables"
set -a # automatically export all variables
source .env
set +a
echo "upload ios sourcemaps"
bugsnag-sourcemaps upload --api-key $BUGSNAG_API_KEY --minified-file sourcemaps/ios-release.bundle --source-map sourcemaps/ios-release.bundle.map --minified-url main.jsbundle --upload-sources

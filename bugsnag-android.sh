

#!/usr/bin/env bash

# filename: bugsnag-android.sh

echo "set env variables"
set -a # automatically export all variables
source .env
set +a
echo "upload android sourcemaps"
bugsnag-sourcemaps upload --api-key $BUGSNAG_API_KEY --minified-file sourcemaps/android-release.bundle --source-map sourcemaps/android-release.bundle.map --minified-url index.android.bundle --upload-sources

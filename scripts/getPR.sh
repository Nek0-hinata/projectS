#!/usr/bin/env bash

# $1=steps.commit_type.outputs.release_type
# $2=github.event_name

#REPLACED="${TITLE//\//\\/}"
cat <<EOF >./remote_pr.md
$(gh pr view)
EOF
TITLE=${GITHUB_REF#refs/heads/}
IDENTIFIER=$(cat <<EOF
- [ ] The above area is tracked and modified by GitHub Actions. Check this option if you want to control by yourself.
EOF
)
if ! grep -Fq -- "$IDENTIFIER" ./remote_pr.md && [ "$2" == 'push' ]; then
  echo "skip"
  exit 0
#    PR_BODY="$(sed -n "/$REPLACED/,\$p" ./remote_pr.md)"
else
  echo "disableSkip"
fi

PR_TEMPLATE=$(cat .github/PR_TEMPLATE.md)
PR_BODY="${PR_TEMPLATE//\[Branch-Placeholder\]/$TITLE}"
COMMITS=$(git log origin/develop..HEAD --pretty=format:"- %s")
PR_BODY="${PR_BODY//\[Commits-Placeholder\]/$COMMITS}"

#steps.commit_type.outputs.release_type
case $1 in
  *major)
    PR_BODY="${PR_BODY//\[ \] Breaking change/[x] Breaking change}"
    ;;
  *minor)
    PR_BODY="${PR_BODY//\[ \] New feature/[x] New feature}"
    ;;
  *patch)
    PR_BODY="${PR_BODY//\[ \] Bug fix/[x] Bug fix}"
    ;;
esac

cat <<EOF >./pr_body.md
$PR_BODY
EOF
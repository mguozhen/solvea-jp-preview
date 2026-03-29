#!/bin/bash
echo "aws upload start"

folder=shulex-static-solvea/_next/static
param=$1

if [ -z $param ]; then
    param=production
fi

if [ "$param" = "staging" ]; then
    folder=shulex-static-solvea-staging/_next/static/
fi

echo $param

echo $param
echo "[AWS] Setup success!"

ls ./.next/static/
ls ./.next/static/css

aws s3 cp ./.next/static/ s3://shulex-static/$folder/ --recursive --exclude "*.txt" --profile default


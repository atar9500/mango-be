#!/bin/bash

while [ $# -gt 0 ]; do
    if [[ $1 == *"--"* ]]; then
        v="${1/--/}"
        declare $v="$2"
    fi
    shift
done

_service=${service:-mango}
_region=${region:-eu-central-1}

echo "SERVICE=$_service-$_region" > .env
echo "REGION=$_region" >> .env

sms_auth_external_id=$(openssl rand -hex 32)
echo "SMS_AUTH_EXTERNAL_ID=$sms_auth_external_id" >> .env

secret=$(openssl rand -hex 32)
echo "SECRET=$secret" >> .env
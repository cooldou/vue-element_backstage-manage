version=$1

npm run build staging

docker build -t management:${version} .
docker tag management:${version} gp-local.cn:8002/management-web-front/management:${version}
docker push gp-local.cn:8002/management-web-front/management:${version}

rm -rf dist



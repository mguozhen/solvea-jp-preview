# !/bin/bash

export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v14.18.2/bin:/home/ubuntu/.yarn/bin;

YARN_DIR=/home/ubuntu/.yarn/bin/yarn
NPM_DIR=/home/ubuntu/.nvm/versions/node/v14.18.2/bin/npm

DOCKER_IMAGE=shulex-official-solvea-cx
PROJ_DIR=/home/ubuntu/apps/shulex-official-solvea-cx

rm -rf $PROJ_DIR
mkdir -p $PROJ_DIR
tar -xvf /home/ubuntu/apps/next.tar.gz -C $PROJ_DIR
# 容器id要在构建前查，不然名字不对
CONTAINER_LIST=`sudo docker container ls --filter ancestor=$DOCKER_IMAGE --quiet`
cd $PROJ_DIR

# build docker
sudo docker build --cpu-period=100000 --cpu-quota=50000 -m 2g --build-arg app_env_arg=staging -t $DOCKER_IMAGE ./

### 新的启动了，杀旧的
echo CONTAINER_LIST

for dockerPid in $CONTAINER_LIST; do
	echo killing $dockerPid
	sudo docker kill $dockerPid
done


# run docker
sudo docker run --memory=1g --cpus=0.5 --restart unless-stopped -p 3000:3000 -d $DOCKER_IMAGE

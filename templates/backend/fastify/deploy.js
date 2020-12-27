module.exports = function(){
    return `#!/bin/bash
apt-get install -y awscli
aws --version
export PATH:$PATH/$HOME/.local/bin

add-apt-repository ppa:eugenesan/ppa
apt-get update
apt-get install jq -y

curl https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy | \
  sudo tee -a /usr/bin/ecs-deploy
sudo chmod +x /usr/bin/ecs-deploy

eval "$(aws ecr get-login --region us-east-1)"

# Do not use "latest" to tag an image.
# This is bad practive
docker build -t username/ecs-auto-deploy .
docker tag username/ecs-auto-deploy:latest $IMAGE_REPO_URL:latest
docker push $IMAGE_REPO_URL:latest


ecs-deploy -c $CLUSTER_NAME -n $SERVICE_NAME -i $IMAGE_REPO_URL:latest
`
}
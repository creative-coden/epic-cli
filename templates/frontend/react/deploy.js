module.exports = function () {
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

# eval "$(aws ecr get-login --region us-east-2)"
eval "$(aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 999289053399.dkr.ecr.us-east-2.amazonaws.com)"

# Do not use "latest" to tag an image.
# This is bad practice
docker build -t $AWS_IMAGE_TAG .
docker tag $AWS_IMAGE_TAG:latest  $AWS_STAGING_REPO_URL/$AWS_IMAGE_TAG:latest
docker push $AWS_STAGING_REPO_URL/$AWS_IMAGE_TAG:latest

ecs-deploy -c $AWS_CLUSTER_NAME -n $AWS_SERVICE_NAME -i $AWS_IMAGE_REPO_URL/$AWS_IMAGE_TAG:latest
`;
};

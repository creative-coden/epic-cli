module.exports = function(){
    return `language: node_js
sudo: false
node_js:
  - "14"

_test_job: &test_job
  services:
    - docker
  before_install:
    - npx audit-ci -h -c
    - docker build -t carlad/sinatra .
      - docker run -d -p 127.0.0.1:80:4567 carlad/sinatra /bin/sh -c "cd /root/sinatra; npm run test;"
      - docker ps -a
      - docker run carlad/sinatra /bin/sh -c "cd /root/sinatra; bundle exec rake test"
    - docker run -e CI=true wilpat/sample-app npm run test -- --coverage
    # First, build the container
    - docker build -t $IMAGE_NAME:$IMAGE_TAG .
    # Then, run the tests inside your container
    - docker run — name $IMAGE_NAME-tester-$IMAGE_TAG $IMAGE_NAME:$IMAGE_TAG sh -c “npm run test“
    # Finally, copy the test results from inside your container to the CI, so that you may use it as an artifact
    - mkdir -p artifacts
    - docker cp $IMAGE_NAME-tester-$IMAGE_TAG:/usr/app/src/test-reports ./artifacts/
    - docker rm -f $IMAGE_NAME-tester-$IMAGE_TAG

_deploy_job: &deploy_job
  # Using docker compose
  # - sudo rm /usr/local/bin/docker-compose
  # - curl -L https://github.com/docker/compose/releases/download/\${DOCKER_COMPOSE_VERSION}/docker-compose-\`uname -s\`-\`uname -m\` > docker-compose
    # - chmod +x docker-compose
    # - sudo mv docker-compose /usr/local/bin
  script:
    - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
    - docker build -t $APP_NAME .
    - docker images
    - docker tag $APP_NAME $DOCKER_USERNAME/$APP_NAME
    - docker push $DOCKER_USERNAME/$APP_NAME
    - bash deploy.sh
  deploy:
    before_deploy: echo "Preparing to deploy to $ENV"
    after_deploy: echo "Successfully deployed to $ENV"

_development_env: &development_env
  - AWS_ACCESS_KEY_ID=\${AWS_ACCESS_KEY_ID_DEVELOPMENT}
  - AWS_SECRET_ACCESS_KEY=\${AWS_SECRET_ACCESS_KEY_DEVELOPMENT}
  - AWS_IMAGE_REPO_URL=\${AWS_IMAGE_REPO_URL_DEVELOPMENT}
  - AWS_SERVICE_NAME=\${AWS_SERVICE_NAME_DEVELOPMENT}
  - AWS_CLUSTER_NAME=\${AWS_CLUSTER_NAME_DEVELOPMENT}
  - AWS_S3_ACCESS_KEY_ID=\${AWS_S3_ACCESS_KEY_ID_DEVELOPMENT}
  - AWS_S3_SECRET_ACCESS_KEY=\${AWS_S3_SECRET_ACCESS_KEY_DEVELOPMENT}

_uat_env: &uat_env
  - AWS_ACCESS_KEY_ID=\${AWS_ACCESS_KEY_ID_UAT}
  - AWS_SECRET_ACCESS_KEY=\${AWS_SECRET_ACCESS_KEY_UAT}
  - AWS_IMAGE_REPO_URL=\${AWS_IMAGE_REPO_URL_UAT}
  - AWS_SERVICE_NAME=\${AWS_SERVICE_NAME_UAT}
  - AWS_CLUSTER_NAME=\${AWS_CLUSTER_NAME_UAT}
  - AWS_S3_ACCESS_KEY_ID=\${AWS_S3_ACCESS_KEY_ID_UAT}
  - AWS_S3_SECRET_ACCESS_KEY=\${AWS_S3_SECRET_ACCESS_KEY_UAT}

_production_env: &production_env
  - AWS_ACCESS_KEY_ID=\${AWS_ACCESS_KEY_ID_PRODUCTION}
  - AWS_SECRET_ACCESS_KEY=\${AWS_SECRET_ACCESS_KEY_PRODUCTION}
  - AWS_IMAGE_REPO_URL=\${AWS_IMAGE_REPO_URL_PRODUCTION}
  - AWS_SERVICE_NAME=\${AWS_SERVICE_NAME_PRODUCTION}
  - AWS_CLUSTER_NAME=\${AWS_CLUSTER_NAME_PRODUCTION}
  - AWS_S3_ACCESS_KEY_ID=\${AWS_S3_ACCESS_KEY_ID_PRODUCTION}
  - AWS_S3_SECRET_ACCESS_KEY=\${AWS_S3_SECRET_ACCESS_KEY_PRODUCTION}

jobs:
  include:
  - name: "Deploy to develop"
    if: (type = push OR type = pull_request) AND branch = develop
    env:
      - ENV=develop
      - <<: *development_env
    <<: *test_job
    <<: *deploy_job
  - name: "Deploy to uat"
    if: (type = push OR type = pull_request) AND branch = uat
    env:
      - ENV=uat
      - <<: *uat_env
    <<: *test_job
    <<: *deploy_job
  - name: "Deploy to production"
    if: (type = push OR type = pull_request) AND branch = master
    env:
      - ENV=production
      - <<: *production_env
    <<: *test_job
    <<: *deploy_S3
`
}
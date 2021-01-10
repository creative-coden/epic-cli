module.exports = function () {
  return `jobs:
  test:
    executor:
      name: node/default
      tag: '14.15'
    steps:
      - checkout
      - node/install-packages
      - run:
          command: npx audit-ci -h -c
      - run:
          command: npm ci
      - run:
          command: npm run build

aws_job_template: &aws_job_template
  account-url: AWS_ECR_ACCOUNT_URL
  aws-access-key-id: AWS_ACCESS_KEY_ID
  aws-secret-access-key: AWS_SECRET_ACCESS_KEY
  dockerfile: Dockerfile
  no-output-timeout: 20m
  workspace-root: '.'
  region: AWS_REGION
  repo: $AWS_RESOURCE_NAME_PREFIX
  create-repo: true
  path: '.'
  skip-when-tags-exist: false
  attach-workspace: true
  tag: 'latest'
  requires:
    - test
  filters:
      branches:
          only: staging

service_template: &service_template
  family: \${AWS_RESOURCE_NAME_PREFIX}-task
  cluster-name: \${AWS_RESOURCE_NAME_PREFIX}-cluster
  service-name: \${AWS_RESOURCE_NAME_PREFIX}-service
  container-image-name-updates: container=\${AWS_RESOURCE_NAME_PREFIX},tag=latest
  filters:
    branches:
        only: staging

orbs:
  node: circleci/node@4.1.0
  aws-ecr: circleci/aws-ecr@6.15.2
  aws-ecs: circleci/aws-ecs@0.0.15
version: 2.1
workflows:
  run_tests:
    jobs:
      - test:
          context: staging
          filters:
            branches:
              only: staging
      - aws-ecr/build-and-push-image:
          context: staging
          <<: *aws_job_template
      - aws-ecs/deploy-service-update:
          context: staging
          requires:
            - aws-ecr/build-and-push-image
          <<: *service_template
`;
};

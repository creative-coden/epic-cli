#!/bin/bash

sudo apt update && sudo apt-get install default-jdk && sudo apt-get install maven
wget https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/2.3.2.RELEASE/spring-boot-cli-2.3.2.RELEASE-bin.tar.gz -P /tmp
sudo tar xf /tmp/spring-boot-cli-2.3.2.RELEASE-bin.tar.gz -C /opt
sudo ln -s /opt/spring-2.3.2.RELEASE/bin/spring /bin/spring



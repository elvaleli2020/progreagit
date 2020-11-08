FROM openjdk:8-jdk-alpine
VOLUME  /tmp
EXPOSE 8081
ADD ./target/ProgreaGit-0.0.1-SNAPSHOT.jar ProgreaGit.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/ProgreaGit.jar"]
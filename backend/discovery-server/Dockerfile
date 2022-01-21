FROM openjdk:11
LABEL maintainer="Pellumb Baboci"

ADD target/discovery-server-0.0.1-SNAPSHOT.jar discovery-server-v1.jar
ENTRYPOINT ["java -Dserver.port=$PORT","-jar","discovery-server-v1.jar"]
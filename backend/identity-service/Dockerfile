FROM openjdk:11
LABEL maintainer="Pellumb Baboci"

ADD target/identity-service-0.0.1-SNAPSHOT.jar identity-service-v1.jar
ENTRYPOINT ["java -Dserver.port=$PORT","-jar","identity-service-v1.jar"]
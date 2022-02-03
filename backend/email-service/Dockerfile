FROM openjdk:11
LABEL maintainer="Pellumb Baboci"

ADD target/email-service-0.0.1-SNAPSHOT.jar email-service-v1.jar
ENTRYPOINT ["java -Dserver.port=$PORT","-jar","email-service-v1.jar"]
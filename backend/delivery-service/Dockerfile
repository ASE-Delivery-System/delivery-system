FROM openjdk:11
LABEL maintainer="Pellumb Baboci"

ADD target/delivery-service-0.0.1-SNAPSHOT.jar delivery-service-v1.jar
ENTRYPOINT ["java -Dserver.port=$PORT","-jar","delivery-service-v1.jar"]
FROM openjdk:11
LABEL maintainer="Pellumb Baboci"

ADD target/api-gateway-0.0.1-SNAPSHOT.jar api-gateway-v1.jar
ENTRYPOINT ["java -Dserver.port=$PORT","-Dquarkus.http.host=0.0.0.0", "-Dquarkus.http.port=${PORT}", "-XX:+UseContainerSupport", "-jar","api-gateway-v1.jar"]
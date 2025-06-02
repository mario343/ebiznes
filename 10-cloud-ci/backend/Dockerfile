FROM gradle:8.5-jdk17 AS build
COPY --chown=gradle:gradle . /app
WORKDIR /app
RUN gradle shadowJar --no-daemon

FROM openjdk:17-jdk
COPY --from=build /app/app/build/libs/*-all.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

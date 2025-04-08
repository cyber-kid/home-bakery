FROM openjdk:17
#RUN addgroup -S spring && adduser -S spring -G spring
#USER spring:spring
ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/WEB-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/WEB-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.home.home_bakery.Application"]
import java.util.Properties
import java.io.FileInputStream

val localProperties = Properties()
val localPropertiesFile = rootProject.file("local.properties")
if (localPropertiesFile.exists()) {
    FileInputStream(localPropertiesFile).use { localProperties.load(it) }
}

val ktorVersion by extra("3.1.0")
val exposedVersion by extra("0.61.0")
val sqliteVersion by extra("3.45.1.0") 

plugins {
    kotlin("jvm") version "2.1.20"
    kotlin("plugin.serialization") version "2.1.20"
    id("org.sonarqube") version "6.0.1.5171"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-netty-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktorVersion")
    implementation("io.ktor:ktor-server-cors:$ktorVersion")
    implementation("org.jetbrains.exposed:exposed-core:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-dao:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
    implementation("org.xerial:sqlite-jdbc:$sqliteVersion")
}

application {
    mainClass.set("com.example.ApplicationKt")
}

sonar {
    properties {
        property("sonar.projectKey", "mario343_backend")
        property("sonar.organization", "mario343")
        property("sonar.host.url", "https://sonarcloud.io")
        property("sonar.token", localProperties.getProperty("SONAR_TOKEN_BACKEND") ?: "")
        property("sonar.coverage.exclusions", "**/*")
    }
}
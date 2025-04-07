import io.ktor.client.*
import io.ktor.client.engine.cio.*
import kotlinx.coroutines.*

fun main() = runBlocking {
    val httpClient = HttpClient(CIO)
    val botClient = DiscordBotClient(httpClient, AppSettings.token, AppSettings.channel)

    val tasks = listOf(
        async { botClient.sendInitialMessage() },
        async { botClient.monitorMentions(AppSettings.botIdentifier) }
    )

    tasks.awaitAll()
    httpClient.close()
    println("HTTP client shutdown complete.")
}
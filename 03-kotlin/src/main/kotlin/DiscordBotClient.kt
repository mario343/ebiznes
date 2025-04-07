import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.serialization.json.*
import kotlinx.coroutines.*
import kotlin.random.Random

class DiscordBotClient(
    private val httpClient: HttpClient,
    private val botToken: String,
    channelID: String
) {
    private val endpoint = "https://discord.com/api/v10/channels/${channelID}/messages"

    suspend fun sendInitialMessage() {
        val randomNum = Random.nextInt(100)
        try {
            postMessage("Hello! Here's a random number: $randomNum")
        } catch (e: Exception) {
            println("Message delivery failed: ${e.message}")
        }
    }

    suspend fun monitorMentions(botTag: String) {
        var latestMessageId: String? = null
        while (true) {
            try {
                val message = getLatestMessage(afterMessage = latestMessageId)
                message?.let {
                    if (it.text?.contains(botTag) == true) {
                        println("Bot mentioned: ${it.text} by ${it.senderName}#${it.senderTag}")
                        postMessage("Thanks for mentioning me, ${it.senderName}!")
                    }
                    latestMessageId = it.id
                }
            } catch (e: Exception) {
                println("Error fetching messages: ${e.message}")
            }
            delay(1000)
        }
    }

    private suspend fun getLatestMessage(afterMessage: String? = null): ChatMessage? {
        val responseJson = httpClient.request(endpoint) {
            header(HttpHeaders.Authorization, "Bot $botToken")
            url {
                parameters.append("limit", "1")
                afterMessage?.let { parameters.append("after", it) }
            }
        }.body<String>()

        return parseMessageFromJson(responseJson)
    }

    private suspend fun postMessage(content: String) {
        val response = httpClient.request(endpoint) {
            method = HttpMethod.Post
            header(HttpHeaders.Authorization, "Bot $botToken")
            header(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            setJsonBody("""{"content":"$content"}""")
        }

        logMessageDelivery(response.status, content)
    }

    private fun HttpRequestBuilder.setJsonBody(content: String) {
        setBody(content)
    }

    private fun parseMessageFromJson(json: String): ChatMessage? {
        val jsonArray = Json.parseToJsonElement(json).jsonArray
        return jsonArray.firstOrNull()?.jsonObject?.let { messageObj ->
            val author = messageObj["author"]?.jsonObject
            ChatMessage(
                text = messageObj["content"]?.jsonPrimitive?.content,
                senderName = author?.get("username")?.jsonPrimitive?.content ?: "Unknown",
                senderTag = author?.get("discriminator")?.jsonPrimitive?.content ?: "0000",
                id = messageObj["id"]?.jsonPrimitive?.content ?: ""
            )
        }
    }

    private fun logMessageDelivery(status: HttpStatusCode, content: String) {
        println("Message delivery: [Status $status] $content")
    }
}

data class ChatMessage(val text: String?, val senderName: String, val senderTag: String, val id: String)
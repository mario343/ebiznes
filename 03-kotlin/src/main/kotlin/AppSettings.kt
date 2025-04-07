import kotlinx.serialization.*
import kotlinx.serialization.json.*
import java.io.File


@Serializable
data class BotConfig(val BOT_TOKEN: String, val CHANNEL_ID: String, val BOT_ID: String)

object AppSettings {
    private const val CONFIG_FILE = "src/main/resources/config.json"
    private val config: BotConfig by lazy {
        Json.decodeFromString(File(CONFIG_FILE).readText())
    }

    val token: String get() = config.BOT_TOKEN
    val channel: String get() = config.CHANNEL_ID
    val botIdentifier: String get() = config.BOT_ID
}
# Ebiznes

**Zadanie 1** Docker

:white_check_mark: 3.0 obraz ubuntu z Pythonem w wersji 3.10 [Link do commita](https://github.com/mario343/ebiznes/commit/d5b51fbea07a71e98ff9bd96fe3926fac1b49404)

:white_check_mark: 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem [Link do commita](https://github.com/mario343/ebiznes/commit/d5b51fbea07a71e98ff9bd96fe3926fac1b49404)

🐳 [Obraz na DockerHub](https://hub.docker.com/r/mario343/ebiznes)

:x: 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC
SQLite w ramach projektu na Gradle (build.gradle)

:x: 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji
przez CMD oraz gradle

:x: 5.0 dodać konfigurację docker-compose

Kod: 01-docker

[DEMO](https://github.com/mario343/ebiznes/blob/main/demos/zadanie1.gif)

**Zadanie 2** Scala

:white_check_mark: 3.0 Należy stworzyć kontroler do Produktów [Link do commita](https://github.com/mario343/ebiznes/commit/159d66bba63e21d4e6562c8df0fc46161d01973d)

:white_check_mark: 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy [Link do commita](https://github.com/mario343/ebiznes/commit/159d66bba63e21d4e6562c8df0fc46161d01973d)

:x: 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy
zgodnie z CRUD

:x: 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać
skrypt uruchamiający aplikację via ngrok

:x: 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD

:white_check_mark: Kontrolery mogą bazować na listach zamiast baz danych. CRUD: show all, show by id (get), update (put), delete (delete), add (post).

Kod: 02-scala

[DEMO](https://github.com/mario343/ebiznes/blob/main/demos/zadanie2.gif)

**Zadanie 3** Kotlin

:white_check_mark: 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor,
która pozwala na przesyłanie wiadomości na platformę Discord [Link do commita](https://github.com/mario343/ebiznes/commit/2775e4b00c2f2a8a1c7b18a195e578d3f2c3bbe0)

:white_check_mark: 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z
platformy Discord skierowane do aplikacji (bota) [Link do commita](https://github.com/mario343/ebiznes/commit/2775e4b00c2f2a8a1c7b18a195e578d3f2c3bbe0)

:x: 4.0 Zwróci listę kategorii na określone żądanie użytkownika

:x: 4.5 Zwróci listę produktów wg żądanej kategorii

:x: 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger,
Webex

Kod: 03-kotlin

[DEMO](https://github.com/mario343/ebiznes/blob/main/demos/zadanie3.gif)

**Zadanie 4** Go

:white_check_mark: 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie
miała kontroler Produktów zgodny z CRUD [Link do commita](https://github.com/mario343/ebiznes/commit/e26266cf9f5f30df5f552a0a22b91ec3d7c3b654)

:white_check_mark: 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz
wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast
listy) [Link do commita](https://github.com/mario343/ebiznes/commit/e26266cf9f5f30df5f552a0a22b91ec3d7c3b654)

:x: 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint

:x: 4.5 Należy stworzyć model kategorii i dodać relację między kategorią,
a produktem

:x: 5.0 pogrupować zapytania w gorm’owe scope'y

Kod: 04-go

[DEMO](https://github.com/mario343/ebiznes/blob/main/demos/zadanie4.gif)

**Zadanie 5** React

Należy stworzyć aplikację kliencką wykorzystując bibliotekę React.js.
W ramach projektu należy stworzyć trzy komponenty: Produkty, Koszyk
oraz Płatności. Koszyk oraz Płatności powinny wysyłać do aplikacji
serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach
z aplikacji serwerowej. Aplikacja serwera w jednym z trzech języków:
Kotlin, Scala, Go. Dane pomiędzy wszystkimi komponentami powinny być
przesyłane za pomocą React hooks.

:white_check_mark: 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej; [Link do commita](https://github.com/mario343/ebiznes/commit/e100fd0fb56833735e5ee3b149b1069a542cb50b)

:white_check_mark: 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing [Link do commita](https://github.com/mario343/ebiznes/commit/e100fd0fb56833735e5ee3b149b1069a542cb50b)

:white_check_mark: 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
pomocą React hooks [Link do commita](https://github.com/mario343/ebiznes/commit/e100fd0fb56833735e5ee3b149b1069a542cb50b)

:x: 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz
kliencką na dockerze via docker-compose

:x: 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

Kod: 05-react-06-tests

[DEMO](https://github.com/mario343/ebiznes/blob/main/demos/zadanie5.gif)

**Zadanie 6** Testy - Cypress js

Należy stworzyć 20 przypadków testowych w jednym z rozwiązań:

- Cypress JS (JS)
- Selenium (Kotlin, Python, Java, JS, Go, Scala)

Testy mają w sumie zawierać minimum 50 asercji (3.5). Mają również
uruchamiać się na platformie Browserstack (5.0). Proszę pamiętać o
stworzeniu darmowego konta via https://education.github.com/pack

:white_check_mark: 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium
(Kotlin, Python, Java, JS, Go, Scala) [Link do commita](https://github.com/mario343/ebiznes/commit/0de395b2c75d5f10bcdadc801baed79a1a3ab48d)

:white_check_mark: 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50
asercji [Link do commita](https://github.com/mario343/ebiznes/commit/0de395b2c75d5f10bcdadc801baed79a1a3ab48d)

:x: 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego
projektu z minimum 50 asercjami

:x: 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z
minimum jednym scenariuszem negatywnym per endpoint

:x: 5.0 Należy uruchomić testy funkcjonalne na Browserstacku

Kod: 05-react-06-tests
To zadanie jest rozszerzeniem zadania 05.

[DEMO](https://github.com/mario343/ebiznes/blob/main/demos/zadanie6.gif)
[DEMO](https://github.com/mario343/ebiznes/blob/main/demos/zadanie6_cli.gif)

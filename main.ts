namespace SpriteKind {
    export const Server = SpriteKind.create()
    export const Client = SpriteKind.create()
    export const Drink = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    client.y += -30
    if (client.y < 30) {
        client.y = 30
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    client.y += 30
    if (client.y > 90) {
        client.y = 90
    }
})
sprites.onOverlap(SpriteKind.Drink, SpriteKind.Client, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeScoreBy(1)
    if (info.score() % 5 == 0) {
        drinkSpeed += 10
        time += -1
        if (time <= 1) {
            time = 1
        }
    }
})
let drink: Sprite = null
let position = 0
let time = 0
let client: Sprite = null
let server = sprites.create(assets.image`server`, SpriteKind.Server)
server.setPosition(10, 60)
client = sprites.create(assets.image`client`, SpriteKind.Client)
client.setPosition(115, 60)
client.setStayInScreen(true)
time = 5
let clockTick = 0
let drinkSpeed = 50
game.onUpdateInterval(1000, function () {
    clockTick += 1
    if (clockTick == time) {
        position = randint(1, 3)
        server.y = position * 30
        drink = sprites.createProjectileFromSprite(assets.image`drink`, server, drinkSpeed, 0)
        drink.setKind(SpriteKind.Drink)
        clockTick = 0
    }
})

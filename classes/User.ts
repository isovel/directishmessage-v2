export default class User {
    id: string
    username: string
    discriminator: string
    flags: number
    get tag(): string { return `${this.username}#${this.discriminator}`; }
}

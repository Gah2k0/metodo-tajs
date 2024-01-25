import Service from "./service.js";

const data = {
    username: 'Gabriel',
    password: '12345'
}


const service = new Service({
    filename: './users.ndjson'
})

await service.create(data)

const users = await service.read();
console.log(users);
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { error } from 'node:console';
const dbUsers = [];

function getUserCategory(birthday) {
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    if(age >= 18 && age <= 25) {
        return 'young-adult'
    }
    if(age < 18) {
        throw new Error('User must be 18yo or older');
    }
}

const server = createServer(async (request, response) => {
    try {
        if(request.url === '/users' && request.method === 'POST') {
            const user = JSON.parse(await once(request, 'data'));
            const updatedUser = {
                ...user,
                id: randomUUID(),
                category: getUserCategory(user.birthday)
            }
            dbUsers.push(updatedUser);
            response.writeHead(201, {
                'Content-Type': 'application/json'
            });
            return response.end(JSON.stringify({
                    id: updatedUser.id
                })
            )
        }
        if(request.url.startsWith('/users') && request.method === 'GET') {
            const [,, id] = request.url.split('/');
    
            const user = dbUsers.find(user => user.id === id);
            response.end(JSON.stringify(user));
            return;
        }
        response.end('Hello World!')
    } catch (error) {
        if(error.message.includes('18yo')) {
            response.writeHead(400, {
                'Content-Type': 'application/json'
            })
            response.end(JSON.stringify({
                message: error.message
            }))
            return;
        }
        response.writeHead(500);
        response.end('deu ruim!');
    }
});

export { server };
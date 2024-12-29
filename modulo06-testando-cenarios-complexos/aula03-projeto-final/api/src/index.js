import { app } from "./api.js";

if(process.env.NODE_ENV !== 'test') {
    let server = app.listen(process.env.PORT, () => {
        const serverInfo = server.address();
        console.log(`server is running at ${serverInfo.address}:${serverInfo.port}`)
    })
};

export default app;
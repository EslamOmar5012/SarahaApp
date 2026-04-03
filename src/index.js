import bootstrap from "./app.bootstrap.js";
import { encrypt } from "./common/index.js";

await bootstrap();

const text1 = await encrypt("Eslam Omar");

// console.log(text1);

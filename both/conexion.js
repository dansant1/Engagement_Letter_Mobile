const Remoto = DDP.connect('http://localhost:3000');

let Letters = new Mongo.Collection('letters', Remoto);
let Clients = new Mongo.Collection('clients', Remoto);

let Templates = new Mongo.Collection('templates', Remoto);  
let Parties = new Mongo.Collection('parties', Remoto);

let Signatures = new Mongo.Collection('signatures', Remoto); 
let Logos = new Mongo.Collection('logos', Remoto);


export { Letters, Clients, Templates, Parties, Signatures }


export default Remoto
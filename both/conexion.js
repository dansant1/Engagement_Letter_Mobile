//const Remoto = DDP.connect('http://localhost:3000');
const Remoto = DDP.connect('https://app.engagementletter.co');

let Letters = new Mongo.Collection('letters', Remoto);
let Clients = new Mongo.Collection('clients', Remoto);

let Templates = new Mongo.Collection('templates', Remoto);
let Parties = new Mongo.Collection('parties', Remoto);

let Signatures = new Mongo.Collection('signatures', Remoto);
let Logos = new Mongo.Collection('logos', Remoto);

let Default_Templates = new Mongo.Collection('default_templates', Remoto);
let Engagement_types = new Mongo.Collection('engagement_types', Remoto);

export { Letters, Clients, Templates, Parties, Signatures, Engagement_types, Default_Templates}


export default Remoto

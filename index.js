/**
 * Monster Hunter RISE 属性を返すbot
 */
//  Libary Import
const Discord = require('discord.js');
const { Firestore } = require('@google-cloud/firestore');
const dotenv = require('dotenv');

//  Load Enviroment
dotenv.config();

//  discord login
const token = process.env.TOKEN;
const client = new Discord.Client()
const firestore = new Firestore();

const admin = require('firebase-admin')
const serviceAccount = require('./firebse-token.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()


client.on('ready', () => {
    console.log(
        `Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    const message = msg.content.split(' ').length > 1 ? msg.content.split(' ') : msg.content;
    const opt = message[0];

    if (opt === 'post') {
        const docRef = db.collection('monster').doc('MH-Attribute');
        console.log(opt);
        if (message.length == 2) {
            const monster = docRef.set({
                monster: message[1]
            }).then(() => {
                console.log(`append ${message[1]}`);
            }).catch((e) => {
                console.log("error:", e);
            });
        } else {
            msg.reply("Not allowed.");
        }
    } else if (opt === 'get') {
        console.log(opt);
        const docRef = db.collection('monster').get('MH-Attribute');

        docRef.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    }

});




client.login(token);
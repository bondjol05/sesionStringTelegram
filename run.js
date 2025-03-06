const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const rl = require('readline-sync');
require('colors')
const fs = require("fs")

const info = '[info] '.yellow
const failed = '[failed] '.red
const success = '[success] '.green

const apiId = 24164889;
const apiHash = "210318990ebc5eb19f14a2a5bd96e58e";
const session = new StringSession();

async function main() {
    console.clear()
    console.log(`DGP Store ...`.green)
    const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });

    await client.start({
        phoneNumber: async () => rl.question("Masukkan nomor telepon: "),
        password: async () => rl.question("Masukkan password Anda: "),
        phoneCode: async () => rl.question("Masukkan kode verifikasi yang diterima: "),
        onError: (err) => console.log(err.message.red),
    });

    const sessionString = client.session.save()
    console.log(success + "Berhasil masuk!");
    console.log(info + `String session anda : ${sessionString}`);
}

main()
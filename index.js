import { launch } from "puppeteer";
import { config } from "dotenv";
import { WebhookClient, EmbedBuilder } from "discord.js";

async function ping() {
	const browser = await launch({ headless: true });
	const page = await browser.newPage();
	try {
		await page.goto("https://modbot.chiroyce.repl.co", {
			timeout: 10000
		});
		await browser.close();
		return true;
	}
	catch (e) {
		await browser.close();
		return false;
	}

}

async function publish(status) {
	if (status) return; // Only post a message if it is down
	config();

	const client = new WebhookClient({ url: process.env.URL })
	console.log(status == false ? "ModBot is down" : "ModBot is up")
	const embed = new EmbedBuilder()
		.setColor(status == false ? 0xFF0000 : 0x00FF00)
		.setTitle(status === false ? "ModBot is **DOWN**!" : "ModBot is **UP**!")
		.setDescription(`Uptime stats for ModBot`)
		.setTimestamp();

	client.send({
		username: 'ModBot Status',
		avatarURL: 'https://github.com/fluidicon.png',
		embeds: [embed],
	})
}

(async () => {
	await publish(await ping());
})();

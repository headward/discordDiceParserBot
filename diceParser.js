import { PREFIX } from "./init.js";

export default {
    init(client) {
        client.on('messageCreate', async message =>{
			if(message.content.startsWith(PREFIX)){
                const input = message.content.slice(PREFIX.length);
                const dices = this.getDices(input);
                const faces = this.getFaces(input);
                if(dices.count === 0|| faces.count === 0){
                    message.reply('tu as du te tromper dans ton jet de dé')
                    return;
                }
                let roll = '';
                roll = this.rollTheDices(dices.count, faces.count);
                message.reply('`'+dices.count + ' dé(s) à '+ faces.count+'faces, résultat :\n' + roll+'`')
			}
		})
    },

    getDices(input) {
        const dices = {
            messageInput : input,
            count : 0,
        }
        if(input.trim().split(new RegExp('[dD]')).length === 0) return dices;
        if(input.trim().split(new RegExp('[dD]'))[0].length === 0) {
            dices.count = 1;
        } else if(!isNaN(parseInt(input.trim().split(new RegExp('[dD]'))[0]))) {
            dices.count = parseInt(input.trim().split(new RegExp('[dD]'))[0]);
        }
        return dices;
    },

    getFaces(input) {
        const faces = {
            messageInput : input,
            count : 0,
        }
        if(input.trim().split(new RegExp('[dD]')).length > 0
            && input.trim().split(new RegExp('[dD]'))[1].length > 0
            && !isNaN(parseInt(input.trim().split(new RegExp('[dD]'))[1]))) {
            faces.count = parseInt(input.trim().split(new RegExp('[dD]'))[1]);
        }
        return faces;
    },

    rollTheDices(dicesCount, facesCount) {
        let roll = '';
        const min = 1;
        for(let i = 0; dicesCount > i; i++) {
            roll += Math.floor(Math.random() * (facesCount - min +1)) + min + ' ';
        }
        console.log(roll);
        return roll
    }
};

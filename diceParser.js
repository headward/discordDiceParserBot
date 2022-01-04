import { PREFIX } from "./init.js";

export default {
    errorMessage: 'tu as du te tromper dans ton jet de dé, il manque des paramètres \n tape `!aide` pour plus d\'informations',
    helpMessage: 'Pour lancer un/des dé(s) voici comment faire :\n tape ton nombre de dé(s) suivi par le nombre de faces \nexemple `2d20` pour lancer 2 dés à 20 faces',
    init(client) {
        client.on('messageCreate', async message =>{
			if(message.content.startsWith(PREFIX)){
                const input = message.content.slice(PREFIX.length);
                if(this.isHelp(input)){
                    message.reply(this.helpMessage);
                    message.delete();
                    return
                }

                if(!this.hasNumber(input)) {
                    message.reply(this.errorMessage);
                    message.delete();
                    return;
                }

                const dices = this.getDices(input);
                const faces = this.getFaces(input);
                if(dices.count === 0|| faces.count === 0){
                    message.reply(this.errorMessage)
                    message.delete();
                    return;
                }
                let roll = '';
                roll = this.rollTheDices(dices.count, faces.count);
                message.reply(dices.count + ' dé(s) à '+ faces.count+' faces, résultat : \n `' + roll+'`')
			}
		})
    },
    isHelp(input) {
        return input === 'aide';
    },

    getDices(input) {
        const dices = {
            messageInput : input,
            count : 0,
        }
        const regex = new RegExp('[dD]');
        if(input.trim().split(regex).length === 0) return dices;
        if(input.trim().split(regex)[0].length === 0) {
            dices.count = 1;
        } else if(!isNaN(parseInt(input.trim().split(regex)[0]))) {
            dices.count = parseInt(input.trim().split(regex)[0]);
        }
        return dices;
    },

    getFaces(input) {
        const faces = {
            messageInput : input,
            count : 0,
        }
        const regex = new RegExp('[dD]');
        if(input.trim().split(regex).length > 0
            && input.trim().split(regex)[1].length > 0
            && !isNaN(parseInt(input.trim().split(regex)[1]))) {
            faces.count = parseInt(input.trim().split(regex)[1]);
        }
        return faces;
    },

    rollTheDices(dicesCount, facesCount) {
        let roll = '';
        const min = 1;
        for(let i = 0; dicesCount > i; i++) {
            roll += Math.floor(Math.random() * (facesCount - min +1)) + min + ' ';
        }
        return roll
    },
    hasNumber(input) {
        return /\d/.test(input);
    }
};

class ChatDamageButtons5e extends Application {
    constructor(app) {
        super(app);
    }

    init () {

        Hooks.on('renderChatMessage', (message, data, html) => {
            // do nothing if this is not a roll chat-message or if the roll is a d20 (as that is likely to be an attack roll)
            if ( !message.isRoll || message.roll.parts[0].faces == 20 ) return;

            const fullDamageButton = $('<button class="dice-total-fullDamage-btn" style="max-width: 10%;"><i class="fas fa-user-minus" title="Click to apply full damage to selected token(s)."></i></button>');
            const halfDamageButton = $('<button class="dice-total-halfDamage-btn" style="max-width: 10%;"><i class="fas fa-user-shield" title="Click to apply half damage to selected token(s)."></i></button>');
            const doubleDamageButton = $('<button class="dice-total-doubleDamage-btn" style="max-width: 10%;"><i class="fas fa-user-injured" title="Click to apply double damage to selected token(s)."></i></button>');
            const fullHealingButton = $('<button class="dice-total-fullHealing-btn" style="max-width: 10%;"><i class="fas fa-user-plus" title="Click to apply full healing to selected token(s)."></i></button>');

            if (game.user.isGM) {
                html.find('.dice-total').append(fullDamageButton);
                html.find('.dice-total').append(halfDamageButton);
                html.find('.dice-total').append(doubleDamageButton);
                html.find('.dice-total').append(fullHealingButton);

                // Handle button clicks
                fullDamageButton.click(ev => {
                    ev.stopPropagation();
                    Actor5e.applyDamage(html, 1);
                });
                
                halfDamageButton.click(ev => {
                    ev.stopPropagation();
                    Actor5e.applyDamage(html, 0.5);
                });

                doubleDamageButton.click(ev => {
                    ev.stopPropagation();
                    Actor5e.applyDamage(html, 2);
                });

                fullHealingButton.click(ev => {
                    ev.stopPropagation();
                    Actor5e.applyDamage(html, -1);
                });
            }

        })
    }
}

let chatButtons = new ChatDamageButtons5e();
chatButtons.init();
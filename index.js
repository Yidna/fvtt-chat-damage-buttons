Hooks.on('renderChatMessage', (message, html) => {

    if (!message.isRoll || message.roll.terms[0].faces === 20) {
        return;
    }

    const btnStyling = [
        'width: 22px;',
        'height: 22px;',
        'font-size: 10px;',
        'line-height: 1px;'
    ].join('');

    const fullDamageButton = $(`<button class="dice-total-fullDamage-btn" style="${btnStyling}"><i class="fas fa-user-minus" title="Apply full damage"></i></button>`);
    const halfDamageButton = $(`<button class="dice-total-halfDamage-btn" style="${btnStyling}"><i class="fas fa-user-shield" title="Apply half damage"></i></button>`);
    const doubleDamageButton = $(`<button class="dice-total-doubleDamage-btn" style="${btnStyling}"><i class="fas fa-user-injured" title="Apply double damage"></i></button>`);
    const fullHealingButton = $(`<button class="dice-total-fullHealing-btn" style="${btnStyling}"><i class="fas fa-user-plus" title="Apply full healing"></i></button>`);

    const btnContainer = $('<span class="dmgBtn-container" style="position:absolute; right:0; bottom:1px;"></span>');
    btnContainer.append(fullDamageButton);
    btnContainer.append(halfDamageButton);
    btnContainer.append(doubleDamageButton);
    btnContainer.append(fullHealingButton);

    html.find('.dice-total').append(btnContainer);

    fullDamageButton.click(e => {
        e.stopPropagation();
        canvas.tokens.controlled.forEach(token => token.actor.applyDamage(message.roll.total, 1));
    });

    halfDamageButton.click(e => {
        e.stopPropagation();
        canvas.tokens.controlled.forEach(token => token.actor.applyDamage(message.roll.total, 0.5));
    });

    doubleDamageButton.click(e => {
        e.stopPropagation();
        canvas.tokens.controlled.forEach(token => token.actor.applyDamage(message.roll.total, 2));
    });

    fullHealingButton.click(e => {
        e.stopPropagation();
        canvas.tokens.controlled.forEach(token => token.actor.applyDamage(message.roll.total, -1));
    });

});
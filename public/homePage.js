let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success = true) {
            location.reload();
        };
    });
};

ApiConnector.current(response => {
    if (response.success = true) {
        ProfileWidget.showProfile(response.data);
    };
});

let ratesBoard = new RatesBoard();

let getRates = () => {
    ApiConnector.getStocks((response) => {
        if (response.success = true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};

getRates();

let ratesBoardIntervalId = setInterval(getRates, 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success = true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Пополнение баланса прошло успешно');
        } else moneyManager.setMessage(false, response.error);
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success = true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация выполнена успешно');
        } else moneyManager.setMessage(false, response.error);
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success = true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен успешно');
        } else moneyManager.setMessage(false, response.error);
    });
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success = true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь добавлен успешно');
        } else favoritesWidget.setMessage(false, response.error);
    });
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь удален успешно');
        } else favoritesWidget.setMessage(false, response.error);
    });
}
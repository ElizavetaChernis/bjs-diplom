let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        };
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    };
});

let ratesBoard = new RatesBoard();

let getRates = () => {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};

getRatesBoard();

let ratesBoardIntervalId = setInterval(getRatesBoard, 60000);

let moneyManager = MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Пополнение баланса прошло успешно');
        } else moneyManager.setMessage(false, response.error);
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация выполнена успешно');
        } else moneyManager.setMessage(false, response.error);
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен успешно');
        } else moneyManager.setMessage(false, response.error);
    });
}

let favoritesWidget = FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favorites.setMessage(true, 'Пользователь добавлен успешно');
        } else favorites.setMessage(false, response.error);
    });
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favorites.setMessage(true, 'Пользователь удален успешно');
        } else favorites.setMessage(false, response.error);
    });
}
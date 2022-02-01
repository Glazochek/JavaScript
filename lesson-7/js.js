"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    }
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);

                const tdKey = `x${col}_y${row}`;
                this.cells[tdKey] = td;
            }
        }
        // game.GeneratingObstacles();
    },

    render(snakePointsArray, foodPoint) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((snakePoint, index) => {
            const snakePointKey = `x${snakePoint.x}_y${snakePoint.y}`;
            const snakeCell = this.cells[snakePointKey];

            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodPointKey = `x${foodPoint.x}_y${foodPoint.y}`;
        const foodCell = this.cells[foodPointKey];

        foodCell.classList.add('food');

        this.usedCells.push(foodCell);

        console.log(this.usedCells)
    },

};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBodyArray, direction) {
        this.body = startBodyArray;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some((snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        const snakeBody = this.getBody();
        this.lastStepDirection = this.direction;
        snakeBody.unshift(this.getNextStepHeadPoint());
        snakeBody.pop();
    },

    growUp() {
        const snakeBody = this.getBody();
        const lastSnakeBodyPointIndex = snakeBody.length - 1;
        const lastSnakeBodyPoint = snakeBody[lastSnakeBodyPointIndex];
        const lastSnakeBodyPointClone = Object.assign({}, lastSnakeBodyPoint);

        snakeBody.push(lastSnakeBodyPointClone);
    },

    getNextStepHeadPoint() {
        const headPoint = this.getBody()[0];

        switch (this.direction) {
            case 'up': return { x: headPoint.x, y: headPoint.y - 1 };
            case 'right': return { x: headPoint.x + 1, y: headPoint.y };
            case 'down': return { x: headPoint.x, y: headPoint.y + 1 };
            case 'left': return { x: headPoint.x - 1, y: headPoint.y };
        }
    }
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    tickInterval: null,
    // points_borrers: [],
    coins: 0,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validationData = this.config.validate();

        if (!validationData.isValid) {
            for (const err of validationData.errors) {
                console.log(err);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setEventHandlers();
        this.reset();

        // ------------------------------------------------------------------
        this.CoinsFromEat();
        this.GeneratingObstacles();
        // -----------------------------------------------------------------

    },

    GeneratingObstacles() {
        var e = 0;
        while (e < 8) {
            var randNum = this.getRandomFreeCoordinate();
            var yx = `x${randNum['x']}_y${randNum['y']}`;
            var mc = map.cells[yx];
            this.points_borrers.push({ x: randNum['x'], y: randNum['y'] });
            mc.id = 'b';
            e++;
        }
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinate());
        this.render();
        this.coins = 0;
        this.points_borrers = [];
        this.GeneratingObstacles();
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    getRandomFreeCoordinate() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const randomPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some((exPoint) => randomPoint.x === exPoint.x && randomPoint.y === exPoint.y)) {
                return randomPoint;
            }
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);
        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButtonState('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButtonState('Игра окончена', true);
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButtonState('Стоп');
    },

    setPlayButtonState(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();
        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinate());

            if (this.isGameWon()) this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    canMakeStep() {
        this.CoinsFromEat(this.coins);
        const nextStepSnakeHeadPoint = this.snake.getNextStepHeadPoint();
        const brb = Object.values(this.points_borrers);
        for (var r in brb) {
            if (brb[r].x == nextStepSnakeHeadPoint.x && brb[r].y == nextStepSnakeHeadPoint.y) {
                console.log(1);
                return;
            }
        };

        return !this.snake.isOnPoint(nextStepSnakeHeadPoint)
            && nextStepSnakeHeadPoint.x < this.config.getColsCount()
            && nextStepSnakeHeadPoint.y < this.config.getRowsCount()
            && nextStepSnakeHeadPoint.x >= 0
            && nextStepSnakeHeadPoint.y >= 0;
    },

    CoinsFromEat() {

        var s = snake.getNextStepHeadPoint();
        var ss = Object.values(s);
        var syx = `x${ss[0]}_y${ss[1]}`;

        var f = food.getCoordinates();
        var ff = Object.values(f);
        var fyx = `x${ff[0]}_y${ff[1]}`;

        let c = document.getElementById('coins');

        if (syx == fyx) {
            this.coins++;
            c.innerHTML = 'coins:' + ' ' + this.coins;
        }
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
    }
};

game.init({ speed: 5 });

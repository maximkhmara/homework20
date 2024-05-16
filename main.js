class SuperMath {
	check(obj) {
		const { X, Y, Z } = obj;
		if (this.isInvalidInput(X, Y, Z)) {
			alert('Введено некоректні дані. Спробуйте ще раз.');
			this.input();
			return;
		}
		const proceed = confirm(
			`Чи ви хочете зробити дію ${Z} з числами ${X} і ${Y}?`
		);
		if (proceed) {
			if (this.isValidOperator(Z)) {
				const result = this.calculate(X, Y, Z);
				alert(`Результат: ${result}`);
			} else {
				alert('Введено некоректний знак операції. Спробуйте ще раз.');
				this.input();
			}
		} else {
			this.input();
		}
	}

	input() {
		const X = parseFloat(prompt('Введіть число X:'));
		const Y = parseFloat(prompt('Введіть число Y:'));
		const Z = prompt('Введіть знак операції (+ - / * %):');
		this.check({ X, Y, Z });
	}

	isValidOperator(Z) {
		return ['+', '-', '/', '*', '%'].includes(Z);
	}

	isInvalidInput(X, Y, Z) {
		return (
			isNaN(X) ||
			isNaN(Y) ||
			Z.trim() === '' ||
			X === null ||
			Y === null ||
			Z === null
		);
	}

	calculate(X, Y, Z) {
		switch (Z) {
			case '+':
				return X + Y;
			case '-':
				return X - Y;
			case '/':
				return X / Y;
			case '*':
				return X * Y;
			case '%':
				return X % Y;
			default:
				throw new Error('Некоректний знак операції.');
		}
	}
}

const math = new SuperMath();
math.check({ X: 14, Y: 3, Z: '*' });

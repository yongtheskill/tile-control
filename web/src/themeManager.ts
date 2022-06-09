export const updateTheme = () => {
	if (
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
};

export const setTheme = (theme: number) => {
	switch (theme) {
		case 0:
			localStorage.removeItem('theme');
			break;
		case 1:
			localStorage.theme = 'light';
			break;
		default:
			localStorage.theme = 'dark';
			break;
	}
	updateTheme();
};

export const getTheme = (): number => {
	if (localStorage.theme === 'dark') return 2;
	if (localStorage.theme === 'light') return 1;
	return 0;
};

export const getDefaultTheme = (): number => {
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 2;
	}
	return 1;
};

export const useColourTheme = (): number => {
	if (localStorage.theme === 'dark') return 2;
	if (localStorage.theme === 'light') return 1;
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 2;
	}
	return 1;
};

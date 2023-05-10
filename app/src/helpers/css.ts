/* Reference: https://jsramblings.com/how-to-use-media-queries-with-styled-components/ */

const breakpoints = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1024px",
	laptopL: "1440px",
	desktop: "2560px",
};

export const device = {
	mobileS: `(min-width: ${breakpoints.mobileS})`,
	mobileM: `(min-width: ${breakpoints.mobileM})`,
	mobileL: `(min-width: ${breakpoints.mobileL})`,
	tablet: `(min-width: ${breakpoints.tablet})`,
	laptop: `(min-width: ${breakpoints.laptop})`,
	laptopL: `(min-width: ${breakpoints.laptopL})`,
	desktop: `(min-width: ${breakpoints.desktop})`,
	desktopL: `(min-width: ${breakpoints.desktop})`,
};

export const brandColors = {
	primary: {
		blueBlack: "#162f52",
		blue: "#193A8C",
		green: "#00cf83",
	},
	secondary: {
		midBlue: "#0467d0",
		lightBlue: "#1ebbfd",
		orange: "#ffa700",
		yellow: "#ffdf50",
		gray: "#ebf6ff",
	},
};

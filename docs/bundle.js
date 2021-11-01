class colorPicker {
    constructor(colorId, buttonId, infoId, hexId, strId) {
        this.$color = document.getElementById(colorId);
        this.$button = document.getElementById(buttonId);
        this.$info = document.getElementById(infoId);
        this.$hex = document.getElementById(hexId);
        this.$str = document.getElementById(strId);
    }

    static showError(error) {
        console.error(error);
    }

    showColor ({sRGBHex}) {
        this.$color.style.backgroundColor = sRGBHex;
        this.$info.classList.add('info--picked');
        this.$button.classList.add('button--picked');
        this.$str.classList.add('str--picked');
        this.$hex.style.color = colorPicker.invertColor(sRGBHex);
        this.$hex.innerText = sRGBHex;
        navigator.clipboard.writeText(sRGBHex.toUpperCase());
    }

    static invertColor(color) {
        return '#' + (Number(`0x1${color.slice(1)}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
    }

    openEyeDropper() {
        this.eyeDropper
            .open()
            .then((e) => this.showColor(e))
            .catch(colorPicker.showError);
    }

    init() {
        if (window.EyeDropper !== undefined) {
            this.eyeDropper = new window.EyeDropper();
            this.$button.addEventListener('click', () => {
                this.openEyeDropper()
            });
        } else {
            colorPicker.showError('EyeDropper API is not supported on this platform');
        }
    }
}

const picker = new colorPicker(
    'color',
    'button',
    'info',
    'hex',
    'str'
);

picker.init();
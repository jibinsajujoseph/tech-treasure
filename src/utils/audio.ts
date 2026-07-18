class AudioController {
  bgm: HTMLAudioElement;
  click: HTMLAudioElement;
  success: HTMLAudioElement;
  lose: HTMLAudioElement;
  finalSuccess: HTMLAudioElement;

  constructor() {
    this.bgm = new Audio('/assets/sounds/bgm.mp3');
    this.bgm.loop = true;
    this.click = new Audio('/assets/sounds/click.mp3');
    this.success = new Audio('/assets/sounds/success.mp3');
    this.lose = new Audio('/assets/sounds/lose.mp3');
    this.finalSuccess = new Audio('/assets/sounds/final_success.mp3');
  }

  playBgm(enabled: boolean) {
    if (!enabled) return;
    this.bgm.currentTime = 0;
    this.bgm.play().catch(e => console.error("Audio play blocked:", e));
  }

  stopBgm() {
    this.bgm.pause();
    this.bgm.currentTime = 0;
  }

  setBgmEnabled(enabled: boolean) {
    if (enabled) {
      if (this.bgm.paused) this.bgm.play().catch(e => console.error("Audio play blocked:", e));
    } else {
      this.bgm.pause();
    }
  }

  playClick(enabled: boolean) {
    if (!enabled) return;
    this.click.currentTime = 0;
    this.click.play().catch(() => {});
  }

  playSuccess(enabled: boolean) {
    if (!enabled) return;
    this.success.currentTime = 0;
    this.success.play().catch(() => {});
  }

  playLose(enabled: boolean) {
    if (!enabled) return;
    this.lose.currentTime = 0;
    this.lose.play().catch(() => {});
  }

  playFinalSuccess(enabled: boolean) {
    if (!enabled) return;
    this.finalSuccess.currentTime = 0;
    this.finalSuccess.play().catch(() => {});
  }
}

export const audioController = new AudioController();

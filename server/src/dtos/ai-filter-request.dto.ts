export class AIFilterRequest {
  artist: string;
  key: string;
  chordProgression: string;
  instrument: string;

  constructor(data: any) {
    this.artist = data.artist || "";
    this.key = data.key || "";
    this.chordProgression = data.chordProgression || "";
    this.instrument = data.instrument || "";
  }

  toPrompt() {
    let prompt = "give a short list of songs";

    if (this.artist.length) {
      prompt += ` by ${this.artist}`;
    }

    if (this.key.length) {
      prompt += ` in the key of ${this.key}`;
    }

    if (this.instrument.length) {
      prompt += ` played using a ${this.instrument} instrument`;
    }

    if (this.chordProgression.length) {
      prompt += ` using the ${this.chordProgression} chord progression`;
    }
    return prompt;
  }
}

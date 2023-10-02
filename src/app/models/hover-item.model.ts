export class HoverItem {
  name: string;
  image: string;
  input?: string;
  output?: string;
  cost?: string;

  constructor(name: string, image: string) {
    this.name = name;
    this.image = image;
  }
}

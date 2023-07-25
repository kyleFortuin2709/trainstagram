export class Post {
    image: Blob;
    tagline: string;
  
    constructor(image: Blob, tagline: string) {
      this.image = image;
      this.tagline = tagline;
    }
  }
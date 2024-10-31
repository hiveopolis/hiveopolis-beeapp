export class Place {
    constructor(type, title, imageUri, location, id, note = '') {
      this.type = type;
      this.title = title;
      this.note = note;
      this.imageUri = imageUri;
      this.address = location.address;
      this.location = { lat: location.lat, lng: location.lng };
      this.id = id;
    }
  }
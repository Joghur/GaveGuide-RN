class Wish {
  constructor(id, groupId, ownerId, title, text, price, url, imageUri) {
    this.id = id;
    this.groupId = groupId;
    this.ownerId = ownerId;
    this.title = title;
    this.text = text;
    this.price = price;
    this.url = url;
    this.imageUri = imageUri;
  }
}

export default Wish;

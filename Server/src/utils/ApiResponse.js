class Apiresponse {
  constructor(statuscode, data, message = "success") {
    this.statuscode = statuscode;
    this.data = data;
    this.message = message;
    this.response = statuscode < 400;
  }
}

export { Apiresponse };

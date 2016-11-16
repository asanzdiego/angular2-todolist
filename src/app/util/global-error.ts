export class GlobalError {
  status: number;
  error: string;
  message: string;

  constructor(error: any) {
    let myError = error
    if (error._body && error._body !== "") {
      myError = error._body;
    }
    this.status = myError.status || error.status || 500;
    this.error = myError.error || error.error || 'Desconocido';
    this.message = myError.message || error.message || 'Ha ocurrido un error desconocido.';
  }

  toString(): string {
    return this.status + " - " + this.error + " - " + this.message;
  }
}
